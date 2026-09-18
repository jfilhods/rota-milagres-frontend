const API_BASE = import.meta.env.VITE_API_URL 

// ============ TIPOS ============

export interface User {
  id: string;
  email?: string;
  partner_id: string | null;
  role: "admin" | "owner" | "manager";
  partner?: Partner | null;
  must_change_password?: boolean;
}

export interface Partner {
  id: string;
  name: string;
  slug: string;
  active: boolean;
  email?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  address?: string | null;
  description?: string | null;
  short_description?: string | null;
  partner_images?: PartnerImage[];
  subscriptions?: Subscription[];
  [key: string]: unknown;
}

export interface PartnerImage {
  id: string;
  url: string;
  display_order?: number;
}

export interface Subscription {
  plan_type: "gratuito" | "bronze" | "prata" | "ouro";
  status: "active" | "inactive" | "pending";
  expires_at?: string;
}

export interface Category {
  city: City
  id: string;
  name: string;
  slug: string;
  emoji?: string | null;
  image_url?: string | null;
}

export interface City {
  id: string;
  name: string;
  slug: string;
  state?: string | null;
}

export interface OnboardPartnerData {
  name: string;
  email: string;
  category_id: string;
  city_id: string;
  price_from: number;
  slug?: string;
  short_description?: string;
  description?: string;
  hours_of_operation?: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  whatsapp?: string;
  instagram?: string;
  website?: string;
  address?: string;
  plan_type: "gratuito" | "bronze" | "prata" | "ouro";
  send_invite?: boolean;
  default_password?: string;
  featured?: boolean;
  active?: boolean;
  [key: string]: unknown;
}


export interface AdminStats {
  partners: number;
  users: number;
  subscriptions: number;
  categories: number;
  cities: number;
}

export interface UpdatePartnerData {
  name?: string | undefined;
  slug?: string | undefined;
  category_id?: string | undefined;
  city_id?: string | undefined;
  short_description?: string | null | undefined;
  description?: string | null | undefined;
  price_from?: number | null | undefined;
  phone?: string | null | undefined;
  whatsapp?: string | null | undefined;
  instagram?: string | null | undefined;
  website?: string | null | undefined;
  hours_of_operation?: string | null | undefined;
  address?: string | null | undefined;
  latitude?: number | null | undefined;
  longitude?: number | null | undefined;
  featured?: boolean | undefined;
  active?: boolean | undefined;
}

export interface AdminUser {
  id: string;
  email: string;
  role: string;
}

export interface AdminPartner {
  id: string;
  slug: string;
  name: string;
  active: boolean;
  email?: string | null;
  owner_email?: string | null;
  category_id?: string | null;
  city_id?: string | null;
  short_description?: string | null;
  description?: string | null;
  price_from?: number | null;
  phone?: string | null;
  whatsapp?: string | null;
  instagram?: string | null;
  website?: string | null;
  hours_of_operation?: string | null;
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  featured?: boolean;
  // joins do select("*, categories(name), cities(name), subscriptions(...)")
  categories?: { name: string } | { name: string }[] | null;
  cities?: { name: string } | { name: string }[] | null;
  subscriptions?: Subscription | Subscription[] | null;
}

export interface LoginResponse {
  token: string;
  refresh_token: string;
  expires_at?: number;
  user: User;
}

export interface AuthProfileResponse {
  success: boolean;
  data: {
    user: User;
    partner: Partner | null;
  };
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface DashboardResponse {
  views?: number;
  totalViews?: number;
  contacts?: number;
  totalContacts?: number;
}

// ============ CLIENTE ============

export interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string | null;
  documento: string | null;
  data_nascimento: string | null;
  email_verificado: boolean;
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

export interface ClienteLoginResponse {
  token: string;
  refresh_token?: string;
  expires_at?: number;
  cliente: Cliente;
}

export interface ClienteRegisterData {
  nome: string;
  email: string;
  telefone?: string;
  documento?: string;
  data_nascimento?: string;
  password: string;
}

export interface ClienteAuthResponse {
  success: boolean;
  data: {
    cliente: Cliente;
  };
}

// ============ PROMOS ============

export interface AdminPromo {
  id: string;
  partner_id: string;
  title: string;
  detail: string | null;
  badge: string | null;
  image_url: string | null;
  active: boolean;
  starts_at: string | null;
  ends_at: string | null;
  created_at: string;
  partners?: { id: string; slug: string; name: string } | null;
}

export interface PromoInput {
  partner_id: string;
  title: string;
  detail?: string | null;
  badge?: string | null;
  image_url?: string | null;
  active?: boolean;
  starts_at?: string | null;
  ends_at?: string | null;
}

export interface PartnerPromo {
  id: string;
  title: string;
  detail: string | null;
  badge: string | null;
  image_url: string | null;
  active: boolean;
  starts_at: string | null;
  ends_at: string | null;
  created_at: string;
}

export async function getPartnerPromos(): Promise<
  ApiResponse<PartnerPromo[]>
> {
  return request<ApiResponse<PartnerPromo[]>>("partner/promos");
}

// services/api.ts
export async function cleanupExpiredPromos(): Promise<
  ApiResponse<{ removed: number; message: string }>
> {
  return request<ApiResponse<{ removed: number; message: string }>>(
    "admin/promos/cleanup",
    { method: "POST" }
  );
}

// ============ AUTENTICAÇÃO CLIENTES ============

// export async function registerCliente(
//   body: ClienteRegisterData,
// ): Promise<ClienteLoginResponse> {
//   return request<ClienteLoginResponse>("/clientes/register", {
//     method: "POST",
//     body: JSON.stringify(body),
//   }, false);
// }

export async function loginCliente(
  email: string,
  password: string,
): Promise<ClienteLoginResponse> {
  return request<ClienteLoginResponse>("clientes/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  }, false);
}

export async function getClienteProfile(): Promise<ClienteAuthResponse> {
  return request<ClienteAuthResponse>("clientes/profile");
}



async function clienteRequest<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const token = localStorage.getItem("cliente_token");

  const headers = new Headers(init.headers);

  headers.set("Content-Type", "application/json");

  if (token) {
    headers.set(
      "Authorization",
      `Bearer ${token}`,
    );
  }

  const res = await fetch(
    `${API_BASE}${path}`,
    {
      ...init,
      headers,
    },
  );

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(
      data?.error || "Erro na API",
    );
  }

  return data as T;
}

export async function registrarClienteInteracao(
  partnerId: string,
  tipo: string = "contato",
): Promise<ApiResponse<unknown>> {
  return clienteRequest<ApiResponse<unknown>>(
    `clientes/interacoes`,
    {
      method: "POST",
      body: JSON.stringify({
        partner_id: partnerId,
        tipo,
      }),
    },
  );
}

// ============ FUNÇÃO BASE ============

// ============ FUNÇÃO BASE ============

async function request<T>(path: string, init: RequestInit = {}, retry = true): Promise<T> {
  const token = localStorage.getItem("auth_token");
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json");

  const isPublicAuthRoute = 
    path.includes("/login") || 
    path.includes("/register");

  if (token && !isPublicAuthRoute) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(`${API_BASE}${path}`, { ...init, headers });

  if (res.status === 401 && retry && !isPublicAuthRoute) {
    const refreshToken = localStorage.getItem("auth_refresh_token");
    if (refreshToken) {
      try {
        const refreshRes = await fetch(`${API_BASE}auth/refresh`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh_token: refreshToken }),
        });
        
        if (refreshRes.ok) {
          const session = await refreshRes.json();
          localStorage.setItem("auth_token", session.token);
          if (session.refresh_token) localStorage.setItem("auth_refresh_token", session.refresh_token);
          if (session.expires_at) localStorage.setItem("auth_expires_at", String(session.expires_at));
          return request<T>(path, init, false);
        }
      } catch {
        // falha na renovação
      }
    }
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error || "Erro na API");
  return data as T;
}
// ============ AUTENTICAÇÃO ============

export async function login(email: string, password: string): Promise<LoginResponse> {
  return request<LoginResponse>("auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  }, false);
}

export async function getAuthProfile(): Promise<AuthProfileResponse> {
  return request<AuthProfileResponse>("auth/profile");
}



// ============ PÚBLICAS ============

export async function changePassword(
  password: string
): Promise<ApiResponse<{
  user: {
    id: string;
    email?: string;
    must_change_password: boolean;
  };
}>> {
  return request("auth/definir-senha", {
    method: "POST",
    body: JSON.stringify({ password }),
  });
}

export async function fetchHomeData() {
  const res = await fetch(`${API_BASE}home`);
  if (!res.ok) throw new Error("Erro ao carregar dados da home");
  return res.json();
}

export async function searchPartners(query: string) {
  const res = await fetch(`${API_BASE}search?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Erro na busca");
  return res.json();
}

// ============ PARTNER ============

export async function getPartnerDashboard(): Promise<ApiResponse<DashboardResponse>> {
  return request<ApiResponse<DashboardResponse>>("partner/dashboard");
}

export async function getPartnerProfile(): Promise<ApiResponse<{ user: User; partner: Partner }>> {
  return request<ApiResponse<{ user: User; partner: Partner }>>("partner/profile");
}

export async function updatePartnerProfile(body: Partial<Partner>): Promise<ApiResponse<Partner>> {
  return request<ApiResponse<Partner>>("partner/profile", { 
    method: "PUT", 
    body: JSON.stringify(body) 
  });
}

// Reset de senha usando o partner_id (nova rota)
export async function resetPartnerPasswordByPartnerId(
  partnerId: string,
  newPassword: string
): Promise<ApiResponse<{ message: string; userId: string }>> {
  return request<ApiResponse<{ message: string; userId: string }>>(
    `admin/partners/${partnerId}/reset-password`,
    {
      method: "POST",
      body: JSON.stringify({ newPassword }),
    }
  );
}

export async function getPartnerImages(): Promise<ApiResponse<PartnerImage[]>> {
  return request<ApiResponse<PartnerImage[]>>("partner/images");
}

export async function uploadPartnerImages(files: File[]): Promise<ApiResponse<PartnerImage[]>> {
  const form = new FormData();
  files.forEach((file) => form.append("images", file));
  const token = localStorage.getItem("auth_token");
  const res = await fetch(`${API_BASE}partner/images`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: form,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error || "Erro no upload");
  return data;
}

export async function deletePartnerImage(id: string): Promise<ApiResponse<{ success: boolean }>> {
  return request<ApiResponse<{ success: boolean }>>(`partner/images/${id}`, { 
    method: "DELETE" 
  });
}

// ============ ADMIN ============

export async function getAdminDashboard(): Promise<ApiResponse<AdminStats>> {
  return request<ApiResponse<AdminStats>>("admin/dashboard");
}

export async function getAdminPartners(): Promise<ApiResponse<AdminPartner[]>> {
  return request<ApiResponse<AdminPartner[]>>("admin/partners");
}

export async function getAdminUsers(): Promise<ApiResponse<AdminUser[]>> {
  return request<ApiResponse<AdminUser[]>>("admin/users");
}

// ============ ADMIN: CLIENTES ============

export async function getAdminClientes(): Promise<ApiResponse<Cliente[]>> {
  return request<ApiResponse<Cliente[]>>("admin/clientes");
}

export async function updateAdminPartner(
  id: string,
  body: UpdatePartnerData
): Promise<ApiResponse<Partner>> {
  return request<ApiResponse<Partner>>(`admin/partners/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export async function deleteAdminCliente(id: string): Promise<ApiResponse<{ success: boolean }>> {
  return request<ApiResponse<{ success: boolean }>>(`admin/clientes/${id}`, {
    method: "DELETE",
  });
}

// ============ ADMIN: PARCEIROS ============

export async function getPartnersByCategory(slug: string): Promise<Partner[]> {
  const response = await request<ApiResponse<Partner[]>>(`categorias/${slug}/partners`);
  return response.data || [];
}

export async function deleteAdminPartner(id: string): Promise<ApiResponse<{ success: boolean }>> {
  return request<ApiResponse<{ success: boolean }>>(`admin/partners/${id}`, {
    method: "DELETE",
  });
}

// services/api.ts
export async function resetPartnerPassword(userId: string, newPassword: string): Promise<ApiResponse<{ message: string }>> {
  return request<ApiResponse<{ message: string }>>("admin/partners/reset-password", {
    method: "POST",
    body: JSON.stringify({ userId, newPassword }),
  });
}

export async function setAdminUserRole(
  userId: string, 
  role: "admin" | "owner" | "manager", 
  partner_id?: string
): Promise<ApiResponse<{ success: boolean }>> {
  return request<ApiResponse<{ success: boolean }>>(`admin/users/${userId}/role`, {
    method: "PUT",
    body: JSON.stringify({ role, partner_id }),
  });
}



export async function updateAdminSubscription(
  partnerId: string, 
  body: Partial<Subscription>
): Promise<ApiResponse<Subscription>> {
  return request<ApiResponse<Subscription>>(`admin/subscriptions/${partnerId}`, { 
    method: "PUT", 
    body: JSON.stringify(body) 
  });
}

export async function getAdminData(table: string): Promise<ApiResponse<unknown[]>> {
  return request<ApiResponse<unknown[]>>(`admin/data/${encodeURIComponent(table)}`);
}

export async function getAdminPromos(): Promise<ApiResponse<AdminPromo[]>> {
  return request<ApiResponse<AdminPromo[]>>("admin/promos");
}

export async function createAdminPromo(
  body: PromoInput
): Promise<ApiResponse<AdminPromo>> {
  return request<ApiResponse<AdminPromo>>("admin/promos", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function updateAdminPromo(
  id: string,
  body: Partial<PromoInput>
): Promise<ApiResponse<AdminPromo>> {
  return request<ApiResponse<AdminPromo>>(`admin/promos/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export async function deleteAdminPromo(
  id: string
): Promise<ApiResponse<{ success: boolean }>> {
  return request<ApiResponse<{ success: boolean }>>(`admin/promos/${id}`, {
    method: "DELETE",
  });
}

/** Público — usado na home */
export async function fetchPublicPromos(): Promise<AdminPromo[]> {
  const res = await fetch(`${API_BASE}promos`);
  if (!res.ok) throw new Error("Erro ao carregar promoções");
  const json = await res.json();
  return (json?.data ?? json ?? []) as AdminPromo[];
}



export type OnboardPartnerResult = {
  partner: Partner;
  user: {
    id: string;
    email?: string;
    role: string;
    must_change_password?: boolean;
  };
  subscription?: unknown;
  invite_sent?: boolean;
  temporary_password?: string;
  message?: string;
};

export async function onboardPartner(
  body: OnboardPartnerData
): Promise<ApiResponse<OnboardPartnerResult>> {
  return request<ApiResponse<OnboardPartnerResult>>("admin/partners/onboard", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export interface PartnerDashboard {
  total_views: number;
  total_contacts: number;
  views_last_30_days: Record<string, number>;
}

export async function getPartnerDashboardFull(): Promise<
  ApiResponse<PartnerDashboard>
> {
  return request<ApiResponse<PartnerDashboard>>("partner/dashboard");
}

// ============ EVENTOS ============

export interface EventNotice {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  image_url: string | null;
  link: string | null;
  priority: "high" | "normal";
  active: boolean;
  created_at: string;
}

export async function fetchPublicEvents(): Promise<EventNotice[]> {
  const res = await fetch(`${API_BASE}events`);
  if (!res.ok) throw new Error("Erro ao carregar eventos");
  const json = await res.json();
  return (json?.data ?? []) as EventNotice[];
}

export async function getAdminEvents(): Promise<ApiResponse<EventNotice[]>> {
  return request<ApiResponse<EventNotice[]>>("admin/events");
}

export async function createAdminEvent(
  body: Partial<EventNotice>
): Promise<ApiResponse<EventNotice>> {
  return request<ApiResponse<EventNotice>>("admin/events", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function updateAdminEvent(
  id: string,
  body: Partial<EventNotice>
): Promise<ApiResponse<EventNotice>> {
  return request<ApiResponse<EventNotice>>(`admin/events/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export async function deleteAdminEvent(
  id: string
): Promise<ApiResponse<{ success: boolean }>> {
  return request<ApiResponse<{ success: boolean }>>(`admin/events/${id}`, {
    method: "DELETE",
  });
}

// ============ MARÉS ============

export interface TideDay {
  day: string;
  low_time: string;
  low_height: number | null;
  high_time: string | null;
  high_height: number | null;
  note: string | null;
  source: "api" | "manual";
}

export async function fetchPublicTides(): Promise<{
  days: TideDay[];
  externalUrl: string;
}> {
  const res = await fetch(`${API_BASE}mares`);
  if (!res.ok) throw new Error("Erro ao carregar marés");
  const json = await res.json();
  return {
    days: (json?.data ?? []) as TideDay[],
    externalUrl:
      json?.externalUrl ??
      "https://tabuademares.com/br/alagoas/sao-miguel-dos-milagres",
  };
}

