import { useState, useEffect } from "react";
import { Menu, X, Mail, MessageCircle } from "lucide-react";
import CTAButton from "./CTAButton";
import { EMAIL_PLACEHOLDER, WHATSAPP_URL, CRP, INSTAGRAM_URL } from "@/config";

const InstagramIcon = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const navLinks = [
  { href: "#sobre", label: "Sobre" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#atendimento", label: "Atendimento" },
  { href: "#avaliacoes", label: "Avaliações" },
  { href: "#video", label: "Vídeo" },
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

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

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
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                <InstagramIcon size={12} />
                <span className="hidden sm:inline">Instagram</span>
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
            ? "top-0 bg-background/90 backdrop-blur-md h-[4.5rem]"
            : "top-8 bg-background/70 backdrop-blur-sm h-20"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo + CRP */}
          <a
            href="#inicio"
            className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded shrink-0"
            aria-label="Bruno Rocha • Psicólogo (Psicanálise)"
          >
            {/* Desktop: logo completo */}
            <img
              src="/images/logo-bruno-rocha.png"
              alt="Bruno Rocha • Psicólogo (Psicanálise)"
              className={`hidden lg:block transition-all duration-300 ${scrolled ? "h-12" : "h-14"}`}
            />
            {/* Mobile: monograma */}
            <img
              src="/images/logo-br.png"
              alt="Bruno Rocha"
              className={`lg:hidden transition-all duration-300 ${scrolled ? "h-9" : "h-10"}`}
            />
            {/* CRP — desktop inline, mobile abaixo */}
            <span className="hidden lg:inline text-[11px] text-muted-foreground/70 font-medium tracking-wide">
              CRP {CRP}
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

          {/* Mobile: CRP + hamburger */}
          <div className="flex lg:hidden items-center gap-3">
            <span className="text-[10px] text-muted-foreground/60 font-medium tracking-wide hidden xs:inline">
              CRP {CRP}
            </span>
            <button
              className="p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu — slide overlay */}
        <div
          className={`lg:hidden fixed inset-0 top-0 z-50 transition-all duration-300 ${
            open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
          {/* Panel */}
          <div
            className={`absolute right-0 top-0 h-full w-72 bg-[hsl(220,28%,6%)] border-l border-border/50 shadow-2xl shadow-black/60 transition-transform duration-300 ${
              open ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between px-6 h-16 border-b border-border/50 bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <img src="/images/logo-br.png" alt="BR" className="h-6" />
                <span className="text-xs text-muted-foreground/60 font-medium">CRP {CRP}</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                aria-label="Fechar menu"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="px-6 py-6 flex flex-col gap-1" aria-label="Menu mobile">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className="py-3 text-sm text-foreground/90 hover:text-foreground hover:bg-primary/10 hover:pl-1 rounded-md px-2 transition-all duration-150 min-h-[44px] flex items-center"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-6">
                <CTAButton href="#agendar" className="w-full justify-center" onClick={handleNavClick}>
                  Agendar sessão
                </CTAButton>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
