package main

import (
	"bytes"
	"encoding/json"
	"errors"
	"io"
	"log"
	"net"
	"net/http"
	"net/url"
	"os"
	"regexp"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/joho/godotenv"
)

type Comment struct {
	ID        string `json:"id,omitempty"`
	Name      string `json:"name"`
	Message   string `json:"message"`
	Website   string `json:"website,omitempty"`
	CreatedAt string `json:"created_at,omitempty"`
}
type commentPage struct {
	Comments []Comment `json:"comments"`
	HasMore  bool      `json:"has_more"`
}
type rateLimiter struct {
	sync.Mutex
	hits map[string][]time.Time
}

var limiter = rateLimiter{hits: map[string][]time.Time{}}
var tags = regexp.MustCompile(`<[^>]*>`)

func clean(value string) string { return strings.TrimSpace(tags.ReplaceAllString(value, "")) }
func env(name, fallback string) string {
	if value := os.Getenv(name); value != "" {
		return value
	}
	return fallback
}
func writeJSON(w http.ResponseWriter, status int, value any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(value)
}

// clientIP extracts the real client IP, honoring trusted proxy headers.
// In production (Railway/Render) the direct RemoteAddr is the proxy, not the user.
func clientIP(r *http.Request) string {
	// Only trust proxy-provided IPs when the deployment explicitly opts in.
	// Direct clients can forge X-Forwarded-For, so the safe default is RemoteAddr.
	if os.Getenv("TRUST_PROXY_HEADERS") == "true" {
		if fwd := r.Header.Get("X-Forwarded-For"); fwd != "" {
			if idx := strings.IndexByte(fwd, ','); idx >= 0 {
				return strings.TrimSpace(fwd[:idx])
			}
			return strings.TrimSpace(fwd)
		}
	}
	host, _, err := net.SplitHostPort(r.RemoteAddr)
	if err != nil {
		return r.RemoteAddr
	}
	return host
}

// cors implements a strict allowlist: only configured origins are accepted.
// No fallback to "*" — if CORS_ORIGIN is empty, cross-origin requests are refused.
func cors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		raw := os.Getenv("CORS_ORIGIN")
		allowed := map[string]bool{}
		for _, o := range strings.Split(raw, ",") {
			o = strings.TrimSpace(o)
			if o != "" {
				allowed[o] = true
			}
		}
		origin := r.Header.Get("Origin")
		if origin != "" && allowed[origin] {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			w.Header().Set("Vary", "Origin")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
			w.Header().Set("Access-Control-Max-Age", "600")
		}
		if r.Method == http.MethodOptions {
			if origin == "" || !allowed[origin] {
				w.WriteHeader(http.StatusForbidden)
				return
			}
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(w, r)
	})
}
func (l *rateLimiter) allow(ip string) bool {
	l.Lock()
	defer l.Unlock()
	now := time.Now()
	previous := l.hits[ip]
	recent := make([]time.Time, 0, len(previous))
	for _, hit := range previous {
		if now.Sub(hit) < time.Minute {
			recent = append(recent, hit)
		}
	}
	if len(recent) >= 5 {
		l.hits[ip] = recent
		return false
	}
	l.hits[ip] = append(recent, now)
	return true
}

func supabaseRequest(method, path string, body any, target any) error {
	base := strings.TrimRight(os.Getenv("SUPABASE_URL"), "/")
	key := os.Getenv("SUPABASE_SERVICE_ROLE_KEY")
	if base == "" || key == "" {
		return errors.New("Supabase is not configured")
	}
	var reader io.Reader
	if body != nil {
		encoded, err := json.Marshal(body)
		if err != nil {
			return err
		}
		reader = bytes.NewReader(encoded)
	}
	req, err := http.NewRequest(method, base+"/rest/v1/"+path, reader)
	if err != nil {
		return err
	}
	req.Header.Set("apikey", key)
	req.Header.Set("Authorization", "Bearer "+key)
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Prefer", "return=representation")
	response, err := http.DefaultClient.Do(req)
	if err != nil {
		return err
	}
	defer response.Body.Close()
	if response.StatusCode < 200 || response.StatusCode >= 300 {
		detail, _ := io.ReadAll(io.LimitReader(response.Body, 1000))
		return errors.New(string(detail))
	}
	if target != nil {
		return json.NewDecoder(response.Body).Decode(target)
	}
	return nil
}
func handleComments(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		page, _ := strconv.Atoi(r.URL.Query().Get("page"))
		limit, _ := strconv.Atoi(r.URL.Query().Get("limit"))
		if page < 1 {
			page = 1
		}
		if limit < 1 || limit > 50 {
			limit = 10
		}
		from := (page - 1) * limit
		to := from + limit - 1
		var comments []Comment
		err := supabaseRequest(http.MethodGet, "comments?select=id,name,message,website,created_at&approved=eq.true&order=created_at.desc&limit="+strconv.Itoa(limit)+"&offset="+strconv.Itoa(from), nil, &comments)
		if err != nil {
			writeJSON(w, http.StatusServiceUnavailable, map[string]string{"error": err.Error()})
			return
		}
		_ = to
		writeJSON(w, http.StatusOK, commentPage{Comments: comments, HasMore: len(comments) == limit})
		return
	}
	if r.Method != http.MethodPost {
		writeJSON(w, http.StatusMethodNotAllowed, map[string]string{"error": "method not allowed"})
		return
	}
	if !limiter.allow(clientIP(r)) {
		writeJSON(w, http.StatusTooManyRequests, map[string]string{"error": "too many comments; try again later"})
		return
	}
	var input Comment
	decoder := json.NewDecoder(io.LimitReader(r.Body, 4096))
	if decoder.Decode(&input) != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "invalid JSON"})
		return
	}
	input.Name, input.Message, input.Website = clean(input.Name), clean(input.Message), clean(input.Website)
	if len(input.Name) < 2 || len(input.Name) > 50 {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "name must be 2-50 characters"})
		return
	}
	if len(input.Message) < 3 || len(input.Message) > 500 {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "message must be 3-500 characters"})
		return
	}
	if input.Website != "" {
		parsed, err := url.ParseRequestURI(input.Website)
		if err != nil || (parsed.Scheme != "http" && parsed.Scheme != "https") || parsed.Host == "" {
			writeJSON(w, http.StatusBadRequest, map[string]string{"error": "website must be a valid http(s) URL"})
			return
		}
	}
	var created []Comment
	if err := supabaseRequest(http.MethodPost, "comments", map[string]string{"name": input.Name, "message": input.Message, "website": input.Website}, &created); err != nil || len(created) == 0 {
		if err == nil {
			err = errors.New("Supabase returned no comment")
		}
		log.Printf("insert comment: %v", err)
		writeJSON(w, http.StatusBadGateway, map[string]string{"error": "comment could not be saved"})
		return
	}
	writeJSON(w, http.StatusCreated, created[0])
}
func main() {
	if err := godotenv.Load(".env"); err != nil {
		log.Printf("load .env: %v", err)
	}
	log.Printf("Supabase configured: url=%t key=%t", os.Getenv("SUPABASE_URL") != "", os.Getenv("SUPABASE_SERVICE_ROLE_KEY") != "")
	mux := http.NewServeMux()
	mux.HandleFunc("/health", func(w http.ResponseWriter, _ *http.Request) {
		writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
	})
	mux.HandleFunc("/api/comments", handleComments)
	port := env("PORT", "8080")
	log.Printf("API listening on :%s", port)
	log.Fatal(http.ListenAndServe(":"+port, cors(mux)))
}
