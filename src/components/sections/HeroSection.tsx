import CTAButton from "@/components/CTAButton";
import WhatsAppButton from "@/components/WhatsAppButton";
import { User } from "lucide-react";

const HeroSection = () => (
  <section id="inicio" className="relative min-h-[92vh] flex items-center pt-28 pb-20 overflow-hidden">
    {/* Ambient glows */}
    <div className="absolute top-[15%] left-[10%] w-[500px] h-[500px] bg-primary/8 rounded-full blur-[150px] pointer-events-none" aria-hidden="true" />
    <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[350px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

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
      <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-20 items-center">
        {/* Left — text */}
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-8 flex items-center gap-3">
            <span className="w-8 h-px bg-primary/60" aria-hidden="true" />
            Psicologia online · Psicanálise
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground max-w-xl text-balance mb-6 leading-[1.08]">
            Psicologia online com{" "}
            <span className="text-primary">acolhimento</span> e sigilo.
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-lg mb-4 leading-relaxed">
            Atendimento clínico pela vertente psicanalítica.
          </p>
          <p className="text-sm text-muted-foreground/60 mb-12 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/60" aria-hidden="true" />
            Online · Seg–Sáb · Somente com hora marcada
          </p>
          <div className="flex flex-wrap gap-3">
            <CTAButton href="#agendar" size="lg" showArrow>
              Agendar sessão
            </CTAButton>
            <WhatsAppButton size="lg" />
          </div>
        </div>

        {/* Right — image placeholder with blue glow */}
        <div className="relative flex justify-center lg:justify-end">
          {/* Blue glow behind */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
            <div className="w-[85%] h-[85%] bg-primary/15 rounded-full blur-[80px]" />
          </div>

          {/* Image container */}
          <div className="relative w-64 h-80 sm:w-72 sm:h-[22rem] lg:w-80 lg:h-[26rem] rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm flex flex-col items-center justify-center gap-4 overflow-hidden">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <User size={32} />
            </div>
            <p className="text-sm text-muted-foreground/60 text-center px-6">
              Foto do Bruno<br />(em breve)
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
