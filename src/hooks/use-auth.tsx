
// hooks/use-auth.tsx

import {
  useEffect,
  useState,
  createContext,
  useContext,
  type ReactNode,
} from "react";
import type { Partner } from "@/services/api";  // ← de @/lib/catalog
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";
import {

  getAuthProfile,
  login as apiLogin,

} from "@/services/api";

// ============================================================
// TIPOS
// ============================================================

export interface User {
  id: string;
  email: string;
  role: "admin" | "owner" | "manager";
  partner_id?: string | null;
  nome?: string;
  partner?: Partner | null;
}
export type AuthUser = User;

export type UserRole = User["role"];

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isPartner: boolean;
  currentRole: UserRole | null;
  userName: string;
  login: (
    credentials: LoginCredentials,
  ) => Promise<void>;

  logout: (
    message?: string,
  ) => Promise<void>;

  refreshUser: () => Promise<void>;
}

// ============================================================
// CONTEXT
// ============================================================

const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined,
  );

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const auth = useAuthProvider();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      "useAuth must be used within AuthProvider",
    );
  }

  return context;
}

export const useAuthContext = useAuth;

// ============================================================
// HOOK PRINCIPAL
// ============================================================

function useAuthProvider(): AuthContextType {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [sessionTimeout, setSessionTimeout] =
    useState<ReturnType<typeof setTimeout> | null>(
      null,
    );

  const navigate = useNavigate();

  // ============================================================
  // VERIFICA ADMIN / PARTNER
  // ============================================================

  const checkAdminPartnerAuth = async (): Promise<User | null> => {
    // 1. Tenta sessão Supabase (Google OAuth)
    const { data: sessionData } = await supabase.auth.getSession();

    if (sessionData.session) {
      const token = sessionData.session.access_token;
      const supaUser = sessionData.session.user;

      try {
        const api = import.meta.env.VITE_API_URL.replace(/\/+$/, "");
        //console.log("[useAuth] chamando", `${api}/auth/me`);

        const res = await fetch(`${api}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        //console.log("[useAuth] /auth/me status:", res.status);
        const json = await res.json();
        //console.log("[useAuth] /auth/me body:", json);

        if (!json?.success || !json.data) {
          //console.warn("[useAuth] /auth/me sem sucesso");
          return null;
        }


        if (!json?.success || !json.data) return null;

        const { role, partnerId, plan } = json.data;

        let partner: Partner | null = null;
        // use-auth.tsx — dentro do checkAdminPartnerAuth, trecho do partner
        if (partnerId) {
          try {
            //console.log("[useAuth] buscando partner:", partnerId);
            const partnerRes = await fetch(`${api}/partner/profile`, {
              headers: { Authorization: `Bearer ${token}` },
            });

            if (!partnerRes.ok) {
             // console.warn("[useAuth] /partner/profile status:", partnerRes.status);
            } else {
              const partnerJson = await partnerRes.json();

              // Aceita dois formatos:
              // 1) { success: true, data: { partner: {...} } }
              // 2) { user: {...}, partner: {...} }
              const raw = partnerJson?.data ?? partnerJson;
              const extracted = raw?.partner ?? raw;

              if (extracted && typeof extracted === "object" && "name" in extracted) {
                partner = extracted as Partner;
                //console.log("[useAuth] partner carregado:", partner?.name);
              } else {
                console.warn("[useAuth] shape inesperado:", partnerJson);
              }
            }
          } catch (err) {
            console.error("[useAuth] erro no fetch do partner:", err);
          }
        }

        return {
          id: supaUser.id,
          email: supaUser.email ?? "",
          role: (role === "admin" ? "admin" : "owner") as UserRole,
          partner_id: partnerId ?? null,
          nome:
            (supaUser.user_metadata?.['full_name'] as string) ??
            (supaUser.user_metadata?.['name'] as string) ??
            supaUser.email?.split("@")[0] ??
            "Usuário",
          partner,
        };
      } catch (err) {
        console.error("[useAuth] erro ao buscar /auth/me:", err);
        return null;
      }
    }

    // 2. Fallback: sistema antigo via auth_token
    const token = localStorage.getItem("auth_token");
    if (!token) return null;

    try {
      const response = await getAuthProfile();
      if (!response.success || !response.data?.user) return null;

      const apiUser = response.data.user;

      if (apiUser.role === "admin") {
        return {
          id: apiUser.id,
          email: apiUser.email || "",
          role: "admin",
          partner_id: null,
          partner: null,
          nome: apiUser.email?.split("@")[0] || "Administrador",
        };
      }

      if (apiUser.role === "owner" || apiUser.role === "manager") {
        if (!apiUser.partner_id) return null;
        return {
          id: apiUser.id,
          email: apiUser.email || "",
          role: apiUser.role,
          partner_id: apiUser.partner_id,
          nome: apiUser.email?.split("@")[0] || "Parceiro",
          partner: response.data.partner ?? null,

        };
      }

      return null;
    } catch (error) {
      console.error("Erro ao verificar autenticação antiga:", error);
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_refresh_token");
      localStorage.removeItem("auth_expires_at");
      return null;
    }
  };

  // ============================================================
  // INICIALIZA AUTENTICAÇÃO
  // ============================================================
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      //console.log("[useAuth] onAuthStateChange:", event, !!session);

      if (event === "SIGNED_OUT") {
        setUser(null);
        return;
      }

      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        checkAdminPartnerAuth().then((u) => setUser(u));
      }
    });

    return () => sub.subscription.unsubscribe();
  }, []);


  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      setLoading(true);

      const authenticatedUser =
        await checkAdminPartnerAuth();

      if (!mounted) return;

      if (authenticatedUser) {
        setUser(authenticatedUser);
      } else {
        setUser(null);
      }

      setLoading(false);
    };

    initAuth();

    return () => {
      mounted = false;
    };
  }, []);

  // ============================================================
  // LOGIN ADMIN / PARTNER
  // ============================================================

  const login = async ({
    email,
    password,
  }: LoginCredentials) => {
    try {
      setLoading(true);
      setError(null);

      const response =
        await apiLogin(
          email,
          password,
        );

      // console.log(
      //   "LOGIN RESPONSE:",
      //   response,
      // );

      // console.log(
      //   "LOGIN ROLE:",
      //   response.user.role,
      // );

      // console.log(
      //   "LOGIN PARTNER_ID:",
      //   response.user.partner_id,
      // );

      // ======================================================
      // SALVA TOKEN ADMIN / PARTNER
      // ======================================================

      localStorage.setItem(
        "auth_token",
        response.token,
      );

      if (
        response.refresh_token
      ) {
        localStorage.setItem(
          "auth_refresh_token",
          response.refresh_token,
        );
      }

      if (
        response.expires_at !==
        undefined
      ) {
        localStorage.setItem(
          "auth_expires_at",
          String(
            response.expires_at,
          ),
        );
      }

      // ======================================================
      // CONSTRÓI USUÁRIO
      // ======================================================

      const authenticatedUser: User = {
        id: response.user.id,

        email: response.user.email ?? "",

        role: response.user.role as UserRole,

        partner_id:
          response.user.role === "admin"
            ? null
            : response.user.partner_id ?? null,

        partner:
          response.user.role === "admin"
            ? null
            : response.user.partner ?? null,

        nome:
          response.user.email?.split("@")[0] ||
          "Usuário",
      };

      // console.log(
      //   "AUTHENTICATED USER:",
      //   authenticatedUser,
      // );

      setUser(authenticatedUser);

      // ======================================================
      // REDIRECIONAMENTO
      // ======================================================

      if (
        authenticatedUser.role ===
        "admin"
      ) {
        await navigate({
          to: "/admin",
        });

        return;
      }

      if (
        authenticatedUser.role ===
        "owner" ||
        authenticatedUser.role ===
        "manager"
      ) {
        await navigate({
          to: "/painel",
        });

        return;
      }

      throw new Error(
        "Perfil de usuário não autorizado.",
      );
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Erro ao entrar";

      setError(message);

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // TIMEOUT DE SESSÃO
  // ============================================================

  const resetSessionTimeout = () => {
    if (sessionTimeout) {
      clearTimeout(sessionTimeout);
    }

    const timeout = setTimeout(() => {
      handleLogout(
        "Sessão expirada por inatividade",
      );
    }, 20 * 60 * 1000);

    setSessionTimeout(timeout);
  };

  // ============================================================
  // LISTENER DE ATIVIDADE
  // ============================================================

  useEffect(() => {
    if (!user) return;

    const events = [
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ];

    const resetTimer = () =>
      resetSessionTimeout();

    events.forEach((event) => {
      document.addEventListener(
        event,
        resetTimer,
      );
    });

    resetSessionTimeout();

    return () => {
      events.forEach((event) => {
        document.removeEventListener(
          event,
          resetTimer,
        );
      });

      if (sessionTimeout) {
        clearTimeout(sessionTimeout);
      }
    };
  }, [user]);

  // ============================================================
  // LOGOUT
  // ============================================================

  const handleLogout = async (message?: string) => {
    if (sessionTimeout) {
      clearTimeout(sessionTimeout);
      setSessionTimeout(null);
    }

    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_refresh_token");
    localStorage.removeItem("auth_expires_at");

    await supabase.auth.signOut().catch(() => undefined);

    setUser(null);

    if (message) {
      sessionStorage.setItem(
        "session_expired_message",
        message,
      );
    }

    await navigate({
      to: "/",
    });
  };

  // ============================================================
  // REFRESH
  // ============================================================

  const refreshUser = async () => {
    try {
      setLoading(true);

      const u = await checkAdminPartnerAuth();

      setUser(u);
    } catch (error) {
      console.error(
        "[useAuth] erro ao atualizar usuário:",
        error
      );
    } finally {
      setLoading(false);
    }
  };


  // ============================================================
  // ESTADOS
  // ============================================================

  const isAuthenticated =
    !!user;

  const isAdmin =
    user?.role === "admin";

  const isPartner =
    user?.role === "owner" ||
    user?.role === "manager";

  const userName =
    user?.nome ||
    user?.email?.split("@")[0] ||
    "Usuário";

  const currentRole =
    user?.role ?? null;

  // ============================================================
  // RETURN
  // ============================================================

  return {
    user,

    loading,

    error,

    isAuthenticated,

    isAdmin: !!isAdmin,

    isPartner: !!isPartner,

    currentRole,

    userName,

    login,

    logout: handleLogout,

    refreshUser,
  };
}

