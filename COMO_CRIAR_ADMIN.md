# Como criar o usuário Admin

Este projeto usa Lovable Cloud (Supabase) para autenticação. O sign-up público está **desabilitado** — apenas usuários criados manualmente podem acessar o painel admin.

## Passo a passo

### 1. Criar o usuário no Authentication

Acesse o painel do backend (Lovable Cloud) e:

1. Vá em **Authentication → Users → Add user**
2. Preencha:
   - **Email:** `brunorocha.psicologo@gmail.com`
   - **Password:** (defina a senha desejada — **nunca salve em código**)
   - Marque **Auto-confirm email** se disponível
3. Clique em **Create user**
4. **Copie o UUID** do usuário criado (coluna `id`)

### 2. Inserir na tabela `user_roles`

No **SQL Editor** do backend, execute:

```sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('COLE_O_UUID_AQUI', 'admin')
ON CONFLICT DO NOTHING;
```

Substitua `COLE_O_UUID_AQUI` pelo UUID real copiado no passo anterior.

### 3. Testar o acesso

1. Acesse `/admin/login` no site
2. Faça login com o email e senha definidos
3. Você deve ser redirecionado para `/admin/posts`

## Segurança

- ✅ Sign-up público está **desabilitado**
- ✅ Apenas usuários na tabela `user_roles` com `role = 'admin'` acessam `/admin`
- ✅ RLS na tabela `posts`: leitura pública apenas para `status = 'published'`; CRUD restrito a admins
- ✅ Nenhuma senha está no código-fonte
- ✅ Login anônimo está **desabilitado**

## Estrutura de segurança

| Tabela | RLS | Regras |
|--------|-----|--------|
| `posts` | ✅ | Leitura pública (published); CRUD admin |
| `user_roles` | ✅ | Leitura apenas do próprio role |

A função `has_role(user_id, role)` (SECURITY DEFINER) é usada nas policies para evitar recursão infinita.
