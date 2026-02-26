import { Star } from "lucide-react";

/**
 * Seção de Avaliações — placeholder
 * TODO: Integrar com Google Reviews API ou widget quando disponível.
 * Os dados abaixo são mock e devem ser substituídos por dados reais.
 */

const mockReviews = [
  { initials: "M. A.", text: "O atendimento do Bruno é muito acolhedor. Me senti à vontade desde a primeira sessão. Recomendo de olhos fechados." },
  { initials: "C. S.", text: "Profissional atencioso e comprometido. A abordagem psicanalítica me ajudou a entender questões que eu carregava há anos." },
  { initials: "L. R.", text: "Sessões online com muita qualidade. O Bruno transmite segurança e respeita o tempo de cada paciente." },
  { initials: "A. F.", text: "Excelente psicólogo. A escuta dele é diferenciada e o sigilo é absoluto. Me sinto muito bem acompanhada." },
  { initials: "R. P.", text: "Depois de muitas tentativas com outros profissionais, encontrei no Bruno o acolhimento que precisava." },
  { initials: "J. M.", text: "Atendimento humano e de qualidade. As sessões me ajudaram a lidar melhor com a ansiedade no dia a dia." },
];

const Stars = () => (
  <div className="flex gap-0.5 text-primary" aria-label="5 estrelas">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
    ))}
  </div>
);

const AvaliacoesSection = () => (
<section id="avaliacoes" className="py-14 lg:py-24">
    <div className="max-w-6xl mx-auto px-5 sm:px-6">
      <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-5">Avaliações</p>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
        O que dizem os pacientes
      </h2>
      <p className="text-muted-foreground mb-12 max-w-lg">
        Avaliações do Google <span className="text-muted-foreground/50">(integração em breve)</span>
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {mockReviews.map((review) => (
          <div
            key={review.initials}
            className="rounded-2xl border border-border/50 bg-card/50 p-6 hover:bg-card transition-colors duration-200"
          >
            <Stars />
            <p className="text-sm text-muted-foreground leading-relaxed mt-4 mb-4">
              "{review.text}"
            </p>
            <p className="text-xs font-medium text-foreground/70">{review.initials}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AvaliacoesSection;
