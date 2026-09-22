import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  getAdminDashboard,
  getAdminPartners,
  type AdminStats,
  type AdminPartner,
} from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Store,
  Users,
  CreditCard,
  MapPin,
  Plus,
  ArrowRight,
  Building2,
  UserCircle2,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import type { LucideIcon } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

const STAT_CARDS: {
  title: string;
  key: keyof AdminStats;
  icon: LucideIcon;
  accent: string;
  iconBg: string;
  description: string;
}[] = [
  {
    title: "Parceiros",
    key: "partners",
    icon: Store,
    accent: "text-sky-600 dark:text-sky-400",
    iconBg: "bg-sky-500/10",
    description: "Estabelecimentos cadastrados",
  },
  {
    title: "Clientes",
    key: "clients",
    icon: UserCircle2,
    accent: "text-violet-600 dark:text-violet-400",
    iconBg: "bg-violet-500/10",
    description: "Usuários do app / site",
  },
  {
    title: "Assinaturas",
    key: "subscriptions",
    icon: CreditCard,
    accent: "text-emerald-600 dark:text-emerald-400",
    iconBg: "bg-emerald-500/10",
    description: "Planos vinculados",
  },
  {
    title: "Cidades",
    key: "cities",
    icon: MapPin,
    accent: "text-rose-600 dark:text-rose-400",
    iconBg: "bg-rose-500/10",
    description: "Cidades ativas na rota",
  },
];

function planBadgeVariant(plan: string) {
  const p = plan.toLowerCase();
  if (p === "ouro") return "default" as const;
  if (p === "prata") return "secondary" as const;
  if (p === "bronze") return "outline" as const;
  return "outline" as const;
}

function getPlan(partner: AdminPartner) {
  if (!partner.subscriptions) return "gratuito";
  if (Array.isArray(partner.subscriptions)) {
    return partner.subscriptions[0]?.plan_type ?? "gratuito";
  }
  return partner.subscriptions.plan_type ?? "gratuito";
}

function getCityName(partner: AdminPartner) {
  const c = partner.cities;
  if (!c) return null;
  if (Array.isArray(c)) return c[0]?.name ?? null;
  return (c as { name?: string }).name ?? null;
}

function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [partners, setPartners] = useState<AdminPartner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [statsRes, partnersRes] = await Promise.all([
          getAdminDashboard(),
          getAdminPartners(),
        ]);
        if (statsRes?.data) setStats(statsRes.data);
        if (partnersRes?.data) setPartners(partnersRes.data);
      } catch (err) {
        console.error(err);
        toast.error(
          err instanceof Error ? err.message : "Erro ao carregar dashboard"
        );
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Visão geral: parceiros, clientes, assinaturas e cidades
          </p>
        </div>
        <Link to="/admin/partners/create">
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Novo Parceiro
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STAT_CARDS.map((card) => {
          const Icon = card.icon;
          const value = stats?.[card.key];

          return (
            <Card
              key={card.title}
              className="overflow-hidden border-border/60 transition-shadow hover:shadow-md"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${card.iconBg}`}
                >
                  <Icon className={`h-4 w-4 ${card.accent}`} />
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    <div className="h-8 w-14 animate-pulse rounded bg-muted" />
                  </div>
                ) : (
                  <>
                    <div className="text-2xl font-bold tabular-nums tracking-tight">
                      {value ?? 0}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {card.description}
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Resumo extra (usuários do painel / categorias) se vier no payload */}
      {stats && (stats.users != null || stats.categories != null) && (
        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          {stats.users != null && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1">
              <Users className="h-3.5 w-3.5" />
              {stats.users} usuários do painel
            </span>
          )}
          {stats.categories != null && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1">
              {stats.categories} categorias
            </span>
          )}
        </div>
      )}

      {/* Parceiros recentes */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Parceiros</h2>
            <p className="text-xs text-muted-foreground">
              {partners.length === 0
                ? "Nenhum cadastrado"
                : `Últimos ${Math.min(partners.length, 10)} cadastrados`}
            </p>
          </div>
          <Link to="/admin/partners">
            <Button variant="outline" size="sm" className="shrink-0">
              Ver todos
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="h-10 w-10 animate-pulse rounded-xl bg-muted" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-40 animate-pulse rounded bg-muted" />
                    <div className="h-3 w-56 animate-pulse rounded bg-muted" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : partners.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center gap-3 py-14 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
                <Building2 className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">Nenhum parceiro cadastrado</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Cadastre o primeiro parceiro para começar.
                </p>
              </div>
              <Link to="/admin/partners/create">
                <Button size="sm" className="mt-1">
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Parceiro
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-3">
            {partners.slice(0, 10).map((partner) => {
              const plan = getPlan(partner);
              const city = getCityName(partner);

              return (
                <Card
                  key={partner.id}
                  className="border-border/60 transition-all hover:border-primary/30 hover:shadow-sm"
                >
                  <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-semibold text-primary">
                        {partner.name?.charAt(0)?.toUpperCase() || "P"}
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="truncate font-medium leading-tight">
                            {partner.name}
                          </h3>
                          <Badge
                            variant={partner.active ? "default" : "secondary"}
                            className={
                              partner.active
                                ? "bg-emerald-600 hover:bg-emerald-600"
                                : undefined
                            }
                          >
                            {partner.active ? "Ativo" : "Inativo"}
                          </Badge>
                          <Badge
                            variant={planBadgeVariant(plan)}
                            className="capitalize"
                          >
                            {plan}
                          </Badge>
                        </div>
                        <p className="mt-0.5 truncate text-sm text-muted-foreground">
                          /{partner.slug}
                          {city ? ` · ${city}` : ""}
                        </p>
                      </div>
                    </div>
                    <Link
                      to="/admin/partners/$id/edit"
                      params={{ id: partner.id }}
                      className="sm:shrink-0"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto"
                      >
                        Editar
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}