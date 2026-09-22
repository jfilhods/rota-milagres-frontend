import {
  createFileRoute,
  Link,
  useNavigate,
} from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";

import { useState } from "react";

import {
  useAuth,
} from "@/hooks/use-auth";
import {
  useClienteAuth,
} from "@/contexts/cliente-auth-context";

import {
  loginCliente as apiLoginCliente,
} from "@/services/api-cliente";

import {
  SiteHeader,
} from "@/components/site-header";

export const Route =
  createFileRoute("/entrar")({
    component: LoginPage,
  });

function LoginPage() {
  const navigate = useNavigate();

  const { login: loginAdminPartner,
  } = useAuth();

  const { login: loginCliente
  } = useClienteAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleGoogleLogin() {
    setLoading(true);
    setError("");

    const params = new URLSearchParams({
      plano: "gratuito", // ou o plano que você quiser como default
    });

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth-callback?${params.toString()}`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");

    // ========================================================
    // LIMPA SESSÃO ADMIN/PARCEIRO ANTERIOR
    // ========================================================

    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_refresh_token");
    localStorage.removeItem("auth_expires_at");

    // ========================================================
    // 1. TENTA LOGIN COMO CLIENTE
    // ========================================================

    try {
      const cliente = await loginCliente(email, password);
      if (
        !cliente.ativo ||
        !cliente.email ||
        !cliente.id
      ) {
        throw new Error(
          "Resposta inválida do servidor"
        );
      }

      // console.log(
      //   "✅ Cliente autenticado:",
      //   cliente.nome,
      //   `(ID: ${cliente.id})`
      // );

      // console.log(
      //   "🎫 cliente_token:",
      //   !!localStorage.getItem("cliente_token")
      // );


      await navigate({
        to: "/clientes",
        replace: true,
      });

      return;
    } catch (clienteError) {
      console.log(
        "⚠️ Login de cliente não realizado.",
        clienteError,
      );
    }

    // ========================================================
    // 2. SE NÃO FOR CLIENTE, TENTA ADMIN / PARCEIRO
    // ========================================================

    try {
      // Remove eventual sessão de cliente
      localStorage.removeItem("cliente_token");
      localStorage.removeItem("cliente_refresh_token");
      localStorage.removeItem("cliente_expires_at");
      localStorage.removeItem("cliente_data");
      localStorage.removeItem("cliente");

      await loginAdminPartner({
        email,
        password,
      });

      return;
    } catch (adminError) {
      console.error(
        "❌ Login de admin/parceiro também falhou:",
        adminError
      );

      setError(
        adminError instanceof Error
          ? adminError.message
          : "Email ou senha inválidos"
      );
    } finally {
      setLoading(false);
    }


    // ========================================================
    // 2. TENTA ADMIN / PARCEIRO
    // ========================================================

  }

  return (
    <>
      <SiteHeader />

      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-md space-y-8">

          <div className="text-center">
            <h1 className="font-display text-3xl font-medium">
              Entrar
            </h1>

            <p className="mt-2 text-muted-foreground">
              Acesse sua conta no Rota Milagres
            </p>
          </div>
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="group flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-3 font-semibold text-gray-700 shadow-sm transition-all duration-300 ease-in-out hover:border-gray-400 hover:bg-gray-50 hover:text-gray-900 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-50"
          >
            <svg
              className="size-5 transition-transform duration-300 ease-in-out group-hover:scale-110"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Entrar com Google</span>
          </button>



          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" />
            ou
            <div className="h-px flex-1 bg-border" />
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >

            {error && (
              <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value,
                  )
                }
                required
                autoComplete="email"
                className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium"
              >
                Senha
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value,
                  )
                }
                required
                autoComplete="current-password"
                className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              {loading
                ? "Entrando..."
                : "Entrar"}
            </button>

            <div className="space-y-3 text-center text-sm">

              <p className="text-muted-foreground">
                Ainda não possui uma conta?
              </p>

              <Link
                to="/cadastro-cliente"
                search={{
                  message: undefined,
                  partner: undefined,
                }}
                className="text-primary hover:underline"
              >
                Cadastre-se como cliente
              </Link>

            </div>

          </form>

        </div>
      </div>
    </>
  );
}