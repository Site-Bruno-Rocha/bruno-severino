import { supabase } from "@/integrations/supabase/client";

export interface DbPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  status: string;
  author_id: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export async function fetchPublishedPosts(limit = 3): Promise<DbPost[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as DbPost[];
}

export async function fetchPublishedPostById(id: string): Promise<DbPost | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .eq("status", "published")
    .maybeSingle();

  if (error) throw error;
  return data as DbPost | null;
}

export async function fetchAllPosts(): Promise<DbPost[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as DbPost[];
}

export async function fetchPostById(id: string): Promise<DbPost | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data as DbPost | null;
}

export async function createPost(post: Omit<DbPost, "id" | "published_at" | "created_at" | "updated_at">): Promise<DbPost> {
  const { data, error } = await supabase.from("posts").insert(post as never).select().single();
  if (error) throw error;
  return data as DbPost;
}

export async function updatePost(id: string, updates: Partial<Omit<DbPost, "id" | "published_at" | "created_at" | "updated_at">>): Promise<DbPost> {
  const { data, error } = await supabase
    .from("posts")
    .update(updates as never)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as DbPost;
}

export async function deletePost(id: string): Promise<void> {
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw error;
}

