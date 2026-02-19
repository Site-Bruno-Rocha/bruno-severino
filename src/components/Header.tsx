import { useState, useEffect } from "react";
import { Menu, X, Mail, Phone, MessageCircle } from "lucide-react";
import CTAButton from "./CTAButton";
import { EMAIL_PLACEHOLDER, WHATSAPP_URL } from "@/config";

const navLinks = [
  { href: "#sobre", label: "Sobre" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#atendimento", label: "Atendimento" },
  { href: "#blog", label: "Blog" },
  { href: "#agendar", label: "Agendar" },
  { href: "#contato", label: "Contato" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = () => setOpen(false);

  return (
    <>
      {/* Contact pill — top bar */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "h-0 opacity-0 pointer-events-none" : "h-8"}`}>
        <div className="h-full bg-secondary/80 backdrop-blur-sm border-b border-border/40">
          <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between text-xs text-muted-foreground">
            <span className="hidden sm:inline">Seg–Sáb · Somente com hora marcada</span>
            <div className="flex items-center gap-4 ml-auto">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                <MessageCircle size={12} />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
              <a href={`mailto:${EMAIL_PLACEHOLDER}`} className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                <Mail size={12} />
                <span className="hidden sm:inline">{EMAIL_PLACEHOLDER}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`fixed left-0 right-0 z-40 transition-all duration-300 border-b border-border/30 ${
          scrolled
            ? "top-0 bg-background/90 backdrop-blur-md h-14"
            : "top-8 bg-background/70 backdrop-blur-sm h-16"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <a
            href="#inicio"
            className="flex flex-col leading-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            aria-label="Bruno Severino Rocha — Página inicial"
          >
            <span className={`font-semibold text-foreground tracking-tight transition-all duration-300 ${scrolled ? "text-sm" : "text-base"}`}>
              Bruno Severino Rocha
            </span>
            <span className={`text-muted-foreground font-light transition-all duration-300 ${scrolled ? "text-[10px]" : "text-xs"}`}>
              Psicólogo · Psicanálise
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Navegação principal">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded px-1"
              >
                {link.label}
              </a>
            ))}
            <CTAButton href="#agendar" size="sm">
              Agendar sessão
            </CTAButton>
          </nav>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden border-t border-border/30 bg-background/98 backdrop-blur-md">
            <nav className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1" aria-label="Menu mobile">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className="py-3 text-sm text-muted-foreground hover:text-foreground transition-colors border-b border-border/20 last:border-0"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 flex flex-col gap-2">
                <CTAButton href="#agendar" className="w-full justify-center" onClick={handleNavClick}>
                  Agendar sessão
                </CTAButton>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
