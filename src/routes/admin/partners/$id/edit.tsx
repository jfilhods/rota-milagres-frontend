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
import {
  Building2,
  FileText,
  Phone,
  MapPin,
  Eye,
  KeyRound,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

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

/** Máscara telefone BR: (99) 9999-9999 ou (99) 99999-9999 */
function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

/** Extrai lat/lng de URLs do Google Maps (vários formatos) */
function parseMapsUrl(url: string): { lat: number; lng: number } | null {
  if (!url.trim()) return null;

  const patterns = [
    /@(-?\d+\.?\d*),\s*(-?\d+\.?\d*)/, // @lat,lng
    /!3d(-?\d+\.?\d*)!4d(-?\d+\.?\d*)/, // embed !3d lat !4d lng
    /[?&]q=(-?\d+\.?\d*),\s*(-?\d+\.?\d*)/, // ?q=lat,lng
    /[?&]ll=(-?\d+\.?\d*),\s*(-?\d+\.?\d*)/, // ?ll=lat,lng
    /[?&]query=(-?\d+\.?\d*),\s*(-?\d+\.?\d*)/,
    /[?&]center=(-?\d+\.?\d*),\s*(-?\d+\.?\d*)/,
    /\/place\/[^/]*\/(-?\d+\.?\d*),\s*(-?\d+\.?\d*)/,
    /destination=(-?\d+\.?\d*),\s*(-?\d+\.?\d*)/,
  ];

  for (const re of patterns) {
    const m = url.match(re);
    if (m && m[1] != null && m[2] != null) {
      const lat = parseFloat(m[1]);
      const lng = parseFloat(m[2]);
      if (Number.isFinite(lat) && Number.isFinite(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180) {
        return { lat, lng };
      }
    }
  }
  return null;
}

function buildMapsUrl(lat: number, lng: number): string {
  if (!lat && !lng) return "";
  return `https://www.google.com/maps?q=${lat},${lng}`;
}

/* ---------- Estado do form ---------- */

type FormState = {
  name: string;
  slug: string;
  email: string;
  category_id: string;
  city_id: string;
  plan_type: "gratuito" | "bronze" | "prata" | "ouro";
  short_description: string;
  description: string;
  price_from: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  website: string;
  hours_of_operation: string;
  address: string;
  maps_url: string;
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
  maps_url: "",
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
  const [mapsStatus, setMapsStatus] = useState<"idle" | "ok" | "error">("idle");

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetting, setResetting] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setFetching(true);

        const [catsRes, citiesRes] = await Promise.all([
          getAdminData("categories").catch(() => ({ data: [] })),
          getAdminData("cities").catch(() => ({ data: [] })),
        ]);
        setCategories((catsRes.data as Category[]) || []);
        setCities((citiesRes.data as City[]) || []);

        const res = await getAdminPartners();
        const found = (res.data || []).find((p) => p.id === id);

        if (!found) {
          toast.error("Parceiro não encontrado");
          navigate({ to: "/admin/partners" });
          return;
        }

        const p = found as any;
        const sub = pickFirst<any>(p.subscriptions);
        const categoryObj = pickFirst<any>(p.categories);
        const cityObj = pickFirst<any>(p.cities);

        const lat = p.latitude != null ? Number(p.latitude) : 0;
        const lng = p.longitude != null ? Number(p.longitude) : 0;

        setForm({
          name: p.name ?? "",
          slug: p.slug ?? "",
          email: p.email ?? p.owner_email ?? "",
          category_id: p.category_id ?? categoryObj?.id ?? "",
          city_id: p.city_id ?? cityObj?.id ?? "",
          plan_type: (sub?.plan_type as FormState["plan_type"]) ?? "gratuito",
          short_description: p.short_description ?? "",
          description: p.description ?? "",
          price_from: p.price_from != null ? String(p.price_from) : "",
          phone: maskPhone(p.phone ?? ""),
          whatsapp: maskPhone(p.whatsapp ?? ""),
          instagram: p.instagram ?? "",
          website: p.website ?? "",
          hours_of_operation: p.hours_of_operation ?? "",
          address: p.address ?? "",
          maps_url: lat || lng ? buildMapsUrl(lat, lng) : "",
          latitude: lat,
          longitude: lng,
          featured: !!p.featured,
          active: p.active ?? true,
        });

        if (lat || lng) setMapsStatus("ok");
      } catch {
        toast.error("Erro ao carregar parceiro");
      } finally {
        setFetching(false);
      }
    };

    if (id) load();
  }, [id, navigate]);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleMapsUrlChange = (url: string) => {
    set("maps_url", url);

    if (!url.trim()) {
      set("latitude", 0);
      set("longitude", 0);
      setMapsStatus("idle");
      return;
    }

    const coords = parseMapsUrl(url);
    if (coords) {
      set("latitude", coords.lat);
      set("longitude", coords.lng);
      setMapsStatus("ok");
    } else {
      setMapsStatus("error");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Se tem URL mas não conseguiu parsear, avisa
      if (form.maps_url.trim() && mapsStatus === "error") {
        toast.error(
          "Não foi possível extrair as coordenadas do link. Cole um link completo do Google Maps (ex.: maps.google.com/...@lat,lng)."
        );
        setSaving(false);
        return;
      }

      const payload: UpdatePartnerData = {
        name: form.name || undefined,
        slug: form.slug || undefined,
        category_id: form.category_id || undefined,
        city_id: form.city_id || undefined,
        short_description: form.short_description || null,
        description: form.description || null,
        price_from: form.price_from === "" ? null : toNumber(form.price_from),
        phone: form.phone.replace(/\D/g, "") || null,
        whatsapp: form.whatsapp.replace(/\D/g, "") || null,
        instagram: form.instagram || null,
        website: form.website || null,
        hours_of_operation: form.hours_of_operation || null,
        address: form.address || null,
        latitude: form.latitude === 0 ? null : form.latitude,
        longitude: form.longitude === 0 ? null : form.longitude,
        featured: form.featured,
        active: form.active,
      };

      await updateAdminPartner(id, payload);

      try {
        await updateAdminSubscription(id, { plan_type: form.plan_type });
      } catch {
        // subscription pode não existir ainda
      }

      toast.success("Parceiro atualizado!");
      navigate({ to: "/admin/partners" });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Erro ao atualizar";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

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
      <div className="flex flex-col items-center justify-center gap-3 py-20 text-muted-foreground">
        <Loader2 className="size-8 animate-spin" />
        <p className="text-sm">Carregando parceiro...</p>
      </div>
    );
  }

  const shortLen = form.short_description.length;

  return (
    <div className="mx-auto max-w-10xl space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Editar Parceiro</h1>
          <p className="text-sm text-muted-foreground">
            Atualize as informações de{" "}
            <span className="font-medium text-foreground">
              {form.name || "parceiro"}
            </span>
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ============ BÁSICO ============ */}
        <Section
          title="Básico"
          description="Identificação e classificação do estabelecimento"
          icon={<Building2 className="size-5" />}
        >
          <div className="space-y-2">
            <Label htmlFor="name">Nome do estabelecimento *</Label>
            <Input
              id="name"
              required
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Ex: Pousada Recanto dos Anjos"
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
        </Section>

        {/* ============ DESCRIÇÃO ============ */}
        <Section
          title="Descrição"
          description="Textos que aparecem no perfil público"
          icon={<FileText className="size-5" />}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="short_description">Descrição curta</Label>
              <span className="text-xs text-muted-foreground">
                {shortLen}/140
              </span>
            </div>
            <Input
              id="short_description"
              maxLength={140}
              value={form.short_description}
              onChange={(e) => set("short_description", e.target.value)}
              placeholder="Uma frase que resume o negócio"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição completa</Label>
            <textarea
              id="description"
              className="min-h-[120px] w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              rows={5}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="História, diferenciais, o que o visitante pode esperar..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price_from">Preço a partir de (R$)</Label>
            <Input
              id="price_from"
              type="number"
              min={0}
              step="0.01"
              className="max-w-[180px]"
              value={form.price_from}
              onChange={(e) => set("price_from", e.target.value)}
              placeholder="350.00"
            />
          </div>
        </Section>

        {/* ============ CONTATO ============ */}
        <Section
          title="Contato"
          description="Telefone, WhatsApp e redes sociais"
          icon={<Phone className="size-5" />}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                type="tel"
                inputMode="numeric"
                value={form.phone}
                onChange={(e) => set("phone", maskPhone(e.target.value))}
                placeholder="(82) 3333-3333"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input
                id="whatsapp"
                type="tel"
                inputMode="numeric"
                value={form.whatsapp}
                onChange={(e) => set("whatsapp", maskPhone(e.target.value))}
                placeholder="(82) 99999-9999"
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
                placeholder="@seunegocio"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Site</Label>
              <Input
                id="website"
                value={form.website}
                onChange={(e) => set("website", e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hours_of_operation">Horário de atendimento</Label>
            <Input
              id="hours_of_operation"
              value={form.hours_of_operation}
              onChange={(e) => set("hours_of_operation", e.target.value)}
              placeholder="Seg a Sáb, 08h às 18h"
            />
          </div>
        </Section>

        {/* ============ LOCALIZAÇÃO ============ */}
        <Section
          title="Localização"
          description="Endereço e ponto no mapa"
          icon={<MapPin className="size-5" />}
        >
          <div className="space-y-2">
            <Label htmlFor="address">Endereço</Label>
            <Input
              id="address"
              value={form.address}
              onChange={(e) => set("address", e.target.value)}
              placeholder="Rua, número, bairro..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maps_url">Link do Google Maps</Label>
            <div className="flex gap-2">
              <Input
                id="maps_url"
                value={form.maps_url}
                onChange={(e) => handleMapsUrlChange(e.target.value)}
                placeholder="Cole o link do Google Maps aqui..."
                className="flex-1"
              />
              {form.latitude !== 0 && form.longitude !== 0 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  asChild
                  title="Abrir no Maps"
                >
                  <a
                    href={buildMapsUrl(form.latitude, form.longitude)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="size-4" />
                  </a>
                </Button>
              )}
            </div>

            {/* Feedback das coordenadas */}
            {mapsStatus === "ok" && (
              <div className="flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
                <div>
                  <p className="font-medium">Coordenadas detectadas</p>
                  <p className="text-xs opacity-90">
                    Lat: {form.latitude.toFixed(6)} · Lng:{" "}
                    {form.longitude.toFixed(6)}
                  </p>
                </div>
              </div>
            )}

            {mapsStatus === "error" && form.maps_url.trim() && (
              <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300">
                <AlertCircle className="mt-0.5 size-4 shrink-0" />
                <div>
                  <p className="font-medium">Não foi possível ler o link</p>
                  <p className="text-xs opacity-90">
                    Use um link completo do Google Maps (compartilhar → copiar
                    link). Links curtos (goo.gl / maps.app.goo.gl) às vezes não
                    trazem as coordenadas na URL.
                  </p>
                </div>
              </div>
            )}

            {mapsStatus === "idle" && (
              <p className="text-xs text-muted-foreground">
                No Google Maps: abra o local → Compartilhar → Copiar link. Cole
                aqui e as coordenadas serão preenchidas automaticamente.
              </p>
            )}
          </div>
        </Section>

        {/* ============ VISIBILIDADE ============ */}
        <Section
          title="Visibilidade"
          description="Controle o que aparece no site"
          icon={<Eye className="size-5" />}
        >
          <div className="flex flex-wrap gap-6">
            <label className="flex cursor-pointer items-center gap-2.5 text-sm">
              <input
                type="checkbox"
                className="size-4 rounded border-border"
                checked={form.active}
                onChange={(e) => set("active", e.target.checked)}
              />
              Ativo no site
            </label>

            <label className="flex cursor-pointer items-center gap-2.5 text-sm">
              <input
                type="checkbox"
                className="size-4 rounded border-border"
                checked={form.featured}
                onChange={(e) => set("featured", e.target.checked)}
              />
              Em destaque na home
            </label>
          </div>
        </Section>

        {/* ============ AÇÕES ============ */}
        <div className="sticky bottom-4 z-10 flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card/95 p-4 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-card/80">
          <Button type="submit" disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Salvando...
              </>
            ) : (
              "Salvar alterações"
            )}
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
            <KeyRound className="mr-2 size-4" />
            Resetar senha
          </Button>
        </div>
      </form>

      {/* Modal de senha */}
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

/* ---------- UI helpers ---------- */

function Section({
  title,
  description,
  icon,
  children,
}: {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-start gap-3 border-b border-border bg-muted/40 px-5 py-4 sm:px-6">
        {icon && (
          <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
        )}
        <div>
          <h2 className="font-display text-base font-semibold leading-tight">
            {title}
          </h2>
          {description && (
            <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      <div className="space-y-5 p-5 sm:p-6">{children}</div>
    </section>
  );
}