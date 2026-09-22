// routes/cadastro-parceiro.tsx
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { supabase } from "@/lib/supabase";

type PlanId = "gratuito" | "bronze" | "prata" | "ouro";

interface Search {
  plano: PlanId; // ← obrigatório, nunca undefined
}

export const Route = createFileRoute("/cadastro-parceiro")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    plano: (search["plano"] as PlanId) ?? "gratuito",
  }),
  component: CadastroParceiroPage,
});

function CadastroParceiroPage() {
  const { plano } = Route.useSearch(); // agora plano: PlanId (nunca undefined)
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGoogle() {
  setLoading(true);
  setError(null);

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth-callback?next=/onboarding&plano=${plano}`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    setError(error.message);
    setLoading(false);
  }
}

  return (
    <>
      <SiteHeader />
      <section className="mx-auto max-w-md px-4 py-16">
        <h1 className="font-display text-2xl font-medium">
          Criar conta de parceiro
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Plano selecionado: <strong className="capitalize">{plano}</strong>
        </p>

        <button
          type="button"
          onClick={handleGoogle}
          disabled={loading}
          className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-white px-4 py-3 text-sm font-medium text-gray-800 ring-1 ring-gray-300 hover:bg-gray-50 disabled:opacity-60"
        >
          <svg className="size-5" viewBox="0 0 24 24">
            {/* ícone do Google */}
          </svg>
          {loading ? "Redirecionando..." : "Continuar com Google"}
        </button>

        <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
          <div className="h-px flex-1 bg-border" />
          ou
          <div className="h-px flex-1 bg-border" />
        </div>

        <button
          type="button"
          onClick={() =>
            navigate({ to: "/cadastro-parceiro-email", search: { plano } })
          }
          className="w-full rounded-xl bg-foreground px-4 py-3 text-sm font-medium text-background"
        >
          Cadastrar com e-mail
        </button>

        {error && (
          <p className="mt-4 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Ao continuar você concorda com os Termos de Uso e a Política de
          Privacidade.
        </p>
      </section>
    </>
  );
}