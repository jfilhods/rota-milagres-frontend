// routes/index.tsx

import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import {
  fetchPublicPromos,
  fetchPublicEvents,
  fetchPublicTides,
  type EventNotice,
  type TideDay
} from "@/services/api";
import { PartnerCard } from "@/components/partner-card";

import {
  getFeaturedPartners,
  getCategories,
  getPromos,
  getCategoryImage,
} from "@/lib/catalog";
import type { Partner, Category, Promo } from "@/lib/catalog";
import { DEMO_IMAGES } from "@/data/images";

// 👇 Import da imagem hero
import heroImage from "@/assets/Praia_de_Porto_da_Rua_Sao_Miguel_dos_Milagres_Alagoas.jpg";

// Definição das cidades
const cities = [
  "São Miguel dos Milagres",
  "Porto de Pedras",
  "Japaratinga",
  "Passo de Camaragibe",
];

export const Route = createFileRoute("/")({
  head: () => ({
  meta: [
    {
      title: "Rota Milagres — Turismo, experiências e serviços em Alagoas",
    },
    {
      name: "description",
      content:
        "Descubra pousadas, restaurantes, passeios e experiências na Rota Ecológica de Alagoas.",
    },
  ],
}),
  loader: async () => {
    const [featuredPartners, categories, apiPromos, events, tides] =
      await Promise.all([
        Promise.resolve(getFeaturedPartners()),
        Promise.resolve(getCategories()),
        fetchPublicPromos().catch(() => []),
        fetchPublicEvents().catch(() => []),
        fetchPublicTides().catch(() => ({ days: [], externalUrl: "" })),
      ]);

    let promos = (apiPromos ?? []).map((p) => ({
      id: p.id,
      title: p.title,
      detail: p.detail ?? "",
      badge: p.badge ?? "",
      imageUrl: p.image_url ?? "",
      partnerSlug: p.partners?.slug ?? "",
    }));

    if (promos.length === 0) {
      promos = getPromos().map((p) => ({
        id: p.id,
        title: p.title,
        detail: p.detail ?? "",
        badge: p.badge ?? "",
        imageUrl: p.imageUrl ?? "",
        partnerSlug: p.partnerSlug ?? "",
      }));
    }

    promos = promos.filter((p) => p.partnerSlug);

    return {
      featuredPartners,
      categories,
      promos,
      events,
      tides: tides.days,
      tidesUrl: tides.externalUrl,
    };
  },

  component: Index,
});

function Index() {
  const {
    featuredPartners,
    categories,
    promos,
    events,
    tides,
    tidesUrl,
  } = Route.useLoaderData() as {
    featuredPartners: Partner[];
    categories: Category[];
    promos: Promo[];
    events: EventNotice[];
    tides: TideDay[];
    tidesUrl: string;
  };

  const highlightCategories = categories
    .filter((c) => c.imageUrl || getCategoryImage(c))
    .slice(0, 5);

  return (
    <>
      <AppHeader />

      {/* Hero Section */}
      <section className="px-4 py-6">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl">
            <img
              src={heroImage}
              alt="Piscinas naturais e praia de areia branca na Rota Ecológica de Alagoas"
              width={1600}
              height={900}
              className="aspect-[4/3] w-full object-cover md:aspect-[21/9]"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent p-6 md:p-10">
              <h1 className="max-w-[20ch] font-display text-3xl font-medium leading-tight text-background md:text-5xl">
                Tudo que a Rota tem a oferecer
              </h1>
              <p className="mt-3 max-w-[52ch] text-sm text-background/80 md:text-base">
                {cities.join(" · ")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-2xl font-medium">
              Explore por categoria
            </h2>
            <Link
              to="/categorias"
              className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Ver todas as categorias <ArrowRight className="size-4" />
            </Link>
          </div>

          {categories.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="size-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {highlightCategories.map((category) => (
                <Link
                  key={category.slug}
                  to="/categoria/$slug"
                  params={{ slug: category.slug }}
                  className="group"
                >
                  <div className="mb-3 overflow-hidden rounded-xl ring-1 ring-border zoom-media">
                    <img
                      src={getCategoryImage(category)}
                      alt={category.name}
                      loading="lazy"
                      width={640}
                      height={640}
                      className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <span className="text-sm font-medium">
                    {category.emoji} {category.name}
                  </span>
                </Link>
              ))}
              <Link to="/categorias" className="group">
                <div className="mb-3 flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-border bg-muted transition-colors group-hover:bg-secondary">
                  <span className="text-xl font-medium">+</span>
                  <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    {categories.length - highlightCategories.length} categorias
                  </span>
                </div>
                <span className="text-sm font-medium">Mais opções</span>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Promoções */}
      {promos.length > 0 && (
        <section className="bg-accent/50 py-8">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-tide">
              <Sparkles className="size-4" /> Ofertas da maré
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {promos.map((promo) => (
                <Link
                  key={promo.id}
                  to="/parceiro/$slug"
                  params={{ slug: promo.partnerSlug }}
                  className="flex min-w-[280px] gap-4 rounded-xl bg-card p-4 ring-1 ring-border hover-lift transition-shadow hover:shadow-lg"
                >
                  <img
                    src={promo.imageUrl || DEMO_IMAGES.placeholder}
                    alt={promo.title}
                    loading="lazy"
                    width={200}
                    height={200}
                    className="size-20 shrink-0 rounded-lg object-cover"
                  />
                  <div className="flex min-w-0 flex-col justify-between">
                    {promo.badge && (
                      <span className="text-xs font-semibold text-primary">
                        {promo.badge}
                      </span>
                    )}
                    <span className="text-sm font-medium">{promo.title}</span>
                    {promo.detail && (
                      <span className="truncate text-xs text-muted-foreground">
                        {promo.detail}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========== INFORMAÇÕES AO TURISTA ========== */}
      <section className="px-4 py-16 bg-muted/40">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <h2 className="mb-2 font-display text-3xl font-medium">
              Informações úteis para sua visita
            </h2>
            <p className="max-w-[56ch] text-muted-foreground">
              Marés, eventos e dicas de preservação para aproveitar a Rota
              Ecológica com consciência.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* ============ 1. TÁBUA DE MARÉS ============ */}
            <div className="rounded-2xl bg-card p-6 ring-1 ring-border">
              <div className="mb-4 flex items-center gap-2">
                <span className="text-2xl">🌊</span>
                <h3 className="font-display text-xl font-medium">
                  Tábua de Marés
                </h3>
              </div>
              <p className="mb-4 text-sm text-muted-foreground">
                Melhores horários de maré baixa para as piscinas naturais.
              </p>

              {tides.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Consulte os horários atualizados no link abaixo.
                </p>
              ) : (
                <div className="space-y-3 text-sm">
                  {tides.slice(0, 3).map((t, i) => {
                    const d = new Date(t.day + "T12:00:00");
                    const label =
                      i === 0
                        ? "Hoje"
                        : i === 1
                          ? "Amanhã"
                          : d.toLocaleDateString("pt-BR", {
                            weekday: "short",
                            day: "2-digit",
                            month: "2-digit",
                          });
                    return (
                      <div
                        key={t.day}
                        className="flex items-center justify-between border-b border-border pb-2 last:border-0"
                      >
                        <span className="font-medium">{label}</span>
                        <span className="text-right text-muted-foreground">
                          Baixa <strong className="text-foreground">{t.low_time}</strong>
                          {t.low_height != null && ` · ${t.low_height} m`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              <a
                href={tidesUrl || "https://tabuademares.com/br/alagoas/sao-miguel-dos-milagres"}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Ver tábua completa <ArrowRight className="size-4" />
              </a>
            </div>

            {/* ============ 2. AVISOS & EVENTOS (só o mais recente) ============ */}
            <div className="rounded-2xl bg-card p-6 ring-1 ring-border">
              <div className="mb-4 flex items-center gap-2">
                <span className="text-2xl">📢</span>
                <h3 className="font-display text-xl font-medium">
                  Avisos & Eventos
                </h3>
              </div>

              {events.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Nenhum evento programado no momento.
                </p>
              ) : (
                (() => {
                  // O backend já ordena por priority desc e end_date asc.
                  // O primeiro item é o de maior destaque com a data mais próxima.
                  const featured = events[0];

                  if (!featured) return null;

                  return (
                    <div className="overflow-hidden rounded-xl border border-border">
                      {featured.image_url ? (
                        <img
                          src={featured.image_url}
                          alt={featured.title}
                          loading="lazy"
                          className="aspect-[16/9] w-full object-cover"
                        />
                      ) : (
                        <div className="flex aspect-[16/9] w-full items-center justify-center bg-muted text-3xl text-muted-foreground">
                          📅
                        </div>
                      )}

                      <div className="space-y-2 p-3">
                        {featured.priority === "high" && (
                          <span className="inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase text-primary">
                            Destaque
                          </span>
                        )}

                        <p className="font-medium text-sm leading-tight">
                          {featured.title}
                        </p>

                        <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                          {featured.description}
                        </p>

                        <p className="text-[11px] text-muted-foreground">
                          Até{" "}
                          {new Date(featured.end_date).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    </div>
                  );
                })()
              )}

              {/* CTA para a página completa */}
              <Link
                to="/eventos"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Ver todos os eventos <ArrowRight className="size-4" />
              </Link>
            </div>

            {/* ============ 3. PRESERVAÇÃO ============ */}
            <div className="rounded-2xl bg-card p-6 ring-1 ring-border">
              <div className="mb-4 flex items-center gap-2">
                <span className="text-2xl">🪸</span>
                <h3 className="font-display text-xl font-medium">
                  Preservação da Rota
                </h3>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    Faça parte da <strong>APA Costa dos Corais</strong> — maior
                    unidade de conservação marinha do Brasil.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    Só jangada a vela ou remo nas áreas de recife (proibido motor).
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    Não pise nos corais, não alimente peixes e use protetor
                    reef-safe.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    Apoie o Santuário do Peixe-Boi e a economia local.
                  </span>
                </li>
              </ul>
              <Link
                to="/preservacao"
                className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Saiba como preservar <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}