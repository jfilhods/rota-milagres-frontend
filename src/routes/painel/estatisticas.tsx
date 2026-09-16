import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { getStats, type Stats } from "@/lib/partner-api";

export const Route = createFileRoute("/painel/estatisticas")({
  component: EstatisticasPage,
});

function EstatisticasPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStats()
      .then(setStats)
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-muted-foreground">
        <Loader2 className="mr-2 size-5 animate-spin" />
        Carregando estatísticas...
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground">
        Sem dados disponíveis.
      </div>
    );
  }

  const maxMonth = Math.max(...stats.monthlyViews.map((m) => m.total), 1);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold md:text-3xl">
          Estatísticas
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Acompanhe o desempenho do seu perfil.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card label="Visualizações" value={stats.views} />
        <Card label="Últimos 30 dias" value={stats.viewsLast30} />
        <Card label="Cliques no WhatsApp" value={stats.whatsappClicks} />
        <Card label="Favoritos" value={stats.favorites} />
      </div>

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-5 font-display text-lg font-semibold">
          Visualizações por mês
        </h2>

        {stats.monthlyViews.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Ainda sem dados suficientes.
          </p>
        ) : (
          <div className="space-y-3">
            {stats.monthlyViews.map((m) => (
              <div key={m.month} className="flex items-center gap-3">
                <span className="w-12 text-xs font-medium text-muted-foreground">
                  {m.month}
                </span>
                <div className="flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-3 rounded-full bg-primary transition-all"
                    style={{
                      width: `${(m.total / maxMonth) * 100}%`,
                    }}
                  />
                </div>
                <span className="w-12 text-right text-sm font-semibold">
                  {m.total}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Card({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold">{value}</p>
    </div>
  );
}