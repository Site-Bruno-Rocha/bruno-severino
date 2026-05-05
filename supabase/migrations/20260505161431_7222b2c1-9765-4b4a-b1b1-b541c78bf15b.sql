ALTER PUBLICATION supabase_realtime DROP TABLE public.posts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.posts WHERE (status = 'published');