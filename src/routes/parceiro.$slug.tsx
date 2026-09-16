
// routes/parceiro.$slug.tsx

import { createFileRoute, Link, notFound } from "@tanstack/react-router";
 // ajuste o nome do arquivo
import {
  ArrowLeft,
  Clock,
  Globe,
  Instagram,
  MapPin,
  MessageCircle,
  Mountain,
  Phone,
  Star,
  Ticket,
  Users,
  Waves,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState , useEffect} from "react";
import { FavoritarButton } from "@/components/FavoritarButton";
import { PartnerAvaliacoesList } from "@/components/partner/PartnerAvaliacaoList";
import { AvaliacaoForm } from "@/components/AvaliacaoForm";
import { AppHeader } from "@/components/AppHeader";
import { ClienteRequiredModal } from "@/components/ClienteRequiredModal";
import { VoucherJangada } from "@/components/VoucherJangada";
import {
  formatPrice,
  getPartnerBySlugAsync,
  getPartnerImage,
  mapsLink,
  whatsappLink,
  type Partner,
} from "@/lib/catalog";
import { useClienteAuth } from "@/contexts/cliente-auth-context";




/* ============================================================
   TIPOS
============================================================ */

type JangadaPackage = {
  id: string;
  name: string;
  people: number;
  price: number;
};

type PartnerTour = Partner & {
  videoUrl?: string | null;

  tourDescription?: {
    title?: string;
    text?: string;
  } | null;

  packages?: JangadaPackage[];
};

/* ============================================================
   ROUTE
============================================================ */

export const Route = createFileRoute("/parceiro/$slug")({
  loader: async ({ params }) => {
    const partner = await getPartnerBySlugAsync(params.slug);

    if (!partner) {
      throw notFound();
    }

    return { partner };
  },

  

  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          {
            title: "Parceiro não encontrado — Rota Milagres",
          },
          {
            name: "robots",
            content: "noindex",
          },
        ],
      };
    }

    const p = loaderData.partner;
    const categoryName = p.category?.name || "Estabelecimento";
    const title = `${p.name} — ${categoryName} em ${p.city} | Rota Milagres`;

    return {
      meta: [
        {
          title,
        },
        {
          name: "description",
          content: p.short || p.description || "",
        },
        {
          property: "og:title",
          content: title,
        },
        {
          property: "og:description",
          content: p.short || p.description || "",
        },
      ],
    };
  },
  

  component: PartnerPage,
});



/* ============================================================
   PÁGINA DO PARCEIRO
============================================================ */

function PartnerPage() {
  const { partner } = Route.useLoaderData() as {
    partner: Partner;
  };

  const { isAuthenticated } = useClienteAuth();

  const [active, setActive] = useState(0);
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const [reservaModal, setReservaModal] = useState<{
    open: boolean;
    partnerId: string;
    partnerName: string;
    tipo: "jangada" | "quadriciclo" | "buggy";
  }>({
    open: false,
    partnerId: "",
    partnerName: "",
    tipo: "jangada",
  });

  /* ============================================================
     DADOS
  ============================================================ */

  const categoryName = partner.category?.name || "Estabelecimento";
  const categorySlug = partner.category?.slug?.toLowerCase() || "";

  const contactPhone = partner.whatsapp || partner.phone;

  const partnerData = partner as PartnerTour;

  const images =
    partner.images?.filter(Boolean).length
      ? partner.images.filter(Boolean)
      : [getPartnerImage(partner)];

  const mainImage = images[active] || images[0];

  const isJangada =
    categorySlug === "jangadas" ||
    categorySlug === "jangada" ||
    categorySlug.includes("jangada") ||
    categoryName.toLowerCase().includes("jangada");

  const isQuadriciclo =
    categorySlug === "quadriculos" ||
    categorySlug === "quadriculo";

  const isSpecialPasseio = isJangada || isQuadriciclo;
  const isBuggy = categorySlug === "buggy" || categorySlug === "buggies";

  const passeioNome = isQuadriciclo || isBuggy || isJangada
    ? isQuadriciclo
      ? "Passeio de quadriciclo"
      : isBuggy
        ? "Passeio de buggy"
        : "Passeio de jangada"
    : categoryName;


  const passeioExperiencia = isQuadriciclo
    ? "Passeio de quadriciclo"
    : "Piscinas naturais";



  /* ============================================================
     PACOTES DE JANGADA / QUADRICICLO
  ============================================================ */

  const defaultPackages: JangadaPackage[] = [
    {
      id: "pacote-1",
      name: "1 pessoa",
      people: 1,
      price: 100,
    },
    {
      id: "pacote-2",
      name: "2 pessoas",
      people: 2,
      price: 190,
    },
    {
      id: "pacote-3",
      name: "3 pessoas",
      people: 3,
      price: 280,
    },
    {
      id: "pacote-4",
      name: "4 pessoas",
      people: 4,
      price: 380,
    },
    {
      id: "pacote-5",
      name: "5 pessoas",
      people: 5,
      price: 450,
    },
    {
      id: "pacote-6",
      name: "6 pessoas",
      people: 6,
      price: 550,
    },
    {
      id: "pacote-7",
      name: "7 pessoas",
      people: 7,
      price: 640,
    },
    {
      id: "pacote-8",
      name: "8 pessoas",
      people: 8,
      price: 730,
    },
    {
      id: "pacote-9",
      name: "9 pessoas",
      people: 9,
      price: 800,
    },
    {
      id: "pacote-10",
      name: "10 pessoas",
      people: 10,
      price: 900,
    },
  ];

  const packages =
    partnerData.packages && partnerData.packages.length > 0
      ? partnerData.packages
      : defaultPackages;

  /* ============================================================
     DESCRIÇÃO
  ============================================================ */

  const descriptionTitle =
    partnerData.tourDescription?.title ||
    (isQuadriciclo
      ? "Viva uma aventura de quadriciclo em São Miguel dos Milagres"
      : isJangada
        ? "Viva as piscinas naturais de São Miguel dos Milagres"
        : `Conheça ${partner.name}`);

  const descriptionText =
    partnerData.tourDescription?.text ||
    partner.description ||
    partner.short ||
    `Conheça ${partner.name} e aproveite uma experiência especial em ${partner.city}.`;

  /* ============================================================
     PASSEIOS CADASTRADOS
  ============================================================ */

  const toursList = partner.tours?.length
    ? partner.tours
    : [];

  /* ============================================================
     RESERVA
  ============================================================ */

  const handleReserveClick = () => {
    // Categorias especiais → abrem modal de pacotes
    if (isJangada || isQuadriciclo || isBuggy) {
      setReservaModal({
        open: true,
        partnerId: partner.id,
        partnerName: partner.name,
        tipo: isJangada ? "jangada" : isQuadriciclo ? "quadriciclo" : "buggy",
      });
      return;
    }

    // Demais categorias → redireciona diretamente para WhatsApp
    const phone = partner.whatsapp || partner.phone;
    if (phone) {
      const cleaned = phone.replace(/\D/g, "");
      const message = encodeURIComponent(
        `Olá! Vi seu perfil na Rota Milagres e gostaria de mais informações sobre ${partner.name}.`
      );
      window.open(`https://wa.me/${cleaned}?text=${message}`, "_blank");
    } else {
      alert("Este parceiro ainda não possui um número de WhatsApp disponível.");
    }
  };


  return (
    <>
      <AppHeader />

      <main className="pb-16">
        {/* ======================================================
            VOLTAR
        ====================================================== */}

        <div className="mx-auto max-w-6xl px-4 pt-4">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/categorias"
              params={{ slug: categorySlug }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/90 px-4 py-2 text-sm font-medium shadow-sm transition hover:border-primary/50 hover:bg-muted"
            >
              <ArrowLeft className="size-4" />
              Voltar para {categoryName}
            </Link>
          </div>
        </div>

        {/* ======================================================
            IMAGEM + INFORMAÇÕES / CONTATO
        ====================================================== */}

        <section className="mx-auto max-w-6xl px-4 pt-6">
          <div className="grid gap-6 lg:grid-cols-5 lg:items-start">

            {/* ==================================================
                IMAGEM PRINCIPAL
            ================================================== */}

            <div className="lg:col-span-3">

              <div className="overflow-hidden rounded-2xl bg-muted shadow-sm ring-1 ring-border">
                <div className="relative aspect-[16/10] w-full">
                  <img
                    src={mainImage}
                    alt={`${partner.name} — foto ${active + 1}`}
                    className="h-full w-full object-cover"
                  />

                  {images.length > 1 && (
                    <div className="absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                      {active + 1} / {images.length}
                    </div>
                  )}
                </div>
              </div>

              {/* ==================================================
                  MINIATURAS
              ================================================== */}

              {images.length > 1 && (
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {images.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setActive(index)}
                      aria-label={`Ver foto ${index + 1}`}
                      className={`size-16 shrink-0 overflow-hidden rounded-xl ring-2 transition-all ${active === index
                        ? "ring-primary"
                        : "ring-transparent opacity-70 hover:opacity-100"
                        }`}
                    >
                      <img
                        src={image}
                        alt=""
                        loading="lazy"
                        width={128}
                        height={128}
                        className="size-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* ==================================================
                  TÍTULO + INFO RÁPIDA
              ================================================== */}

              <div className="mt-5">

                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {isJangada ? (
                    <Waves className="size-3.5" />
                  ) : isQuadriciclo ? (
                    <Mountain className="size-3.5" />
                  ) : (
                    <MapPin className="size-3.5" />
                  )}

                  {isSpecialPasseio
                    ? passeioNome
                    : categoryName}
                </div>

                <h1 className="font-display text-2xl font-semibold md:text-3xl">
                  {partner.name}
                </h1>

                {/* Avaliação */}

                {partner.rating > 0 && (
                  <div className="mt-3 flex items-center gap-2">
                    <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-sm font-semibold text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
                      <Star className="size-4 fill-current" />
                      {partner.rating.toFixed(1)}
                    </span>

                    {partner.reviewCount > 0 && (
                      <span className="text-sm text-muted-foreground">
                        {partner.reviewCount} avaliações
                      </span>
                    )}
                  </div>
                )}

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {partner.short ||
                    partner.description ||
                    "Uma experiência especial em São Miguel dos Milagres."}
                </p>

                {/* ==================================================
                    INFO CARDS
                ================================================== */}

                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">

                  <InfoCard
                    icon={MapPin}
                    title="Local"
                    value={partner.city || "São Miguel dos Milagres"}
                  />

                  <InfoCard
                    icon={Clock}
                    title="Horário"
                    value={
                      partner.hours_of_operation ||
                      "Consulte o parceiro"
                    }
                  />

                  <InfoCard
                    icon={isQuadriciclo ? Mountain : isJangada ? Waves : Users}
                    title={
                      isSpecialPasseio
                        ? "Experiência"
                        : "Atendimento"
                    }
                    value={
                      isSpecialPasseio
                        ? passeioExperiencia
                        : "Consulte disponibilidade"
                    }
                  />

                  <InfoCard
                    icon={Star}
                    title="Avaliação"
                    value={
                      partner.rating > 0
                        ? `${partner.rating.toFixed(1)} / 5`
                        : "Ainda sem avaliações"
                    }
                  />

                </div>
              </div>
            </div>

            {/* ==================================================
                PAINEL LATERAL
            ================================================== */}

            <div className="lg:col-span-2">
              <div className="sticky top-6 rounded-2xl border border-border bg-card p-5 shadow-sm">

                {/* Preço */}

                {partner.priceFrom != null && (
                  <div className="mb-5 rounded-xl bg-muted/50 p-4">
                    <p className="text-xs text-muted-foreground">
                      A partir de
                    </p>

                    <p className="mt-1 font-display text-2xl font-semibold text-primary">
                      {formatPrice(partner.priceFrom)}
                    </p>
                  </div>
                )}

                <h2 className="font-display text-lg font-semibold">
                  {isSpecialPasseio
                    ? "Escolha seu pacote"
                    : "Entre em contato"}
                </h2>

                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {isSpecialPasseio
                    ? "Quanto maior o grupo, melhor o valor."
                    : "Fale diretamente com o parceiro para consultar disponibilidade e condições."}
                </p>

                {/* ==================================================
                    PACOTES — JANGADA / QUADRICICLO
                ================================================== */}

                {isSpecialPasseio && (
                  <div className="mt-4 max-h-[390px] space-y-2 overflow-y-auto pr-1">

                    {packages.map((pkg) => (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => {
                          setReservaModal({
                            open: true,
                            partnerId: partner.id,
                            partnerName: partner.name,
                            tipo: isQuadriciclo
                              ? "quadriciclo"
                              : "jangada",
                          });
                        }}
                        className="flex w-full items-center justify-between rounded-xl border border-border bg-background px-4 py-3 text-left transition hover:border-primary/50 hover:bg-muted/50"
                      >
                        <div>
                          <p className="text-sm font-medium">
                            {pkg.name}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {pkg.people}{" "}
                            {pkg.people === 1
                              ? "pessoa"
                              : "pessoas"}
                          </p>
                        </div>

                        <span className="font-display text-base font-semibold text-primary">
                          {formatPrice(pkg.price)}
                        </span>
                      </button>
                    ))}

                  </div>
                )}

                

                

                {/* ==================================================
                    WHATSAPP
                ================================================== */}

                {partner.whatsapp && (
                  <a
                    href={whatsappLink(partner)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-whatsapp px-4 py-3 font-medium text-whatsapp-foreground transition-opacity hover:opacity-90"
                  >
                    <MessageCircle className="size-5" />

                    {categorySlug === "pousadas" ||
                      categorySlug === "chales" ||
                      categorySlug === "chalés"
                      ? "Reservar pelo WhatsApp"
                      : "Conversar no WhatsApp"}
                  </a>
                )}

                {/* ==================================================
                    TELEFONE
                ================================================== */}

                {partner.phone && (
                  <a
                    href={`tel:${partner.phone.replace(/\D/g, "")}`}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 font-medium transition hover:bg-muted"
                  >
                    <Phone className="size-4" />
                    {partner.phone}
                  </a>
                )}

                {/* ==================================================
                    MAPA
                ================================================== */}

                {partner.address && (
                  <a
                    href={mapsLink(partner)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-muted/40 px-4 py-3 font-medium transition hover:bg-muted"
                  >
                    <MapPin className="size-4" />
                    Ver localização
                  </a>
                )}

                {/* ==================================================
                    REDES / SITE
                ================================================== */}

                <div className="mt-5 space-y-3 border-t border-border pt-5">

                  {partner.instagram && (
                    <a
                      href={`https://instagram.com/${partner.instagram.replace(
                        "@",
                        "",
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 text-sm text-muted-foreground transition hover:text-foreground"
                    >
                      <Instagram className="size-4 shrink-0" />

                      <span className="truncate">
                        @{partner.instagram.replace("@", "")}
                      </span>
                    </a>
                  )}

                  {partner.website && (
                    <a
                      href={
                        partner.website.startsWith("http")
                          ? partner.website
                          : `https://${partner.website}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 text-sm text-muted-foreground transition hover:text-foreground"
                    >
                      <Globe className="size-4 shrink-0" />

                      <span className="truncate">
                        {partner.website.replace(
                          /^https?:\/\//,
                          "",
                        )}
                      </span>
                    </a>
                  )}

                  {partner.address && (
                    <div className="flex items-start gap-3 text-sm text-muted-foreground">
                      <MapPin className="mt-0.5 size-4 shrink-0" />

                      <span className="leading-relaxed">
                        {partner.address}
                      </span>
                    </div>
                  )}

                  {partner.hours_of_operation && (
                    <div className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Clock className="mt-0.5 size-4 shrink-0" />

                      <span className="leading-relaxed">
                        {partner.hours_of_operation}
                      </span>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            DESCRIÇÃO
        ====================================================== */}

        <section className="mx-auto max-w-6xl px-4 pt-12">

          <div className="max-w-3xl">

            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Sobre o parceiro
            </span>

            <h2 className="mt-2 font-display text-2xl font-medium md:text-3xl">
              {descriptionTitle}
            </h2>

            <p className="mt-4 text-base leading-7 text-muted-foreground">
              {descriptionText}
            </p>

          </div>

          {/* ====================================================
              INFORMAÇÕES / REGRAS
          ==================================================== */}

          <div className="mt-10 rounded-2xl border border-border bg-muted/40 p-6">

            <div className="flex items-start gap-4">

              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Ticket className="size-5 text-primary" />
              </div>

              <div className="min-w-0">

                <h3 className="font-display text-xl font-medium">
                  Informações
                </h3>

                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">

                  {partner.schedules?.length ? (
                    partner.schedules.map(
                      (schedule, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2"
                        >
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />

                          <span>{schedule}</span>
                        </li>
                      ),
                    )
                  ) : (
                    <>
                      {partner.address && (
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />

                          <span>
                            Localização: {partner.address}
                          </span>
                        </li>
                      )}

                      {partner.hours_of_operation && (
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />

                          <span>
                            Horário:{" "}
                            {partner.hours_of_operation}
                          </span>
                        </li>
                      )}

                      {partner.whatsapp && (
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />

                          <span>
                            Atendimento disponível pelo
                            WhatsApp.
                          </span>
                        </li>
                      )}

                      {isJangada && (
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />

                          <span>
                            Passeio sujeito à disponibilidade
                            e condições da maré.
                          </span>
                        </li>
                      )}

                      {isQuadriciclo && (
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />

                          <span>
                            Consulte horários e condições
                            diretamente na reserva.
                          </span>
                        </li>
                      )}

                      {!partner.address &&
                        !partner.hours_of_operation &&
                        !partner.whatsapp &&
                        !isJangada &&
                        !isQuadriciclo && (
                          <li className="flex items-start gap-2">
                            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />

                            <span>
                              Entre em contato para obter
                              informações sobre este parceiro.
                            </span>
                          </li>
                        )}
                    </>
                  )}

                </ul>
              </div>
            </div>
          </div>

          {/* ====================================================
              PASSEIOS CADASTRADOS
          ==================================================== */}

          {toursList.length > 0 && (
            <div className="mt-10">

              <h2 className="font-display text-2xl font-medium">
                Passeios disponíveis
              </h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">

                {toursList.map((tour) => (
                  <div
                    key={tour.id || tour.name}
                    className="rounded-2xl border border-border bg-card p-5"
                  >

                    <h3 className="font-medium">
                      {tour.name}
                    </h3>

                    {tour.description && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {tour.description}
                      </p>
                    )}

                    <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">

                      {tour.duration_minutes && (
                        <span className="flex items-center gap-1">
                          <Clock className="size-3.5" />

                          {Math.floor(
                            tour.duration_minutes / 60,
                          )}
                          h
                        </span>
                      )}

                      {tour.max_capacity && (
                        <span className="flex items-center gap-1">
                          <Users className="size-3.5" />

                          {tour.max_capacity} pessoas
                        </span>
                      )}

                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3">

                      <span className="font-medium text-primary">
                        {formatPrice(tour.price)}
                      </span>

                      <button
                        type="button"
                        onClick={handleReserveClick}
                        className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                      >
                        <Ticket className="size-4" />
                        Reservar
                      </button>

                    </div>
                  </div>
                ))}

              </div>
            </div>
          )}



          

          
        </section>
        {/* ======================================================
    AVALIAÇÕES E FAVORITOS
====================================================== */}
        <section className="mx-auto max-w-6xl px-4 pt-12">
          <div className="border-t border-border pt-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="font-display text-2xl font-medium">Avaliações dos clientes</h2>
              <FavoritarButton partnerId={partner.id} partnerName={partner.name} />
            </div>

            <div className="mt-6 grid gap-8 md:grid-cols-[1fr_400px]">
              <PartnerAvaliacoesList partnerId={partner.id} />
              <div className="rounded-2xl border border-border bg-muted/40 p-5">
                <h3 className="font-medium">Deixe sua avaliação</h3>
                <p className="text-sm text-muted-foreground">
                  Sua opinião ajuda outros viajantes a escolherem.
                </p>
                <div className="mt-4">
                  <AvaliacaoForm
                    partnerId={partner.id}
                    onSuccess={() => {
                      // Recarregar avaliações (atualizando o componente)
                      // Podemos usar um estado local para forçar refresh
                      // Como simplificação, vamos recarregar a página
                      window.location.reload();
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================
          MODAL JANGADA / QUADRICICLO
      ======================================================== */}

      {/* Modal de reserva unificado */}
      <ReservationModal
        isOpen={reservaModal.open}
        onClose={() => setReservaModal({ open: false, partnerId: '', partnerName: '', tipo: 'jangada' })}
        partnerName={partner.name}
        whatsappNumber={contactPhone}
        tipo={reservaModal.tipo}
        packages={packages}
      />

      {/* ========================================================
          MODAL DE AUTENTICAÇÃO
      ======================================================== */}

      {showAuthModal && (
        <ClienteRequiredModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          partnerName={partner.name}
          action="reservar um passeio"
        />
      )}

      {/* ========================================================
          VOUCHER
      ======================================================== */}

      {showVoucherModal && (
        <VoucherJangada
          partnerId={partner.id}
          partnerName={partner.name}
          tipo={isJangada ? 'jangada' : isQuadriciclo ? 'quadriciclo' : 'buggy'}
          onSuccess={() => setShowVoucherModal(false)}
          onClose={() => setShowVoucherModal(false)}
        />
      )}
    </>
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
    <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-border bg-card p-3.5">

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
  isOpen,
  onClose,
  partnerName,
  whatsappNumber,
  tipo = "jangada",
  packages,
}: {
  isOpen: boolean;
  onClose: () => void;
  partnerName: string;
  whatsappNumber: string | null | undefined;
  tipo?: "jangada" | "quadriciclo" | "buggy";
  packages: JangadaPackage[];
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [selectedPackageId, setSelectedPackageId] =
    useState(packages[0]?.id || "");

  const selectedPackage =
    packages.find(
      (item) => item.id === selectedPackageId,
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

    const whatsapp =
      whatsappNumber?.replace(/\D/g, "");

    const passeioNome =
      tipo === "quadriciclo"
        ? "passeio de quadriciclo"
        : "passeio de jangada";

    const message = [
      `*Olá !* Quero fazer uma reserva de ${passeioNome} pela *Rota Milagres*.`,
      "",
      `Parceiro: ${partnerName}`,
      `Nome: ${name.trim()}`,
      `Celular: ${phone.trim()}`,
      `Pacote: ${selectedPackage.name}`,
      `Pessoas: ${selectedPackage.people}`,
      `Valor: ${formatPrice(selectedPackage.price)}`,
      "",
      "*Gostaria de confirmar a disponibilidade.*",
    ].join("\n");

    if (whatsapp) {
      const url =
        `https://wa.me/${whatsapp}?text=${encodeURIComponent(
          message,
        )}`;

      window.open(url, "_blank");

      onClose();

      setName("");
      setPhone("");

      setSelectedPackageId(
        packages[0]?.id || "",
      );

      return;
    }

    console.log("📋 Dados da reserva:", {
      partnerName,
      name: name.trim(),
      phone: phone.trim(),
      package: selectedPackage,
    });

    alert(
      "Reserva preenchida! O WhatsApp deste parceiro ainda não foi configurado.",
    );

    onClose();
  }

  if (!isOpen) {
    return null;
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
                  event.target.value,
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

                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {selectedPackage.people}{" "}
                    {selectedPackage.people === 1
                      ? "pessoa"
                      : "pessoas"}
                  </p>

                </div>

                <div className="text-right">

                  <p className="text-xs text-muted-foreground">
                    Total
                  </p>

                  <p className="mt-1 font-display text-xl font-semibold text-primary">
                    {formatPrice(
                      selectedPackage.price,
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
            Ao enviar, você será direcionado para o
            WhatsApp para confirmar a disponibilidade
            do passeio.
          </p>

        </form>
      </div>
    </div>
  );
}

