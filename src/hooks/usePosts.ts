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
  created_at: string;
  updated_at: string;
}

export async function fetchPublishedPosts(): Promise<DbPost[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as DbPost[];
}

export async function fetchAllPosts(): Promise<DbPost[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });
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

export async function createPost(post: Omit<DbPost, "id" | "created_at" | "updated_at">): Promise<DbPost> {
  const { data, error } = await supabase
    .from("posts")
    .insert(post as any)
    .select()
    .single();
  if (error) throw error;
  return data as DbPost;
}

export async function updatePost(id: string, updates: Partial<Omit<DbPost, "id" | "created_at" | "updated_at">>): Promise<DbPost> {
  const { data, error } = await supabase
    .from("posts")
    .update(updates as any)
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
