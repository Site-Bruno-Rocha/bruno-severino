-- Add published_at to support deterministic public ordering and publication lifecycle
ALTER TABLE public.posts
ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ;

-- Backfill existing published rows
UPDATE public.posts
SET published_at = COALESCE(published_at, created_at)
WHERE status = 'published' AND published_at IS NULL;

-- Keep publication fields consistent regardless of client behavior
CREATE OR REPLACE FUNCTION public.sync_post_publication_fields()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  -- Normalize status
  IF NEW.status IS NULL THEN
    NEW.status := 'draft';
  END IF;

  IF NEW.status = 'published' THEN
    IF NEW.published_at IS NULL THEN
      NEW.published_at := now();
    END IF;
  ELSE
    -- Drafts never carry published timestamp
    NEW.published_at := NULL;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_posts_validate_status ON public.posts;
CREATE TRIGGER trg_posts_validate_status
BEFORE INSERT OR UPDATE ON public.posts
FOR EACH ROW
EXECUTE FUNCTION public.validate_post_status();

DROP TRIGGER IF EXISTS trg_posts_sync_publication_fields ON public.posts;
CREATE TRIGGER trg_posts_sync_publication_fields
BEFORE INSERT OR UPDATE ON public.posts
FOR EACH ROW
EXECUTE FUNCTION public.sync_post_publication_fields();

DROP TRIGGER IF EXISTS trg_posts_updated_at ON public.posts;
CREATE TRIGGER trg_posts_updated_at
BEFORE UPDATE ON public.posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Performance for public blog query
CREATE INDEX IF NOT EXISTS idx_posts_public_feed
ON public.posts (published_at DESC, created_at DESC)
WHERE status = 'published';

-- Enable realtime updates for public blog synchronization
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public'
      AND tablename = 'posts'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.posts;
  END IF;
END;
$$;