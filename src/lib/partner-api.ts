// src/lib/partner-api.ts
import { authFetch, authJson } from "./auth-fetch";
import type { Partner } from "./catalog";

/* ---------------- PERFIL ---------------- */

export async function getMyPartner(): Promise<Partner | null> {
  try {
    const res = await authJson<
      | { success: boolean; data: Partner | { partner: Partner } }
      | { user: unknown; partner: Partner }
    >("/partner/profile");

    const raw = (res as { data?: unknown }).data ?? res;
    const extracted = (raw as { partner?: Partner }).partner ?? (raw as Partner);

    if (extracted && typeof extracted === "object" && "name" in extracted) {
      return extracted;
    }
    return null;
  } catch (err) {
    if (
      err instanceof Error &&
      (err.message.includes("404") || err.message.includes("403"))
    ) {
      return null;
    }
    throw err;
  }
}

export async function updateMyPartner(data: Partial<Partner>): Promise<Partner> {
  const res = await authJson<{ success: boolean; data: Partner }>(
    "/partner/profile",
    {
      method: "PUT",
      body: JSON.stringify(data),
    }
  );
  return res.data;
}

/* ---------------- IMAGENS ---------------- */

export async function listImages() {
  const res = await authJson<{ success: boolean; data: unknown[] }>(
    "/partner/images"
  );
  return res.data;
}

export async function uploadImages(files: File[]) {
  const form = new FormData();
  for (const f of files) form.append("images", f);

  const res = await authFetch("/partner/images", {
    method: "POST",
    body: form,
  });

  const json = await res.json();
  if (!res.ok || json?.success === false) {
    throw new Error(json?.error ?? "Erro no upload");
  }
  return json.data;
}

export async function deleteImage(id: string) {
  await authJson(`/partner/images/${id}`, { method: "DELETE" });
}

export async function reorderPartnerImages(_urls: string[]): Promise<void> {
  // backend ainda não tem endpoint de reordenação — no-op
  return;
}

/* ---------------- DASHBOARD ---------------- */

export async function getDashboard() {
  const res = await authJson<{ success: boolean; data: unknown }>(
    "/partner/dashboard"
  );
  return res.data;
}

/* ---------------- PROMOÇÕES ---------------- */

export type PromoPayload = {
  id?: string;
  title: string;
  description?: string;
  detail?: string | null;
  badge?: string | null;
  image_url?: string | null;
  discount?: string;
  validUntil?: string;
  active?: boolean;
};

export async function listMyPromos(): Promise<PromoPayload[]> {
  const res = await authJson<{ success: boolean; data: PromoPayload[] }>(
    "/partner/promos"
  );
  return res.data ?? [];
}

export async function createPromo(payload: Partial<PromoPayload>) {
  return authJson("/partner/promos", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updatePromo(id: string, payload: Partial<PromoPayload>) {
  return authJson(`/partner/promos/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deletePromo(id: string) {
  return authJson(`/partner/promos/${id}`, { method: "DELETE" });
}

/* ---------------- TOURS / ROOMS / MENU ---------------- */

export async function createTour(payload: Record<string, unknown>) {
  return authJson("/partner/tours", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function createRoomType(payload: Record<string, unknown>) {
  return authJson("/partner/room-types", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function createMenuSection(payload: Record<string, unknown>) {
  return authJson("/partner/menu-sections", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/* ---------------- HORÁRIOS (stub até existir endpoint) ---------------- */

export type SchedulePayload = {
  days: string[];
  openTime: string;
  closeTime: string;
  notes?: string;
};

export async function getSchedules(): Promise<SchedulePayload> {
  return { days: [], openTime: "08:00", closeTime: "18:00", notes: "" };
}

export async function updateSchedules(data: SchedulePayload): Promise<SchedulePayload> {
  return data;
}

/* ---------------- RESERVAS (stub) ---------------- */

export type Reservation = {
  id: string;
  customerName: string;
  customerPhone: string;
  packageName?: string;
  people?: number;
  price?: number;
  status: "pending" | "confirmed" | "cancelled" | "done";
  createdAt: string;
  scheduledTo?: string;
};

export async function listReservations(): Promise<Reservation[]> {
  return [];
}

export async function updateReservationStatus(
  _id: string,
  _status: Reservation["status"]
): Promise<Reservation> {
  throw new Error("Endpoint de reservas ainda não implementado.");
}

/* ---------------- AVALIAÇÕES (stub) ---------------- */

export type Review = {
  id: string;
  authorName: string;
  rating: number;
  comment: string;
  reply?: string | null;
  createdAt: string;
};

export async function listReviews(): Promise<Review[]> {
  return [];
}

export async function replyReview(_id: string, _reply: string): Promise<Review> {
  throw new Error("Endpoint de avaliações ainda não implementado.");
}

/* ---------------- ESTATÍSTICAS ---------------- */

export type Stats = {
  views: number;
  viewsLast30: number;
  whatsappClicks: number;
  whatsappClicksLast30: number;
  favorites: number;
  avgRating: number;
  reviewCount: number;
  monthlyViews: { month: string; total: number }[];
};

/**
 * Adapta o formato do /partner/dashboard para o formato de Stats.
 * Se o backend não responder, devolve zeros em vez de quebrar a página.
 */
export async function getStats(): Promise<Stats> {
  try {
    const res = await authJson<{ success: boolean; data: unknown }>(
      "/partner/dashboard"
    );

    const data = res.data as
      | (Partial<Stats> & {
        total_views?: number;
        total_contacts?: number;
        views_last_30_days?: Record<string, number>;
      })
      | undefined;

    const monthlyViews = data?.views_last_30_days
      ? Object.entries(data.views_last_30_days).map(([month, total]) => ({
        month,
        total: Number(total),
      }))
      : [];

    return {
      views: data?.total_views ?? data?.views ?? 0,
      viewsLast30: monthlyViews.reduce((acc, m) => acc + m.total, 0),
      whatsappClicks: data?.total_contacts ?? data?.whatsappClicks ?? 0,
      whatsappClicksLast30: 0,
      favorites: data?.favorites ?? 0,
      avgRating: data?.avgRating ?? 0,
      reviewCount: data?.reviewCount ?? 0,
      monthlyViews,
    };
  } catch {
    return {
      views: 0,
      viewsLast30: 0,
      whatsappClicks: 0,
      whatsappClicksLast30: 0,
      favorites: 0,
      avgRating: 0,
      reviewCount: 0,
      monthlyViews: [],
    };
  }
}