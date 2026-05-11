REVOKE ALL ON FUNCTION public.admin_set_post_status(uuid, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_set_post_status(uuid, text) FROM anon;
REVOKE ALL ON FUNCTION public.admin_delete_post(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_delete_post(uuid) FROM anon;
REVOKE ALL ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.has_role(uuid, app_role) FROM anon;

GRANT EXECUTE ON FUNCTION public.admin_set_post_status(uuid, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_delete_post(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;