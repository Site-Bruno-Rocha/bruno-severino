import { CRP, EMAIL_PLACEHOLDER, INSTAGRAM_URL, INSTAGRAM_HANDLE, WHATSAPP_URL } from "@/config";

const InstagramIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-card/30">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col items-center text-center gap-6">
        {/* Logo */}
        <img
          src="/images/logo-bruno-rocha.png"
          alt="Bruno Rocha · Psicólogo (Psicanálise)"
          className="h-14"
        />

        {/* Contatos */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 text-sm text-muted-foreground">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            WhatsApp
          </a>
          <span className="hidden sm:inline text-border">·</span>
          <a
            href={`mailto:${EMAIL_PLACEHOLDER}`}
            className="hover:text-foreground transition-colors"
          >
            {EMAIL_PLACEHOLDER}
          </a>
          <span className="hidden sm:inline text-border">·</span>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <InstagramIcon size={14} />
            {INSTAGRAM_HANDLE}
          </a>
        </div>

        {/* CRP */}
        <p className="text-xs text-muted-foreground/70">CRP {CRP}</p>

        {/* Copyright + Créditos */}
        <div className="space-y-1 text-xs text-muted-foreground/50">
          <p>© {year} Bruno Severino Rocha — Todos os direitos reservados.</p>
          <p>
            Criado por{" "}
            <a
              href="https://www.instagram.com/next.corporation__/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-muted-foreground/70 hover:underline underline-offset-2 transition-colors"
            >
              Next Corporation
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
