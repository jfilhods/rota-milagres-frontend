import {
  createFileRoute,
  Link,
  useNavigate,
} from "@tanstack/react-router";

import { useState } from "react";

import {
  useAuth,
} from "@/hooks/use-auth";
import { useClienteAuth,
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

  const {login: loginAdminPartner,
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

    console.log(
      "✅ Cliente autenticado:",
      cliente.nome,
      `(ID: ${cliente.id})`
    );

    console.log(
      "🎫 cliente_token:",
      !!localStorage.getItem("cliente_token")
    );

   
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