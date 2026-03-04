import CTAButton from "@/components/CTAButton";
import WhatsAppButton from "@/components/WhatsAppButton";

const HeroSection = () => (
  <section id="inicio" className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center pt-28 lg:pt-28 pb-14 lg:pb-20 overflow-hidden">
    {/* Ambient glows */}
    <div className="absolute top-[15%] left-[10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary/8 rounded-full blur-[150px] pointer-events-none" aria-hidden="true" />
    <div className="absolute bottom-[10%] right-[5%] w-[250px] sm:w-[400px] h-[250px] sm:h-[350px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

    {/* Subtle grid pattern */}
    <div
      className="absolute inset-0 opacity-[0.03] pointer-events-none"
      aria-hidden="true"
      style={{
        backgroundImage: `linear-gradient(hsl(215 70% 55% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(215 70% 55% / 0.3) 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
      }}
    />

    {/* Decorative line */}
    <div className="absolute left-6 md:left-12 top-32 bottom-32 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent pointer-events-none" aria-hidden="true" />

    <div className="max-w-6xl mx-auto px-6 w-full relative">
      <div className="flex flex-col lg:grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-20 items-center">
        {/* Text block */}
        <div className="order-1">
          <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-8 flex items-center gap-3">
            <span className="w-8 h-px bg-primary/60" aria-hidden="true" />
            Psicologia online · Psicanálise
          </p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground max-w-xl text-balance mb-5 lg:mb-6 leading-[1.1]">
            Psicologia online com{" "}
            <span className="text-primary">acolhimento</span> e sigilo.
          </h1>
          <p className="text-muted-foreground text-base md:text-xl max-w-lg mb-3 lg:mb-4 leading-relaxed">
            Atendimento clínico pela vertente psicanalítica.
          </p>
          <p className="text-sm text-muted-foreground/60 mb-6 lg:mb-12 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/60" aria-hidden="true" />
            Online · Seg–Sáb · Somente com hora marcada
          </p>
          {/* Desktop buttons — inline with text */}
          <div className="hidden lg:flex flex-wrap gap-3">
            <CTAButton href="#agendar" size="lg" showArrow>
              Agendar sessão
            </CTAButton>
            <WhatsAppButton size="lg" />
          </div>
        </div>

        {/* Photo */}
        <div className="relative flex justify-center lg:justify-end order-2">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
            <div className="w-[85%] h-[85%] bg-primary/15 rounded-full blur-[80px]" />
          </div>
          <div className="relative w-56 h-72 sm:w-72 sm:h-[22rem] lg:w-80 lg:h-[26rem] rounded-2xl border border-border/50 overflow-hidden shadow-lg shadow-primary/5">
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              aria-hidden="true"
              style={{
                background: "linear-gradient(160deg, hsl(215 70% 55% / 0.12) 0%, transparent 60%)",
              }}
            />
            <img
              src="/images/bruno-hero.jpg"
              alt="Bruno Severino Rocha, psicólogo (psicanálise)"
              width={320}
              height={416}
              className="w-full h-full object-cover object-center"
              style={{ filter: "contrast(1.06) saturate(0.92)" }}
              loading="eager"
            />
            <div className="absolute inset-0 -z-10 bg-card flex items-center justify-center text-muted-foreground/30 text-2xl font-bold">
              BS
            </div>
          </div>
        </div>

        {/* Mobile buttons — below photo */}
        <div className="flex lg:hidden flex-col items-center gap-3 w-full max-w-sm mx-auto order-3">
          <CTAButton href="#agendar" size="lg" showArrow className="w-full justify-center">
            Agendar sessão
          </CTAButton>
          <WhatsAppButton size="lg" className="w-full justify-center" />
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
