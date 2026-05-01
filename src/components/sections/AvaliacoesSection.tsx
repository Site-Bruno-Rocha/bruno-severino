import { Star } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const reviews = [
  { initials: "Kauan Santos", text: "Tive e tenho uma ótima experiência nas sessões com o Bruno. Sempre muito atencioso e pontual em assuntos necessários. Recomendo!" },
  { initials: "Diego Fonseca", text: "Sempre incrível, e de total profissionalismo. Excelente atendimento." },
  { initials: "Bruna Horta", text: "Ótimo profissional, me acompanha há uns anos. Sinto que tive uma grande evolução nesse período, resultado nítido da terapia. Recomendo de olhos fechados!" },
  { initials: "Aldair Freitas", text: "Excelente psicólogo! O processo terapêutico tem sido fundamental para o meu autoconhecimento e evolução pessoal. Profissional muito capacitado e pontual." },
  { initials: "Luiz Vikings", text: "Ótimo profissional." },
  { initials: "Gisele Barbosa", text: "Sem dúvidas, um profissional atencioso e acolhedor." },
  { initials: "Kévin Rufino", text: "Profissional extremamente atencioso, escuta com empatia e explica as questões de forma clara. As sessões têm me ajudado muito a refletir e entender melhor minhas emoções. Recomendo." },
  { initials: "Talita Santos", text: "Atendimento excelente, super indico! Um profissional muito atencioso." },
  { initials: "Aline Mariano", text: "Com muita sensibilidade e profissionalismo, ele contribui ao meu crescimento, autoconhecimento e equilíbrio emocional. Sou grata a todo o apoio e orientação!" },
];

const Stars = () => (
  <div className="flex gap-0.5 text-primary" aria-label="5 estrelas">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
    ))}
  </div>
);

const ReviewCard = ({ review }: { review: typeof reviews[0] }) => (
  <div className="shrink-0 w-[340px] rounded-2xl border border-border/50 bg-card/50 p-6">
    <Stars />
    <p className="text-sm text-muted-foreground leading-relaxed mt-4 mb-4">
      "{review.text}"
    </p>
    <p className="text-xs font-medium text-foreground/70">{review.initials}</p>
  </div>
);

const AvaliacoesSection = () => {
  const titleRef = useScrollReveal();

  // Duplicate items for seamless loop
  const duplicated = [...reviews, ...reviews];

  return (
    <section id="avaliacoes" className="py-14 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div ref={titleRef} data-reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-5">Avaliações</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            O que dizem os pacientes
          </h2>
          <p className="text-muted-foreground mb-12 max-w-lg">
            Avaliações do Google ★ 5,0 · 10 avaliações
          </p>
        </div>
      </div>

      {/* Marquee wrapper */}
      <div className="relative group">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent" />

        {/* Scrolling track */}
        <div className="flex gap-5 marquee-track group-hover:[animation-play-state:paused]">
          {duplicated.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AvaliacoesSection;
