-- Corrige UPDATE/DELETE em posts quando a publicação realtime usa filtro por status.
-- O filtro da publicação usa a coluna status; por isso o PostgreSQL exige
-- que a identidade de réplica inclua a linha inteira para alterações/exclusões.
ALTER TABLE public.posts REPLICA IDENTITY FULL;