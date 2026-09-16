// src/routes/admin/partners/create.tsx
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  onboardPartner,
  getAdminData,
  type OnboardPartnerData,
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

export const Route = createFileRoute("/admin/partners/create")({
  component: CreatePartner,
});

function CreatePartner() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  const [form, setForm] = useState<OnboardPartnerData>({
    name: "",
    email: "",
    category_id: "",
    city_id: "",
    plan_type: "gratuito",
    send_invite: false,

    slug: "",
    short_description: "",
    description: "",
    price_from: 0,
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
  });

  // auxiliar para string → number | null
  const toNumber = (v: string): number | null => {
    if (v.trim() === "") return null;
    const n = Number(v.replace(",", "."));
    return Number.isFinite(n) ? n : null;
  };

  useEffect(() => {
    Promise.all([
      getAdminData("categories").catch(() => ({ data: [] })),
      getAdminData("cities").catch(() => ({ data: [] })),
    ]).then(([catsRes, citiesRes]) => {
      setCategories((catsRes.data as Category[]) || []);
      setCities((citiesRes.data as City[]) || []);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.category_id || !form.city_id) {
      toast.error("Selecione categoria e cidade");
      return;
    }

    setLoading(true);
    try {
      const res = await onboardPartner(form);
      toast.success(
        res.data?.message || res.message || "Parceiro criado com sucesso!"
      );
      navigate({ to: "/admin/partners" });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Erro ao criar parceiro";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Novo Parceiro</h1>
        <p className="text-muted-foreground">
          Cadastre um novo parceiro com todos os dados do perfil.
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
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Ex: Pousada Maré Alta"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug (opcional)</Label>
            <Input
              id="slug"
              value={form.slug || ""}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              placeholder="pousada-mare-alta"
            />
            <p className="text-xs text-muted-foreground">
              Deixe vazio para gerar automaticamente a partir do nome.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="owner_email">E-mail do proprietário *</Label>
            <Input
              id="owner_email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="dono@email.com"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Categoria *</Label>
              <Select
                value={form.category_id}
                onValueChange={(val) =>
                  setForm({ ...form, category_id: val })
                }
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
                onValueChange={(val) => setForm({ ...form, city_id: val })}
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
              onValueChange={(val: string) =>
                setForm({
                  ...form,
                  plan_type: val as OnboardPartnerData["plan_type"],
                })
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
              value={form.short_description || ""}
              onChange={(e) =>
                setForm({ ...form, short_description: e.target.value })
              }
              placeholder="Ex: Pousada à beira-mar em Milagres"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição completa</Label>
            <textarea
              id="description"
              className="w-full rounded-md border border-border bg-background p-3 text-sm"
              rows={5}
              value={form.description || ""}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price_from">Preço a partir de (R$)</Label>
            <Input
              id="price_from"
              type="number"
              min={0}
              step="0.01"
              value={form.price_from ?? ""}
              onChange={(e) =>
                setForm({ ...form, price_from: toNumber(e.target.value) || 0 })
              }
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
                value={form.phone || ""}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input
                id="whatsapp"
                value={form.whatsapp || ""}
                onChange={(e) =>
                  setForm({ ...form, whatsapp: e.target.value })
                }
                placeholder="5582999999999"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                value={form.instagram || ""}
                onChange={(e) =>
                  setForm({ ...form, instagram: e.target.value })
                }
                placeholder="@seunegocio"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Site</Label>
              <Input
                id="website"
                value={form.website || ""}
                onChange={(e) =>
                  setForm({ ...form, website: e.target.value })
                }
                placeholder="https://..."
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
              value={form.address || ""}
              onChange={(e) =>
                setForm({ ...form, address: e.target.value })
              }
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                type="number"
                step="any"
                value={form.latitude ?? ""}
                onChange={(e) =>
                  setForm({ ...form, latitude: toNumber(e.target.value) || 0 })
                }
                placeholder="-9.05000000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                type="number"
                step="any"
                value={form.longitude ?? ""}
                onChange={(e) =>
                  setForm({ ...form, longitude: toNumber(e.target.value) || 0 })
                }
                placeholder="-35.23000000"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hours_of_operation">Horário de atendimento</Label>
            <Input
              id="hours_of_operation"
              value={form.hours_of_operation || ""}
              onChange={(e) =>
                setForm({ ...form, hours_of_operation: e.target.value })
              }
              placeholder="Seg a Sáb, 08h às 18h"
            />
          </div>
        </section>

        {/* ============ FLAGS ============ */}
        <section className="space-y-4">
          <h2 className="font-display text-lg font-semibold">Visibilidade</h2>

          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={!!form.active}
                onChange={(e) =>
                  setForm({ ...form, active: e.target.checked })
                }
              />
              Ativo no site
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={!!form.featured}
                onChange={(e) =>
                  setForm({ ...form, featured: e.target.checked })
                }
              />
              Em destaque na home
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={!!form.send_invite}
                onChange={(e) =>
                  setForm({ ...form, send_invite: e.target.checked })
                }
              />
              Enviar convite por e-mail
            </label>
          </div>
        </section>

        <div className="flex gap-3 pt-2">
          <Button type="submit" disabled={loading}>
            {loading ? "Criando..." : "Criar Parceiro"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate({ to: "/admin/partners" })}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}