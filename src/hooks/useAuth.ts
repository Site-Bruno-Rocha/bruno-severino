import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAdmin = useCallback(async (userId: string): Promise<boolean> => {
    let admin = false;

    // Method 1: RPC
    try {
      const { data: rpcData, error: rpcError } = await supabase.rpc("has_role", {
        _user_id: userId,
        _role: "admin",
      });
      if (import.meta.env.DEV) {
        console.log("[Auth] rpc has_role admin:", rpcData, rpcError?.message);
      }
      if (!rpcError && rpcData === true) admin = true;
    } catch (e) {
      console.error("[Auth] RPC exception", e);
    }

    // Method 2: Direct query (fallback)
    if (!admin) {
      const { data: roleRow, error: roleError } = await supabase
        .from("user_roles")
        .select("role, user_id")
        .eq("user_id", userId)
        .maybeSingle();
      if (import.meta.env.DEV) {
        console.log("[Auth] user_roles row:", roleRow, roleError?.message);
      }
      if (!roleError && roleRow?.role === "admin") admin = true;
    }

    setIsAdmin(admin);
    return admin;
  }, []);

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log("[Auth] SUPABASE_URL", import.meta.env.VITE_SUPABASE_URL);
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          if (import.meta.env.DEV) {
            console.log("[Auth] user.id", session.user.id);
          }
          setTimeout(() => checkAdmin(session.user.id), 0);
        } else {
          setIsAdmin(false);
        }
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        if (import.meta.env.DEV) {
          console.log("[Auth] user.id (getSession)", session.user.id);
        }
        checkAdmin(session.user.id).then(() => setLoading(false));
      } else {
        setLoading(false);
      }
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
  };

  return { user, session, isAdmin, loading, signIn, signOut, checkAdmin };
}
