import { useEffect, useState } from "react";
import { Loader2, Building2 } from "lucide-react";
import { authJson } from "@/lib/auth-fetch";

interface Option {
  id: string;
  name: string;
}

interface Props {
  userEmail: string;
  userName: string;
  onSuccess: () => void | Promise<void>;
}

export function OnboardingModal({
  userEmail,
  userName,
  onSuccess,
}: Props) {
  const [categories, setCategories] = useState<Option[]>([]);
  const [cities, setCities] = useState<Option[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  

  const [form, setForm] = useState({
    name: "",
    category_id: "",
    city_id: "",
    whatsapp: "",
    short_description: "",
    address: "",
  });

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const api = import.meta.env.VITE_API_URL.replace(/\/+$/, "");

        const [catsRes, citiesRes] = await Promise.all([
          fetch(`${api}/categories`).then((r) => r.json()),
          fetch(`${api}/cities`).then((r) => r.json()),
        ]);

        if (!active) return;

        setCategories(
          Array.isArray(catsRes) ? catsRes : catsRes.data ?? []
        );

        setCities(
          Array.isArray(citiesRes) ? citiesRes : citiesRes.data ?? []
        );
      } catch {
        if (active) {
          setError(
            "Não foi possível carregar categorias e cidades."
          );
        }
      } finally {
        if (active) {
          setLoadingOptions(false);
        }
      }
    }

    load();

    return () => {
      active = false;
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (submitting) return;

    setSubmitting(true);
    setError(null);

    const payload = {
      name: form.name.trim(),
      email: userEmail,
      category_id: form.category_id,
      city_id: form.city_id,
      whatsapp: form.whatsapp.replace(/\D/g, ""),
      short_description:
        form.short_description.trim() || undefined,
      address: form.address.trim() || undefined,
      plan_type: "gratuito" as const,
      send_invite: false,
    };

    try {
      const res = await authJson<{
        success: boolean;
        message?: string;
        data?: unknown;
      }>("/onboarding", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!res.success) {
        throw new Error(
          res.message || "Erro ao criar cadastro."
        );
      }

      // IMPORTANTE:
      // depois de criar o parceiro, atualiza o usuário
      // antes de fechar o modal / voltar ao painel.
      await onSuccess();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erro inesperado ao criar cadastro."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-card shadow-2xl ring-1 ring-border">

        <div className="border-b border-border bg-gradient-to-br from-primary/5 to-transparent p-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Building2 className="size-5" />
            </div>

            <div>
              <h1 className="font-display text-xl font-semibold">
                Complete o cadastro da sua empresa
              </h1>

              <p className="text-sm text-muted-foreground">
                Olá
                {userName
                  ? `, ${userName.split(" ")[0]}`
                  : ""}
                ! Precisamos de algumas informações para criar
                sua página.
              </p>
            </div>
          </div>
        </div>

        <form
          id="onboarding-form"
          onSubmit={handleSubmit}
          className="max-h-[70vh] overflow-y-auto p-6"
        >
          {loadingOptions ? (
            <p className="text-sm text-muted-foreground">
              Carregando…
            </p>
          ) : (
            <div className="space-y-5">

              <Field label="Nome do negócio *">
                <input
                  required
                  minLength={2}
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  className="input"
                  placeholder="Ex: Pousada Maré Alta"
                />
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Categoria *">
                  <select
                    required
                    value={form.category_id}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        category_id: e.target.value,
                      })
                    }
                    className="input"
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
                </Field>

                <Field label="Cidade *">
                  <select
                    required
                    value={form.city_id}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        city_id: e.target.value,
                      })
                    }
                    className="input"
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
                </Field>
              </div>

              <Field label="WhatsApp *">
                <input
                  required
                  inputMode="numeric"
                  value={form.whatsapp}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      whatsapp: e.target.value,
                    })
                  }
                  className="input"
                  placeholder="5582999999999"
                />

                <span className="mt-1 block text-xs text-muted-foreground">
                  Formato internacional, apenas números.
                </span>
              </Field>

              <Field label="Descrição curta (opcional)">
                <input
                  maxLength={160}
                  value={form.short_description}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      short_description: e.target.value,
                    })
                  }
                  className="input"
                  placeholder="Pousada pé na areia com café regional"
                />
              </Field>

              <Field label="Endereço (opcional)">
                <input
                  value={form.address}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      address: e.target.value,
                    })
                  }
                  className="input"
                  placeholder="Rua da Praia, 123"
                />
              </Field>

              <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
                Você pode preencher os demais dados (fotos,
                horários, descrição completa) depois, no painel.
              </div>

              {error && (
                <p className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </p>
              )}
            </div>
          )}
        </form>

        <div className="border-t border-border bg-muted/30 p-4">
          <button
            type="submit"
            form="onboarding-form"
            disabled={submitting || loadingOptions}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
          >
            {submitting && (
              <Loader2 className="size-4 animate-spin" />
            )}

            {submitting
              ? "Criando sua página…"
              : "Criar minha página"}
          </button>
        </div>
      </div>
    </div>
  );
  
}


function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">
        {label}
      </span>

      {children}
    </label>
  );
}