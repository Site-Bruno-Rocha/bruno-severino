import { Play, CheckCircle } from "lucide-react";
import CTAButton from "@/components/CTAButton";
import { VIDEO_URL } from "@/config";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const bullets = [
  "Abordagem psicanalítica",
  "Atendimento 100% online",
  "Sigilo e acolhimento",
];

const VideoSection = () => (
  <section id="video" className="py-24 bg-card/30 scroll-mt-20">
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left — text */}
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-5">Apresentação</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-balance">
            Conheça o Bruno
          </h2>
          <ul className="space-y-4 mb-10">
            {bullets.map((b) => (
              <li key={b} className="flex items-center gap-3 text-muted-foreground text-sm">
                <CheckCircle size={16} className="text-primary shrink-0" />
                {b}
              </li>
            ))}
          </ul>
          <CTAButton href="#agendar" size="sm" showArrow>
            Agendar sessão
          </CTAButton>
        </div>

        {/* Right — video */}
        <div className="relative">
          {/* Subtle glow */}
          <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-[40px] pointer-events-none" aria-hidden="true" />

          <div className="relative rounded-2xl border border-border/50 bg-card/60 overflow-hidden">
            {VIDEO_URL ? (
              <AspectRatio ratio={16 / 9}>
                <iframe
                  src={VIDEO_URL}
                  title="Vídeo de apresentação — Bruno Severino Rocha"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </AspectRatio>
            ) : (
              <AspectRatio ratio={16 / 9}>
                <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-card/80">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Play size={28} />
                  </div>
                  <p className="text-sm text-muted-foreground/60 text-center px-6">
                    Vídeo de apresentação<br />(em breve)
                  </p>
                </div>
              </AspectRatio>
            )}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default VideoSection;
