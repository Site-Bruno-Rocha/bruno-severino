CREATE OR REPLACE FUNCTION public.admin_set_post_status(_post_id uuid, _status text)
RETURNS public.posts
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _post public.posts;
  _email text;
BEGIN
  _email := lower(coalesce(auth.jwt() ->> 'email', ''));

  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Usuário não autenticado';
  END IF;

  IF _email <> 'brunorocha.psicologo@gmail.com' OR NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Sem permissão para alterar posts';
  END IF;

  IF _status NOT IN ('draft', 'published') THEN
    RAISE EXCEPTION 'Status inválido: %', _status;
  END IF;

  UPDATE public.posts
  SET
    status = _status,
    published_at = CASE WHEN _status = 'published' THEN coalesce(published_at, now()) ELSE NULL END,
    updated_at = now()
  WHERE id = _post_id
  RETURNING * INTO _post;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Post não encontrado';
  END IF;

  RETURN _post;
END;
$$;

CREATE OR REPLACE FUNCTION public.admin_delete_post(_post_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _email text;
BEGIN
  _email := lower(coalesce(auth.jwt() ->> 'email', ''));

  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Usuário não autenticado';
  END IF;

  IF _email <> 'brunorocha.psicologo@gmail.com' OR NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Sem permissão para excluir posts';
  END IF;

  DELETE FROM public.posts
  WHERE id = _post_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Post não encontrado';
  END IF;
END;
$$;

REVOKE ALL ON FUNCTION public.admin_set_post_status(uuid, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_delete_post(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.admin_set_post_status(uuid, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_delete_post(uuid) TO authenticated;