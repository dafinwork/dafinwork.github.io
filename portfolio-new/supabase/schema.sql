CREATE TABLE IF NOT EXISTS comments (id UUID DEFAULT gen_random_uuid() PRIMARY KEY,name VARCHAR(50) NOT NULL,message TEXT NOT NULL,website VARCHAR(255),created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,approved BOOLEAN DEFAULT true NOT NULL);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments (created_at DESC);
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read approved comments" ON comments;
DROP POLICY IF EXISTS "Service role can insert" ON comments;
CREATE POLICY "Public can read approved comments" ON comments FOR SELECT USING (approved = true);
CREATE POLICY "Service role can insert" ON comments FOR INSERT WITH CHECK (true);
