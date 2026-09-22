// src/lib/auth-fetch.ts
import { supabase } from "./supabase";

const API_URL = import.meta.env.VITE_API_URL.replace(/\/+$/, "") || 'http://localhost:3334/api'

export async function getAuthToken(): Promise<string | null> {
  // 1. sessão Supabase (Google)
  const { data } = await supabase.auth.getSession();
  if (data.session?.access_token) {
    return data.session.access_token;
  }
  // 2. fallback: sistema antigo
  return localStorage.getItem("auth_token");
}

export async function authFetch(
  path: string,
  init: RequestInit = {}
): Promise<Response> {
  const token = await getAuthToken();
  if (!token) throw new Error("Sessão expirada. Faça login novamente.");

  const url = path.startsWith("http") ? path : `${API_URL}${path}`;

  const headers = new Headers(init.headers ?? {});
  if (!headers.has("Content-Type") && !(init.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  headers.set("Authorization", `Bearer ${token}`);

  return fetch(url, { ...init, headers });
}

export async function authJson<T = unknown>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const res = await authFetch(path, init);

  if (res.status === 204) return undefined as T;

  const json = await res.json().catch(() => ({}));
  if (!res.ok || json?.success === false) {
    throw new Error(json?.error ?? `Erro ${res.status}`);
  }
  return json as T;
}