import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, LogOut } from "lucide-react";

type AdminDebugPanelProps = {
  adminDebug: {
    userEmail: string | null;
    userId: string | null;
    supabaseUrl: string;
    projectId: string;
    emailAllowed: boolean | null;
    rpcResult: boolean | null;
    rpcError: string | null;
    roleRow: { role: string; user_id: string } | null;
    roleError: string | null;
  };
};

const AdminDebugPanel = ({ adminDebug }: AdminDebugPanelProps) => {
  if (!import.meta.env.DEV) return null;

  return (
    <div className="mt-4 rounded-md border border-border bg-muted/40 p-3 text-left">
      <p className="text-xs font-medium text-foreground mb-2">Diagnóstico DEV</p>
      <pre className="text-[11px] leading-4 text-muted-foreground whitespace-pre-wrap break-all">
        {JSON.stringify(adminDebug, null, 2)}
      </pre>
    </div>
  );
};

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deniedState, setDeniedState] = useState(false);
  const { signIn, signOut, user, isAdmin, loading, checkAdmin, adminDebug } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (user && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  if (deniedState || (user && !isAdmin)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <div className="w-full max-w-sm text-center space-y-4">
          <img src="/images/logo-bruno-rocha-full.png" alt="Bruno Rocha • Psicólogo" className="h-10 sm:h-14 mx-auto" />
          <h1 className="text-xl font-semibold text-foreground">Sem permissão</h1>
          <p className="text-sm text-muted-foreground">
            Conta autenticada, porém sem permissão de administrador.
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
          <AdminDebugPanel adminDebug={adminDebug} />
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

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
      setError(userError.message);
      setSubmitting(false);
      return;
    }

    const authUser = userData.user;
    if (!authUser) {
      setError("Usuário autenticado não encontrado após login.");
      setSubmitting(false);
      return;
    }

    const admin = await checkAdmin(authUser);
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
          <img src="/images/logo-bruno-rocha-full.png" alt="Bruno Rocha • Psicólogo" className="h-10 sm:h-14 mx-auto mb-4" />
          <h1 className="text-xl font-semibold text-foreground">Admin</h1>
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
          <AdminDebugPanel adminDebug={adminDebug} />
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
