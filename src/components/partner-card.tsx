// components/PartnerCard.tsx

import { Link } from "@tanstack/react-router";
import { ClienteActionButton } from "./ClienteInteractionButton";
import { getPartnerImage } from "@/lib/catalog";
import type { Partner } from "@/data/catalog.types";

// Definir o tipo esperado pelo PartnerCard
export type PartnerCardPartner = Partner & {
  active?: boolean;
};

interface PartnerCardProps {
  partner: PartnerCardPartner;
}

function getPartnerImageUrl(partner: PartnerCardPartner): string | null {
  // Usar a função centralizada do catalog
  const image = getPartnerImage(partner);
  return image || null;
}

export function PartnerCard({ partner }: PartnerCardProps) {
  const partnerPhone = partner.whatsapp || partner.phone || undefined;
  const imageUrl = getPartnerImageUrl(partner);
  const description = partner.short || partner.description || "";

  return (
    <div className="overflow-hidden rounded-xl bg-card ring-1 ring-border transition-shadow hover:shadow-lg">
      {/* Imagem */}
      <Link to="/parceiro/$slug" params={{ slug: partner.slug }}>
        <div className="aspect-[4/3] overflow-hidden bg-muted">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={partner.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
              Sem imagem
            </div>
          )}
        </div>
      </Link>

      <div className="space-y-3 p-4">
        <Link to="/parceiro/$slug" params={{ slug: partner.slug }}>
          <h3 className="font-display text-lg hover:underline">{partner.name}</h3>
        </Link>

        {description && (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {description}
          </p>
        )}

        <div className="flex gap-2">
          {partnerPhone && (
            <ClienteActionButton
              partnerId={partner.id}
              partnerName={partner.name}
              partnerPhone={partnerPhone}
              actionType="whatsapp"
              className="flex-1 rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
              WhatsApp
            </ClienteActionButton>
          )}

          <ClienteActionButton
            partnerId={partner.id}
            partnerName={partner.name}
            actionType="favoritar"
            className="rounded-xl border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            ❤️
          </ClienteActionButton>
        </div>
      </div>
    </div>
  );
}