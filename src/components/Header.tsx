import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Menu, X, Mail, MessageCircle, ChevronDown } from "lucide-react";
import CTAButton from "./CTAButton";
import { EMAIL_PLACEHOLDER, WHATSAPP_URL, CRP, INSTAGRAM_URL } from "@/config";

const InstagramIcon = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

/* ── Mobile nav (drawer) ── */
const mobileNavLinks = [
  { href: "#sobre", label: "Sobre Mim" },
  { href: "#servicos", label: "Serviços" },
  { href: "#abordagem", label: "Abordagem" },
  { href: "#atendimento", label: "Atendimento" },
  { href: "#avaliacoes", label: "Avaliações" },
  { href: "#blog", label: "Blog" },
  { href: "#faq", label: "Dúvidas" },
  { href: "#agendar", label: "Agendar" },
  { href: "#contato", label: "Contato" },
];

/* ── Desktop grouped nav ── */
interface DropdownItem {
  href: string;
  label: string;
}

interface NavGroup {
  label: string;
  items: DropdownItem[];
}

interface NavDirect {
  href: string;
  label: string;
}

type DesktopNavEntry = NavGroup | NavDirect;

const isGroup = (entry: DesktopNavEntry): entry is NavGroup => "items" in entry;

const desktopNav: DesktopNavEntry[] = [
  {
    label: "Sobre",
    items: [
      { href: "#sobre", label: "Sobre Mim" },
      { href: "#servicos", label: "Serviços" },
      { href: "#abordagem", label: "Abordagem" },
    ],
  },
  { href: "#atendimento", label: "Atendimento" },
  {
    label: "Conteúdo",
    items: [
      { href: "#avaliacoes", label: "Avaliações" },
      { href: "#blog", label: "Blog" },
      { href: "#faq", label: "Dúvidas" },
    ],
  },
  { href: "#contato", label: "Contato" },
];

/* ── Dropdown component ── */
const NavDropdown = ({ group, scrolled }: { group: NavGroup; scrolled: boolean }) => {
  const [open, setOpen] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const ref = useRef<HTMLDivElement>(null);

  const enter = () => {
    clearTimeout(timeout.current);
    setOpen(true);
  };
  const leave = () => {
    timeout.current = setTimeout(() => setOpen(false), 150);
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Keyboard
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen((o) => !o);
    }
  };

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKeyDown}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex items-center gap-1 whitespace-nowrap text-sm text-muted-foreground hover:text-foreground transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded px-2 py-1"
      >
        {group.label}
        <ChevronDown
          size={14}
          className={`opacity-60 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown panel */}
      <div
        className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200 ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
        }`}
      >
        <div className="min-w-[180px] rounded-xl border border-border/50 bg-card shadow-xl shadow-black/40 py-1.5">
          {group.items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── Header ── */
const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleNavClick = () => setOpen(false);

  return (
    <>
      {/* Contact pill — top bar (desktop only) */}
      <div className={`hidden lg:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "h-0 opacity-0 pointer-events-none" : "h-8"}`}>
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
            ? "top-0 bg-background/90 backdrop-blur-md h-16 lg:h-16"
            : "top-0 lg:top-8 bg-background backdrop-blur-none lg:bg-background/70 lg:backdrop-blur-sm h-16 lg:h-16"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo + CRP */}
          <a
            href="#inicio"
            className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded shrink-0"
            aria-label="Bruno Rocha • Psicólogo (Psicanálise)"
          >
            <img
              src="/images/logo-bruno-rocha.png"
              alt="Bruno Rocha • Psicólogo (Psicanálise)"
              className={`transition-all duration-300 flex-shrink-0 ${scrolled ? "h-9 lg:h-10" : "h-10 lg:h-11"}`}
            />
            <span className="hidden lg:inline text-[11px] text-muted-foreground/70 font-medium tracking-wide whitespace-nowrap">
              CRP {CRP}
            </span>
          </a>

          {/* Desktop nav — grouped */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Navegação principal">
            {desktopNav.map((entry, i) =>
              isGroup(entry) ? (
                <NavDropdown key={entry.label} group={entry} scrolled={scrolled} />
              ) : (
                <a
                  key={entry.href}
                  href={entry.href}
                  className="whitespace-nowrap text-sm text-muted-foreground hover:text-foreground transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded px-2 py-1"
                >
                  {entry.label}
                </a>
              )
            )}
            <div className="ml-3">
              <CTAButton href="#agendar" size="sm">
                Agendar sessão
              </CTAButton>
            </div>
          </nav>

          {/* Mobile: hamburger */}
          <div className="flex lg:hidden items-center gap-2">
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
      </header>

      {/* Mobile menu — portal */}
      {createPortal(
        <div
          className={`lg:hidden fixed inset-0 z-[9999] transition-all duration-300 ${
            open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          style={{ isolation: "isolate" }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
            onClick={() => setOpen(false)}
          />
          {/* Panel */}
          <div
            className={`absolute right-0 top-0 h-full w-[280px] border-l border-primary/15 shadow-2xl shadow-black/80 transition-transform duration-300 ${
              open ? "translate-x-0" : "translate-x-full"
            }`}
            style={{ backgroundColor: "hsl(220, 30%, 8%)" }}
          >
            <div className="flex items-center justify-between px-5 h-16 border-b border-primary/10" style={{ backgroundColor: "hsl(220, 30%, 10%)" }}>
              <div className="flex items-center gap-2">
                <img src="/images/logo-br.png" alt="BR" className="h-7" />
                <span className="text-[10px] text-muted-foreground/50 font-medium tracking-wide">CRP {CRP}</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                aria-label="Fechar menu"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="px-4 py-5 flex flex-col gap-0.5 overflow-y-auto" aria-label="Menu mobile">
              {mobileNavLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className="py-3 px-3 text-[15px] text-foreground/90 hover:text-foreground hover:bg-primary/10 rounded-lg transition-all duration-150 min-h-[44px] flex items-center border-b border-white/[0.04] last:border-b-0"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-5">
                <CTAButton href="#agendar" className="w-full justify-center" onClick={handleNavClick}>
                  Agendar sessão
                </CTAButton>
              </div>
            </nav>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Header;
