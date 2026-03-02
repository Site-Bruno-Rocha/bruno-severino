import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import CTAButton from "@/components/CTAButton";
import WhatsAppButton from "@/components/WhatsAppButton";
import BlogCard from "@/components/BlogCard";
import BlogModal from "@/components/BlogModal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { EMAIL_PLACEHOLDER, WHATSAPP_URL, CRP, INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/config";
import { posts as staticPosts, type Post } from "@/data/posts";
import { fetchPublishedPosts, type DbPost } from "@/hooks/usePosts";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";
import {
  Clock, Home, MapPin, Monitor, ShieldCheck, Mail, MessageCircle,
  Users, BookOpen, Brain, Briefcase, Scale, ClipboardCheck, Stethoscope, HeartHandshake,
} from "lucide-react";

import HeroSection from "@/components/sections/HeroSection";
import AvaliacoesSection from "@/components/sections/AvaliacoesSection";
import VideoSection from "@/components/sections/VideoSection";

/* ── SOBRE MIM ── */
const stats = [
  { icon: <Users size={20} />, label: "Pacientes atendidos", value: "+200" },
  { icon: <BookOpen size={20} />, label: "Horas de estudo", value: "+5.000" },
];

const SobreSection = () => {
  const textRef = useScrollReveal();
  const statsRef = useStaggerReveal();

  return (
    <section id="sobre" className="py-14 lg:py-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-16 items-start">
          <div ref={textRef} data-reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-5">Sobre Mim</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
              Bruno Severino Rocha
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Sou psicólogo formado em 2020, com atuação clínica desde 2021 pela abordagem psicanalítica. Meu trabalho é orientado pela escuta qualificada, pelo respeito à singularidade de cada pessoa e pelo compromisso ético com o cuidado em saúde mental.
              </p>
              <p>
                Na psicoterapia, ofereço um espaço de fala e reflexão que possibilita a compreensão de conflitos emocionais, angústias e padrões de repetição, promovendo autoconhecimento e mudanças consistentes. Possuo experiência no atendimento de ansiedade, borderline, depressão, esquizofrenia e outras demandas emocionais.
              </p>
              <p>
                Além da clínica, realizo avaliações psicológicas com rigor técnico, incluindo orientação vocacional e elaboração de laudos para cirurgia bariátrica, vasectomia e laqueadura. Também atuo como psicólogo perito judicial e assistente técnico, desenvolvendo avaliações e documentos técnicos no contexto jurídico, sempre com imparcialidade, precisão e alinhamento às normativas do Conselho Federal de Psicologia.
              </p>
            </div>
            <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4">
              <p className="text-sm text-foreground/90 leading-relaxed">
                <strong className="text-primary">Compromisso:</strong> Oferecer um atendimento ético, responsável e individualizado, em um ambiente seguro e confidencial.
              </p>
            </div>
            <p className="text-xs text-muted-foreground/60 mt-6">CRP: {CRP}</p>
          </div>
          <div ref={statsRef} className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div key={s.label} data-reveal-child className="rounded-2xl border border-border/50 bg-card/50 p-6 text-center hover-lift">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 text-primary transition-transform duration-200 group-hover:scale-110">
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
};

/* ── SERVIÇOS OFERECIDOS ── */
const servicos = [
  {
    icon: <Brain size={20} />,
    title: "Psicoterapia Individual",
    desc: "Um processo terapêutico que visa ajudar você a compreender seus sentimentos, pensamentos e comportamentos, bem como a lidar com seus desafios pessoais. A psicoterapia individual pode ajudar a tratar questões como ansiedade, depressão, estresse, baixa autoestima e dificuldades de relacionamento.",
  },
  {
    icon: <Briefcase size={20} />,
    title: "Orientação Vocacional e de Carreira",
    desc: "Serviço destinado a auxiliar na exploração e escolha de carreiras alinhadas com seus interesses, habilidades e valores. Através de avaliações e sessões personalizadas, oriento na tomada de decisões educacionais e profissionais significativas.",
  },
  {
    icon: <Stethoscope size={20} />,
    title: "Avaliação Psicológica Para Cirurgia Bariátrica",
    desc: "Análise das condições emocionais do paciente, compreensão sobre o procedimento, expectativas em relação aos resultados e preparação para as mudanças no pós-operatório. Ao final, é emitido laudo psicológico conforme as normas do CFP.",
  },
  {
    icon: <ClipboardCheck size={20} />,
    title: "Avaliação Psicológica Para Laqueadura e Vasectomia",
    desc: "Avaliação da maturidade emocional, entendimento sobre o caráter definitivo do procedimento e aspectos psicológicos envolvidos na decisão pela esterilização cirúrgica. Documento emitido conforme as normas do CFP.",
  },
  {
    icon: <HeartHandshake size={20} />,
    title: "Assistente Técnico Judicial",
    desc: "Representação de uma das partes do processo judicial, com análise do laudo pericial, elaboração de parecer técnico, formulação de quesitos e contribuição para o esclarecimento de aspectos psicológicos relevantes ao caso.",
  },
  {
    icon: <Scale size={20} />,
    title: "Perícia Psicológica Judicial",
    desc: "Avaliação psicológica determinada pelo juízo, envolvendo entrevistas, análise técnica e utilização de instrumentos psicológicos apropriados. Resulta em laudo pericial fundamentado e imparcial, destinado a subsidiar decisões judiciais.",
  },
];

const ServicosSection = () => {
  const ref = useScrollReveal();
  return (
    <section id="servicos" className="py-14 lg:py-24 bg-card/30">
      <div className="max-w-6xl mx-auto px-5 sm:px-6" ref={ref} data-reveal>
        <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-5">Serviços Oferecidos</p>
        <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4 text-balance">
          Como posso ajudar
        </h2>
        <p className="text-muted-foreground mb-8 lg:mb-12 max-w-lg">
          Conheça os serviços que ofereço, sempre com ética, responsabilidade e alinhamento às normativas profissionais.
        </p>
        <Accordion type="single" collapsible className="space-y-2 max-w-3xl accordion-mobile-center">
          {servicos.map((s, i) => (
            <AccordionItem key={i} value={`servico-${i}`} className="border border-border/50 rounded-xl px-5 bg-card/50 hover-lift">
              <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline py-4">
                <span className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 transition-transform duration-200 hover:scale-110">
                    {s.icon}
                  </span>
                  {s.title}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-4 leading-relaxed pl-11 md:pl-11">
                {s.desc}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

/* ── ABORDAGEM ── */
const AbordagemSection = () => {
  const ref = useScrollReveal();
  return (
    <section id="abordagem" className="py-14 lg:py-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="max-w-2xl mx-auto" ref={ref} data-reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-5">Abordagem</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
            Psicanálise
          </h2>

          <div className="space-y-8 mb-10">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Como funciona a psicanálise?</h3>
              <p className="text-muted-foreground leading-relaxed">
                A psicanálise investiga a mente humana e o inconsciente. A partir da fala e da escuta, buscamos compreender a origem das angústias e padrões que se repetem na vida. É um espaço de acolhimento e reflexão — sem julgamentos, sem respostas prontas, com sigilo rigorosamente respeitado. O processo respeita seu ritmo e a singularidade de sua história.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Qual a diferença entre psicoterapia e psicanálise?</h3>
              <p className="text-muted-foreground leading-relaxed">
                A psicoterapia é um termo amplo que abrange diversas abordagens. A psicanálise é uma dessas, focada em compreender o inconsciente, os padrões de comportamento e as raízes emocionais de cada questão, num processo que respeita o tempo do paciente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── ATENDIMENTO ── */
const beneficios = [
  { icon: <Clock size={20} />, title: "Flexibilidade de horários", desc: "Sessões que se encaixam na sua rotina, sem deslocamento." },
  { icon: <Home size={20} />, title: "Conforto da sua casa", desc: "Atenda do ambiente em que você se sente mais à vontade." },
  { icon: <MapPin size={20} />, title: "Acessibilidade", desc: "Sem barreiras geográficas. De qualquer lugar do Brasil." },
];

const AtendimentoSection = () => {
  const ref = useScrollReveal();
  const cardsRef = useStaggerReveal();
  return (
    <section id="atendimento" className="py-14 lg:py-24 bg-card/30">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div ref={ref} data-reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-5">Atendimento</p>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Atendimento online, presença real.
          </h2>
          <p className="text-muted-foreground mb-8 lg:mb-12 max-w-lg">Online · Seg–Sáb · Somente com hora marcada</p>
        </div>
        <div ref={cardsRef} className="grid sm:grid-cols-3 gap-4 sm:gap-5">
          {beneficios.map((b) => (
            <div key={b.title} data-reveal-child className="rounded-2xl border border-border/50 bg-card/50 p-6 hover-lift">
              <div className="mb-4 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary transition-transform duration-200 hover:scale-110">
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
};

/* ── helpers ── */
function dbPostToPost(db: DbPost): Post {
  return {
    slug: db.slug,
    title: db.title,
    date: db.created_at.slice(0, 10),
    excerpt: db.excerpt,
    category: db.category,
    content: db.content,
  };
}

/* ── BLOG PREVIEW ── */
const BlogPreviewSection = ({ onSelectPost }: { onSelectPost: (post: Post) => void }) => {
  const [displayPosts, setDisplayPosts] = useState<Post[]>(staticPosts.slice(0, 3));
  const ref = useScrollReveal();
  const cardsRef = useStaggerReveal();

  useEffect(() => {
    fetchPublishedPosts()
      .then((dbPosts) => {
        if (dbPosts.length > 0) {
          setDisplayPosts(dbPosts.slice(0, 3).map(dbPostToPost));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="blog" className="py-14 lg:py-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div ref={ref} data-reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-5">Blog</p>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Reflexões sobre saúde mental
          </h2>
          <p className="text-muted-foreground mb-8 lg:mb-12 max-w-lg">Textos curtos sobre psicanálise, emoções e autoconhecimento.</p>
        </div>
        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {displayPosts.map((post) => (
            <div key={post.slug} data-reveal-child>
              <BlogCard post={post} onClick={() => onSelectPost(post)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── DÚVIDAS FREQUENTES ── */
const faqItems = [
  {
    q: "Como funcionam as sessões?",
    a: "As sessões são feitas semanalmente com duração de 50 minutos no formato online utilizando a plataforma do Google Meet. Para uma boa experiência é importante que você disponha de uma conexão de internet estável e esteja em um local isolado para garantir privacidade e segurança. Recomendamos a utilização de fones de ouvido.",
  },
  {
    q: "Quanto tempo dura o tratamento?",
    a: "O tratamento é personalizado de acordo com as demandas de cada paciente. Sendo assim, não existe um prazo determinado para o fim.",
  },
  {
    q: "Terapia online funciona?",
    a: "Sim. Para muitas pessoas, o online funciona muito bem — inclusive por reduzir deslocamento e facilitar a consistência. O que mais importa é um ambiente minimamente reservado e uma boa conexão.",
  },
  {
    q: "Terapia é só para quem está em crise?",
    a: "Não. Muitas pessoas procuram terapia para prevenção, autoconhecimento, melhora de relacionamentos e para tomar decisões importantes com mais clareza. Você não precisa \"estar no limite\" para começar.",
  },
  {
    q: "A partir de qual idade você atende?",
    a: "A partir dos 15 anos. A adolescência é um período de muitas mudanças e a terapia pode ser uma ferramenta valiosa. Quando menor de 18 anos, é necessário que pelo menos um dos pais ou responsáveis esteja ciente e autorize o início do tratamento. Também atendo adultos de todas as idades.",
  },
  {
    q: "Faz atendimento por convênio?",
    a: "Atendo todos os convênios por meio de reembolso. O paciente paga as sessões e recebe um recibo para enviar ao convênio. É um direito legal seu escolher o profissional que irá atendê-lo. Para descobrir o valor que seu convênio reembolsa, entre em contato com a central do seu convênio.",
  },
  {
    q: "Qual o valor das sessões e as formas de pagamento?",
    a: "Por norma do Conselho Regional de Psicologia, não é permitido divulgar valores publicamente. Para saber o valor da sessão, entre em contato diretamente comigo. Trabalho com pagamento por sessão ou mensal, via Pix ou transferência bancária. É emitido recibo que pode ser usado para deduções no imposto de renda e reembolso no convênio.",
  },
];

const FAQSection = () => {
  const ref = useScrollReveal();
  return (
    <section id="faq" className="py-14 lg:py-24 bg-card/30">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="max-w-3xl mx-auto" ref={ref} data-reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-5">Dúvidas Frequentes</p>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-8 text-balance">
            Perguntas frequentes
          </h2>
          <Accordion type="single" collapsible className="space-y-2 accordion-mobile-center">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border/50 rounded-xl px-5 bg-card/50 hover-lift">
                <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline py-4">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-4 leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

/* ── AGENDAR ── */
const AgendarSection = () => {
  const ref = useScrollReveal();
  return (
    <section id="agendar" className="py-14 lg:py-24">
      <div className="max-w-4xl mx-auto px-5 sm:px-6 text-center" ref={ref} data-reveal>
        <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-5">Agendamento</p>
        <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3 text-balance">
          Agende sua sessão
        </h2>
        <p className="text-muted-foreground text-base leading-relaxed mb-10 max-w-lg mx-auto">
          Para agendar, fale comigo diretamente pelo WhatsApp. Respondo com as opções de horários disponíveis.
        </p>

        <div className="mb-10">
          <WhatsAppButton variant="primary" size="lg" label="Agendar pelo WhatsApp" />
        </div>

        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground justify-center">
          <span className="flex items-center gap-2"><Monitor size={15} className="text-primary" /> Online</span>
          <span className="flex items-center gap-2"><Clock size={15} className="text-primary" /> Seg–Sáb</span>
          <span className="flex items-center gap-2"><ShieldCheck size={15} className="text-primary" /> Hora marcada</span>
        </div>
      </div>
    </section>
  );
};

/* ── CONTATO ── */
const ContatoSection = () => {
  const ref = useScrollReveal();
  return (
    <section id="contato" className="py-14 lg:py-24 bg-card/30">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="max-w-lg" ref={ref} data-reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-5">Contato</p>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-8 text-balance">
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
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary shrink-0"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              {INSTAGRAM_HANDLE}
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
};

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
        <ServicosSection />
        <AbordagemSection />
        <AtendimentoSection />
        <AvaliacoesSection />
        <VideoSection />
        <BlogPreviewSection onSelectPost={setSelectedPost} />
        <FAQSection />
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
