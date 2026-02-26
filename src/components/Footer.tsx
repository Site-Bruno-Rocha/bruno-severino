import { CRP, EMAIL_PLACEHOLDER, INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/config";

const InstagramIcon = ({ size = 12 }: { size?: number }) => (
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
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <img
              src="/images/logo-bruno-rocha.png"
              alt="Bruno Rocha • Psicólogo (Psicanálise)"
              className="h-8 mb-2"
            />
            <p className="text-muted-foreground text-xs mt-1">
              Psicólogo · Psicanálise · CRP {CRP}
            </p>
          </div>

          <div className="text-xs text-muted-foreground text-center space-y-1">
            <p>Atendimento online · Seg–Sáb · Somente com hora marcada</p>
            <p className="flex items-center justify-center gap-3">
              <a href={`mailto:${EMAIL_PLACEHOLDER}`} className="hover:text-foreground transition-colors underline underline-offset-2">
                {EMAIL_PLACEHOLDER}
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-foreground transition-colors">
                <InstagramIcon size={12} />
                {INSTAGRAM_HANDLE}
              </a>
            </p>
          </div>

          <nav className="flex gap-4 text-xs text-muted-foreground" aria-label="Links do rodapé">
            <a href="#sobre" className="hover:text-foreground transition-colors">Sobre</a>
            <a href="#avaliacoes" className="hover:text-foreground transition-colors">Avaliações</a>
            <a href="#video" className="hover:text-foreground transition-colors">Vídeo</a>
            <a href="#blog" className="hover:text-foreground transition-colors">Blog</a>
            <a href="#agendar" className="hover:text-foreground transition-colors">Agendar</a>
            <a href="/admin/login" className="hover:text-foreground transition-colors opacity-40 hover:opacity-70">Admin</a>
          </nav>
        </div>

        <p className="text-xs text-muted-foreground/50 mt-8 text-center">
          © {year} Bruno Severino Rocha — Todos os direitos reservados.
        </p>
        <p className="text-xs text-muted-foreground/40 mt-2 text-center">
          Criado por Next Corporation
        </p>
      </div>
    </footer>
  );
};

export default Footer;
