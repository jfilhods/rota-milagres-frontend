
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Loader2, Save, Building2, Phone, MapPin } from "lucide-react";
import { usePartner } from "@/hooks/use-partner";
import { updateMyPartner } from "@/lib/partner-api";
import type { Partner } from "@/lib/catalog";

export const Route = createFileRoute("/painel/perfil")({
  component: PerfilPage,
});

type FormState = {
  name: string;
  short: string;
  description: string;
  city: string;
  address: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  website: string;
  hours_of_operation: string;
  priceFrom: string;
};

function PerfilPage() {
  const partner = usePartner();
  const [form, setForm] = useState<FormState | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!partner) return;

    setForm({
      name: partner.name ?? "",
      short: partner.short ?? "",
      description: partner.description ?? "",
      city: partner.city ?? "",
      address: partner.address ?? "",
      phone: partner.phone ?? "",
      whatsapp: partner.whatsapp ?? "",
      instagram: partner.instagram ?? "",
      website: partner.website ?? "",
      hours_of_operation: partner.hours_of_operation ?? "",
      priceFrom:
        partner.priceFrom != null ? String(partner.priceFrom) : "",
    });
  }, [partner]);

  const set = <K extends keyof FormState>(
    key: K,
    value: FormState[K],
  ) =>
    setForm((current) =>
      current ? { ...current, [key]: value } : current,
    );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form || saving) return;

    const rawPrice = form.priceFrom.trim();
    const priceFrom =
      rawPrice === "" ? null : Number(rawPrice);

    if (
      priceFrom !== null &&
      (!Number.isFinite(priceFrom) || priceFrom < 0)
    ) {
      alert("Informe um preço válido.");
      return;
    }

    setSaving(true);
    setSaved(false);

    try {
      await updateMyPartner({
        name: form.name.trim(),
        short: form.short.trim(),
        description: form.description.trim() || null,
        city: form.city.trim(),
        address: form.address.trim() || null,
        phone: form.phone.trim(),
        whatsapp: form.whatsapp.trim(),
        instagram: form.instagram.trim() || null,
        website: form.website.trim() || null,
        hours_of_operation:
          form.hours_of_operation.trim() || null,
        priceFrom,
      } satisfies Partial<Partner>);

      setSaved(true);

      window.setTimeout(() => {
        setSaved(false);
      }, 3000);
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Erro ao salvar.",
      );
    } finally {
      setSaving(false);
    }
  }

  if (!form) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
        Carregando dados do parceiro...
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-8xl space-y-8 pb-10"
    >
      {/* CABEÇALHO */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Building2 className="size-5" />
            </div>

            <div>
              <h1 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                Meu negócio
              </h1>

              <p className="mt-1 text-sm text-muted-foreground">
                Gerencie as informações que aparecem na sua página
                pública.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* INFORMAÇÕES PRINCIPAIS */}
      <Section
        title="Informações principais"
        description="Essas informações ajudam os visitantes a conhecerem seu negócio."
      >
        <div className="space-y-5">
          <Field label="Nome do negócio" required>
            <Input
              value={form.name}
              onChange={(event) =>
                set("name", event.target.value)
              }
              placeholder="Ex.: Pousada Maré Alta"
              required
            />
          </Field>

          <Field
            label="Descrição curta"
            hint={`${form.short.length}/120`}
          >
            <Input
              maxLength={120}
              value={form.short}
              onChange={(event) =>
                set("short", event.target.value)
              }
              placeholder="Uma frase curta sobre o seu negócio"
            />
          </Field>

          <Field label="Descrição completa">
            <textarea
              className={textareaClass}
              value={form.description}
              onChange={(event) =>
                set("description", event.target.value)
              }
              placeholder="Conte um pouco mais sobre seu negócio, seus serviços e o que oferece aos visitantes..."
              rows={6}
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Cidade">
              <Input
                value={form.city}
                onChange={(event) =>
                  set("city", event.target.value)
                }
                placeholder="São Miguel dos Milagres"
              />
            </Field>

            <Field label="Endereço">
              <Input
                value={form.address}
                onChange={(event) =>
                  set("address", event.target.value)
                }
                placeholder="Rua, número, bairro..."
              />
            </Field>
          </div>

          <Field
            label="Preço a partir de (R$)"
            hint="Opcional"
          >
            <Input
              type="number"
              min={0}
              step="0.01"
              value={form.priceFrom}
              onChange={(event) =>
                set("priceFrom", event.target.value)
              }
              placeholder="0,00"
            />
          </Field>
        </div>
      </Section>

      {/* CONTATO */}
      <Section
        title="Contato"
        description="Facilite o contato dos visitantes com seu negócio."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="WhatsApp">
            <Input
              value={form.whatsapp}
              onChange={(event) =>
                set("whatsapp", event.target.value)
              }
              placeholder="(82) 99999-9999"
              icon={<Phone className="size-4" />}
            />
          </Field>

          <Field label="Telefone">
            <Input
              value={form.phone}
              onChange={(event) =>
                set("phone", event.target.value)
              }
              placeholder="(82) 3333-3333"
              icon={<Phone className="size-4" />}
            />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Instagram">
            <Input
              value={form.instagram}
              onChange={(event) =>
                set("instagram", event.target.value)
              }
              placeholder="@seunegocio"
            />
          </Field>

          <Field label="Site">
            <Input
              value={form.website}
              onChange={(event) =>
                set("website", event.target.value)
              }
              placeholder="https://seusite.com.br"
            />
          </Field>
        </div>

        <Field label="Horário de atendimento">
          <Input
            value={form.hours_of_operation}
            onChange={(event) =>
              set("hours_of_operation", event.target.value)
            }
            placeholder="Seg a Sáb, 08h às 18h"
          />
        </Field>
      </Section>

      {/* LOCALIZAÇÃO */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-5 flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <MapPin className="size-5" />
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold">
              Localização
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Mantenha a cidade e o endereço do seu negócio
              atualizados.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-primary/10 bg-primary/5 p-4 text-sm text-muted-foreground">
          <strong className="text-foreground">
            Dica:
          </strong>{" "}
          um endereço completo facilita para os visitantes
          encontrarem seu negócio.
        </div>
      </div>

      {/* BOTÃO */}
      <div className="sticky bottom-4 z-10">
        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card/95 p-4 shadow-lg backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm">
            {saved ? (
              <span className="font-medium text-emerald-600">
                ✓ Alterações salvas com sucesso!
              </span>
            ) : (
              <span className="text-muted-foreground">
                Não esqueça de salvar suas alterações.
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={saving}
            className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:opacity-90 hover:shadow-md disabled:pointer-events-none disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="size-4" />
                Salvar alterações
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

/* ============================================================
   COMPONENTES VISUAIS
============================================================ */

const inputClass =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground shadow-sm outline-none transition-all placeholder:text-muted-foreground/70 hover:border-primary/40 focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-50";

const textareaClass =
  "w-full resize-y rounded-xl border border-input bg-background px-4 py-3 text-sm leading-6 text-foreground shadow-sm outline-none transition-all placeholder:text-muted-foreground/70 hover:border-primary/40 focus:border-primary focus:ring-4 focus:ring-primary/10";

function Input({
  icon,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: ReactNode;
}) {
  return (
    <div className="relative">
      {icon && (
        <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </div>
      )}

      <input
        {...props}
        className={`${inputClass} ${
          icon ? "pl-10" : ""
        } ${props.className ?? ""}`}
      />
    </div>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="mb-6 border-b border-border pb-5">
        <h2 className="font-display text-lg font-semibold">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {children}
    </section>
  );
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center justify-between gap-3 text-sm font-semibold text-foreground">
        <span>
          {label}
          {required && (
            <span className="ml-1 text-destructive">*</span>
          )}
        </span>

        {hint && (
          <span className="text-xs font-normal text-muted-foreground">
            {hint}
          </span>
        )}
      </span>

      {children}
    </label>
  );
}

