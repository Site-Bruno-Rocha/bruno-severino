import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

type AdminDebugState = {
  userEmail: string | null;
  userId: string | null;
  rpcResult: boolean | null;
  rpcError: string | null;
};

const EMPTY_ADMIN_DEBUG: AdminDebugState = {
  userEmail: null,
  userId: null,
  rpcResult: null,
  rpcError: null,
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adminDebug, setAdminDebug] = useState<AdminDebugState>(EMPTY_ADMIN_DEBUG);

  const checkAdmin = useCallback(async (authUser: User): Promise<boolean> => {
    const userEmail = authUser.email?.toLowerCase() ?? null;
    const emailAllowed = !!userEmail && ALLOWED_ADMIN_EMAILS.includes(userEmail);

    let admin = false;
    let rpcResult: boolean | null = null;
    let rpcError: string | null = null;
    let roleRow: { role: string; user_id: string } | null = null;
    let roleError: string | null = null;

    if (emailAllowed) {
      try {
        const { data: rpcData, error: rpcErr } = await supabase.rpc("has_role", {
          _user_id: authUser.id,
          _role: "admin",
        });

        rpcResult = rpcData === true;
        rpcError = rpcErr?.message ?? null;
        if (!rpcErr && rpcData === true) admin = true;
      } catch (e) {
        rpcError = e instanceof Error ? e.message : "Erro desconhecido na RPC has_role";
      }

      const { data: roleData, error: roleErr } = await supabase
        .from("user_roles")
        .select("role, user_id")
        .eq("user_id", authUser.id)
        .maybeSingle();

      roleError = roleErr?.message ?? null;
      roleRow = roleData ? { role: String(roleData.role), user_id: roleData.user_id } : null;
      if (roleRow?.role === "admin") admin = true;
    }

    const nextDebug: AdminDebugState = {
      userEmail,
      userId: authUser.id,
      supabaseUrl: import.meta.env.VITE_SUPABASE_URL ?? "",
      projectId: import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "",
      emailAllowed,
      rpcResult,
      rpcError,
      roleRow,
      roleError,
    };

    setAdminDebug(nextDebug);
    setIsAdmin(admin);

    if (import.meta.env.DEV) {
      console.log("[Auth] SUPABASE_URL", nextDebug.supabaseUrl);
      console.log("[Auth] SUPABASE_PROJECT_ID", nextDebug.projectId);
      console.log("[Auth] user.email", userEmail);
      console.log("[Auth] user.id", authUser.id);
      console.log("[Auth] email allowlist", emailAllowed);
      console.log("[Auth] rpc has_role admin", rpcResult, rpcError);
      console.log("[Auth] user_roles row", roleRow, roleError);
    }

    return admin;
  }, []);

  useEffect(() => {
    const applySession = async (nextSession: Session | null) => {
      setSession(nextSession);
      const nextUser = nextSession?.user ?? null;
      setUser(nextUser);

      if (nextUser) {
        await checkAdmin(nextUser);
      } else {
        setIsAdmin(false);
        setAdminDebug(EMPTY_ADMIN_DEBUG);
      }

      setLoading(false);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setLoading(true);
      void applySession(nextSession);
    });

    setLoading(true);
    void supabase.auth.getSession().then(({ data: { session: nextSession } }) => {
      void applySession(nextSession);
    });

    return () => subscription.unsubscribe();
  }, [checkAdmin]);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    return { data, error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
    setUser(null);
    setSession(null);
    setAdminDebug(EMPTY_ADMIN_DEBUG);
  };

  return { user, session, isAdmin, loading, signIn, signOut, checkAdmin, adminDebug };
}
