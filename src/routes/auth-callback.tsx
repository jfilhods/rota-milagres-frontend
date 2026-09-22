// routes/auth-callback.tsx
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

type PlanId = "gratuito" | "bronze" | "prata" | "ouro";

interface Search {
  plano: PlanId;
}

export const Route = createFileRoute("/auth-callback")({
  validateSearch: (search: Record<string, unknown>): Search => {
    const rawPlano = search["plano"];
    const plano: PlanId =
      rawPlano === "bronze" || rawPlano === "prata" || rawPlano === "ouro"
        ? rawPlano
        : "gratuito";
    return { plano };
  },
  component: AuthCallback,
});

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    async function run() {
      console.log("[auth-callback] iniciando");

      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      console.log("[auth-callback] getSession:", {
        hasSession: !!sessionData.session,
        error: sessionError?.message,
      });

      if (!active) return;

      if (sessionError || !sessionData.session) {
        console.warn("[auth-callback] sem sessão → /cadastro-parceiro");
        navigate({ to: "/cadastro-parceiro", search: { plano: "gratuito" } });
        return;
      }

      // sempre vai pro painel; ele decide se abre o modal de onboarding
      console.log("[auth-callback] sessão ok → /painel");
      navigate({ to: "/painel/perfil", replace: true });
    }

    run();
    return () => {
      active = false;
    };
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-sm text-muted-foreground">Finalizando login…</p>
    </div>
  );
}