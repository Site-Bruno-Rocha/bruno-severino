import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAdmin, loading, signOut, adminDebug } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/admin/login" replace />;

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <div className="w-full max-w-sm text-center space-y-4">
          <img src="/images/logo-br.png" alt="BR" className="h-12 mx-auto invert" />
          <h1 className="text-xl font-semibold text-foreground">Sem permissão</h1>
          <p className="text-sm text-muted-foreground">
            Conta autenticada, porém sem permissão de administrador.
          </p>
          <Button variant="outline" className="w-full" onClick={signOut}>
            <LogOut size={16} className="mr-2" />
            Sair
          </Button>
          <a href="/" className="block text-xs text-muted-foreground hover:text-foreground transition-colors">
            ← Voltar ao site
          </a>

          {import.meta.env.DEV && (
            <div className="rounded-md border border-border bg-muted/40 p-3 text-left">
              <p className="text-xs font-medium text-foreground mb-2">Diagnóstico DEV</p>
              <pre className="text-[11px] leading-4 text-muted-foreground whitespace-pre-wrap break-all">
                {JSON.stringify(adminDebug, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
