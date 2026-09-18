
// hooks/use-auth.tsx

import {
  useEffect,
  useState,
  createContext,
  useContext,
  type ReactNode,
} from "react";

import { useNavigate } from "@tanstack/react-router";

import {
  getAuthProfile,
  login as apiLogin,
  type Partner,
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

  refreshUser: () => void;
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

  const checkAdminPartnerAuth =
    async (): Promise<User | null> => {
      const token =
        localStorage.getItem("auth_token");

      if (!token) {
        return null;
      }

      try {
        const response =
          await getAuthProfile();

        if (
          !response.success ||
          !response.data?.user
        ) {
          return null;
        }

        const apiUser =
          response.data.user;

        // console.log(
        //   "AUTH PROFILE:",
        //   apiUser,
        // );

        // console.log(
        //   "AUTH ROLE:",
        //   apiUser.role,
        // );

        // console.log(
        //   "AUTH PARTNER_ID:",
        //   apiUser.partner_id,
        // );

        // ======================================================
        // ADMIN
        // ======================================================

        if (apiUser.role === "admin") {
          return {
            id: apiUser.id,
            email: apiUser.email || "",
            role: "admin",
            partner_id: null,
            partner: null,
            nome:
              apiUser.email?.split("@")[0] ||
              "Administrador",
          };
        }

        // ======================================================
        // OWNER / MANAGER
        // ======================================================

        if (
          apiUser.role === "owner" ||
          apiUser.role === "manager"
        ) {
          if (!apiUser.partner_id) {
            console.error(
              "Usuário partner sem partner_id",
            );

            return null;
          }

          return {
            id: apiUser.id,
            email: apiUser.email || "",
            role: apiUser.role,
            partner_id: apiUser.partner_id,
            nome:
              apiUser.email?.split("@")[0] ||
              "Parceiro",
            partner:
              response.data.partner ?? null,
          };
        }

        return null;
      } catch (error) {
        console.error(
          "Erro ao verificar autenticação admin/partner:",
          error,
        );

        localStorage.removeItem(
          "auth_token",
        );

        localStorage.removeItem(
          "auth_refresh_token",
        );

        localStorage.removeItem(
          "auth_expires_at",
        );

        return null;
      }
    };

  // ============================================================
  // INICIALIZA AUTENTICAÇÃO
  // ============================================================

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

  const handleLogout = async (
    message?: string,
  ) => {
    if (sessionTimeout) {
      clearTimeout(sessionTimeout);
      setSessionTimeout(null);
    }

    localStorage.removeItem(
      "auth_token",
    );

    localStorage.removeItem(
      "auth_refresh_token",
    );

    localStorage.removeItem(
      "auth_expires_at",
    );

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

  const refreshUser = () => {
    window.location.reload();
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

