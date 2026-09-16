// routes/categoria/$slug.tsx

import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { syncCategoriesFromAPI } from "@/lib/catalog";
import {
  ArrowLeft,
  Clock,
  Users,
  Package,
  MapPin,
  Star,
  MessageCircle,
  ChevronRight,
  Bed,
  Waves,
  Utensils,
  ShoppingBag,
  Mountain,
  Briefcase,
  Ticket,
  X,
  Play,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ApiTour, ApiRoomType, TourDescription, TourPackage } from "@/data/catalog.types";

import { PartnerCard } from "@/components/partner-card";
import {
  getCategoryBySlug,
  getPartnersByCategoryAsync,
  getPartnerImage,
  formatPrice,
  syncPartnersFromAPI,
  type Category,
  type Partner,
} from "@/lib/catalog";
import { PartnerDetail } from "@/components/PartnerDetail";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/categoria/$slug")({
  head: ({ params }) => ({
    meta: [
      {
        title: `${params.slug
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ")} — Rota Milagres`,
      },
      {
        name: "description",
        content: `Encontre as melhores opções de ${params.slug} em São Miguel dos Milagres, Porto de Pedras, Japaratinga e Passo de Camaragibe.`,
      },
    ],
  }),
  loader: async () => {
    // Categorias vêm SEMPRE da API (fallback automático para catalog.json)
    const categories = await syncCategoriesFromAPI();
    return { categories };
  },
  component: CategoryPage,
});

/* ============================================================
   TIPOS ESPECÍFICOS DO PASSEIO DE JANGADA

   Eles ficam aqui por enquanto para você não precisar alterar
   o catalog.types.ts imediatamente.

   Depois, se quiser, podemos mover esses tipos para lá.
============================================================ */

type JangadaPackage = {
  id: string;
  name: string;
  people: number;
  price: number;
};

type JangadaTour = Partner & {
  videoUrl?: string | null;

  tourDescription?: {
    title?: string;
    text?: string;
  } | null;

  packages?: JangadaPackage[];
};

interface ApiPartnerResponse {
  id: string;
  slug: string;
  name: string;
  city?: string;
  rating?: number;
  review_count?: number;
  short_description?: string;
  description?: string | null;
  price_from?: number | null;
  whatsapp?: string;
  phone?: string;
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  images?: string[];
  featured?: boolean;
  category?: { id: string; name: string; slug: string } | null;
  hours_of_operation?: string | null;
  instagram?: string | null;
  website?: string | null;
  schedules?: string[];
  pricesPerPerson?: string[];
  familyPackages?: string[];
  tours?: ApiTour[];
  room_types?: ApiRoomType[];
  videoUrl?: string | null;
  tourDescription?: TourDescription | null;
  packages?: TourPackage[];
  partner_images?: { url: string; display_order?: number }[];
  cities?: { name: string };
}



/* ============================================================
   PÁGINA PRINCIPAL DA CATEGORIA
============================================================ */

function CategoryPage() {
  const { slug } = Route.useParams();

  const [category, setCategory] = useState<Category | null>(null);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  // function mapApiPartnerToCatalogPartner(apiPartner: ApiPartnerResponse): Partner {
  //   return {
  //     id: apiPartner.id || '',
  //     slug: apiPartner.slug || '',
  //     name: apiPartner.name || '',
  //     city: apiPartner.city || apiPartner.cities?.name || 'São Miguel dos Milagres',
  //     rating: apiPartner.rating || 0,
  //     reviewCount: apiPartner.review_count || 0,
  //     short: apiPartner.short_description || '',
  //     description: apiPartner.description || null,
  //     priceFrom: apiPartner.price_from ?? null,
  //     whatsapp: apiPartner.whatsapp || '',
  //     phone: apiPartner.phone || '',
  //     address: apiPartner.address || null,
  //     latitude: apiPartner.latitude ?? null,
  //     longitude: apiPartner.longitude ?? null,
  //     images: apiPartner.images || apiPartner.partner_images?.map((img: { url: string }) => img.url) || [],
  //     featured: apiPartner.featured || false,
  //     category: apiPartner.category || null,
  //     hours_of_operation: apiPartner.hours_of_operation || null,
  //     instagram: apiPartner.instagram || null,
  //     website: apiPartner.website || null,
  //     schedules: apiPartner.schedules || [],
  //     pricesPerPerson: apiPartner.pricesPerPerson || [],
  //     familyPackages: apiPartner.familyPackages || [],
  //     tours: apiPartner.tours || [],
  //     room_types: apiPartner.room_types || [],
  //     videoUrl: apiPartner.videoUrl ?? null,
  //     tourDescription: apiPartner.tourDescription ?? null,
  //     packages: apiPartner.packages || [],
  //   };
  // }

 useEffect(() => {
  let mounted = true;

  async function load() {
    try {
      const [apiCategories, list] = await Promise.all([
        syncCategoriesFromAPI(),
        getPartnersByCategoryAsync(slug),
      ]);

      const cat =
        apiCategories.find((c) => c.slug === slug) ??
        getCategoryBySlug(slug);

      // Não listar parceiros da categoria "promoção"
      const filteredPartners = list.filter((partner) => {
        const catSlug = partner.category?.slug?.toLowerCase() ?? "";
        return (
          catSlug !== "promocao" &&
          catSlug !== "promoção" &&
          catSlug !== "promocoes" &&
          catSlug !== "promoções" &&
          catSlug !== "ofertas"
        );
      });

      if (mounted) {
        setCategory(cat);
        setPartners(filteredPartners);
        setLoading(false);
      }
    } catch (err) {
      console.error("❌ Erro ao carregar categoria:", err);
      if (mounted) {
        setCategory(getCategoryBySlug(slug));
        setPartners([]);
        setLoading(false);
      }
    }
  }

  load();
  return () => {
    mounted = false;
  };
}, [slug]);

  const getCategoryIcon = (categorySlug: string) => {
    const icons: Record<string, LucideIcon> = {
      pousadas: Bed,
      chales: Bed,
      "chalés": Bed,
      hospedagem: Bed,
      hotel: Bed,
      jangadas: Waves,
      jangada: Waves,
      quadriciclos: Mountain,
      quadriciclo: Mountain,
      restaurantes: Utensils,
      "comida-e-bebida": Utensils,
      lojas: ShoppingBag,
      artesanato: ShoppingBag,
      passeios: Mountain,
      "guias-turisticos": Briefcase,
    };

    return icons[categorySlug] || Briefcase;
  };

  const CategoryIcon = category
    ? getCategoryIcon(slug)
    : Briefcase;

  if (loading) {
    return (
      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl text-center text-muted-foreground">
          Carregando...
        </div>
      </section>
    );
  }

  if (!category) {
    return (
      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="font-display text-3xl font-medium">
            Categoria não encontrada
          </h1>

          <Link
            to="/categorias"
            className="mt-4 inline-block text-primary hover:underline"
          >
            ← Voltar para todas as categorias
          </Link>
        </div>
      </section>
    );
  }

  const isPousadas =
    slug === "pousadas" ||
    slug === "chales" ||
    slug === "chalés" ||
    slug === "hospedagem" ||
    slug === "hotel";

  const isJangadas =
    slug === "jangadas" ||
    slug === "jangada";

  const isQuadriciclos =
    slug === "quadriciclos" ||
    slug === "quadriciclo";

    
  /* ==========================================================
     JANGADAS

     IMPORTANTE:
     Aqui NÃO existe seleção de parceiro.

     O primeiro registro da categoria Jangadas é utilizado
     apenas como fonte dos dados do passeio.
  ========================================================== */

  if (isJangadas) {
    const jangada = partners.find(
      (partner) =>
        partner.category?.slug === "jangadas"
    ) as JangadaTour | undefined;

    return (
      <>
        <SiteHeader />

        {!jangada ? (
          <section className="px-4 py-20">
            <div className="mx-auto max-w-3xl text-center">
              <Waves className="mx-auto size-12 text-primary/60" />

              <h1 className="mt-5 font-display text-3xl font-medium">
                Passeio de Jangada
              </h1>

              <p className="mt-3 text-muted-foreground">
                Em breve teremos informações sobre o passeio
                de jangada.
              </p>

              <Link
                to="/categorias"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition hover:border-primary/50 hover:bg-muted"
              >
                <ArrowLeft className="size-4" />
                Voltar para categorias
              </Link>
            </div>
          </section>
        ) : (
          <JangadaPage jangada={jangada} />
        )}
      </>
    );
  }

  /* ==========================================================
     QUADRICULOS

     Mesmo comportamento das jangadas:
     - não mostra lista de parceiros
     - não exige seleção de parceiro
     - abre diretamente o fluxo de cadastro/reserva
  ========================================================== */

  if (isQuadriciclos) {
    const quadriciclo = partners.find(
      (partner) =>
        partner.category?.slug === "quadriciclos" ||
        partner.category?.slug === "quadriciclo"
    ) as JangadaTour | undefined;

    return (
      <>
        <SiteHeader />

        {!quadriciclo ? (
          <section className="px-4 py-20">
            <div className="mx-auto max-w-3xl text-center">
              <Mountain className="mx-auto size-12 text-primary/60" />

              <h1 className="mt-5 font-display text-3xl font-medium">
                Passeio de Quadriciclo
              </h1>

              <p className="mt-3 text-muted-foreground">
                Em breve teremos informações sobre o passeio
                de quadriciclo.
              </p>

              <Link
                to="/categorias"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition hover:border-primary/50 hover:bg-muted"
              >
                <ArrowLeft className="size-4" />
                Voltar para categorias
              </Link>
            </div>
          </section>
        ) : (
          <JangadaPage
            jangada={quadriciclo}
            tipo="quadriciclo"
          />
        )}
      </>
    );
  }

  /* ============================================================
     DEMAIS CATEGORIAS
  ============================================================ */

  return (
    <>
      <SiteHeader />

      <section className="px-4 py-8 md:py-12">
        <div className="mx-auto max-w-7xl">

          {/* Header com navegação */}
          <div className="mb-8">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link
                to="/"
                className="transition hover:text-foreground hover:underline"
              >
                Início
              </Link>

              <ChevronRight className="size-3.5" />

              <Link
                to="/categorias"
                className="transition hover:text-foreground hover:underline"
              >
                Categorias
              </Link>

              <ChevronRight className="size-3.5" />

              <span className="font-medium text-foreground">
                {category.name}
              </span>
            </nav>

            <div className="mt-6 flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-2xl">
                {category.emoji || (
                  <CategoryIcon className="size-7 text-primary" />
                )}
              </div>

              <div>
                <h1 className="font-display text-2xl font-medium md:text-3xl">
                  {category.name}
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                  {partners.length > 0
                    ? `${partners.length} ${partners.length === 1
                      ? "parceiro"
                      : "parceiros"
                    } disponíveis`
                    : "Em breve novos parceiros"}
                </p>
              </div>
            </div>

            <Link
              to="/categorias"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition hover:border-primary/50 hover:bg-muted"
            >
              <ArrowLeft className="size-4" />
              Voltar para categorias
            </Link>
          </div>

          {/* ===================== POUSADAS ===================== */}

          {isPousadas && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {partners.map((partner) => (
                <Link
                  key={partner.slug}
                  to="/parceiro/$slug"
                  params={{ slug: partner.slug }}
                  className="group overflow-hidden rounded-xl bg-card ring-1 ring-border transition hover:-translate-y-1 hover:ring-2 hover:ring-primary/50 hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={getPartnerImage(partner)}
                      alt={partner.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {partner.priceFrom != null && (
                      <div className="absolute bottom-2 right-2 rounded-full bg-background/95 px-2.5 py-1 text-xs font-semibold shadow-sm backdrop-blur">
                        a partir de{" "}
                        <span className="text-primary">
                          {formatPrice(partner.priceFrom)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="line-clamp-1 text-sm font-medium leading-tight">
                        {partner.name}
                      </h3>

                      {partner.rating > 0 && (
                        <span className="flex shrink-0 items-center gap-0.5 text-xs text-amber-500">
                          <Star className="size-3 fill-current" />
                          {partner.rating.toFixed(1)}
                        </span>
                      )}
                    </div>

                    <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="size-3" />
                      {partner.city}
                    </p>

                    {partner.short && (
                      <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground">
                        {partner.short}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* ===================== OUTRAS CATEGORIAS ===================== */}

          {!isPousadas && !isJangadas && !isQuadriciclos && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {partners.length > 0 ? (
                partners.map((partner) => (
                  <div
                    key={partner.slug}
                    className="transition hover:-translate-y-1 hover:ring-2 hover:ring-primary/50"
                  >
                    <PartnerCard partner={partner} />
                  </div>
                ))
              ) : (
                <div className="col-span-full rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground">
                  Em breve parceiros nesta categoria.
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}



/* ================================================================
   PÁGINA ESPECIAL DO PASSEIO DE JANGADA (versão simplificada)
================================================================ */

function JangadaPage({
  jangada,
  tipo = "jangada",
}: {
  jangada: JangadaTour;
  tipo?: "jangada" | "quadriciclo";
}) {
  const [showReservation, setShowReservation] = useState(false);

  const isQuadriculo = tipo === "quadriciclo";

  const passeioNome = isQuadriculo
    ? "Passeio de Quadriciclo"
    : "Passeio de Jangada";

  const passeioExperiencia = isQuadriculo
    ? "Passeio de quadriciclo"
    : "Piscinas naturais";

  const images = jangada.images?.filter(Boolean) || [];
  const mainImage = images[0] || getPartnerImage(jangada);

  const defaultPackages: JangadaPackage[] = [
    { id: "jangada-1", name: "1 pessoa", people: 1, price: 100 },
    { id: "jangada-2", name: "2 pessoas", people: 2, price: 190 },


  ];

  const packages =
    jangada.packages && jangada.packages.length > 0
      ? jangada.packages
      : defaultPackages;

  const descriptionTitle =
    jangada.tourDescription?.title ||
    (isQuadriculo
      ? "Viva uma aventura de quadriciclo em São Miguel dos Milagres"
      : "Viva as piscinas naturais de São Miguel dos Milagres");

  const descriptionText =
    jangada.tourDescription?.text ||
    jangada.description ||
    (isQuadriculo
      ? "Explore São Miguel dos Milagres de quadriciclo e viva uma experiência inesquecível."
      : "Embarque em uma tradicional jangada e conheça as piscinas naturais de São Miguel dos Milagres. Aproveite as águas cristalinas e viva uma experiência inesquecível.");

  return (
    <main className="pb-16">
      {/* Voltar */}
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <Link
          to="/categorias"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background/90 px-4 py-2 text-sm font-medium shadow-sm transition hover:border-primary/50 hover:bg-muted"
        >
          <ArrowLeft className="size-4" />
          Voltar para categorias
        </Link>
      </div>

      {/* ======================================================
          IMAGEM (card) + PACOTES AO LADO
      ====================================================== */}
      <section className="mx-auto max-w-6xl px-4 pt-6">
        <div className="grid gap-6 lg:grid-cols-5 lg:items-start">
          {/* Imagem principal (estilo card) */}
          <div className="lg:col-span-3">
            <div className="overflow-hidden rounded-2xl bg-muted shadow-sm ring-1 ring-border">
              <img
                src={mainImage}
                alt={jangada.name}
                className="aspect-[16/10] w-full object-cover"
              />
            </div>

            {/* Título + info rápida embaixo da imagem */}
            <div className="mt-5">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {isQuadriculo ? (
                  <Mountain className="size-3.5" />
                ) : (
                  <Waves className="size-3.5" />
                )}
                {passeioNome}
              </div>

              <h1 className="font-display text-2xl font-semibold md:text-3xl">
                {jangada.name}
              </h1>

              <p className="mt-2 text-sm text-muted-foreground">
                {jangada.short ||
                  "Uma experiência inesquecível pelas piscinas naturais."}
              </p>

              {/* Info cards compactos */}
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <InfoCard icon={Clock} title="Duração" value="3h30 a 4h" />
                <InfoCard icon={Users} title="Capacidade" value="Até 12 pessoas" />
                <InfoCard
                  icon={MapPin}
                  title="Local"
                  value={jangada.city || "São Miguel dos Milagres"}
                />
                <InfoCard
                  icon={isQuadriculo ? Mountain : Waves}
                  title="Experiência"
                  value={passeioExperiencia}
                />
              </div>
            </div>
          </div>

          {/* Pacotes + Reserva (ao lado) */}
          <div className="lg:col-span-2">
            <div className="sticky top-6 rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h2 className="font-display text-lg font-semibold">
                Escolha seu pacote
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Quanto maior o grupo, melhor o valor
              </p>

              <div className="mt-4 max-h-[420px] space-y-2 overflow-y-auto pr-1">
                {packages.map((pkg) => (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => setShowReservation(true)}
                    className="flex w-full items-center justify-between rounded-xl border border-border bg-background px-4 py-3 text-left transition hover:border-primary/50 hover:bg-muted/50"
                  >
                    <div>
                      <p className="text-sm font-medium">{pkg.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {pkg.people} {pkg.people === 1 ? "pessoa" : "pessoas"}
                      </p>
                    </div>
                    <span className="font-display text-base font-semibold text-primary">
                      {formatPrice(pkg.price)}
                    </span>
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setShowReservation(true)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90"
              >
                <MessageCircle className="size-4" />
                Fazer reserva
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          DESCRIÇÃO DO PASSEIO + REGRAS (abaixo da imagem)
      ====================================================== */}
      <section className="mx-auto max-w-6xl px-4 pt-12">
        {/* Descrição */}
        <div className="max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            O passeio
          </span>
          <h2 className="mt-2 font-display text-2xl font-medium md:text-3xl">
            {descriptionTitle}
          </h2>
         
        </div>

        {/* Regras / Informações */}
        <div className="mt-10 rounded-2xl border border-border bg-muted/40 p-6">
          <div className="flex items-start gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Ticket className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-xl font-medium">
                Informações e regras do passeio
              </h3>

              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {jangada.schedules?.length ? (
                  // 1) Se o parceiro cadastrou horários próprios, mostra eles
                  jangada.schedules.map((schedule, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      {schedule}
                    </li>
                  ))
                ) : isQuadriculo ? (
                  // 2) Fallback para QUADRICICLO
                  <>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      Saídas em grupo ou privativas, mediante agendamento prévio.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      Roteiro por praias, trilhas e mirantes da Rota Ecológica.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      Condutor habilitado incluso — não é necessário ter experiência.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      Idade mínima e capacidade variam conforme o veículo (consulte a reserva).
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      Uso obrigatório de capacete e cinto de segurança durante o trajeto.
                    </li>
                  </>
                ) : (
                  // 3) Fallback para JANGADA
                  <>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      Saídas conforme a maré.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      Passeio pelas piscinas naturais.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      Consulte os horários disponíveis no momento da reserva.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      Capacidade máxima de 12 pessoas por jangada.
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Vídeo — apenas para jangada */}
        {!isQuadriculo && (
          <div className="mt-10">
            <h3 className="font-display text-xl font-medium">
              Veja como é a experiência
            </h3>

            <div className="mt-4 overflow-hidden rounded-2xl bg-black">
              <video
                controls
                playsInline
                preload="metadata"
                poster={mainImage}
                className="max-h-[480px] w-full"
              >
                <source src="/videos/jangada.mp4" type="video/mp4" />
                Seu navegador não suporta reprodução de vídeo.
              </video>
            </div>
          </div>
        )}
      </section>

      {/* Modal de reserva (mantido igual) */}
      {showReservation && (
        <ReservationModal
          jangada={jangada}
          packages={packages}
          tipo={tipo}
          onClose={() => setShowReservation(false)}
        />
      )}
    </main>
  );
}
/* ================================================================
   CARD DE INFORMAÇÃO
================================================================ */

function InfoCard({
  icon: Icon,
  title,
  value,
}: {
  icon: LucideIcon;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
        <Icon className="size-5 text-primary" />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">
          {title}
        </p>

        <p className="mt-0.5 truncate text-sm font-semibold">
          {value}
        </p>
      </div>
    </div>
  );
}

/* ================================================================
   MODAL DE RESERVA
================================================================ */

function ReservationModal({
  jangada,
  packages,
  tipo = "jangada",
  onClose,
}: {
  jangada: JangadaTour;
  packages: JangadaPackage[];
  tipo?: "jangada" | "quadriciclo";
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedPackageId, setSelectedPackageId] =
    useState(packages[0]?.id || "");

  const selectedPackage =
    packages.find(
      (item) => item.id === selectedPackageId
    ) || packages[0];

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!name.trim()) {
      return;
    }

    if (!phone.trim()) {
      return;
    }

    if (!selectedPackage) {
      return;
    }

    /*
     * Por enquanto a reserva é enviada para o WhatsApp
     * cadastrado no catalog.json.
     *
     * Depois podemos trocar esta função pelo endpoint
     * do backend sem alterar o formulário.
     */

    const whatsapp =
      jangada.whatsapp?.replace(/\D/g, "");

    const passeioNome =
      tipo === "quadriciclo"
        ? "passeio de quadriciclo"
        : "passeio de jangada";

    const message = [
      `*Olá !* Quero fazer uma reserva de *${passeioNome}* pela Rota Milagres.`,

      `Nome: ${name.trim()}`,
      `Celular: ${phone.trim()}`,
      `Pacote: ${selectedPackage.name}`,
      `Pessoas: ${selectedPackage.people}`,
      `Valor: ${formatPrice(selectedPackage.price)}`,

      "Gostaria de confirmar a disponibilidade.",
    ].join("\n");

    if (whatsapp) {
      const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
        message
      )}`;

      window.open(url, "_blank");
      onClose();
    } else {
      /*
       * Caso o WhatsApp ainda não esteja configurado,
       * deixamos a reserva registrada no console para
       * facilitar os testes.
       */
      console.log("📋 Dados da reserva:", {
        name: name.trim(),
        phone: phone.trim(),
        package: selectedPackage,
      });

      alert(
        "Reserva preenchida! O WhatsApp do passeio ainda não foi configurado."
      );

      onClose();
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="reservation-title"
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-background p-6 shadow-2xl md:p-8"
      >
        {/* Fechar */}

        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
        >
          <X className="size-5" />
        </button>

        {/* Cabeçalho */}

        <div className="pr-10">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10">
            <Ticket className="size-6 text-primary" />
          </div>

          <h2
            id="reservation-title"
            className="mt-5 font-display text-2xl font-medium md:text-3xl"
          >
            Faça sua reserva
          </h2>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Preencha seus dados e escolha o pacote desejado.
          </p>
        </div>

        {/* Formulário */}

        <form
          onSubmit={handleSubmit}
          className="mt-7 space-y-5"
        >
          {/* Nome */}

          <div>
            <label
              htmlFor="reservation-name"
              className="mb-2 block text-sm font-medium"
            >
              Nome
            </label>

            <input
              id="reservation-name"
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="Seu nome"
              autoComplete="name"
              required
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          {/* Celular */}

          <div>
            <label
              htmlFor="reservation-phone"
              className="mb-2 block text-sm font-medium"
            >
              Número do celular
            </label>

            <input
              id="reservation-phone"
              type="tel"
              value={phone}
              onChange={(event) =>
                setPhone(event.target.value)
              }
              placeholder="(82) 99999-9999"
              autoComplete="tel"
              required
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          {/* Pacote */}

          <div>
            <label
              htmlFor="reservation-package"
              className="mb-2 block text-sm font-medium"
            >
              Qual pacote você deseja?
            </label>

            <select
              id="reservation-package"
              value={selectedPackageId}
              onChange={(event) =>
                setSelectedPackageId(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
            >
              {packages.map((item) => (
                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.name} —{" "}
                  {formatPrice(item.price)}
                </option>
              ))}
            </select>
          </div>

          {/* Resumo */}

          {selectedPackage && (
            <div className="rounded-2xl bg-muted/60 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">
                    Pacote escolhido
                  </p>

                  <p className="mt-1 font-semibold">
                    {selectedPackage.name}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-muted-foreground">
                    Total
                  </p>

                  <p className="mt-1 font-display text-xl font-semibold text-primary">
                    {formatPrice(
                      selectedPackage.price
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Botão */}

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <MessageCircle className="size-5" />
            Enviar reserva
          </button>

          <p className="text-center text-xs leading-5 text-muted-foreground">
            Ao enviar, você será direcionado para o WhatsApp
            para confirmar a disponibilidade do passeio.
          </p>
        </form>
      </div>
    </div>
  );
}