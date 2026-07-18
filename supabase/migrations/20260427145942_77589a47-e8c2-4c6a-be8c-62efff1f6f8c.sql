-- Enable RLS on realtime.messages (idempotente) e restringe assinaturas de canal.
-- Em projetos novos do Supabase o RLS já vem habilitado e o postgres não é dono
-- da tabela; o bloco ignora a falta de privilégio nesse caso.
DO $$
BEGIN
  ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;
EXCEPTION WHEN insufficient_privilege OR undefined_table THEN
  NULL;
END $$;

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