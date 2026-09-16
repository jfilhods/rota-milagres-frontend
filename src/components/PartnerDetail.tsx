// src/components/PartnerDetail.tsx
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Clock,
  MapPin,
  Star,
  Ticket,
  Users,
  MessageCircle,
} from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { VoucherJangada } from "@/components/VoucherJangada";
import { ClienteRequiredModal } from "@/components/ClienteRequiredModal";
import { ReservaJangadaModal } from "@/components/ReservaJangadaModal"; // vamos criar este componente separado
import { useClienteAuth } from "@/contexts/cliente-auth-context";
import {
  formatPrice,
  mapsLink,
  whatsappLink,
  type Partner,
} from "@/lib/catalog";

interface PartnerDetailProps {
  partner: Partner;
}

export function PartnerDetail({ partner }: PartnerDetailProps) {
  const { isAuthenticated } = useClienteAuth();

  const [active, setActive] = useState(0);
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [reservaModal, setReservaModal] = useState<{
    open: boolean;
    partnerId: string;
    partnerName: string;
  }>({
    open: false,
    partnerId: "",
    partnerName: "",
  });

  const categoryName = partner.category?.name || "Estabelecimento";
  const categorySlug = partner.category?.slug?.toLowerCase() || "";
  const contactPhone = partner.whatsapp || partner.phone;
  const images = partner.images?.length ? partner.images : ["/images/placeholder-partner.jpg"];
  const isJangada = categorySlug === "jangadas" || categorySlug === "jangada";

  const toursList = partner.tours?.length
    ? partner.tours
    : [
        {
          id: "1",
          name: "Passeio de Jangada",
          description: "Visita às piscinas naturais",
          duration_minutes: 120,
          max_capacity: 6,
          price: partner.priceFrom || 80,
        },
      ];

  const handleReserveClick = () => {
    if (isJangada) {
      setReservaModal({
        open: true,
        partnerId: partner.id,
        partnerName: partner.name,
      });
      return;
    }
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      setShowVoucherModal(true);
    }
  };

  return (
    <>
      {/* Este bloco reproduz exatamente o conteúdo da antiga PartnerPage, 
          sem o AppHeader (que será colocado fora no roteador) */}
      <article className="px-4 py-8">
        <div className="mx-auto max-w-6xl">
          {/* Breadcrumb */}
          <nav className="mb-4 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Início</Link>
            <span className="mx-2">/</span>
            {categorySlug ? (
              <Link
                to="/categoria/$slug"
                params={{ slug: categorySlug }}
                className="hover:text-foreground"
              >
                {categoryName}
              </Link>
            ) : (
              <Link to="/categorias" className="hover:text-foreground">
                Categorias
              </Link>
            )}
          </nav>

          {/* Galeria */}
          <div className="overflow-hidden rounded-3xl">
            <img
              src={images[active]}
              alt={`${partner.name} — foto ${active + 1}`}
              width={1200}
              height={800}
              className="aspect-[16/10] w-full object-cover"
            />
          </div>

          {images.length > 1 && (
            <div className="mt-3 flex gap-3 overflow-x-auto pb-1 no-scrollbar">
              {images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`Ver foto ${index + 1}`}
                  className={`size-20 shrink-0 overflow-hidden rounded-lg ring-2 transition-all ${
                    active === index ? "ring-primary" : "ring-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={image}
                    alt=""
                    loading="lazy"
                    width={160}
                    height={160}
                    className="size-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Conteúdo principal */}
          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="min-w-0">
              <span className="text-xs font-semibold uppercase tracking-widest text-tide">
                {categoryName} · {partner.city}
              </span>
              <h1 className="mt-2 font-display text-3xl font-medium md:text-4xl">{partner.name}</h1>

              {partner.rating > 0 && (
                <div className="mt-3 flex items-center gap-2 text-sm">
                  <Star className="size-4 fill-current text-amber-500" />
                  <span className="font-semibold">{partner.rating.toFixed(1)}</span>
                  {partner.reviewCount > 0 && (
                    <span className="text-muted-foreground">({partner.reviewCount} avaliações)</span>
                  )}
                </div>
              )}

              <p className="mt-6 max-w-[64ch] leading-relaxed text-muted-foreground">
                {partner.description || partner.short || "Sem descrição disponível."}
              </p>

              {partner.address && (
                <div className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="mt-0.5 size-4 shrink-0" />
                  <span>{partner.address}</span>
                </div>
              )}

              {/* Bloco especial de jangadas */}
              {isJangada && (
                <section className="mt-10">
                  <div className="rounded-2xl bg-card p-6 ring-1 ring-border">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-widest text-tide">
                          Passeio de jangada
                        </span>
                        <h2 className="mt-1 font-display text-2xl font-medium">Valores do passeio</h2>
                      </div>
                      {partner.rating > 0 && (
                        <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
                          <Star className="size-3 fill-current" />
                          {partner.rating.toFixed(1)}
                          {partner.reviewCount > 0 && (
                            <span className="text-[10px] opacity-70">({partner.reviewCount})</span>
                          )}
                        </span>
                      )}
                    </div>

                    {partner.short && (
                      <p className="mt-2 text-sm text-muted-foreground">{partner.short}</p>
                    )}

                    <div className="mt-5 rounded-lg bg-muted/40 p-4">
                      <h4 className="text-sm font-medium">💰 Valores do passeio</h4>
                      <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                        <li>• 1 pessoa: <span className="font-semibold text-foreground">R$ 100</span></li>
                        <li>• Casal (2 pessoas): <span className="font-semibold text-foreground">R$ 180</span></li>
                        <li>• 4 pessoas: <span className="font-semibold text-foreground">R$ 350</span></li>
                        <li>• Grupos até 12 pessoas: <span className="font-semibold text-foreground">consulte descontos</span></li>
                      </ul>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setReservaModal({
                            open: true,
                            partnerId: partner.id,
                            partnerName: partner.name,
                          })
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                      >
                        <Ticket className="size-4" />
                        Reservar
                      </button>
                      <button
                        type="button"
                        disabled
                        title="Pagamento online em breve"
                        className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full border border-border bg-muted/50 px-5 py-2.5 text-sm font-medium text-muted-foreground opacity-60"
                      >
                        Pagar online
                      </button>
                      {contactPhone && (
                        <a
                          href={whatsappLink(partner)}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-medium transition hover:bg-muted"
                        >
                          <MessageCircle className="size-4" />
                          WhatsApp
                        </a>
                      )}
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground">
                      * Os passeios são intermediados pelo nosso time. Você será atendido(a) rapidamente.
                    </p>
                  </div>

                  {toursList.length > 0 && (
                    <div className="mt-8">
                      <h2 className="font-display text-2xl font-medium">Passeios disponíveis</h2>
                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        {toursList.map((tour) => (
                          <div key={tour.id || tour.name} className="rounded-2xl bg-card p-5 ring-1 ring-border">
                            <h3 className="font-medium">{tour.name}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">{tour.description}</p>
                            <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
                              {tour.duration_minutes && (
                                <span className="flex items-center gap-1">
                                  <Clock className="size-3.5" />
                                  {Math.floor(tour.duration_minutes / 60)}h
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
                              <span className="font-medium text-tide">{formatPrice(tour.price)}</span>
                              <button
                                type="button"
                                onClick={handleReserveClick}
                                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
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
              )}

              {/* Passeios para outras categorias */}
              {!isJangada && (categorySlug === "passeios" || categorySlug === "turismo") && (
                <section className="mt-12">
                  <h2 className="font-display text-2xl font-medium">Passeios disponíveis</h2>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {toursList.map((tour) => (
                      <div key={tour.id || tour.name} className="rounded-2xl bg-card p-5 ring-1 ring-border">
                        <h3 className="font-medium">{tour.name}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{tour.description}</p>
                        <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
                          {tour.duration_minutes && (
                            <span className="flex items-center gap-1">
                              <Clock className="size-3.5" />
                              {Math.floor(tour.duration_minutes / 60)}h
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
                          <span className="font-medium text-tide">{formatPrice(tour.price)}</span>
                          <button
                            type="button"
                            onClick={handleReserveClick}
                            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                          >
                            <Ticket className="size-4" />
                            Reservar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
            {/* Sidebar (se houver) — você pode manter ou remover conforme necessário */}
          </div>
        </div>
      </article>

      {/* Modais */}
      <ReservaJangadaModal
        isOpen={reservaModal.open}
        onClose={() =>
          setReservaModal({
            open: false,
            partnerId: "",
            partnerName: "",
          })
        }
        partnerName={reservaModal.partnerName}
        whatsappNumber={contactPhone}
      />

      {showAuthModal && (
        <ClienteRequiredModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          partnerName={partner.name}
          action="reservar um passeio"
        />
      )}

      {showVoucherModal && (
        <VoucherJangada
          partnerId={partner.id}
          partnerName={partner.name}
          onSuccess={() => setShowVoucherModal(false)}
          onClose={() => setShowVoucherModal(false)}
          tipo="jangada"
        />
      )}
    </>
  );
}