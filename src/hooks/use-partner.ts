// hooks/use-partner.ts
import { useAuth } from "@/hooks/use-auth";
import type { Partner } from "@/lib/catalog";

export function usePartner(): Partner | null {
  const { user } = useAuth();
  return (user?.partner as unknown as Partner) ?? null;
}