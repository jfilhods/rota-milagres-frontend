import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";
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

  if (!form) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
        Carregando dados do parceiro...
      </div>
    );
  }

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => (f ? { ...f, [k]: v } : f));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setSaved(false);
    try {
      const payload: Partial<Partner> = {
        name: form.name,
        short: form.short,
        description: form.description || null,
        city: form.city,
        address: form.address || null,
        phone: form.phone,
        whatsapp: form.whatsapp,
        instagram: form.instagram || null,
        website: form.website || null,
        hours_of_operation: form.hours_of_operation || null,
        priceFrom: form.priceFrom ? Number(form.priceFrom) : null,
      };
      await updateMyPartner(payload);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao salvar.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold md:text-3xl">
          Meu negócio
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Esses dados aparecem no seu perfil público da Rota Milagres.
        </p>
      </div>

      <Section title="Informações principais">
        <Field label="Nome do negócio">
          <input
            className="input"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            required
          />
        </Field>

        <Field label="Descrição curta" hint="Até 120 caracteres">
          <input
            className="input"
            maxLength={120}
            value={form.short}
            onChange={(e) => set("short", e.target.value)}
          />
        </Field>

        <Field label="Descrição completa">
          <textarea
            className="input min-h-[120px]"
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Cidade">
            <input
              className="input"
              value={form.city}
              onChange={(e) => set("city", e.target.value)}
            />
          </Field>
          <Field label="Endereço">
            <input
              className="input"
              value={form.address}
              onChange={(e) => set("address", e.target.value)}
            />
          </Field>
        </div>

        <Field label="Preço a partir de (R$)" hint="Opcional">
          <input
            type="number"
            min={0}
            step="0.01"
            className="input"
            value={form.priceFrom}
            onChange={(e) => set("priceFrom", e.target.value)}
          />
        </Field>
      </Section>

      <Section title="Contato">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="WhatsApp">
            <input
              className="input"
              value={form.whatsapp}
              onChange={(e) => set("whatsapp", e.target.value)}
              placeholder="(82) 99999-9999"
            />
          </Field>
          <Field label="Telefone">
            <input
              className="input"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
            />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Instagram">
            <input
              className="input"
              value={form.instagram}
              onChange={(e) => set("instagram", e.target.value)}
              placeholder="@seunegocio"
            />
          </Field>
          <Field label="Site">
            <input
              className="input"
              value={form.website}
              onChange={(e) => set("website", e.target.value)}
              placeholder="https://..."
            />
          </Field>
        </div>
        <Field label="Horário de atendimento">
          <input
            className="input"
            value={form.hours_of_operation}
            onChange={(e) => set("hours_of_operation", e.target.value)}
            placeholder="Seg a Sáb, 08h às 18h"
          />
        </Field>
      </Section>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Save className="size-4" />
          )}
          Salvar alterações
        </button>
        {saved && (
          <span className="text-sm text-emerald-600">Salvo com sucesso!</span>
        )}
      </div>
    </form>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <h2 className="mb-5 font-display text-lg font-semibold">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between text-sm font-medium">
        {label}
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