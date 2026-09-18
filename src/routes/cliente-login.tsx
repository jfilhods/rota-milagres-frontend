
import { FormEvent, useState } from "react";
import {
  createFileRoute,
  Link,
  useNavigate,
} from "@tanstack/react-router";
import { Loader2, LockKeyhole, StickerIcon } from "lucide-react";

import { useClienteAuth } from "@/contexts/cliente-auth-context";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/cliente-login")({
  component: ClienteLoginPage,
});

function ClienteLoginPage() {
  const {
    login,
    loading,
    error,
  } = useClienteAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    try {
      await login(email, password);

      navigate({
        to: "/clientes",
      });
    } catch {
      // erro tratado pelo hook
    }
  }

  return (

    <>
    <SiteHeader/>
    <section className="px-4 py-20">
      <div className="mx-auto max-w-md rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border">
        <div className="mb-8 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <LockKeyhole className="size-5" />
          </div>

          <h1 className="mt-4 font-display text-2xl font-medium">
            Área do cliente
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Entre para acompanhar seus contatos com
            parceiros.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full rounded-xl border border-border bg-background px-4 py-3"
            placeholder="Seu e-mail"
          />

          <input
            type="password"
            required
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full rounded-xl border border-border bg-background px-4 py-3"
            placeholder="Sua senha"
          />

          {error && (
            <div className="rounded-xl bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-primary-foreground"
          >
            {loading && (
              <Loader2 className="size-4 animate-spin" />
            )}

            {loading
              ? "Entrando..."
              : "Entrar"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          Ainda não possui cadastro?{" "}
          <Link
            to="/cadastro-cliente"
            search={{ message: undefined, partner: undefined }}
            className="font-medium text-primary"
          >
            Criar cadastro
          </Link>
        </div>
      </div>
    </section>
    </>
  );
}