import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTAButton from "@/components/CTAButton";
import WhatsAppButton from "@/components/WhatsAppButton";
import { EMAIL_PLACEHOLDER, WHATSAPP_URL } from "@/config";
import { Wifi, Home, MapPin, Clock, Mail, MessageCircle } from "lucide-react";

// Forma orgânica SVG sutil para o hero
const HeroShape = () => (
  <svg
    viewBox="0 0 500 500"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute right-0 top-0 w-80 h-80 md:w-[460px] md:h-[460px] opacity-[0.07] pointer-events-none select-none"
    aria-hidden="true"
  >
    <path
      d="M 250 50 C 350 50, 440 130, 450 240 C 460 360, 380 450, 250 450 C 120 450, 40 360, 50 240 C 60 120, 150 50, 250 50 Z"
      fill="hsl(145, 28%, 42%)"
    />
  </svg>
);

const SecondShape = () => (
  <svg
    viewBox="0 0 400 400"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute -left-16 bottom-0 w-56 h-56 opacity-[0.05] pointer-events-none select-none"
    aria-hidden="true"
  >
    <ellipse cx="200" cy="200" rx="180" ry="140" fill="hsl(210, 20%, 70%)" transform="rotate(-30 200 200)" />
  </svg>
);

const beneficios = [
  {
    icon: <Clock size={20} className="text-primary" />,
    title: "Flexibilidade de horários",
    desc: "Sessões que se encaixam na sua rotina, sem deslocamento.",
  },
  {
    icon: <Home size={20} className="text-primary" />,
    title: "Conforto da sua casa",
    desc: "Atenda do ambiente em que você se sente mais à vontade.",
  },
  {
    icon: <MapPin size={20} className="text-primary" />,
    title: "Acessibilidade e praticidade",
    desc: "Sem barreiras geográficas. De qualquer lugar do Brasil.",
  },
];

const Index = () => {
  useEffect(() => {
    document.title = "Bruno Severino | Psicólogo Online — Psicanálise";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Psicólogo online pela abordagem psicanalítica. Atendimento clínico com escuta e acolhimento. Agende sua sessão."
      );
    } else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content =
        "Psicólogo online pela abordagem psicanalítica. Atendimento clínico com escuta e acolhimento. Agende sua sessão.";
      document.head.appendChild(m);
    }
  }, []);

  return (
    <>
      <Header />
      <main>
        {/* ── 1. HERO ── */}
        <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
          <HeroShape />
          <SecondShape />
          <div className="max-w-5xl mx-auto px-6 relative">
            <p className="text-xs uppercase tracking-widest text-primary font-medium mb-6">
              Psicologia online · Psicanálise
            </p>
            <h1 className="text-3xl md:text-5xl font-medium text-foreground max-w-xl text-balance mb-5 leading-tight">
              Psicologia online com escuta e acolhimento.
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-md mb-10 leading-relaxed">
              Atendimento clínico pela vertente psicanalítica.
              Sigilo e respeito ao seu tempo.
            </p>
            <div className="flex flex-wrap gap-3">
              <CTAButton to="/agendar" size="lg" showArrow>
                Agendar sessão
              </CTAButton>
              <WhatsAppButton size="lg" />
            </div>
          </div>
        </section>

        {/* ── 2. BIO ── */}
        <section className="py-20 bg-secondary/30" aria-labelledby="bio-title">
          <div className="max-w-5xl mx-auto px-6">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-widest text-primary font-medium mb-5">Sobre</p>
              <h2 id="bio-title" className="text-2xl md:text-3xl font-medium text-foreground mb-6 text-balance">
                Bruno Severino Rocha
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Sou psicólogo formado em 2020. Atendo clinicamente desde 2021 pela abordagem psicanalítica, com foco em escuta individualizada e atenção à singularidade de cada pessoa.
                </p>
                <p>
                  Tenho experiência no atendimento de ansiedade, depressão, esquizofrenia e outras demandas emocionais.
                </p>
                <p className="text-sm">
                  Também emito laudos psicológicos para procedimentos de bariátrica e vasectomia.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. COMO TRABALHO ── */}
        <section className="py-20" aria-labelledby="metodo-title">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xs uppercase tracking-widest text-primary font-medium mb-5">Abordagem</p>
                <h2 id="metodo-title" className="text-2xl md:text-3xl font-medium text-foreground mb-6 text-balance">
                  Como eu trabalho
                </h2>
              </div>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <p>
                  A psicanálise investiga a mente humana e o inconsciente. A partir da fala e da escuta, buscamos compreender a origem de angústias e padrões que se repetem na vida.
                </p>
                <p>
                  É um espaço de acolhimento e reflexão — sem julgamentos, sem respostas prontas, com sigilo rigorosamente respeitado.
                </p>
                <p>
                  Não há prazo fixo nem fórmulas. O processo respeita o seu ritmo e a singularidade da sua história.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. BENEFÍCIOS DO ONLINE ── */}
        <section className="py-20 bg-secondary/30" aria-labelledby="beneficios-title">
          <div className="max-w-5xl mx-auto px-6">
            <p className="text-xs uppercase tracking-widest text-primary font-medium mb-5">Por que online?</p>
            <h2 id="beneficios-title" className="text-2xl md:text-3xl font-medium text-foreground mb-10 text-balance">
              Atendimento à distância, presença real.
            </h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {beneficios.map((b) => (
                <div
                  key={b.title}
                  className="bg-card rounded-2xl p-6 border border-border hover:shadow-md transition-shadow duration-200"
                >
                  <div className="mb-4 w-9 h-9 rounded-xl bg-accent/70 flex items-center justify-center">
                    {b.icon}
                  </div>
                  <h3 className="font-medium text-foreground text-sm mb-2">{b.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. CONTATO ── */}
        <section className="py-20" aria-labelledby="contato-title">
          <div className="max-w-5xl mx-auto px-6">
            <div className="max-w-lg">
              <p className="text-xs uppercase tracking-widest text-primary font-medium mb-5">Contato</p>
              <h2 id="contato-title" className="text-2xl md:text-3xl font-medium text-foreground mb-8 text-balance">
                Vamos conversar?
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Wifi size={15} className="text-primary shrink-0" />
                  <span>Atendimento 100% online</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Clock size={15} className="text-primary shrink-0" />
                  <span>Segunda a sábado · Somente com hora marcada</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Mail size={15} className="text-primary shrink-0 mt-0.5" />
                  <a
                    href={`mailto:${EMAIL_PLACEHOLDER}`}
                    className="hover:text-foreground transition-colors underline underline-offset-2"
                  >
                    {EMAIL_PLACEHOLDER}
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                <CTAButton to="/agendar" showArrow>
                  Agendar sessão
                </CTAButton>
                <WhatsAppButton />
              </div>

              <p className="text-xs text-muted-foreground/70 max-w-sm leading-relaxed">
                Se preferir, escreva apenas o essencial. Detalhes podem ser conversados em sessão.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;
