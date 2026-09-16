// routes/painel/promocoes.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Gift, Loader2, Calendar, Sparkles } from "lucide-react";
import { getPartnerPromos, type PartnerPromo } from "@/services/api";

export const Route = createFileRoute("/painel/promocoes")({
  component: PromocoesPage,
});

function isActive(p: PartnerPromo): boolean {
  if (!p.active) return false;
  const now = Date.now();
  if (p.starts_at && new Date(p.starts_at).getTime() > now) return false;
  if (p.ends_at && new Date(p.ends_at).getTime() < now) return false;
  return true;
}

function PromocoesPage() {
  const [promos, setPromos] = useState<PartnerPromo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPartnerPromos()
      .then((res) => setPromos(res.data ?? []))
      .catch(() => setPromos([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-start gap-3">
        <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
          <Gift className="size-5 text-primary" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-semibold md:text-3xl">
            Promoções
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Pacotes criados pela equipe Rota Milagres em parceria com você.
            Aparecem automaticamente na home do site.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-muted-foreground">
          <Loader2 className="mr-2 size-5 animate-spin" /> Carregando...
        </div>
      ) : promos.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground">
          Você ainda não tem promoções. Fale com a equipe para criar um
          pacote junto.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {promos.map((p) => {
            const active = isActive(p);
            return (
              <article
                key={p.id}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                {p.image_url && (
                  <img
                    src={p.image_url}
                    alt={p.title}
                    className="aspect-[16/9] w-full object-cover"
                    loading="lazy"
                  />
                )}

                <div className="space-y-3 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      {p.badge && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                          <Sparkles className="size-3" />
                          {p.badge}
                        </span>
                      )}
                      <h3 className="mt-0.5 font-medium leading-tight">
                        {p.title}
                      </h3>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                        active
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {active ? "No ar" : "Fora do ar"}
                    </span>
                  </div>

                  {p.detail && (
                    <p className="text-sm text-muted-foreground">
                      {p.detail}
                    </p>
                  )}

                  {(p.starts_at || p.ends_at) && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="size-3" />
                      {p.starts_at && (
                        <span>
                          {new Date(p.starts_at).toLocaleDateString("pt-BR")}
                        </span>
                      )}
                      {p.starts_at && p.ends_at && <span>→</span>}
                      {p.ends_at && (
                        <span>
                          {new Date(p.ends_at).toLocaleDateString("pt-BR")}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      <div className="rounded-2xl border border-border bg-muted/40 p-5 text-sm text-muted-foreground">
        <strong className="text-foreground">Quer uma promoção?</strong> Entre
        em contato com a equipe Rota Milagres pelo WhatsApp e monte um pacote
        com desconto, cortesia ou brinde.
      </div>
    </div>
  );
}