// routes/cadastro-parceiro-email.tsx
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";

type PlanId = "gratuito" | "bronze" | "prata" | "ouro";

interface Search {
  plano?: PlanId;
}

interface Option {
  id: string;
  name: string;
  slug: string;
}

export const Route = createFileRoute("/cadastro-parceiro-email")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    plano: (search["plano"] as PlanId) ?? "gratuito",
  }),
  component: CadastroParceiroEmailPage,
});

function CadastroParceiroEmailPage() {
  const { plano } = Route.useSearch();
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Option[]>([]);
  const [cities, setCities] = useState<Option[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const api = import.meta.env.VITE_API_URL;

        const [catRes, cityRes] = await Promise.all([
          fetch(`${api}categories`).then((r) => r.json()),
          fetch(`${api}cities`).then((r) => r.json()),
        ]);

        if (!active) return;
        setCategories(catRes.data ?? []);
        setCities(cityRes.data ?? []);
      } catch {
        if (active) setError("Não foi possível carregar categorias e cidades.");
      } finally {
        if (active) setLoadingOptions(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const fd = new FormData(e.currentTarget);

    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim().toLowerCase(),
      category_id: String(fd.get("category_id") ?? ""),
      city_id: String(fd.get("city_id") ?? ""),
      whatsapp: String(fd.get("whatsapp") ?? "").trim(),
      short_description:
        String(fd.get("short_description") ?? "").trim() || undefined,
      plan_type: plano ?? "gratuito",
      send_invite: true,
    };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}partner/onboarding`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error ?? "Erro ao criar cadastro");
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <>
        <SiteHeader />
        <section className="mx-auto max-w-md px-4 py-16 text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            ✓
          </div>
          <h1 className="mt-6 font-display text-2xl font-medium">
            Confira seu e-mail
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enviamos um link de acesso para você criar sua senha e entrar no
            painel do parceiro. O link expira em 24 horas.
          </p>
          <Link
            to="/planos"
            className="mt-8 inline-block rounded-xl border border-input px-5 py-3 text-sm font-medium hover:bg-accent"
          >
            Voltar aos planos
          </Link>
        </section>
      </>
    );
  }

  return (
    <>
      <SiteHeader />
      <section className="mx-auto max-w-xl px-4 py-12">
        <button
          type="button"
          onClick={() => navigate({ to: "/planos" })}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Voltar
        </button>

        <h1 className="mt-4 font-display text-2xl font-medium">
          Criar conta de parceiro
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Plano escolhido:{" "}
          <strong className="capitalize">{plano ?? "gratuito"}</strong>
        </p>

        {loadingOptions ? (
          <p className="mt-8 text-sm text-muted-foreground">Carregando…</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <label className="block">
              <span className="text-sm font-medium">E-mail de acesso</span>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                className="mt-1 w-full rounded-lg border border-input px-3 py-2"
              />
              <span className="mt-1 block text-xs text-muted-foreground">
                Você receberá um link para criar sua senha.
              </span>
            </label>

            <label className="block">
              <span className="text-sm font-medium">Nome do negócio</span>
              <input
                name="name"
                required
                minLength={2}
                className="mt-1 w-full rounded-lg border border-input px-3 py-2"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium">Categoria</span>
                <select
                  name="category_id"
                  required
                  defaultValue=""
                  className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2"
                >
                  <option value="" disabled>
                    Selecione
                  </option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-medium">Cidade</span>
                <select
                  name="city_id"
                  required
                  defaultValue=""
                  className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2"
                >
                  <option value="" disabled>
                    Selecione
                  </option>
                  {cities.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-medium">WhatsApp</span>
              <input
                name="whatsapp"
                required
                placeholder="558291189998"
                inputMode="numeric"
                className="mt-1 w-full rounded-lg border border-input px-3 py-2"
              />
              <span className="mt-1 block text-xs text-muted-foreground">
                Formato internacional, apenas números.
              </span>
            </label>

            <label className="block">
              <span className="text-sm font-medium">
                Descrição curta{" "}
                <span className="text-muted-foreground">(opcional)</span>
              </span>
              <textarea
                name="short_description"
                rows={3}
                maxLength={160}
                placeholder="Pousada pé na areia com café da manhã regional…"
                className="mt-1 w-full rounded-lg border border-input px-3 py-2"
              />
            </label>

            {error && (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground disabled:opacity-60"
            >
              {submitting ? "Criando conta…" : "Criar conta de parceiro"}
            </button>

            <p className="text-center text-xs text-muted-foreground">
              Ao continuar você concorda com os Termos de Uso e a Política de
              Privacidade.
            </p>
          </form>
        )}
      </section>
    </>
  );
}