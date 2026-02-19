import { CRP, EMAIL_PLACEHOLDER } from "@/config";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-card/30">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="font-medium text-foreground text-sm">Bruno Severino Rocha</p>
            <p className="text-muted-foreground text-xs mt-1">
              Psicólogo · Psicanálise · CRP: {CRP}
            </p>
          </div>

          <div className="text-xs text-muted-foreground text-center space-y-1">
            <p>Atendimento online · Seg–Sáb · Somente com hora marcada</p>
            <p>
              <a href={`mailto:${EMAIL_PLACEHOLDER}`} className="hover:text-foreground transition-colors underline underline-offset-2">
                {EMAIL_PLACEHOLDER}
              </a>
            </p>
          </div>

          <nav className="flex gap-4 text-xs text-muted-foreground" aria-label="Links do rodapé">
            <a href="#sobre" className="hover:text-foreground transition-colors">Sobre</a>
            <a href="#blog" className="hover:text-foreground transition-colors">Blog</a>
            <a href="#agendar" className="hover:text-foreground transition-colors">Agendar</a>
          </nav>
        </div>

        <p className="text-xs text-muted-foreground/50 mt-8 text-center">
          © {year} Bruno Severino Rocha — Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
