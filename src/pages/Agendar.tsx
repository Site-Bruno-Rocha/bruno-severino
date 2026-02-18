import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Skeleton } from "@/components/ui/skeleton";
import { GOOGLE_APPOINTMENT_EMBED_URL, GOOGLE_APPOINTMENT_DIRECT_URL } from "@/config";
import { ExternalLink, Monitor, Clock, ShieldCheck, MessageCircle } from "lucide-react";

const regras = [
  {
    icon: <Monitor size={18} className="text-primary shrink-0 mt-0.5" />,
    text: "Atendimento 100% online, pela plataforma de sua preferência.",
  },
  {
    icon: <Clock size={18} className="text-primary shrink-0 mt-0.5" />,
    text: "Segunda a sábado, somente com hora marcada.",
  },
  {
    icon: <ShieldCheck size={18} className="text-primary shrink-0 mt-0.5" />,
    text: "Sigilo e confidencialidade garantidos em todos os atendimentos.",
  },
];

const Agendar = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const hasEmbed = Boolean(GOOGLE_APPOINTMENT_EMBED_URL);

  useEffect(() => {
    document.title = "Agendar Sessão | Bruno Severino — Psicólogo Online";
    const meta = document.querySelector('meta[name="description"]');
    const desc = "Agende sua sessão online com o psicólogo Bruno Severino Rocha. Escolha um horário disponível diretamente pela agenda.";
    if (meta) meta.setAttribute("content", desc);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = desc;
      document.head.appendChild(m);
    }
  }, []);

  return (
    <>
      <Header />
      <main className="pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Cabeçalho */}
          <div className="max-w-lg mb-12">
            <p className="text-xs uppercase tracking-widest text-primary font-medium mb-4">Agendamento</p>
            <h1 className="text-3xl md:text-4xl font-medium text-foreground mb-3 text-balance">
              Agende sua sessão online
            </h1>
            <p className="text-muted-foreground text-base leading-relaxed">
              Escolha um horário disponível e finalize o agendamento diretamente pela agenda.
            </p>
          </div>

          {/* Área do embed */}
          {hasEmbed ? (
            <div className="mb-10">
              {/* Skeleton enquanto carrega */}
              {!iframeLoaded && (
                <div className="rounded-2xl border border-border overflow-hidden" aria-label="Carregando agenda...">
                  <Skeleton className="w-full h-[600px] md:h-[700px] rounded-2xl" />
                </div>
              )}

              <div
                className={`rounded-2xl border border-border overflow-hidden transition-opacity duration-300 ${
                  iframeLoaded ? "opacity-100" : "opacity-0 h-0"
                }`}
              >
                <iframe
                  src={GOOGLE_APPOINTMENT_EMBED_URL}
                  title="Agendamento online — Bruno Severino Rocha"
                  width="100%"
                  height="700"
                  className="block"
                  style={{ border: 0 }}
                  onLoad={() => setIframeLoaded(true)}
                  allowFullScreen
                />
              </div>

              {/* Abrir em nova aba */}
              {GOOGLE_APPOINTMENT_DIRECT_URL && (
                <div className="mt-4 text-center">
                  <a
                    href={GOOGLE_APPOINTMENT_DIRECT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                  >
                    <ExternalLink size={14} />
                    Abrir agendamento em nova aba
                  </a>
                </div>
              )}
            </div>
          ) : (
            /* Fallback elegante quando URL não configurada */
            <div className="mb-10 rounded-2xl border border-border bg-secondary/30 p-10 text-center max-w-lg mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-accent/70 flex items-center justify-center mx-auto mb-5">
                <Clock size={22} className="text-primary" />
              </div>
              <h2 className="font-medium text-foreground text-lg mb-2">
                Agendamento em configuração
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                A agenda online estará disponível em breve. Por enquanto, agende diretamente pelo WhatsApp.
              </p>
              <WhatsAppButton variant="primary" size="md" label="Agendar pelo WhatsApp" />
            </div>
          )}

          {/* Regras rápidas */}
          <div className="border-t border-border pt-10">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-6">
              Informações importantes
            </p>
            <ul className="space-y-4" aria-label="Regras do atendimento">
              {regras.map((r, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  {r.icon}
                  <span>{r.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Dúvidas — sempre visível */}
          <div className="mt-12 p-6 rounded-2xl bg-accent/30 border border-accent/50">
            <p className="text-sm text-foreground font-medium mb-1">Ficou com dúvidas?</p>
            <p className="text-sm text-muted-foreground mb-4">
              Escreva pelo WhatsApp — respondo o mais breve possível.
            </p>
            <WhatsAppButton size="sm" label="Enviar mensagem" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Agendar;
