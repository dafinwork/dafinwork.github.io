# Dafin Portfolio

Neobrutalist portfolio with a guestbook. The frontend uses Next.js; the backend is Go and the production data layer is ready for Supabase.

![Next.js](https://img.shields.io/badge/Next.js-React-black) ![Go](https://img.shields.io/badge/Go-1.22-00ADD8) ![Docker](https://img.shields.io/badge/Docker-ready-2496ED)

```text
Browser -> Next.js -> Go API -> Supabase
                         |
                       Docker
```

## Quick start
Copy `backend/.env.example` to `backend/.env`, then run `docker compose up --build`. In another terminal, run `cd frontend && npm install && npm run dev`.

## Without Docker
Run `go run .` inside `backend`, then `npm install && npm run dev` inside `frontend`.

## Supabase
1. Create a project.
2. Run `supabase/schema.sql` in SQL Editor.
3. Put the project URL and service role key in `backend/.env`.
4. Keep the service role key on the backend only.

## Free deployment

Use the free-tier split deployment:

1. Push this repository to GitHub.
2. Create a Render **Web Service** from `portfolio-new/render.yaml` for the Go API.
3. Add these Render environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY` (use a newly generated Supabase Secret key)
   - `CORS_ORIGIN` (set after Vercel creates the frontend URL)
4. Deploy `frontend` to Vercel with `NEXT_PUBLIC_API_URL=https://<render-service>.onrender.com`.
5. Update Render's `CORS_ORIGIN` to the final Vercel URL and redeploy the API.

The Render free service may sleep when idle; the first request after inactivity can be slow. Supabase stays on its free plan. Never put the Supabase service-role key in the frontend or GitHub.

## License
Personal portfolio. Contact the author before reusing content.
