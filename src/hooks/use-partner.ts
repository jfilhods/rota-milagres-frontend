// hooks/use-partner.ts
import { useEffect, useState } from "react";
import { getMyPartner } from "@/lib/partner-api";
import type { Partner } from "@/lib/catalog";

export function usePartner(): Partner | null {
  const [partner, setPartner] = useState<Partner | null>(null);

  useEffect(() => {
    let active = true;

    //console.log("[usePartner] buscando /partner/profile...");

    getMyPartner()
      .then((data) => {
        if (!active) return;
        //console.log("[usePartner] resposta:", data);
        setPartner(data);
      })
      .catch((err) => {
        if (!active) return;
        console.error("[usePartner] erro:", err);
      });

    return () => {
      active = false;
    };
  }, []);

  return partner;
}