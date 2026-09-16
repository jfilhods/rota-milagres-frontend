// lib/partner-api.ts

import type { Partner } from "@/lib/catalog";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3333/api";

const TOKEN_KEY = "@rota-milagres:token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();

  const headers = new Headers(options.headers || {});
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `HTTP ${res.status}`);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

/* ---------------- PERFIL / PARCEIRO ---------------- */

export function getMyPartner(): Promise<Partner> {
  return apiFetch<Partner>("/partner/me");
}

export function updateMyPartner(data: Partial<Partner>): Promise<Partner> {
  return apiFetch<Partner>("/partner/me", {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// /* ---------------- IMAGENS ---------------- */

// export function uploadPartnerImage(file: File): Promise<{ url: string }> {
//   const form = new FormData();
//   form.append("file", file);
//   return apiFetch<{ url: string }>("/partner/me/images", {
//     method: "POST",
//     body: form,
//   });
// }

// export function deletePartnerImage(url: string): Promise<void> {
//   return apiFetch<void>(
//     `/partner/me/images?url=${encodeURIComponent(url)}`,
//     { method: "DELETE" }
//   );
// }



export function reorderPartnerImages(urls: string[]): Promise<void> {
  return apiFetch<void>("/partner/me/images/order", {
    method: "PUT",
    body: JSON.stringify({ urls }),
  });
}

/* ---------------- PROMOÇÕES ---------------- */

export type PromoPayload = {
  id?: string;
  title: string;
  description?: string;
  discount?: string;
  validUntil?: string;
  active?: boolean;
};

export function listPromos(): Promise<PromoPayload[]> {
  return apiFetch<PromoPayload[]>("/partner/me/promos");
}

export function createPromo(data: PromoPayload): Promise<PromoPayload> {
  return apiFetch<PromoPayload>("/partner/me/promos", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updatePromo(
  id: string,
  data: Partial<PromoPayload>
): Promise<PromoPayload> {
  return apiFetch<PromoPayload>(`/partner/me/promos/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deletePromo(id: string): Promise<void> {
  return apiFetch<void>(`/partner/me/promos/${id}`, { method: "DELETE" });
}

/* ---------------- HORÁRIOS ---------------- */

export type SchedulePayload = {
  days: string[];        // ex: ["seg","ter","qua","qui","sex"]
  openTime: string;      // "08:00"
  closeTime: string;     // "18:00"
  notes?: string;
};

export function getSchedules(): Promise<SchedulePayload> {
  return apiFetch<SchedulePayload>("/partner/me/schedules");
}

export function updateSchedules(data: SchedulePayload): Promise<SchedulePayload> {
  return apiFetch<SchedulePayload>("/partner/me/schedules", {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

/* ---------------- RESERVAS ---------------- */

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

export function listReservations(): Promise<Reservation[]> {
  return apiFetch<Reservation[]>("/partner/me/reservations");
}

export function updateReservationStatus(
  id: string,
  status: Reservation["status"]
): Promise<Reservation> {
  return apiFetch<Reservation>(`/partner/me/reservations/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

/* ---------------- AVALIAÇÕES ---------------- */

export type Review = {
  id: string;
  authorName: string;
  rating: number;
  comment: string;
  reply?: string | null;
  createdAt: string;
};

export function listReviews(): Promise<Review[]> {
  return apiFetch<Review[]>("/partner/me/reviews");
}

export function replyReview(id: string, reply: string): Promise<Review> {
  return apiFetch<Review>(`/partner/me/reviews/${id}/reply`, {
    method: "POST",
    body: JSON.stringify({ reply }),
  });
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

export function getStats(): Promise<Stats> {
  return apiFetch<Stats>("/partner/me/stats");
}