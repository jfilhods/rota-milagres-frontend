// services/api-cliente-admin.ts
import type { Partner } from "@/services/api";
import type { Cliente } from "./api-cliente";

// ============================================
// CONSTANTES
// ============================================
const API_BASE = import.meta.env.VITE_API_URL;

// ============================================
// TIPOS E INTERFACES
// ============================================

/**
 * Interface para cliente no painel administrativo
 * Estende o tipo base Cliente com campos adicionais para admin
 */
export interface AdminClient {
  id: string;
  nome: string | null;
  email: string;
  telefone: string | null;
  documento: string | null;
  active: boolean;
  role: "user" | "admin" | "partner";
  created_at: string;
  updated_at: string;
  // Campos adicionais
  last_login?: string | null;
  total_consultas?: number;
  total_favoritos?: number;
  total_vouchers?: number;
  // Relacionamentos
  partner?: Partner;
}

/**
 * DTO para criação de cliente (Admin)
 */
export interface AdminCreateClientDTO {
  name?: string;
  email: string;
  phone?: string;
  cpf?: string;
  password: string;
  active?: boolean;
  role?: "user" | "admin";
}

/**
 * DTO para atualização de cliente (Admin)
 */
export interface AdminUpdateClientDTO {
  name?: string;
  email?: string;
  phone?: string;
  cpf?: string;
  active?: boolean;
  role?: "user" | "admin";
  password?: string; // Opcional para alteração de senha
}

/**
 * Payload para atualização de cliente (tipos permitidos no update)
 */
interface AdminClientUpdatePayload {
  name?: string | null;
  email?: string;
  phone?: string | null;
  cpf?: string | null;
  active?: boolean;
  role?: "user" | "admin";
  password?: string;
}

/**
 * Filtros para listagem de clientes (Admin)
 */
export interface AdminClientFilters {
  search?: string;
  active?: boolean;
  role?: "user" | "admin" | "partner";
  page?: number;
  limit?: number;
  sortBy?: "name" | "email" | "created_at" | "updated_at";
  sortOrder?: "ASC" | "DESC";
  startDate?: string;
  endDate?: string;
}

/**
 * Estatísticas de clientes (Admin)
 */
export interface AdminClientStats {
  total: number;
  active: number;
  inactive: number;
  admins: number;
  users: number;
  partners: number;
  newThisMonth: number;
  newThisWeek: number;
  growthRate: number;
}

// ============================================
// FUNÇÃO BASE (ADMIN)
// ============================================

/**
 * Função base para requisições autenticadas do admin
 */
async function adminRequest<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  // Mesma chave usada no login (use-auth / api.ts)
  const token =
    localStorage.getItem("auth_token") ||
    localStorage.getItem("token") ||
    localStorage.getItem("admin_token");

  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers,
  });

  if (res.status === 204) {
    return undefined as T;
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data?.message || data?.error || "Erro na API");
  }

  return data as T;
}

// ============================================
// FUNÇÕES DA API ADMIN
// ============================================

/**
 * Lista todos os clientes com filtros
 */
export async function getAdminClients(
  filters?: AdminClientFilters
): Promise<{
  data: AdminClient[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}> {
  const params = new URLSearchParams();
  
  if (filters) {
    if (filters.search) params.append("search", filters.search);
    if (filters.active !== undefined) params.append("active", String(filters.active));
    if (filters.role) params.append("role", filters.role);
    if (filters.page) params.append("page", String(filters.page));
    if (filters.limit) params.append("limit", String(filters.limit));
    if (filters.sortBy) params.append("sortBy", filters.sortBy);
    if (filters.sortOrder) params.append("sortOrder", filters.sortOrder);
    if (filters.startDate) params.append("startDate", filters.startDate);
    if (filters.endDate) params.append("endDate", filters.endDate);
  }

  const url = `/admin/clientes${params.toString() ? `?${params.toString()}` : ''}`;
  return adminRequest(url);
}

/**
 * Busca um cliente específico pelo ID
 */
export async function getAdminClient(id: string): Promise<{
  data: AdminClient;
}> {
  if (!id) throw new Error("ID do cliente é obrigatório");
  return adminRequest(`/admin/clientes/${id}`);
}

/**
 * Cria um novo cliente (Admin)
 */
export async function createAdminClient(
  data: AdminCreateClientDTO
): Promise<{
  data: AdminClient;
  message: string;
}> {
  // Validações
  if (!data.email) throw new Error("Email é obrigatório");
  if (!data.password || data.password.length < 6) {
    throw new Error("Senha deve ter pelo menos 6 caracteres");
  }

  // Prepara payload
  const payload = {
    name: data.name?.trim() || null,
    email: data.email.trim().toLowerCase(),
    phone: data.phone?.trim() || null,
    cpf: data.cpf?.replace(/\D/g, "") || null,
    password: data.password,
    active: data.active !== undefined ? data.active : true,
    role: data.role || "user",
  };

  return adminRequest("/admin/clientes", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * Atualiza um cliente existente
 */
export async function updateAdminClient(
  id: string,
  data: AdminUpdateClientDTO
): Promise<{
  data: AdminClient;
  message: string;
}> {
  if (!id) throw new Error("ID do cliente é obrigatório");

  // Prepara payload (remove undefined)
  const payload: AdminClientUpdatePayload = {};
  
  if (data.name !== undefined) payload["name"] = data.name?.trim() || null;
  if (data.email !== undefined) payload["email"] = data.email.trim().toLowerCase();
  if (data.phone !== undefined) payload["phone"] = data.phone?.trim() || null;
  if (data.cpf !== undefined) payload["cpf"] = data.cpf?.replace(/\D/g, "") || null;
  if (data.active !== undefined) payload["active"] = data.active;
  if (data.role !== undefined) payload["role"] = data.role;
  if (data.password) payload["password"] = data.password;

  return adminRequest(`/admin/clientes/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

/**
 * Remove um cliente (soft delete)
 */
export async function deleteAdminClient(id: string): Promise<{
  message: string;
}> {
  if (!id) throw new Error("ID do cliente é obrigatório");
  return adminRequest(`/admin/clientes/${id}`, {
    method: "DELETE",
  });
}

/**
 * Ativa ou desativa um cliente
 */
export async function toggleAdminClientStatus(
  id: string,
  active: boolean
): Promise<{
  data: AdminClient;
  message: string;
}> {
  if (!id) throw new Error("ID do cliente é obrigatório");
  return adminRequest(`/admin/clientes/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ active }),
  });
}

/**
 * Busca clientes por termo (autocomplete)
 */
export async function searchAdminClients(
  searchTerm: string
): Promise<{
  data: AdminClient[];
}> {
  if (!searchTerm || searchTerm.length < 2) {
    return { data: [] };
  }
  
  return getAdminClients({
    search: searchTerm,
    limit: 10,
  });
}

/**
 * Obtém estatísticas de clientes
 */
export async function getAdminClientStats(): Promise<{
  data: AdminClientStats;
}> {
  return adminRequest("/admin/clientes/stats");
}

/**
 * Exporta clientes (CSV/Excel)
 */
export async function exportAdminClients(
  filters?: AdminClientFilters
): Promise<Blob> {
  const params = new URLSearchParams();
  
  if (filters) {
    if (filters.search) params.append("search", filters.search);
    if (filters.active !== undefined) params.append("active", String(filters.active));
    if (filters.role) params.append("role", filters.role);
    if (filters.startDate) params.append("startDate", filters.startDate);
    if (filters.endDate) params.append("endDate", filters.endDate);
  }

  const url = `/admin/clientes/exportar${params.toString() ? `?${params.toString()}` : ''}`;
  
  const token = localStorage.getItem("token") || localStorage.getItem("admin_token");
  const headers = new Headers();
  
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(`${API_BASE}${url}`, { headers });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.message || "Erro ao exportar clientes");
  }

  return res.blob();
}

// ============================================
// UTILITÁRIOS E FORMATAÇÃO
// ============================================

/**
 * Formata um cliente para exibição no frontend
 */
export function formatAdminClient(client: AdminClient) {
  return {
    ...client,
    displayName: client.nome || client.email,
    cpfFormatado: client.documento 
      ? client.documento.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
      : null,
    telefoneFormatado: client.telefone
      ? client.telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
      : null,
    statusLabel: client.active ? "Ativo" : "Inativo",
    statusColor: client.active ? "text-green-600" : "text-red-600",
    statusBadge: client.active ? "success" : "secondary",
    roleLabel: client.role === "admin" ? "Administrador" 
      : client.role === "partner" ? "Parceiro" 
      : "Usuário",
    dataCriacao: new Date(client.created_at).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
    dataCriacaoCompleta: new Date(client.created_at).toLocaleString("pt-BR"),
    dataAtualizacao: client.updated_at 
      ? new Date(client.updated_at).toLocaleDateString("pt-BR")
      : null,
  };
}

/**
 * Valida se o cliente tem dados completos
 */
export function isValidAdminClient(client: Partial<AdminClient>): boolean {
  return !!(
    client.email &&
    client.email.includes("@") &&
    client.id
  );
}

/**
 * Máscara para CPF
 */
export function maskCpf(value: string): string {
  const clean = value.replace(/\D/g, "");
  if (clean.length <= 3) return clean;
  if (clean.length <= 6) return clean.replace(/(\d{3})(\d+)/, "$1.$2");
  if (clean.length <= 9) return clean.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");
  return clean.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

/**
 * Máscara para Telefone
 */
export function maskPhone(value: string): string {
  const clean = value.replace(/\D/g, "");
  if (clean.length <= 2) return clean;
  if (clean.length <= 7) return clean.replace(/(\d{2})(\d+)/, "($1) $2");
  if (clean.length <= 10) return clean.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  return clean.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
}

/**
 * Valida email
 */
export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Valida CPF
 */
export function isValidCpf(cpf: string): boolean {
  const clean = cpf.replace(/\D/g, "");
  if (clean.length !== 11) return false;
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(clean)) return false;
  
  // Validação dos dígitos verificadores
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(clean.charAt(i)) * (10 - i);
  }
  let rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(clean.charAt(9))) return false;
  
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(clean.charAt(i)) * (11 - i);
  }
  rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(clean.charAt(10))) return false;
  
  return true;
}

// ============================================
// EXPORTAÇÃO DO MÓDULO
// ============================================

export default {
  // API
  getAdminClients,
  getAdminClient,
  createAdminClient,
  updateAdminClient,
  deleteAdminClient,
  toggleAdminClientStatus,
  searchAdminClients,
  getAdminClientStats,
  exportAdminClients,
  
  // Utilitários
  formatAdminClient,
  isValidAdminClient,
  maskCpf,
  maskPhone,
  isValidEmail,
  isValidCpf,
};