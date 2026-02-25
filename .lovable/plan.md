

## Plano: Logo, Favicon, CRP, E-mail e Instagram

### Resumo
Atualizar a identidade visual do site com o logo profissional do Bruno, corrigir o CRP, atualizar o e-mail e adicionar o Instagram em pontos estrategicos.

---

### 1. Assets -- Copiar logos para o projeto

- Copiar `Logo_-_Bruno_Rocha_Azul.png` para `public/images/logo-bruno-rocha.png` (logo completo para Header desktop e Footer)
- Copiar `Logo_BR_Azul.png` para `public/images/logo-br.png` (monograma para Header mobile)
- Copiar `Logo_BR_Azul.png` para `public/favicon.png` (favicon)

### 2. Atualizar `src/config.ts`

- `CRP`: mudar de `"171992"` para `"06/171992"`
- `EMAIL_PLACEHOLDER`: mudar para `"brunorocha.psicologo@gmail.com"`
- Adicionar: `INSTAGRAM_HANDLE = "@brunorocha.psi"`
- Adicionar: `INSTAGRAM_URL = "https://instagram.com/brunorocha.psi"`

### 3. Header (`src/components/Header.tsx`)

- **Logo area**: Substituir o bloco de texto "Bruno Severino Rocha" / "CRP 171992..." por:
  - Desktop (`hidden lg:block`): imagem do logo completo (`logo-bruno-rocha.png`), altura ~32px
  - Mobile (`lg:hidden`): imagem do monograma (`logo-br.png`), altura ~28px
- Manter o link `href="#inicio"` e `aria-label`
- CRP no subtexto atualizado para `CRP 06/171992`
- Top bar: adicionar link do Instagram (icone) ao lado do WhatsApp e e-mail
- Atualizar imports: adicionar `INSTAGRAM_URL` do config; trocar `EMAIL_PLACEHOLDER` pelo novo valor (ja vem do config)

### 4. Footer (`src/components/Footer.tsx`)

- Substituir o nome em texto pelo logo completo (`logo-bruno-rocha.png`, altura ~28px)
- Atualizar CRP para usar formato `CRP 06/{CRP}` (ja vem corrigido do config)
- Adicionar link do Instagram ao lado do e-mail na area de contato
- Importar `INSTAGRAM_URL` do config

### 5. Pagina Index (`src/pages/Index.tsx`)

- Secao Sobre: `CRP: {CRP}` ja usa a constante, ficara automaticamente correto
- Secao Contato: adicionar link do Instagram (`@brunorocha.psi`) com icone, abaixo do e-mail
- E-mail ja usa `EMAIL_PLACEHOLDER`, ficara correto automaticamente

### 6. Favicon (`index.html`)

- Atualizar o `<link rel="icon">` para apontar para `/favicon.png` (ja existe, sera substituido pelo monograma BR)

### 7. Header -- CRP hardcoded (linha 69)

- A linha 69 do Header tem `CRP 171992` hardcoded. Sera atualizada para usar a constante `CRP` do config no formato `CRP 06/{CRP}` ou importar e usar diretamente.

---

### Arquivos modificados
| Arquivo | Mudanca |
|---|---|
| `public/images/logo-bruno-rocha.png` | Novo (logo completo) |
| `public/images/logo-br.png` | Novo (monograma) |
| `public/favicon.png` | Substituido pelo monograma |
| `src/config.ts` | CRP, e-mail, Instagram |
| `src/components/Header.tsx` | Logo imagem, CRP corrigido, Instagram na top bar |
| `src/components/Footer.tsx` | Logo imagem, Instagram |
| `src/pages/Index.tsx` | Instagram na secao Contato |
| `index.html` | Favicon (ja aponta para `/favicon.png`) |

