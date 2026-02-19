import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import CTAButton from "@/components/CTAButton";
import WhatsAppButton from "@/components/WhatsAppButton";
import BlogCard from "@/components/BlogCard";
import BlogModal from "@/components/BlogModal";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { EMAIL_PLACEHOLDER, WHATSAPP_URL, GOOGLE_APPOINTMENT_EMBED_URL, GOOGLE_APPOINTMENT_DIRECT_URL, CRP } from "@/config";
import { posts, type Post } from "@/data/posts";
import {
  Clock, Home, MapPin, Monitor, ShieldCheck, Mail, MessageCircle, FileText, ExternalLink,
  GraduationCap, Users, BookOpen, Award,
} from "lucide-react";

/* ── HERO ── */
const HeroSection = () => (
  <section id="inicio" className="relative min-h-[90vh] flex items-center pt-28 pb-20">
    {/* Subtle glow */}
    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />
    <div className="max-w-6xl mx-auto px-6 relative">
      <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-6">
        Psicologia online · Psicanálise
      </p>
      <h1 className="text-4xl md:text-6xl font-bold text-foreground max-w-2xl text-balance mb-6 leading-[1.1]">
        Psicologia online com acolhimento e sigilo.
      </h1>
      <p className="text-muted-foreground text-lg md:text-xl max-w-lg mb-4 leading-relaxed">
        Atendimento clínico pela vertente psicanalítica.
      </p>
      <p className="text-sm text-muted-foreground/70 mb-10">
        Online · Seg–Sáb · Somente com hora marcada
      </p>
      <div className="flex flex-wrap gap-3">
        <CTAButton href="#agendar" size="lg" showArrow>
          Agendar sessão
        </CTAButton>
        <WhatsAppButton size="lg" />
      </div>
    </div>
  </section>
);

/* ── SOBRE ── */
const stats = [
  { icon: <GraduationCap size={20} />, label: "Formado em", value: "2020" },
  { icon: <Award size={20} />, label: "Atendendo desde", value: "2021" },
  { icon: <Users size={20} />, label: "Pacientes", value: "+200" },
  { icon: <BookOpen size={20} />, label: "Horas de estudo", value: "+5.000" },
];

const SobreSection = () => (
  <section id="sobre" className="py-24">
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-5">Sobre</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
            Bruno Severino Rocha
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>Psicólogo formado em 2020. Atendo clinicamente desde 2021 pela abordagem psicanalítica, com foco em escuta individualizada e atenção à singularidade de cada pessoa.</p>
            <p>Experiência no atendimento de ansiedade, depressão, esquizofrenia e outras demandas emocionais.</p>
          </div>
          <p className="text-xs text-muted-foreground/60 mt-6">CRP: {CRP}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border/50 bg-card/50 p-6 text-center">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 text-primary">
                {s.icon}
              </div>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ── COMO FUNCIONA ── */
const ComoFuncionaSection = () => (
  <section id="como-funciona" className="py-24 bg-card/30">
    <div className="max-w-6xl mx-auto px-6">
      <div className="max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-5">Abordagem</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
          Como funciona a psicanálise
        </h2>
        <div className="text-muted-foreground leading-relaxed space-y-4 mb-12">
          <p>A psicanálise investiga a mente humana e o inconsciente. A partir da fala e da escuta, buscamos compreender a origem de angústias e padrões que se repetem na vida.</p>
          <p>É um espaço de acolhimento e reflexão — sem julgamentos, sem respostas prontas, com sigilo rigorosamente respeitado. O processo respeita o seu ritmo e a singularidade da sua história.</p>
        </div>

        {/* Mini FAQ */}
        <Accordion type="single" collapsible className="space-y-2">
          <AccordionItem value="faq-1" className="border border-border/50 rounded-xl px-5 bg-card/50">
            <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline py-4">
              Qual a diferença entre psicoterapia e psicanálise?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground pb-4 leading-relaxed">
              Psicoterapia é um termo amplo que abrange várias abordagens. A psicanálise é uma delas — focada em compreender o inconsciente, os padrões de comportamento e as raízes emocionais de cada questão, num processo que respeita o tempo do paciente.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-2" className="border border-border/50 rounded-xl px-5 bg-card/50">
            <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline py-4">
              Como é uma sessão?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground pb-4 leading-relaxed">
              A sessão acontece online, por videochamada, com duração de aproximadamente 50 minutos. Você fala sobre o que quiser — pensamentos, sentimentos, situações do dia a dia. Eu escuto com atenção e, juntos, vamos construindo uma compreensão mais ampla sobre você.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  </section>
);

/* ── ATENDIMENTO ── */
const beneficios = [
  { icon: <Clock size={20} />, title: "Flexibilidade de horários", desc: "Sessões que se encaixam na sua rotina, sem deslocamento." },
  { icon: <Home size={20} />, title: "Conforto da sua casa", desc: "Atenda do ambiente em que você se sente mais à vontade." },
  { icon: <MapPin size={20} />, title: "Acessibilidade", desc: "Sem barreiras geográficas. De qualquer lugar do Brasil." },
];

const AtendimentoSection = () => (
  <section id="atendimento" className="py-24">
    <div className="max-w-6xl mx-auto px-6">
      <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-5">Atendimento</p>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
        Atendimento online, presença real.
      </h2>
      <p className="text-muted-foreground mb-12 max-w-lg">Online · Seg–Sáb · Somente com hora marcada</p>
      <div className="grid sm:grid-cols-3 gap-5">
        {beneficios.map((b) => (
          <div key={b.title} className="rounded-2xl border border-border/50 bg-card/50 p-6 hover:bg-card transition-colors duration-200">
            <div className="mb-4 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              {b.icon}
            </div>
            <h3 className="font-medium text-foreground text-sm mb-2">{b.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ── LAUDOS ── */
const LaudosSection = () => (
  <section id="laudos" className="py-16 bg-card/30">
    <div className="max-w-6xl mx-auto px-6">
      <div className="flex items-start gap-5 max-w-2xl">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-1">
          <FileText size={20} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-2">Emissão de laudos psicológicos</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Laudos para procedimentos de bariátrica e vasectomia, conforme critérios e avaliação individual.
          </p>
        </div>
      </div>
    </div>
  </section>
);

/* ── BLOG PREVIEW ── */
const BlogPreviewSection = ({ onSelectPost }: { onSelectPost: (post: Post) => void }) => (
  <section id="blog" className="py-24">
    <div className="max-w-6xl mx-auto px-6">
      <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-5">Blog</p>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
        Reflexões sobre saúde mental
      </h2>
      <p className="text-muted-foreground mb-12 max-w-lg">Textos curtos sobre psicanálise, emoções e autoconhecimento.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.slice(0, 3).map((post) => (
          <BlogCard key={post.slug} post={post} onClick={() => onSelectPost(post)} />
        ))}
      </div>
    </div>
  </section>
);

/* ── AGENDAR ── */
const AgendarSection = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const hasEmbed = Boolean(GOOGLE_APPOINTMENT_EMBED_URL);

  return (
    <section id="agendar" className="py-24 bg-card/30">
      <div className="max-w-4xl mx-auto px-6">
        <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-5">Agendamento</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-balance">
          Agende sua sessão online
        </h2>
        <p className="text-muted-foreground text-base leading-relaxed mb-10 max-w-lg">
          Escolha um horário disponível e finalize o agendamento.
        </p>

        {hasEmbed ? (
          <div className="mb-10">
            {!iframeLoaded && <Skeleton className="w-full h-[600px] md:h-[700px] rounded-2xl" />}
            <div className={`rounded-2xl border border-border/50 overflow-hidden transition-opacity duration-300 ${iframeLoaded ? "opacity-100" : "opacity-0 h-0"}`}>
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
            {GOOGLE_APPOINTMENT_DIRECT_URL && (
              <div className="mt-4 text-center">
                <a href={GOOGLE_APPOINTMENT_DIRECT_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2">
                  <ExternalLink size={14} />
                  Abrir agendamento em nova aba
                </a>
              </div>
            )}
          </div>
        ) : (
          <div className="mb-10 rounded-2xl border border-border/50 bg-card/50 p-10 text-center max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 text-primary">
              <Clock size={22} />
            </div>
            <h3 className="font-medium text-foreground text-lg mb-2">Agendamento em configuração</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              A agenda online estará disponível em breve. Por enquanto, agende diretamente pelo WhatsApp.
            </p>
            <WhatsAppButton variant="primary" size="md" label="Agendar pelo WhatsApp" />
          </div>
        )}

        {/* Regras */}
        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground justify-center">
          <span className="flex items-center gap-2"><Monitor size={15} className="text-primary" /> Atendimento 100% online</span>
          <span className="flex items-center gap-2"><Clock size={15} className="text-primary" /> Seg–Sáb, hora marcada</span>
          <span className="flex items-center gap-2"><ShieldCheck size={15} className="text-primary" /> Sigilo garantido</span>
        </div>
      </div>
    </section>
  );
};

/* ── CONTATO ── */
const ContatoSection = () => (
  <section id="contato" className="py-24">
    <div className="max-w-6xl mx-auto px-6">
      <div className="max-w-lg">
        <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-5">Contato</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-balance">
          Vamos conversar?
        </h2>

        <div className="space-y-4 mb-8">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <MessageCircle size={16} className="text-primary shrink-0" />
            WhatsApp
          </a>
          <a href={`mailto:${EMAIL_PLACEHOLDER}`} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Mail size={16} className="text-primary shrink-0" />
            {EMAIL_PLACEHOLDER}
          </a>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Clock size={16} className="text-primary shrink-0" />
            Segunda a sábado · Somente com hora marcada
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <CTAButton href="#agendar" showArrow>
            Agendar sessão
          </CTAButton>
          <WhatsAppButton />
        </div>

        <p className="text-xs text-muted-foreground/50 max-w-sm leading-relaxed">
          Se preferir, escreva apenas o essencial. Detalhes podem ser conversados em sessão.
        </p>
      </div>
    </div>
  </section>
);

/* ── PAGE ── */
const Index = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    document.title = "Bruno Severino Rocha | Psicólogo Online — Psicanálise";
    const meta = document.querySelector('meta[name="description"]');
    const desc = "Psicólogo online pela abordagem psicanalítica. Atendimento clínico com escuta e acolhimento. Agende sua sessão.";
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
      <main>
        <HeroSection />
        <SobreSection />
        <ComoFuncionaSection />
        <AtendimentoSection />
        <LaudosSection />
        <BlogPreviewSection onSelectPost={setSelectedPost} />
        <AgendarSection />
        <ContatoSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <BlogModal post={selectedPost} open={!!selectedPost} onClose={() => setSelectedPost(null)} />
    </>
  );
};

export default Index;
