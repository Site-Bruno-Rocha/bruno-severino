-- Enable RLS on realtime.messages (idempotent) and restrict channel subscriptions
ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

-- Drop any prior versions of our policies to make this migration idempotent
DROP POLICY IF EXISTS "Allow public blog posts channel reads" ON realtime.messages;
DROP POLICY IF EXISTS "Allow public blog posts channel writes" ON realtime.messages;

-- Allow anon and authenticated users to subscribe ONLY to the
-- 'public-blog-posts' channel topic used by the public blog feed.
-- All other channel topics are denied by default (no permissive policy).
CREATE POLICY "Allow public blog posts channel reads"
ON realtime.messages
FOR SELECT
TO anon, authenticated
USING (
  (realtime.topic() = 'public-blog-posts')
);

CREATE POLICY "Allow public blog posts channel writes"
ON realtime.messages
FOR INSERT
TO anon, authenticated
WITH CHECK (
  (realtime.topic() = 'public-blog-posts')
);