/* eslint-disable @typescript-eslint/no-explicit-any */
// src/routes/admin/partners/$id.edit.tsx
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  getAdminPartners,
  updateAdminPartner,
  updateAdminSubscription,
  getAdminData,
  resetPartnerPasswordByPartnerId,
  type UpdatePartnerData,
  type Category,
  type City,
} from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/admin/partners/$id/edit")({
  component: EditPartner,
});

/* ---------- Helpers ---------- */

function toNumber(v: string): number | null {
  if (v.trim() === "") return null;
  const n = Number(v.replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

function pickFirst<T>(value: T | T[] | undefined | null): T | null {
  if (Array.isArray(value)) return value[0] ?? null;
  return (value as T) ?? null;
}

/* ---------- Estado do form ---------- */

type FormState = {
  name: string;
  slug: string;
  email: string; // readonly
  category_id: string;
  city_id: string;
  plan_type: "gratuito" | "bronze" | "prata" | "ouro";
  short_description: string;
  description: string;
  price_from: string; // string para o input
  phone: string;
  whatsapp: string;
  instagram: string;
  website: string;
  hours_of_operation: string;
  address: string;
  latitude: number;
  longitude: number;
  featured: boolean;
  active: boolean;
};

const EMPTY_FORM: FormState = {
  name: "",
  slug: "",
  email: "",
  category_id: "",
  city_id: "",
  plan_type: "gratuito",
  short_description: "",
  description: "",
  price_from: "",
  phone: "",
  whatsapp: "",
  instagram: "",
  website: "",
  hours_of_operation: "",
  address: "",
  latitude: 0,
  longitude: 0,
  featured: false,
  active: true,
};

/* ---------- Página ---------- */

function EditPartner() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [categories, setCategories] = useState<Category[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetting, setResetting] = useState(false);

  /* ---------- Carrega dados ---------- */
  useEffect(() => {
    const load = async () => {
      try {
        setFetching(true);

        // 1) categorias + cidades para os selects
        const [catsRes, citiesRes] = await Promise.all([
          getAdminData("categories").catch(() => ({ data: [] })),
          getAdminData("cities").catch(() => ({ data: [] })),
        ]);
        setCategories((catsRes.data as Category[]) || []);
        setCities((citiesRes.data as City[]) || []);

        // 2) o parceiro em si
        const res = await getAdminPartners();
        const found = (res.data || []).find((p) => p.id === id);

        if (!found) {
          toast.error("Parceiro não encontrado");
          navigate({ to: "/admin/partners" });
          return;
        }

        // 3) preenche o formulário — atenção aos campos vindos do join
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const p = found as any;
        const sub = pickFirst<any>(p.subscriptions);
        const categoryObj = pickFirst<any>(p.categories);
        const cityObj = pickFirst<any>(p.cities);

        setForm({
          name: p.name ?? "",
          slug: p.slug ?? "",
          email: p.email ?? p.owner_email ?? "",
          category_id: p.category_id ?? categoryObj?.id ?? "",
          city_id: p.city_id ?? cityObj?.id ?? "",
          plan_type: (sub?.plan_type as FormState["plan_type"]) ?? "gratuito",
          short_description: p.short_description ?? "",
          description: p.description ?? "",
          price_from:
            p.price_from != null ? String(p.price_from) : "",
          phone: p.phone ?? "",
          whatsapp: p.whatsapp ?? "",
          instagram: p.instagram ?? "",
          website: p.website ?? "",
          hours_of_operation: p.hours_of_operation ?? "",
          address: p.address ?? "",
          latitude: p.latitude != null ? p.latitude : 0,
          longitude: p.longitude != null ? p.longitude : 0,
          featured: !!p.featured,
          active: p.active ?? true,
        });
      } catch {
        toast.error("Erro ao carregar parceiro");
      } finally {
        setFetching(false);
      }
    };

    if (id) load();
  }, [id, navigate]);

  /* ---------- Helpers de edição ---------- */
  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  /* ---------- Salvar ---------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload: UpdatePartnerData = {
        name: form.name || undefined,
        slug: form.slug || undefined,
        category_id: form.category_id || undefined,
        city_id: form.city_id || undefined,
        short_description: form.short_description || null,
        description: form.description || null,
        price_from: form.price_from === "" ? null : toNumber(form.price_from),
        phone: form.phone || null,
        whatsapp: form.whatsapp || null,
        instagram: form.instagram || null,
        website: form.website || null,
        hours_of_operation: form.hours_of_operation || null,
        address: form.address || null,
        latitude: form.latitude === 0 ? null : (form.latitude),
        longitude: form.longitude === 0 ? null : (form.longitude),
        featured: form.featured,
        active: form.active,
      };

      await updateAdminPartner(id, payload);

      // atualiza subscription (plano) separadamente
      try {
        await updateAdminSubscription(id, { plan_type: form.plan_type });
      } catch {
        // se a subscription não existir ainda, ignora — o partner já foi salvo
      }

      toast.success("Parceiro atualizado!");
      navigate({ to: "/admin/partners" });
    } catch (error: unknown) {
      const msg =
        error instanceof Error ? error.message : "Erro ao atualizar";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  /* ---------- Resetar senha ---------- */
  const handleResetPassword = async () => {
    if (!newPassword || newPassword.length < 8) {
      toast.error("Senha deve ter no mínimo 8 caracteres");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("As senhas não conferem");
      return;
    }

    setResetting(true);
    try {
      await resetPartnerPasswordByPartnerId(id, newPassword);
      toast.success("Senha alterada com sucesso!");
      setShowPasswordModal(false);
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao alterar senha"
      );
    } finally {
      setResetting(false);
    }
  };

  if (fetching) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        Carregando parceiro...
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Editar Parceiro</h1>
        <p className="text-muted-foreground">
          Atualize as informações de {form.name || "parceiro"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* ============ BÁSICO ============ */}
        <section className="space-y-4">
          <h2 className="font-display text-lg font-semibold">Básico</h2>

          <div className="space-y-2">
            <Label htmlFor="name">Nome do estabelecimento *</Label>
            <Input
              id="name"
              required
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={form.slug}
              onChange={(e) => set("slug", e.target.value)}
              placeholder="pousada-mare-alta"
            />
            <p className="text-xs text-muted-foreground">
              Deixe vazio e o slug será gerado automaticamente a partir do nome.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail do proprietário</Label>
            <Input
              id="email"
              value={form.email}
              readOnly
              className="bg-muted/50"
            />
            <p className="text-xs text-muted-foreground">
              O e-mail não pode ser alterado aqui (é o login do parceiro).
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Categoria *</Label>
              <Select
                value={form.category_id}
                onValueChange={(val) => set("category_id", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Cidade *</Label>
              <Select
                value={form.city_id}
                onValueChange={(val) => set("city_id", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city.id} value={city.id}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Plano</Label>
            <Select
              value={form.plan_type}
              onValueChange={(val) =>
                set("plan_type", val as FormState["plan_type"])
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gratuito">Gratuito</SelectItem>
                <SelectItem value="bronze">Bronze</SelectItem>
                <SelectItem value="prata">Prata</SelectItem>
                <SelectItem value="ouro">Ouro</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* ============ DESCRIÇÃO ============ */}
        <section className="space-y-4">
          <h2 className="font-display text-lg font-semibold">Descrição</h2>

          <div className="space-y-2">
            <Label htmlFor="short_description">Descrição curta</Label>
            <Input
              id="short_description"
              maxLength={140}
              value={form.short_description}
              onChange={(e) => set("short_description", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição completa</Label>
            <textarea
              id="description"
              className="w-full rounded-md border border-border bg-background p-3 text-sm"
              rows={5}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price_from">Preço a partir de (R$)</Label>
            <Input
              id="price_from"
              type="number"
              min={0}
              step="0.01"
              value={form.price_from}
              onChange={(e) => set("price_from", e.target.value)}
              placeholder="350.00"
            />
          </div>
        </section>

        {/* ============ CONTATO ============ */}
        <section className="space-y-4">
          <h2 className="font-display text-lg font-semibold">Contato</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input
                id="whatsapp"
                value={form.whatsapp}
                onChange={(e) => set("whatsapp", e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                value={form.instagram}
                onChange={(e) => set("instagram", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Site</Label>
              <Input
                id="website"
                value={form.website}
                onChange={(e) => set("website", e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* ============ LOCALIZAÇÃO / HORÁRIO ============ */}
        <section className="space-y-4">
          <h2 className="font-display text-lg font-semibold">
            Localização & horário
          </h2>

          <div className="space-y-2">
            <Label htmlFor="address">Endereço</Label>
            <Input
              id="address"
              value={form.address}
              onChange={(e) => set("address", e.target.value)}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                type="number"
                step="any"
                value={form.latitude}
                onChange={(e) => set("latitude", e.target.value === "" ? 0 : parseFloat(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                type="number"
                step="any"
                value={form.longitude}
                onChange={(e) => set("longitude", e.target.value === "" ? 0 : parseFloat(e.target.value))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hours_of_operation">
              Horário de atendimento
            </Label>
            <Input
              id="hours_of_operation"
              value={form.hours_of_operation}
              onChange={(e) => set("hours_of_operation", e.target.value)}
              placeholder="Seg a Sáb, 08h às 18h"
            />
          </div>
        </section>

        {/* ============ VISIBILIDADE ============ */}
        <section className="space-y-4">
          <h2 className="font-display text-lg font-semibold">Visibilidade</h2>

          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => set("active", e.target.checked)}
              />
              Ativo no site
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => set("featured", e.target.checked)}
              />
              Em destaque na home
            </label>
          </div>
        </section>

        {/* ============ AÇÕES ============ */}
        <div className="flex flex-wrap gap-3 pt-2">
          <Button type="submit" disabled={saving}>
            {saving ? "Salvando..." : "Salvar alterações"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate({ to: "/admin/partners" })}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowPasswordModal(true)}
          >
            Resetar senha
          </Button>
        </div>
      </form>

      {/* --------- Modal de senha --------- */}
      <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Resetar senha do parceiro</DialogTitle>
            <DialogDescription>
              Defina uma nova senha para <strong>{form.name}</strong>. O
              parceiro poderá alterá-la depois pelo painel.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="new-password">Nova senha</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Mínimo 8 caracteres"
                autoComplete="new-password"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmar senha</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repita a senha"
                autoComplete="new-password"
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowPasswordModal(false);
                setNewPassword("");
                setConfirmPassword("");
              }}
              disabled={resetting}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleResetPassword}
              disabled={resetting}
            >
              {resetting ? "Alterando..." : "Confirmar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}