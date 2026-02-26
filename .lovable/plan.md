

## Plano: Logo branco, Favicon, CRP, Mobile UX e Admin do Blog

### Resumo

Atualizar os logos para versao branca, corrigir favicon, melhorar UX mobile e implementar sistema de admin para o blog com Supabase.

---

### Etapa 0 -- Conectar Supabase

O projeto ainda nao tem Supabase. Sera necessario conectar o Supabase ao projeto para:
- Autenticacao (login do Bruno)
- Tabela de posts do blog (CRUD)
- Tabela de roles (seguranca admin)

**Acao:** Usar o conector do Supabase para vincular ao projeto.

---

### Etapa 1 -- Assets e Favicon

| Arquivo origem | Destino |
|---|---|
| `Logo_-_Bruno_Rocha_Branco_-_s_fundo.png` | `public/images/logo-bruno-rocha.png` (substitui o azul) |
| `Logo_-_BR_Branco_-_s_fundo.png` | `public/images/logo-br.png` (substitui o azul) |
| `Logo_-_BR_Branco_-_s_fundo.png` | `public/favicon.png` |

O `index.html` ja aponta para `/favicon.png`, entao basta substituir o arquivo.

---

### Etapa 2 -- Header (logo maior + CRP + mobile)

**Arquivo:** `src/components/Header.tsx`

- Aumentar tamanho do logo: desktop `h-9` (36px), mobile `h-8` (32px)
- Manter CRP ao lado do logo no desktop: texto discreto "CRP 06/171992"
- No mobile: CRP abaixo do monograma em texto menor

**Menu mobile:**
- O header ja tem um menu lateral (drawer) funcional com overlay, fechar ao clicar, etc.
- Ajustes: garantir hit area minima de 44px nos itens (`py-3` ja presente), manter hamburger icon (ja usa `Menu`/`X` do lucide)
- Sem mudancas estruturais grandes necessarias -- o menu mobile ja esta bem implementado

---

### Etapa 3 -- Footer

**Arquivo:** `src/components/Footer.tsx`

- Substituir logo azul pelo branco (mesmo path, arquivo substituido)
- Adicionar link discreto "Admin" no footer: `<a href="/admin">Admin</a>`

---

### Etapa 4 -- Banco de dados (Supabase)

**Migracoes:**

1. Criar tipo `app_role` e tabela `user_roles`:

```sql
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);

alter table public.user_roles enable row level security;
```

2. Criar funcao `has_role` (security definer):

```sql
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;
```

3. Criar tabela `posts`:

```sql
create table public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text not null default '',
  content text not null default '',
  category text not null default 'Geral',
  status text not null default 'draft' check (status in ('draft', 'published')),
  author_id uuid references auth.users(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.posts enable row level security;
```

4. RLS policies para `posts`:
- SELECT publico: apenas `status = 'published'`
- SELECT admin: todos (usando `has_role`)
- INSERT/UPDATE/DELETE: apenas admin

5. RLS para `user_roles`:
- SELECT: usuario pode ver suas proprias roles
- Sem INSERT/UPDATE/DELETE publico

6. Inserir role admin para o Bruno (apos ele criar conta): via INSERT na tabela `user_roles`

---

### Etapa 5 -- Integracao Supabase no Frontend

**Novos arquivos:**
- `src/integrations/supabase/client.ts` -- cliente Supabase (gerado automaticamente ao conectar)
- `src/hooks/useAuth.ts` -- hook de autenticacao
- `src/hooks/usePosts.ts` -- hook CRUD de posts

---

### Etapa 6 -- Rotas Admin (privadas)

**Arquivo:** `src/App.tsx` -- adicionar rotas:

```text
/admin          -> redirect para /admin/posts
/admin/login    -> pagina de login
/admin/posts    -> lista de posts (protegida)
/admin/posts/new -> criar post (protegida)
/admin/posts/:id -> editar post (protegida)
```

**Novos arquivos de pagina:**
- `src/pages/admin/Login.tsx` -- formulario email+senha
- `src/pages/admin/Posts.tsx` -- lista de posts com acoes (editar/excluir/publicar)
- `src/pages/admin/PostEditor.tsx` -- formulario criar/editar post
- `src/components/admin/ProtectedRoute.tsx` -- wrapper que verifica auth + role admin

**Funcionalidades do editor:**
- Campos: titulo, slug (auto-gerado), resumo, conteudo (textarea), categoria, status (rascunho/publicado)
- Salvar rascunho e publicar
- Excluir post com confirmacao

---

### Etapa 7 -- Blog publico com dados do Supabase

**Arquivo:** `src/pages/Index.tsx`

- A secao `BlogPreviewSection` passara a buscar posts publicados do Supabase (em vez do array estatico `posts` de `src/data/posts.ts`)
- Manter o `BlogModal` para leitura inline
- Fallback: se Supabase nao retornar dados, mostrar os posts estaticos como backup

---

### Arquivos modificados/criados

| Arquivo | Acao |
|---|---|
| `public/images/logo-bruno-rocha.png` | Substituido (branco) |
| `public/images/logo-br.png` | Substituido (branco) |
| `public/favicon.png` | Substituido (monograma branco) |
| `src/components/Header.tsx` | Logo maior, CRP ajustado |
| `src/components/Footer.tsx` | Link "Admin" discreto |
| `src/App.tsx` | Rotas admin |
| `src/hooks/useAuth.ts` | Novo |
| `src/hooks/usePosts.ts` | Novo |
| `src/pages/admin/Login.tsx` | Novo |
| `src/pages/admin/Posts.tsx` | Novo |
| `src/pages/admin/PostEditor.tsx` | Novo |
| `src/components/admin/ProtectedRoute.tsx` | Novo |
| `src/pages/Index.tsx` | Blog busca do Supabase |
| Migracoes SQL (4-5) | Novas |

