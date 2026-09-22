// routes/onboarding.tsx
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { supabase } from "@/lib/supabase";

type PlanId = "gratuito" | "bronze" | "prata" | "ouro";

interface Search {
  plano: PlanId; // ← obrigatório
}

interface Option {
  id: string;
  name: string;
}

export const Route = createFileRoute("/onboarding/disable")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    plano: (search["plano"] as PlanId) ?? "gratuito",
  }),
  component: OnboardingPage,
});

function OnboardingPage() {
  const { plano } = Route.useSearch();
  const navigate = useNavigate();

  const [ready, setReady] = useState(false);
  const [categories, setCategories] = useState<Option[]>([]);
  const [cities, setCities] = useState<Option[]>([]);
  const [submitting, setSubmitting] = useState(false); // ← era "saving", troquei
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      const { data } = await supabase.auth.getSession();
      if (!active) return;

      if (!data.session) {
        navigate({
          to: "/cadastro-parceiro",
          search: { plano }, // plano já é PlanId, sem ?? "gratuito"
        });
        return;
      }

      try {
        const api = import.meta.env.VITE_API_URL;

        // Seu backend retorna array direto em /categories e /cities,
        // não { data: [...] }. Ajustei para lidar com os dois formatos.
        const [catRes, cityRes] = await Promise.all([
          fetch(`${api}categories`).then((r) => r.json()),
          fetch(`${api}cities`).then((r) => r.json()),
        ]);

        if (!active) return;

        setCategories(Array.isArray(catRes) ? catRes : (catRes.data ?? []));
        setCities(Array.isArray(cityRes) ? cityRes : (cityRes.data ?? []));
      } catch {
        if (active) setError("Não foi possível carregar categorias e cidades.");
      } finally {
        if (active) setReady(true);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [navigate, plano]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setSubmitting(true);
  setError(null);

  const fd = new FormData(e.currentTarget);

  const { data: session } = await supabase.auth.getSession();
  const email = session.session?.user.email;
  const token = session.session?.access_token;

  if (!email || !token) {
    setError("Sessão expirada. Faça login novamente.");
    setSubmitting(false);
    return;
  }

  const payload = {
    name: String(fd.get("name") ?? "").trim(),
    email,
    category_id: String(fd.get("category_id") ?? ""),
    city_id: String(fd.get("city_id") ?? ""),
    whatsapp: String(fd.get("whatsapp") ?? "").trim(),
    short_description:
      String(fd.get("short_description") ?? "").trim() || undefined,
    plan_type: plano,
    send_invite: false, // usuário já autenticado via Google
  };

  try {
    const api = import.meta.env.VITE_API_URL;
    const res = await fetch(`${api}onboarding`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ← ESSENCIAL
      },
      body: JSON.stringify(payload),
    });

    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error ?? "Erro ao criar parceiro");
    }

    navigate({ to: "/painel" });
  } catch (err) {
    setError(err instanceof Error ? err.message : "Erro inesperado");
  } finally {
    setSubmitting(false);
  }
}

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">Carregando…</p>
      </div>
    );
  }

  return (
    <>
      <SiteHeader />
      <section className="mx-auto max-w-xl px-4 py-12">
        <h1 className="font-display text-2xl font-medium">
          Complete o cadastro da sua empresa
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Plano selecionado: <strong className="capitalize">{plano}</strong>
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block">
            <span className="text-sm font-medium">Nome do negócio</span>
            <input
              name="name"
              required
              className="mt-1 w-full rounded-lg border border-input px-3 py-2"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">WhatsApp</span>
            <input
              name="whatsapp"
              required
              placeholder="558291189998"
              inputMode="numeric"
              className="mt-1 w-full rounded-lg border border-input px-3 py-2"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">
              Descrição curta <span className="text-muted-foreground">(opcional)</span>
            </span>
            <textarea
              name="short_description"
              rows={3}
              maxLength={160}
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
            {submitting ? "Salvando…" : "Criar minha página"}
          </button>
        </form>
      </section>
    </>
  );
}