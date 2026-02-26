

## Plano: Logo maior, Favicon, Menu escuro, Hero mobile e Credito

### Resumo
Substituir logos por versoes maiores, corrigir favicon, escurecer menu mobile, reordenar Hero no mobile e adicionar credito no footer.

---

### 1. Assets -- Copiar logos maiores

- Copiar `Logo_-_Bruno_Rocha_Branco_-_s_fundo_Grande.png` para `public/images/logo-bruno-rocha.png` (substitui o atual)
- Copiar `Logo_-_BR_Branco_-_s_fundo_Grande.png` para `public/images/logo-br.png` (substitui o atual)
- Copiar `Logo_-_BR_Branco_-_s_fundo_Grande.png` para `public/favicon.png` (substitui o atual)

O `index.html` ja aponta para `/favicon.png`, entao basta substituir o arquivo.

---

### 2. Header -- Logo maior (`src/components/Header.tsx`)

Aumentar as classes de altura do logo:

- **Desktop** (logo completo): de `h-9`/`h-11` para `h-12`/`h-14` (~48-56px)
- **Mobile** (monograma): de `h-8`/`h-9` para `h-9`/`h-10` (~36-40px)
- Aumentar altura do header para acomodar: de `h-16`/`h-[4.5rem]` para `h-18`/`h-20` (ou equivalente com valores arbitrarios)
- Manter CRP ao lado do logo no desktop e visivel no mobile

---

### 3. Menu mobile mais escuro (`src/components/Header.tsx`)

Ajustar o painel do drawer mobile:

- **Painel**: de `bg-card` para `bg-[hsl(220,28%,6%)]` (quase preto) com borda mais visivel
- **Backdrop**: de `bg-black/60` para `bg-black/70`
- **Itens do menu**: texto `text-foreground/90` em vez de `text-muted-foreground`, hover com `bg-primary/10`
- **Header do painel**: fundo ligeiramente diferenciado com borda mais forte
- Manter acessibilidade (foco visivel, fechar ao clicar fora, ESC via backdrop click)

---

### 4. Hero -- Reordenar no mobile (`src/components/sections/HeroSection.tsx`)

Reestruturar o layout para que no mobile a ordem seja: textos, foto, botoes.

- Separar os botoes do bloco de texto em um elemento proprio
- No mobile (abaixo de `lg:`):
  - Textos (titulo, subtitulo, info) aparecem primeiro
  - Foto do Bruno aparece em seguida
  - Botoes "Agendar sessao" e "Falar no WhatsApp" ficam abaixo da foto
- No desktop (`lg:` e acima): manter layout de 2 colunas (texto+botoes a esquerda, foto a direita)
- Usar CSS `order` nos breakpoints para controlar a sequencia
- Botoes no mobile: empilhados em coluna, largura confortavel (`w-full` ou `max-w-xs`)

---

### 5. Credito no footer (`src/components/Footer.tsx`)

Adicionar linha abaixo do copyright existente:

```
Criado por Next Corporation
```

- Estilo: `text-xs text-muted-foreground/40` (discreto, nao compete com o conteudo)
- Sem link (nenhuma URL foi fornecida)

---

### Arquivos modificados

| Arquivo | Mudanca |
|---|---|
| `public/images/logo-bruno-rocha.png` | Substituido (versao maior) |
| `public/images/logo-br.png` | Substituido (versao maior) |
| `public/favicon.png` | Substituido (monograma maior) |
| `src/components/Header.tsx` | Logo maior, menu mobile mais escuro |
| `src/components/sections/HeroSection.tsx` | Reordenar: foto acima dos botoes no mobile |
| `src/components/Footer.tsx` | Adicionar "Criado por Next Corporation" |

Nenhuma rota nova sera criada. O site permanece one-page.

