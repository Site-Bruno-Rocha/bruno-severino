import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllPosts, deletePost, updatePost, type DbPost } from "@/hooks/usePosts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import AdminLayout from "@/components/admin/AdminLayout";

const AdminPosts = () => {
  const [posts, setPosts] = useState<DbPost[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      setPosts(await fetchAllPosts());
    } catch {
      toast.error("Erro ao carregar posts.");
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    try {
      await deletePost(id);
      toast.success("Post excluído.");
      load();
    } catch {
      toast.error("Erro ao excluir.");
    }
  };

  const togglePublish = async (post: DbPost) => {
    const newStatus = post.status === "published" ? "draft" : "published";
    try {
      await updatePost(post.id, { status: newStatus });
      toast.success(newStatus === "published" ? "Publicado!" : "Despublicado.");
      load();
    } catch {
      toast.error("Erro ao alterar status.");
    }
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Posts</h1>
        <Button variant="outline" size="sm" asChild>
          <Link to="/admin/posts/new"><Plus size={14} className="mr-1" /> Novo post</Link>
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p className="mb-4">Nenhum post ainda.</p>
          <Button asChild><Link to="/admin/posts/new"><Plus size={14} className="mr-1" /> Criar primeiro post</Link></Button>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-card/50 hover:bg-card transition-colors">
              <div className="min-w-0 flex-1 mr-4">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-foreground text-sm truncate">{post.title}</h3>
                  <Badge variant={post.status === "published" ? "default" : "secondary"} className="text-xs shrink-0">
                    {post.status === "published" ? "Publicado" : "Rascunho"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {post.category} · {formatDate(post.created_at)}
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => togglePublish(post)} title={post.status === "published" ? "Despublicar" : "Publicar"}>
                  {post.status === "published" ? <EyeOff size={14} /> : <Eye size={14} />}
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                  <Link to={`/admin/posts/${post.id}`}><Pencil size={14} /></Link>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                      <Trash2 size={14} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Excluir post?</AlertDialogTitle>
                      <AlertDialogDescription>Esta ação não pode ser desfeita.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(post.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        Excluir
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminPosts;
