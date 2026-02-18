export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  content: string;
}

export const posts: Post[] = [
  {
    slug: "o-que-e-psicanálise",
    title: "O que é psicanálise e como ela pode te ajudar",
    date: "2024-11-10",
    excerpt: "A psicanálise é muito mais do que um divã. Entenda o que acontece no processo clínico e por que falar transforma.",
    category: "Psicanálise",
    content: `A psicanálise surgiu com Freud no final do século XIX e, desde então, evoluiu como uma das abordagens psicológicas mais profundas para compreender o ser humano.

## O que acontece em uma sessão?

Diferente de uma consulta médica, a sessão psicanalítica é um espaço de fala livre. Você fala sobre o que quiser — sonhos, memórias, angústias, relações. O psicólogo escuta com atenção, sem julgamentos, e oferece reflexões que ajudam a iluminar aspectos que nem sempre percebemos conscientemente.

## O papel do inconsciente

Boa parte do que nos move — nossas escolhas, reações e padrões — vem de processos inconscientes. A psicanálise trabalha justamente nessa camada: não para "consertar" você, mas para ampliar sua compreensão sobre si mesmo.

## Para quem é indicada?

A psicanálise pode ajudar pessoas que enfrentam:

- Ansiedade e dificuldades emocionais
- Crises de identidade ou relações difíceis
- Sintomas como insônia, bloqueios ou tristeza persistente
- Quem simplesmente busca autoconhecimento

## Um processo de tempo

O processo psicanalítico não tem prazo fixo. É um caminho que respeita o seu ritmo e a singularidade da sua história. Com o tempo, é comum perceber mudanças sutis e significativas na forma de viver e de se relacionar.

---

Se ficou curioso, o primeiro passo pode ser simples: uma conversa.`,
  },
  {
    slug: "ansiedade-e-o-corpo",
    title: "Ansiedade: quando o corpo fala o que a mente cala",
    date: "2024-12-05",
    excerpt: "Taquicardia, aperto no peito, dificuldade de respirar. O corpo tem uma linguagem própria — e vale a pena escutá-lo.",
    category: "Emoções",
    content: `A ansiedade é uma das queixas mais comuns nos consultórios hoje. Mas o que ela está tentando nos dizer?

## O corpo como mensageiro

Antes de qualquer pensamento consciente, o corpo já reagiu. O coração acelera, a respiração fica curta, os músculos tensionam. Esses sinais não são falhas do organismo — são mensagens de que algo precisa de atenção.

## Ansiedade não é fraqueza

Um equívoco comum é tratar a ansiedade como um problema de "cabeça fraca" ou falta de força de vontade. Na perspectiva psicanalítica, a ansiedade é um sinal: ela aponta para conflitos internos, medos inconscientes ou situações não elaboradas.

## O que podemos fazer?

Não existe uma fórmula. Mas algumas coisas ajudam:

- **Observar sem julgar**: perceber quando a ansiedade surge, em quais contextos, com quem.
- **Falar sobre isso**: colocar em palavras o que sentimos tem um efeito transformador.
- **Buscar escuta profissional**: um espaço seguro para investigar as raízes do que você sente.

## A diferença entre tratar o sintoma e entender a causa

Muitos tratamentos focam em reduzir o sintoma ansioso — o que pode ser necessário e válido. A psicanálise vai além: busca compreender o que esse sintoma expressa, o que ele protege, o que ele pede.

---

Se você sente que a ansiedade está ocupando espaço demais na sua vida, pode ser hora de conversar sobre isso.`,
  },
  {
    slug: "autoconhecimento-como-processo",
    title: "Autoconhecimento não é destino, é caminho",
    date: "2025-01-20",
    excerpt: "Nos enganamos ao pensar que existe um ponto de chegada no autoconhecimento. O que existe é um processo contínuo — e isso é libertador.",
    category: "Autoconhecimento",
    content: `Existe uma crença cultural de que o autoconhecimento é algo que se completa — como se um dia você acordasse e soubesse tudo sobre si mesmo. Mas a experiência clínica mostra algo diferente.

## Conhecer-se é um verbo, não um substantivo

Não chegamos a um ponto fixo onde "nos conhecemos de vez". Somos seres em constante transformação. O que pensamos sobre nós mesmos hoje pode ser completamente diferente daquilo que descobrimos amanhã — e tudo bem.

## O papel das crises

Paradoxalmente, as crises são momentos privilegiados de autoconhecimento. Quando algo desmorona — um relacionamento, um emprego, uma certeza — somos convocados a nos olhar de um ângulo novo. Esse desconforto, embora difícil, carrega potencial de crescimento.

## O que a psicanálise entende por autoconhecimento

Na perspectiva psicanalítica, conhecer-se envolve entrar em contato com aspectos de si que normalmente evitamos: medos, desejos contraditórios, memórias esquecidas, padrões repetitivos. Não para eliminá-los, mas para integrá-los.

## Por que isso é libertador?

Quando paramos de buscar um "eu definitivo" e aceitamos a fluidez da nossa identidade, algo relaxa. Nos tornamos mais compassivos conosco. Mais capazes de mudar o que queremos mudar — e aceitar o que não podemos.

---

O processo psicanalítico é, em sua essência, um convite ao autoconhecimento. Sem pressa. Sem julgamentos. No seu ritmo.`,
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });
}
