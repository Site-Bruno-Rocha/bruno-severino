import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

type AdminDebugState = {
  userEmail: string | null;
  userId: string | null;
  rpcResult: boolean | null;
  rpcError: string | null;
  emailAllowlistCheck: boolean | null;
};

const EMPTY_ADMIN_DEBUG: AdminDebugState = {
  userEmail: null,
  userId: null,
  rpcResult: null,
  rpcError: null,
  emailAllowlistCheck: null,
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminDebug, setAdminDebug] = useState<AdminDebugState>(EMPTY_ADMIN_DEBUG);

  const checkAdmin = useCallback(async (authUser: User): Promise<boolean> => {
    const userEmail = authUser.email?.toLowerCase() ?? null;
    const emailAllowlistCheck = false;

    let admin = false;
    let rpcResult: boolean | null = null;
    let rpcError: string | null = null;

    console.log("session user id:", authUser.id);
    console.log("session user email:", userEmail);
    console.log("email allowlist check:", emailAllowlistCheck);

    try {
      const { data: rpcData, error: rpcErr } = await supabase.rpc("has_role", {
        _user_id: authUser.id,
        _role: "admin",
      });

      rpcResult = rpcData === true;
      rpcError = rpcErr?.message ?? null;
      console.log("has_role result:", rpcResult);

      if (rpcErr) {
        console.error("Erro ao verificar role:", rpcErr);
      } else if (rpcData === true) {
        admin = true;
      }
    } catch (e) {
      rpcError = e instanceof Error ? e.message : "Erro desconhecido na RPC has_role";
      rpcResult = false;
      console.log("has_role result:", false);
      console.error("Exceção ao verificar role:", e);
    }

    if (!admin) {
      const { data: ownRoleData, error: ownRoleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", authUser.id)
        .eq("role", "admin")
        .maybeSingle();

      if (ownRoleError) {
        console.error("Erro ao verificar role do usuário autenticado:", ownRoleError);
      } else {
        admin = ownRoleData?.role === "admin";
      }
    }

    const nextDebug: AdminDebugState = {
      userEmail,
      userId: authUser.id,
      rpcResult,
      rpcError,
      emailAllowlistCheck,
    };

    setAdminDebug(nextDebug);
    setIsAdmin(admin);

    if (import.meta.env.DEV) {
      console.log("[Auth] user.email", userEmail);
      console.log("[Auth] user.id", authUser.id);
      console.log("[Auth] rpc has_role admin", rpcResult, rpcError);
    }

    return admin;
  }, []);

  useEffect(() => {
    const applySession = (nextSession: Session | null) => {
      setSession(nextSession);
      const nextUser = nextSession?.user ?? null;
      setUser(nextUser);
      setAuthLoading(false);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setAuthLoading(true);
      applySession(nextSession);
    });

    setAuthLoading(true);
    void supabase.auth.getSession().then(({ data: { session: nextSession } }) => {
      applySession(nextSession);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    let cancelled = false;

    if (!user) {
      setIsAdmin(false);
      setAdminDebug(EMPTY_ADMIN_DEBUG);
      setAdminLoading(false);
      return;
    }

    setAdminLoading(true);
    void checkAdmin(user).then((admin) => {
      if (!cancelled) setIsAdmin(admin);
    }).finally(() => {
      if (!cancelled) setAdminLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [user, checkAdmin]);

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

  const loading = authLoading || adminLoading;

  return { user, session, isAdmin, loading, signIn, signOut, checkAdmin, adminDebug };
}
