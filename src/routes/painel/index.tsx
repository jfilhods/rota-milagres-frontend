import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Eye,
  MessageCircle,
  Star,
  Heart,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { usePartner } from "@/hooks/use-partner";
import { getStats, type Stats } from "@/lib/partner-api";

export const Route = createFileRoute("/painel/")({
  component: OverviewPage,
});

function OverviewPage() {
  const partner = usePartner();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStats()
      .then(setStats)
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  if (!partner) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
        Nenhum parceiro vinculado à sua conta.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold md:text-3xl">
          Olá, {partner.name}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Aqui está o resumo do seu negócio na Rota Milagres.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-muted-foreground">
          <Loader2 className="mr-2 size-5 animate-spin" />
          Carregando estatísticas...
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={Eye}
            label="Visualizações"
            value={stats?.views ?? 0}
            hint={`${stats?.viewsLast30 ?? 0} nos últimos 30 dias`}
          />
          <StatCard
            icon={MessageCircle}
            label="Cliques no WhatsApp"
            value={stats?.whatsappClicks ?? 0}
            hint={`${stats?.whatsappClicksLast30 ?? 0} nos últimos 30 dias`}
          />
          <StatCard
            icon={Star}
            label="Avaliação média"
            value={
              stats?.avgRating
                ? stats.avgRating.toFixed(1)
                : partner.rating.toFixed(1)
            }
            hint={`${stats?.reviewCount ?? partner.reviewCount} avaliações`}
          />
          <StatCard
            icon={Heart}
            label="Favoritos"
            value={stats?.favorites ?? 0}
            hint="Pessoas que salvaram seu perfil"
          />
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <QuickAction
          to="/painel/perfil"
          title="Completar meu negócio"
          description="Adicione fotos, descrição, horários e formas de contato."
        />
        <QuickAction
          to="/painel/promocoes"
          title="Criar uma promoção"
          description="Destaque seu negócio com ofertas para os visitantes."
        />
        <QuickAction
          to="/painel/imagens"
          title="Gerenciar imagens"
          description="Envie fotos que aparecem no seu perfil público."
        />
        <QuickAction
          to="/painel/avaliacoes"
          title="Responder avaliações"
          description="Interaja com seus clientes e melhore sua reputação."
        />
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: React.ElementType;
  label: string;
  value: number | string;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="size-5 text-primary" />
        </div>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
      <p className="mt-4 font-display text-3xl font-semibold">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function QuickAction({
  to,
  title,
  description,
}: {
  to: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      to={to}
      className="group flex items-center justify-between rounded-2xl border border-border bg-card p-5 transition hover:border-primary/50 hover:bg-muted/40"
    >
      <div>
        <p className="font-medium">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <ArrowRight className="size-5 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
    </Link>
  );
}