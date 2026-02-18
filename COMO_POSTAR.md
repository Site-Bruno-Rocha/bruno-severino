# Como adicionar um novo post no Blog

Este guia explica como criar e publicar um novo artigo no blog de Bruno Severino Rocha.

---

## Estrutura de um post

Os posts estão definidos no arquivo `src/data/posts.ts`, como objetos TypeScript com os seguintes campos:

| Campo      | Descrição                                     | Exemplo                                |
|------------|-----------------------------------------------|----------------------------------------|
| `slug`     | URL do post (sem acentos, com hífens)        | `"o-que-e-psicanálise"`               |
| `title`    | Título do artigo                              | `"O que é psicanálise"`               |
| `date`     | Data de publicação (formato `YYYY-MM-DD`)     | `"2025-03-10"`                         |
| `excerpt`  | Resumo curto de 1–2 linhas                    | `"A psicanálise é muito mais..."` |
| `category` | Categoria do post                             | `"Psicanálise"` / `"Emoções"` / `"Autoconhecimento"` |
| `content`  | Conteúdo do post em texto simples             | Ver abaixo                             |

---

## Como escrever o conteúdo (`content`)

O campo `content` suporta uma sintaxe simples:

- `## Título de seção` → vira um subtítulo `<h2>`
- `- Item de lista` → vira `<li>`
- `- **Negrito** texto` → vira item com texto em negrito
- `---` → linha divisória horizontal
- Qualquer outro parágrafo de texto simples → vira `<p>`

---

## Passo a passo para adicionar um post

1. Abra o arquivo `src/data/posts.ts`

2. Dentro do array `posts`, adicione um novo objeto no início (posts mais recentes primeiro):

```typescript
{
  slug: "meu-novo-post",
  title: "Título do Novo Post",
  date: "2025-04-01",
  excerpt: "Um resumo breve do que o artigo aborda, em 1 ou 2 frases.",
  category: "Psicanálise",
  content: `Parágrafo introdutório do artigo.

## Primeira seção

Texto da primeira seção.

## Segunda seção

- Ponto um
- Ponto dois
- **Destaque** com explicação adicional

---

Parágrafo de encerramento.`,
},
```

3. Salve o arquivo. O post aparecerá automaticamente no blog em `/blog`.

---

## Categorias disponíveis

- `Psicanálise`
- `Emoções`
- `Autoconhecimento`

Você pode criar novas categorias — basta usar um texto diferente no campo `category`.

---

## Dicas

- Mantenha o `slug` em letras minúsculas, sem espaços (use `-` como separador).
- O `excerpt` é exibido no card do blog — seja direto e instigante.
- Evite parágrafos muito longos; prefira blocos curtos e respirados.
- A data segue o formato `AAAA-MM-DD` (ex.: `2025-04-01` para 1 de abril de 2025).
