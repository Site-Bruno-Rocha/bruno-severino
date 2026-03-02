import { CheckCircle } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";

const bullets = [
  "Abordagem psicanalítica",
  "Atendimento 100% online",
  "Sigilo e acolhimento",
];

const VideoSection = () => (
  <section id="video" className="py-14 lg:py-24 bg-card/30">
    <div className="max-w-6xl mx-auto px-5 sm:px-6">
      <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center">
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
          <WhatsAppButton variant="primary" size="md" label="Agendar sessão" />
        </div>

        {/* Right — vertical video */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-[260px] sm:w-[300px] lg:w-[340px]">
            <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-[40px] pointer-events-none" aria-hidden="true" />
            <div className="relative rounded-2xl border border-border/50 bg-card/60 overflow-hidden shadow-lg" style={{ aspectRatio: "9/16" }}>
              <video
                src="/videos/bruno-apresentacao.mp4"
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
                title="Vídeo de apresentação — Bruno Severino Rocha"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default VideoSection;
