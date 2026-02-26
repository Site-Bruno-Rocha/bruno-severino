import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, LogOut } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deniedState, setDeniedState] = useState(false);
  const { signIn, signOut, user, isAdmin, loading, checkAdmin } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  // Already admin → dashboard
  if (user && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  // Logged in but NOT admin → show denied screen (not a redirect loop)
  if (deniedState || (user && !isAdmin)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <div className="w-full max-w-sm text-center space-y-4">
          <img src="/images/logo-br.png" alt="BR" className="h-12 mx-auto invert" />
          <h1 className="text-xl font-semibold text-foreground">Sem permissão</h1>
          <p className="text-sm text-muted-foreground">
            Sua conta está autenticada, porém não possui permissões de administrador.
          </p>
          <Button
            variant="outline"
            className="w-full"
            onClick={async () => {
              await signOut();
              setDeniedState(false);
            }}
          >
            <LogOut size={16} className="mr-2" />
            Sair
          </Button>
          <a href="/" className="block text-xs text-muted-foreground hover:text-foreground transition-colors">
            ← Voltar ao site
          </a>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const { error: authError } = await signIn(email, password);

    if (authError) {
      setError(authError.message);
      setSubmitting(false);
      return;
    }

    // Wait for session then check admin
    const { data: { session } } = await (await import("@/integrations/supabase/client")).supabase.auth.getSession();

    if (!session?.user) {
      setError("Sessão não encontrada após login.");
      setSubmitting(false);
      return;
    }

    const admin = await checkAdmin(session.user.id);
    setSubmitting(false);

    if (admin) {
      navigate("/admin", { replace: true });
    } else {
      setDeniedState(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img src="/images/logo-br.png" alt="BR" className="h-12 mx-auto mb-4 invert" />
          <h1 className="text-xl font-semibold text-foreground">Admin · Blog</h1>
          <p className="text-sm text-muted-foreground mt-1">Acesso restrito</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" placeholder="seu@email.com" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" placeholder="••••••••" className="mt-1" />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" className="w-full" disabled={submitting}>
            <LogIn size={16} className="mr-2" />
            {submitting ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            ← Voltar ao site
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
