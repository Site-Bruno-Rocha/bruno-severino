import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { FileText, Plus, LogOut } from "lucide-react";

const AdminDashboard = () => {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/images/logo-br.png" alt="BR" className="h-7 invert" />
            <span className="text-sm font-medium text-foreground">Admin</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut size={14} className="mr-1" /> Sair
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-2xl font-bold text-foreground mb-2">Painel administrativo</h1>
        <p className="text-muted-foreground text-sm mb-10">Gerencie o conteúdo do seu site.</p>

        <div className="grid sm:grid-cols-2 gap-4 max-w-xl">
          <Link
            to="/admin/posts"
            className="flex items-center gap-4 p-6 rounded-xl border border-border/50 bg-card/50 hover:bg-card transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <FileText size={20} />
            </div>
            <div>
              <h3 className="font-medium text-foreground text-sm">Artigos</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Ver, criar e editar posts do blog</p>
            </div>
          </Link>

          <Link
            to="/admin/posts/new"
            className="flex items-center gap-4 p-6 rounded-xl border border-border/50 bg-card/50 hover:bg-card transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <Plus size={20} />
            </div>
            <div>
              <h3 className="font-medium text-foreground text-sm">Novo artigo</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Escrever e publicar um novo post</p>
            </div>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <a href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            ← Voltar ao site
          </a>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
