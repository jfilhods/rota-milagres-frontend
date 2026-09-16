// src/components/admin/AdminDashboard.tsx
import { useEffect, useState } from "react";
import {
  Building2,
  Camera,
  MapPin,
  ShieldCheck,
  Store,
  Users,
  BarChart3,
  CreditCard,
  Plus,
  X,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import {
  getAdminDashboard,
  getAdminPartners,
  getAdminUsers,
  getAdminData,
  onboardPartner,
  type AdminStats,
  type AdminPartner,
  type AdminUser,
  type Category,
  type City,
  type OnboardPartnerData,
} from "@/services/api";
import { Stat } from "@/components/shared/Stat";

import { SelectField,  } from "@/components/shared/SelectField";

export function AdminDashboard() {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [partners, setPartners] = useState<AdminPartner[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showNewPartner, setShowNewPartner] = useState(false);

  const loadAdmin = async (): Promise<void> => {
    try {
      const [dashboard, partnerList, userList, categoryList, cityList] = await Promise.all([
        getAdminDashboard(),
        getAdminPartners(),
        getAdminUsers(),
        getAdminData("categories"),
        getAdminData("cities"),
      ]);

      setStats(dashboard.data);
      setPartners(partnerList.data as AdminPartner[]);
      setUsers(userList.data as AdminUser[]);
      setCategories(categoryList.data as Category[]);
      setCities(cityList.data as City[]);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar administração");
    }
  };

  useEffect(() => {
    loadAdmin();
  }, []);

  return (
    <section className="px-4 py-6">
      <div className="mx-auto max-w-7xl">
        {/* Cabeçalho */}
        <header className="flex flex-col gap-4 rounded-2xl bg-card p-6 ring-1 ring-border md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
              <ShieldCheck className="size-4" /> ADMIN
            </div>
            <h1 className="mt-2 font-display text-3xl font-medium">Painel administrativo</h1>
            <p className="mt-1 text-sm text-muted-foreground">{user?.email} · acesso completo à plataforma</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowNewPartner(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              <Plus className="size-4" /> Novo parceiro
            </button>
            <button
              onClick={logout}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              <Camera className="size-4" /> Sair (na verdade LogOut, mas vou manter o ícone)
              <span className="sr-only">Sair</span>
            </button>
          </div>
        </header>

        {error && <div className="mt-6 rounded-xl bg-destructive/10 p-4 text-sm text-destructive">{error}</div>}

        {/* Cards de estatísticas */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <Stat icon={<Store />} label="Parceiros" value={stats?.partners ?? "—"} />
          <Stat icon={<Users />} label="Usuários" value={stats?.users ?? "—"} />
          <Stat icon={<CreditCard />} label="Assinaturas" value={stats?.subscriptions ?? "—"} />
          <Stat icon={<Building2 />} label="Categorias" value={stats?.categories ?? "—"} />
          <Stat icon={<MapPin />} label="Cidades" value={stats?.cities ?? "—"} />
        </div>

        {/* Listas de parceiros e usuários */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-2xl bg-card p-6 ring-1 ring-border">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl">Parceiros</h2>
                <p className="mt-1 text-sm text-muted-foreground">Todas as empresas da plataforma.</p>
              </div>
              <BarChart3 className="size-5 text-primary" />
            </div>
            <div className="mt-5 space-y-3">
              {partners.map((partner) => {
                const subscription = Array.isArray(partner.subscriptions)
                  ? partner.subscriptions[0]
                  : partner.subscriptions;
                return (
                  <div
                    key={partner.id}
                    className="flex flex-col gap-2 rounded-xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-medium">{partner.name}</p>
                      <p className="text-xs text-muted-foreground">
                        /{partner.slug} · {partner.active ? "Ativo" : "Inativo"}
                      </p>
                    </div>
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium uppercase">
                      {subscription?.plan_type || "gratuito"}
                    </span>
                  </div>
                );
              })}
              {!partners.length && <p className="text-sm text-muted-foreground">Nenhum parceiro cadastrado.</p>}
            </div>
          </div>

          <div className="rounded-2xl bg-card p-6 ring-1 ring-border">
            <h2 className="font-display text-xl">Usuários</h2>
            <p className="mt-1 text-sm text-muted-foreground">Papéis de acesso.</p>
            <div className="mt-5 space-y-3">
              {users.slice(0, 8).map((item) => (
                <div key={item.id} className="rounded-xl border border-border p-3">
                  <p className="truncate text-sm font-medium">{item.email}</p>
                  <p className="mt-1 text-xs uppercase text-primary">{item.role}</p>
                </div>
              ))}
              {!users.length && <p className="text-sm text-muted-foreground">Nenhum usuário.</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Novo Parceiro */}
      {showNewPartner && (
        <NewPartnerModal
          categories={categories}
          cities={cities}
          onClose={() => setShowNewPartner(false)}
          onCreated={async () => {
            setShowNewPartner(false);
            await loadAdmin();
          }}
        />
      )}
    </section>
  );
}

// =============================================
// Modal de criação de parceiro (inline)
// =============================================

function NewPartnerModal({
  categories,
  cities,
  onClose,
  onCreated,
}: {
  categories: Category[];
  cities: City[];
  onClose: () => void;
  onCreated: () => Promise<void>;
}) {
  const [form, setForm] = useState<OnboardPartnerData & { password?: string }>({
    name: "",
    owner_email: "",
    category_id: "",
    city_id: "",
    phone: "",
    whatsapp: "",
    address: "",
    plan_type: "gratuito",
    password: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError(null);

    if (!form.password || form.password.length < 8) {
      setError("A senha deve ter no mínimo 8 caracteres");
      setSaving(false);
      return;
    }

    const formData = {
      ...form,
      send_invite: false,
      default_password: form.password,
    };

    try {
      await onboardPartner(formData);
      setSuccess(
        `✅ Parceiro criado com sucesso!\n📧 E-mail: ${form.owner_email}\n🔑 Senha: ${form.password}\n\n⚠️ O parceiro deverá trocar a senha no primeiro acesso.`
      );
      setTimeout(() => void onCreated(), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível cadastrar o parceiro");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal="true">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-card p-6 shadow-xl ring-1 ring-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl">Novo parceiro</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Cria a empresa, assinatura e usuário OWNER com senha definida.
            </p>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-muted" aria-label="Fechar">
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-2">
          <Field
            label="Nome da empresa"
            value={form.name}
            required
            onChange={(name) => setForm((f) => ({ ...f, name }))}
          />
          <Field
            label="E-mail do responsável"
            type="email"
            value={form.owner_email}
            required
            onChange={(owner_email) => setForm((f) => ({ ...f, owner_email }))}
          />

          <div className="sm:col-span-2">
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-muted-foreground">
                Senha de acesso <span className="text-destructive">*</span>
              </span>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  value={form.password || ""}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 pr-12 text-sm outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Mínimo 8 caracteres"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                O parceiro será forçado a trocar esta senha no primeiro login.
              </p>
            </label>
          </div>

          <SelectField
            label="Categoria"
            value={form.category_id}
            required
            options={categories.map((c) => ({ value: c.id, label: c.name }))}
            onChange={(category_id) => setForm((f) => ({ ...f, category_id }))}
          />
          <SelectField
            label="Cidade"
            value={form.city_id}
            required
            options={cities.map((c) => ({ value: c.id, label: c.name }))}
            onChange={(city_id) => setForm((f) => ({ ...f, city_id }))}
          />
          <SelectField
            label="Plano"
            value={form.plan_type}
            options={["gratuito", "bronze", "prata", "ouro"].map((p) => ({ value: p, label: p.toUpperCase() }))}
            onChange={(plan_type) => setForm((f) => ({ ...f, plan_type: plan_type as typeof f.plan_type }))}
          />
          <Field
            label="Telefone"
            value={form.phone || ""}
            onChange={(phone) => setForm((f) => ({ ...f, phone }))}
          />
          <Field
            label="WhatsApp"
            value={form.whatsapp || ""}
            onChange={(whatsapp) => setForm((f) => ({ ...f, whatsapp }))}
          />
          <Field
            label="Endereço"
            value={form.address || ""}
            onChange={(address) => setForm((f) => ({ ...f, address }))}
          />

          <div className="sm:col-span-2 rounded-xl bg-amber-50 p-4 text-sm text-amber-800 border border-amber-200">
            <strong>ℹ️ Instruções:</strong>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>O parceiro receberá as credenciais por e-mail ou canal seguro</li>
              <li>No primeiro acesso, será obrigado a trocar a senha</li>
              <li>A senha temporária deve ter no mínimo 8 caracteres</li>
            </ul>
          </div>

          {error && (
            <div className="sm:col-span-2 rounded-xl bg-destructive/10 p-3 text-sm text-destructive">{error}</div>
          )}
          {success && (
            <div className="sm:col-span-2 rounded-xl bg-primary/10 p-3 text-sm text-primary whitespace-pre-line">
              {success}
            </div>
          )}

          <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-border px-4 py-2 text-sm hover:bg-muted"
            >
              Cancelar
            </button>
            <button
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60 hover:opacity-90"
            >
              {saving && <Loader2 className="size-4 animate-spin" />}
              Criar parceiro
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}