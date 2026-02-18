
## Site para Bruno Severino Rocha — Psicólogo

Um site minimalista, calmo e focado em conversão para agendamento.

---

### 🎨 Identidade Visual
- **Paleta:** Off-white de fundo, sálvia/azul acinzentado suave para elementos, um verde-sálvia discreto como cor de destaque para CTAs
- **Tipografia:** Inter (sans-serif legível), títulos moderados, corpo confortável (16–18px)
- **Estilo:** Muito espaço em branco, bordas arredondadas suaves, sombras quase imperceptíveis, microanimações sutis no hover
- **Elementos gráficos:** Formas orgânicas abstratas suaves (SVG) no hero — sem fotos

---

### 🏗️ Estrutura de Componentes
- `Header` fixo com logo + menu + botão CTA
- `Footer` com CRP placeholder, horários e direitos
- `CTAButton` reutilizável (primário e secundário)
- `BlogCard` para listagem de posts
- `WhatsAppButton` com mensagem pronta pré-configurada

---

### 📄 Página 1 — `/` (Sobre + Contato)
5 blocos curtos:
1. **Hero** — Título, subtítulo, 2 CTAs (Agendar + WhatsApp)
2. **Bio** — Formação 2020, atendimento desde 2021, laudos, experiências clínicas
3. **Como eu trabalho** — Psicanálise em 4–6 linhas acolhedoras
4. **Benefícios do online** — 3 cards: Flexibilidade, Conforto, Acessibilidade
5. **Contato** — WhatsApp principal + e-mail placeholder + horários + aviso discreto

---

### 📄 Página 2 — `/blog`
- Listagem com busca simples, cards (título, data, resumo, categoria)
- Página individual do post (`/blog/:slug`): tipografia confortável, sem sidebar, CTA ao final
- Posts em Markdown com frontmatter (`title`, `date`, `excerpt`, `category`)
- 2–3 posts de exemplo já escritos (psicanálise, ansiedade, autoconhecimento)
- Arquivo `COMO_POSTAR.md` com instruções claras para adicionar novos posts

---

### 📄 Página 3 — `/agendar`
- Cabeçalho curto e acolhedor
- Iframe do Google Agenda com constante configurável (`GOOGLE_APPOINTMENT_EMBED_URL`) — placeholder elegante até o link ser inserido
- Fallback discreto: card "Agendamento em configuração — agende pelo WhatsApp" quando URL não configurada
- Botão "Abrir em nova aba" como alternativa
- 3 regras rápidas (atendimento online, horários, sigilo)

---

### ⚙️ Qualidade & Técnico
- SEO básico por página (title + description em PT-BR)
- Mobile-first impecável
- Acessibilidade (labels, foco visível, contraste adequado, alt text)
- Skeleton discreto enquanto iframe carrega
- Performance leve — sem bibliotecas pesadas de animação
