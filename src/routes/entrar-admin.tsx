import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { login } from "@/services/api";

export const Route = createFileRoute("/entrar-admin")({
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      // ============================================================
      // LOGIN ADMIN / PARTNER
      // ============================================================

      const response = await login(
        email,
        password,
      );

      // ============================================================
      // REMOVE SESSÃO DE CLIENTE
      // ============================================================

      localStorage.removeItem("cliente_token");
      localStorage.removeItem("cliente_refresh_token");
      localStorage.removeItem("cliente_expires_at");
      localStorage.removeItem("cliente_data");

      // ============================================================
      // SALVA SESSÃO ADMIN / PARTNER
      // ============================================================

      localStorage.setItem(
        "auth_token",
        response.token,
      );

      localStorage.setItem(
        "auth_refresh_token",
        response.refresh_token,
      );

      if (response.expires_at !== undefined) {
        localStorage.setItem(
          "auth_expires_at",
          String(response.expires_at),
        );
      }

      // ============================================================
      // REDIRECIONAMENTO POR PERFIL
      // ============================================================

      switch (response.user.role) {
        case "admin":
          await navigate({
            to: "/admin",
          });
          break;

        case "owner":
        case "manager":
          await navigate({
            to: "/admin",
          });
          break;

        default:
          throw new Error(
            "Perfil de usuário não autorizado.",
          );
      }

    } catch (err) {
      console.error(
        "Erro no login administrativo:",
        err,
      );

      setError(
        err instanceof Error
          ? err.message
          : "Email ou senha inválidos",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">

      <div className="w-full max-w-md space-y-8">

        <div className="text-center">
          <h1 className="font-display text-3xl font-medium">
            Área administrativa
          </h1>

          <p className="mt-2 text-muted-foreground">
            Entre como administrador ou parceiro
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
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
                setEmail(e.target.value)
              }
              required
              autoComplete="username"
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
                setPassword(e.target.value)
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

          <div className="border-t pt-5 text-center text-sm">
            <Link
              to="/entrar"
              className="text-muted-foreground hover:text-primary"
            >
              Voltar para login de cliente
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
}