// src/services/api-cliente.ts

import { storage } from "@/lib/storage";

// ============================================================
// CONFIGURAÇÃO
// ============================================================

const API_BASE =
  import.meta.env.VITE_API_URL

// ============================================================
// TIPOS
// ============================================================

// export interface Cliente {
//   id: string;
//   nome: string;
//   email: string;
//   telefone: string | null;
//   documento: string | null;
//   data_nascimento: string | null;
//   email_verificado: boolean;
//   ativo: boolean;
//   created_at: string;
//   updated_at: string;
// }

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



export interface ClienteRegisterData {
  nome: string;
  email: string;
  telefone?: string;
  documento?: string;
  data_nascimento?: string;
  password: string;
}

// export interface ClienteLoginData { 
//   token: string; 
//   refresh_token?:string; 
//   expires_at?: number; 
//   cliente: Cliente; }

export interface ClienteLoginResponse {
  success: boolean;
  data: {
    token: string;
    refresh_token?: string;
    expires_at?: number;
    cliente: Cliente;
  };
  error?: string;
}



export interface ClienteAuthResponse {
  success: boolean;
  data: {
    cliente: Cliente;
  };
  error?: string;
  message?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// ============================================================
// DASHBOARD
// ============================================================

export interface ClientePartner {
  id: string;
  name: string;
  slug: string;
  short_description?: string;
  phone?: string;
  whatsapp?: string;
}

export interface ClienteConsulta {
  id: string;
  cliente_id: string;
  partner_id: string;
  tipo: string;
  status: string;
  contato_realizado: boolean;
  data_contato?: string;
  created_at: string;
  updated_at: string;
  partner: ClientePartner | null;
}

export interface ClienteFavorito {
  id: string;
  cliente_id: string;
  partner_id: string;
  created_at: string;
  partner: ClientePartner | null;
}

export interface ClienteVoucher {
  id: string;
  cliente_id: string;
  partner_id: string;
  codigo: string;
  descricao?: string;
  desconto?: number;
  valor?: number;

  tipo:
  | "reserva"
  | "desconto"
  | "cortesia"
  | string;

  status:
  | "pendente"
  | "pago"
  | "usado"
  | "expirado"
  | "cancelado"
  | string;

  validade_inicio?: string;
  validade_fim?: string;
  data_uso?: string;

  created_at: string;
  updated_at: string;

  partner: ClientePartner | null;
}

// ============================================================
// AVALIAÇÕES
// ============================================================

export interface ClienteAvaliacao {
  id: string;
  cliente_id: string;
  partner_id: string;
  nota: number;
  comentario?: string | null;
  created_at: string;
  updated_at: string;
  partner?: ClientePartner | null;
  cliente?: {
    id: string;
    nome: string;
  } | null; // Adicionar esta linha
}

export interface CreateAvaliacaoDTO {
  partner_id: string;
  nota: number;
  comentario?: string;
}

export interface UpdateAvaliacaoDTO {
  nota?: number;
  comentario?: string;
}

// ============================================================
// REQUEST CLIENTE
// ============================================================
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
      `Bearer ${token}`
    )
  }

  const response = await fetch(`${API_BASE}${path}`,
    {
      ...init,
      headers
    });

  const data = await response
    .json()
    .catch(() => ({}));

  if (!response.ok) {
    const error = new Error(
      data?.error ||
      data?.message ||
      "Erro na API do cliente",
    ) as Error & {
      status: number;
    };
    error.status = response.status;
    throw error;
  }

  return data as T;
}



// ============================================================
// SESSÃO LOCAL (sem storage.ts)
// ============================================================

export function saveClienteSession(
  response: ClienteLoginResponse,
) {
  const {
    token,
    refresh_token,
    expires_at,
    cliente,
  } = response.data;

  localStorage.setItem(
    "cliente_token",
    token,
  );

  if (refresh_token) {
    localStorage.setItem(
      "cliente_refresh_token",
      refresh_token,
    );
  } else {
    localStorage.removeItem(
      "cliente_refresh_token",
    );
  }

  if (expires_at) {
    localStorage.setItem(
      "cliente_expires_at",
      String(expires_at),
    );
  } else {
    localStorage.removeItem(
      "cliente_expires_at",
    );
  }

  localStorage.setItem(
    "cliente_data",
    JSON.stringify(cliente),
  );

  // Compatibilidade
  localStorage.setItem(
    "cliente",
    JSON.stringify(cliente),
  );
}


export function getStoredCliente(): Cliente | null {
  try {
    const data =
      localStorage.getItem(
        "cliente_data",
      );

    if (!data) {
      return null;
    }

    return JSON.parse(data) as Cliente;
  } catch {
    return null;
  }
}

export function logoutCliente() {
  localStorage.removeItem(
    "cliente_token",
  );

  localStorage.removeItem(
    "cliente_refresh_token",
  );

  localStorage.removeItem(
    "cliente_expires_at",
  );

  localStorage.removeItem(
    "cliente_data",
  );

  localStorage.removeItem(
    "cliente",
  );
}

//export function getStoredCliente(): Cliente | null { try { const data = storage.get("cliente_data",); if (!data) { return null; } return JSON.parse(data) as Cliente; } catch { return null; } } 





// ============================================================
// AUTENTICAÇÃO
// ============================================================




export async function loginCliente(
  email: string,
  password: string,
): Promise<ClienteLoginResponse> {
  const response =
    await clienteRequest<ClienteLoginResponse>(
      "clientes/login",
      {
        method: "POST",
        body: JSON.stringify({
          email: email
            .trim()
            .toLowerCase(),
          password,
        }),
      },
    );

  console.log(
    "📦 RESPOSTA COMPLETA DO LOGIN:",
    response,
  );

  if (
    !response.success ||
    !response.data?.token ||
    !response.data?.cliente
  ) {
    throw new Error(
      response.error ||
      "Login inválido",
    );
  }

  saveClienteSession(response);

  console.log(
    "🎫 CLIENTE TOKEN SALVO:",
    !!localStorage.getItem(
      "cliente_token",
    ),
  );

  console.log(
    "👤 CLIENTE SALVO:",
    localStorage.getItem(
      "cliente_data",
    ),
  );

  return response;
}
export async function registerCliente(
  body: ClienteRegisterData,
): Promise<ClienteLoginResponse> {
  const response =
    await clienteRequest<ClienteLoginResponse>(
      "clientes/register",
      {
        method: "POST",
        body: JSON.stringify(body),
      },
    );

  if (
    response.success &&
    response.data?.token &&
    response.data?.cliente
  ) {
    saveClienteSession(response);
  }

  return response;
}
// ============================================================
// PERFIL
// ============================================================

export async function getClienteProfile(): Promise<ClienteAuthResponse> {
  console.log(
    "🔎 VALIDANDO PERFIL DO CLIENTE",
  );

  console.log(
    "🎫 TOKEN CLIENTE:",
    !!localStorage.getItem(
      "cliente_token",
    ),
  );

  const response =
    await clienteRequest<ClienteAuthResponse>(
      "clientes/profile",
    );

  console.log(
    "👤 PERFIL CLIENTE:",
    response,
  );

  return response;
}

export async function updateClientePerfil(
  data: Partial<Cliente>,
): Promise<ApiResponse<Cliente>> {
  return clienteRequest<
    ApiResponse<Cliente>
  >(
    "clientes/perfil",
    {
      method: "PUT",
      body: JSON.stringify(data),
    },
  );
}

// ============================================================
// CONSULTAS / CONTATOS
// ============================================================

export async function getClienteConsultas(): Promise<
  ApiResponse<ClienteConsulta[]>
> {
  return clienteRequest<
    ApiResponse<ClienteConsulta[]>
  >("clientes/consultas");
}

export async function registrarClienteInteracao(
  partnerId: string,
  tipo: string = "contato",
): Promise<ApiResponse<unknown>> {
  return clienteRequest<ApiResponse<unknown>>(
    "clientes/interacoes",
    {
      method: "POST",
      body: JSON.stringify({
        partner_id: partnerId,
        tipo,
      }),
    },
  );
}

// ============================================================
// FAVORITOS
// ============================================================

export async function getClienteFavoritos(): Promise<
  ApiResponse<ClienteFavorito[]>
> {
  return clienteRequest<
    ApiResponse<ClienteFavorito[]>
  >("clientes/favoritos");
}

export async function adicionarFavorito(
  partnerId: string,
): Promise<
  ApiResponse<ClienteFavorito>
> {
  return clienteRequest<
    ApiResponse<ClienteFavorito>
  >(
    "clientes/favoritos",
    {
      method: "POST",
      body: JSON.stringify({
        partner_id: partnerId,
      }),
    },
  );
}

export async function removerFavorito(
  partnerId: string,
): Promise<void> {
  return clienteRequest<void>(
    `clientes/favoritos/${partnerId}`,
    {
      method: "DELETE",
    },
  );
}

// ============================================================
// VOUCHERS
// ============================================================

export async function getClienteVouchers(): Promise<
  ApiResponse<ClienteVoucher[]>
> {
  return clienteRequest<
    ApiResponse<ClienteVoucher[]>
  >("clientes/vouchers");
}

export async function criarVoucherJangada(
  partnerId: string,
  quantidadePessoas: number,
  dataPasseio?: string,
): Promise<
  ApiResponse<ClienteVoucher>
> {
  if (
    !storage.get("cliente_token")
  ) {
    throw new Error(
      "Usuário não autenticado. Faça login para continuar.",
    );
  }

  return clienteRequest<
    ApiResponse<ClienteVoucher>
  >(
    "clientes/vouchers/jangadas",
    {
      method: "POST",
      body: JSON.stringify({
        partner_id: partnerId,
        quantidade_pessoas:
          quantidadePessoas,
        data_passeio:
          dataPasseio,
      }),
    },
  );
}

// ============================================================
// AVALIAÇÕES
// ============================================================

export async function getClienteAvaliacoes(): Promise<
  ApiResponse<ClienteAvaliacao[]>
> {
  return clienteRequest<
    ApiResponse<ClienteAvaliacao[]>
  >("clientes/avaliacoes");
}

export async function createClienteAvaliacao(
  data: CreateAvaliacaoDTO,
): Promise<
  ApiResponse<ClienteAvaliacao>
> {
  return clienteRequest<
    ApiResponse<ClienteAvaliacao>
  >(
    "clientes/avaliacoes",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
}

export async function updateClienteAvaliacao(
  id: string,
  data: UpdateAvaliacaoDTO,
): Promise<
  ApiResponse<ClienteAvaliacao>
> {
  return clienteRequest<
    ApiResponse<ClienteAvaliacao>
  >(
    `clientes/avaliacoes/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    },
  );
}

export async function deleteClienteAvaliacao(
  id: string,
): Promise<
  ApiResponse<{
    success: boolean;
  }>
> {
  return clienteRequest<
    ApiResponse<{
      success: boolean;
    }>
  >(
    `clientes/avaliacoes/${id}`,
    {
      method: "DELETE",
    },
  );
}

export async function verificarAvaliacaoCliente(
  partnerId: string,
): Promise<
  ApiResponse<{
    avaliou: boolean;
    avaliacao?: ClienteAvaliacao;
  }>
> {
  return clienteRequest<
    ApiResponse<{
      avaliou: boolean;
      avaliacao?: ClienteAvaliacao;
    }>
  >(
    `clientes/avaliacoes/verificar/${partnerId}`,
  );
}

// ============================================================
// AVALIAÇÕES PÚBLICAS DE PARCEIRO
// ============================================================

// Função de requisição pública (sem token)
async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json");

  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data?.error || data?.message || "Erro na API") as Error & { status: number };
    error.status = response.status;
    throw error;
  }
  return data as T;
}

export async function getPartnerAvaliacoes(partnerId: string): Promise<{ data: ClienteAvaliacao[] }> {
  return request(`parceiros/${partnerId}/avaliacoes`);
}



export async function criarClienteAvaliacao(
  partnerId: string,
  nota: number,
  comentario?: string
): Promise<{ data: ClienteAvaliacao }> {
  return clienteRequest(`clientes/avaliacoes`, {
    method: 'POST',
    body: JSON.stringify({ partnerId, nota, comentario }),
  });
}

export async function getFavoritoStatus(partnerId: string): Promise<{ isFavorito: boolean }> {
  return clienteRequest(`clientes/favoritos/${partnerId}/status`);
}

// Alternar favorito (adiciona ou remove)
export async function toggleFavorito(partnerId: string): Promise<{ isFavorito: boolean }> {
  return clienteRequest(`clientes/favoritos/${partnerId}/toggle`, { method: 'POST' });
}

// (Opcional) alias para manter compatibilidade com ClienteActionButton
