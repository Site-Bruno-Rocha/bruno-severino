import { Star } from "lucide-react";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";

const mockReviews = [
  { initials: "Gisele A. C. B.", text: "Sem dúvidas, um profissional atencioso e acolhedor." },
  { initials: "Kévin R.", text: "Profissional extremamente atencioso, escuta com empatia e explica as questões de forma clara. As sessões têm me ajudado muito a refletir e entender melhor minhas emoções. Recomendo." },
  { initials: "Talita S.", text: "Atendimento excelente, super indico! Um profissional muito atencioso." },
  { initials: "Aline M.", text: "Com muita sensibilidade e profissionalismo, ele contribui ao meu crescimento, autoconhecimento e equilíbrio emocional. Sou grata a todo o apoio e orientação!" },
  { initials: "Kauan C. S.", text: "Tive e tenho uma ótima experiência nas sessões com o Bruno. Sempre muito atencioso e pontual em assuntos necessários. Recomendo!" },
  { initials: "Aldair F.", text: "O atendimento do Bruno é personalizado e me atendeu super bem. Indico sempre!" },
];

const Stars = () => (
  <div className="flex gap-0.5 text-primary" aria-label="5 estrelas">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
    ))}
  </div>
);

const AvaliacoesSection = () => {
  const titleRef = useScrollReveal();
  const cardsRef = useStaggerReveal();

  return (
    <section id="avaliacoes" className="py-14 lg:py-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div ref={titleRef} data-reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-5">Avaliações</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            O que dizem os pacientes
          </h2>
          <p className="text-muted-foreground mb-12 max-w-lg">
            Avaliações do Google <span className="text-muted-foreground/50">(integração em breve)</span>
          </p>
        </div>

        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {mockReviews.map((review) => (
            <div
              key={review.initials}
              data-reveal-child
              className="rounded-2xl border border-border/50 bg-card/50 p-6 hover-lift"
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
};

export default AvaliacoesSection;
