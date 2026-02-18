import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import CTAButton from "./CTAButton";

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Sobre" },
    { to: "/blog", label: "Blog" },
    { to: "/agendar", label: "Agendar" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex flex-col leading-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          aria-label="Bruno Severino | Psicologia - Página inicial"
        >
          <span className="text-sm font-semibold text-foreground tracking-tight">
            Bruno Severino
          </span>
          <span className="text-xs text-muted-foreground font-light">
            Psicologia · Psicanálise
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded px-1
                ${isActive(link.to)
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {link.label}
            </Link>
          ))}
          <CTAButton to="/agendar" size="sm">
            Agendar sessão
          </CTAButton>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background/98 backdrop-blur-sm">
          <nav className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-1" aria-label="Menu mobile">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`py-3 text-sm transition-colors border-b border-border/50 last:border-0
                  ${isActive(link.to)
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3">
              <CTAButton to="/agendar" className="w-full justify-center" onClick={() => setOpen(false)}>
                Agendar sessão
              </CTAButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
