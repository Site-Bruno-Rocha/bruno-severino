import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { fetchPostById, createPost, updatePost, type DbPost } from "@/hooks/usePosts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Send } from "lucide-react";
import { toast } from "sonner";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const PostEditor = () => {
  const { id } = useParams<{ id: string }>();
  const isNew = !id || id === "new";
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Geral");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [autoSlug, setAutoSlug] = useState(true);

  useEffect(() => {
    if (!isNew && id) {
      fetchPostById(id).then((post) => {
        if (post) {
          setTitle(post.title);
          setSlug(post.slug);
          setExcerpt(post.excerpt);
          setContent(post.content);
          setCategory(post.category);
          setStatus(post.status as "draft" | "published");
          setAutoSlug(false);
        }
        setLoading(false);
      });
    }
  }, [id, isNew]);

  useEffect(() => {
    if (autoSlug) setSlug(slugify(title));
  }, [title, autoSlug]);

  const handleSave = async (publishStatus?: "draft" | "published") => {
    const finalStatus = publishStatus ?? status;
    if (!title.trim() || !slug.trim()) {
      toast.error("Título e slug são obrigatórios.");
      return;
    }
    setSaving(true);
    try {
      if (isNew) {
        await createPost({
          title, slug, excerpt, content, category,
          status: finalStatus,
          author_id: user?.id ?? null,
        });
        toast.success(finalStatus === "published" ? "Publicado!" : "Rascunho salvo.");
      } else {
        await updatePost(id!, { title, slug, excerpt, content, category, status: finalStatus });
        toast.success("Atualizado!");
      }
      navigate("/admin/posts");
    } catch (err: any) {
      toast.error(err?.message || "Erro ao salvar.");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => navigate("/admin/posts")}>
            <ArrowLeft size={14} className="mr-1" /> Posts
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => handleSave("draft")} disabled={saving}>
              <Save size={14} className="mr-1" /> Rascunho
            </Button>
            <Button size="sm" onClick={() => handleSave("published")} disabled={saving}>
              <Send size={14} className="mr-1" /> Publicar
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-foreground mb-8">
          {isNew ? "Novo post" : "Editar post"}
        </h1>

        <div className="space-y-6">
          <div>
            <Label htmlFor="title">Título</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título do post" className="mt-1" />
          </div>

          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => { setAutoSlug(false); setSlug(e.target.value); }}
              placeholder="slug-do-post"
              className="mt-1 font-mono text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Categoria</Label>
              <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Geral" className="mt-1" />
            </div>
            <div>
              <Label>Status</Label>
              <div className="mt-1 flex items-center gap-3 h-10">
                <label className="flex items-center gap-1.5 text-sm text-muted-foreground cursor-pointer">
                  <input type="radio" checked={status === "draft"} onChange={() => setStatus("draft")} className="accent-primary" />
                  Rascunho
                </label>
                <label className="flex items-center gap-1.5 text-sm text-muted-foreground cursor-pointer">
                  <input type="radio" checked={status === "published"} onChange={() => setStatus("published")} className="accent-primary" />
                  Publicado
                </label>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="excerpt">Resumo</Label>
            <Textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Uma breve descrição do post..." rows={3} className="mt-1" />
          </div>

          <div>
            <Label htmlFor="content">Conteúdo</Label>
            <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Escreva o conteúdo do post aqui..." rows={16} className="mt-1 font-mono text-sm" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostEditor;
