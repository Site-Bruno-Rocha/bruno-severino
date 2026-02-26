import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-card/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-3 shrink-0">
            <img
              src="/images/logo-bruno-rocha-full.png"
              alt="Bruno Rocha • Psicólogo"
              className="h-8 sm:h-10"
            />
            <span className="text-xs font-medium text-muted-foreground hidden sm:inline">
              Admin
            </span>
          </Link>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="min-h-[44px] min-w-[44px]">
            <LogOut size={16} className="mr-1.5" />
            <span className="hidden sm:inline">Sair</span>
          </Button>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
