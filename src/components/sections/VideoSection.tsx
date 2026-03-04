import { useEffect, useRef, useState } from "react";
import { CheckCircle, Volume2, VolumeX, Play } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const bullets = [
  "Abordagem psicanalítica",
  "Atendimento 100% online",
  "Sigilo e acolhimento",
];

const VideoSection = () => {
  const ref = useScrollReveal();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [needsTap, setNeedsTap] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => setNeedsTap(true));
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const handleTap = () => {
    const video = videoRef.current;
    if (!video) return;
    video.play().then(() => setNeedsTap(false)).catch(() => {});
  };

  return (
    <section id="video" className="py-14 lg:py-24 bg-card/30">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div ref={ref} data-reveal className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center">
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

          {/* Right — vertical video with glow */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-[260px] sm:w-[300px] lg:w-[340px]">
              {/* Blue glow */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                <div className="w-[90%] h-[90%] bg-primary/15 rounded-full blur-[80px] lg:blur-[100px]" />
              </div>

              <div className="relative rounded-2xl border border-border/50 bg-card/60 overflow-hidden shadow-lg hover-lift" style={{ aspectRatio: "9/16" }}>
                <video
                  ref={videoRef}
                  src="/videos/bruno-apresentacao.mp4"
                  muted={muted}
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                  title="Vídeo de apresentação — Bruno Severino Rocha"
                />

                {/* Tap to play overlay */}
                {needsTap && (
                  <button
                    onClick={handleTap}
                    className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-sm z-10"
                    aria-label="Toque para reproduzir"
                  >
                    <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-lg">
                      <Play size={24} className="text-primary-foreground ml-0.5" />
                    </div>
                  </button>
                )}

                {/* Mute/unmute toggle */}
                <button
                  onClick={() => setMuted((m) => !m)}
                  className="absolute bottom-3 right-3 z-20 w-11 h-11 rounded-full bg-background/60 backdrop-blur-sm border border-border/50 flex items-center justify-center text-foreground transition-colors hover:bg-background/80"
                  aria-label={muted ? "Ativar som" : "Silenciar"}
                >
                  {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
