/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/catalog.ts

import catalogData from "@/data/catalog.json";
import { DEMO_IMAGES } from "@/data/images";
import type {
  Category,
  Partner,
  Promo,
  HomeData,
  CatalogData,
  City,
  TourPackage,
  TourDescription
} from "@/data/catalog.types";

// ============ CONFIGURAÇÃO ============

const API_URL = import.meta.env.VITE_API_URL 

// ============ MAPEAMENTO DE IMAGENS POR CATEGORIA ============

const CATEGORY_IMAGES: Record<string, string> = {
  pousadas: DEMO_IMAGES.categories.pousadas,
  pousada: DEMO_IMAGES.categories.pousadas,
  hotel: DEMO_IMAGES.categories.pousadas,
  hospedagem: DEMO_IMAGES.categories.pousadas,
  chales: DEMO_IMAGES.categories.pousadas,
  restaurantes: DEMO_IMAGES.categories.restaurantes,
  restaurante: DEMO_IMAGES.categories.restaurantes,
  quadriciclos: DEMO_IMAGES.categories.quadriciclos,
  quadriciclo: DEMO_IMAGES.categories.quadriciclos,
  turismo: DEMO_IMAGES.categories.quadriciclos,
  jangadas: DEMO_IMAGES.categories.jangadas,
  jangada: DEMO_IMAGES.categories.jangadas,
  buggy: DEMO_IMAGES.categories.buggy,
  buggys: DEMO_IMAGES.categories.buggy,
  pizzarias: DEMO_IMAGES.categories.pizzarias,
  pizzaria: DEMO_IMAGES.categories.pizzarias,
  praias: DEMO_IMAGES.categories.praias,
  praia: DEMO_IMAGES.categories.praias,
  padrao: DEMO_IMAGES.categories.padrao,
};

// ============ MAPEAMENTO DE EMOJIS POR CATEGORIA ============

export const CATEGORY_EMOJIS: Record<string, string> = {
  pousadas: "🏨",
  pousada: "🏨",
  hotel: "🏨",
  hospedagem: "🏨",
  chales: "🏨",
  restaurantes: "🍽️",
  restaurante: "🍽️",
  pizzarias: "🍕",
  pizzaria: "🍕",
  quadriciclos: "🚤",
  quadriciclo: "🚤",
  turismo: "🚤",
  jangadas: "⛵",
  jangada: "⛵",
  buggy: "🚙",
  buggys: "🚙",
  praia: "🏖️",
  praias: "🏖️",
  bar: "🍺",
  bares: "🍺",
  cafe: "☕",
  cafeteria: "☕",
  padrao: "📍",
};

// ============ DADOS PRÉ-CARREGADOS DO JSON ============

// Carregar dados do JSON com fallback
const jsonData = catalogData as CatalogData;

function createPartner(data: any): Partner {
  // aceita snake_case (banco) e camelCase (JSON/API já formatada)
  return {
    id: data.id ?? "",
    slug: data.slug ?? "",
    name: data.name ?? "",
    city: data.city ?? data.cities?.name ?? "",
    rating: Number(data.rating ?? 0) || 0,
    reviewCount:
      Number(data.reviewCount ?? data.review_count ?? 0) || 0,
    short: data.short ?? data.short_description ?? "",
    description: data.description ?? null,
    priceFrom:
      data.priceFrom ??
      (data.price_from != null ? Number(data.price_from) : null),
    whatsapp: data.whatsapp ?? "",
    phone: data.phone ?? "",
    address: data.address ?? null,
    latitude:
      data.latitude != null ? Number(data.latitude) : null,
    longitude:
      data.longitude != null ? Number(data.longitude) : null,
    images:
      (Array.isArray(data.images) && data.images) ||
      (Array.isArray(data.partner_images)
        ? [...data.partner_images]
            .sort(
              (a: any, b: any) =>
                (a.display_order ?? 0) - (b.display_order ?? 0)
            )
            .map((i: any) => i.url)
            .filter(Boolean)
        : []),
    featured: data.featured ?? false,
    category: data.category ?? null,
    hours_of_operation:
      data.hours_of_operation ?? data.hoursOfOperation ?? null,
    instagram: data.instagram ?? null,
    website: data.website ?? null,
    schedules: data.schedules ?? [],
    pricesPerPerson: data.pricesPerPerson ?? [],
    familyPackages: data.familyPackages ?? [],
    tours: data.tours ?? [],
    room_types: data.room_types ?? [],
    videoUrl: data.videoUrl ?? null,
    tourDescription: data.tourDescription ?? null,
    packages: data.packages ?? [],
  };
}

export function getJangadaTour(): Partner | null {
  return MOCK_PARTNERS.find(
    (partner) => partner.category?.slug === "jangadas"
  ) || null;
}

// Dados mock para fallback (caso o JSON esteja vazio)
export const MOCK_CATEGORIES: Category[] = jsonData.categories?.length
  ? jsonData.categories
  : [
    {
      id: "1",
      slug: "pousadas",
      name: "Pousadas",
      emoji: "🏨",
      imageUrl: DEMO_IMAGES.categories.pousadas,
    },
    {
      id: "2",
      slug: "restaurantes",
      name: "Restaurantes",
      emoji: "🍽️",
      imageUrl: DEMO_IMAGES.categories.restaurantes,
    },
    {
      id: "3",
      slug: "quadriciclo",
      name: "Quadriciclos",
      emoji: "🚤",
      imageUrl: DEMO_IMAGES.categories.quadriciclos,
    },
    {
      id: "4",
      slug: "jangadas",
      name: "Jangadas",
      emoji: "⛵",
      imageUrl: DEMO_IMAGES.categories.jangadas,
    },
    {
      id: "5",
      slug: "buggy",
      name: "Buggy",
      emoji: "🚙",
      imageUrl: DEMO_IMAGES.categories.buggy,
    },
    {
      id: "6",
      slug: "pizzarias",
      name: "Pizzarias",
      emoji: "🍕",
      imageUrl: DEMO_IMAGES.categories.pizzarias,
    },
    {
      id: "7",
      slug: "praias",
      name: "Praias",
      emoji: "🏖️",
      imageUrl: DEMO_IMAGES.categories.praias,
    },
  ];

  // ============ CATEGORIAS DA API ============

/**
 * Sincroniza categorias da API.
 * Se a API falhar ou retornar vazio, usa MOCK_CATEGORIES (catalog.json).
 */
export async function syncCategoriesFromAPI(): Promise<Category[]> {
  try {
    const response = await fetchWithTimeout(`${API_URL}categories`, {}, 4000);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();
    const data = Array.isArray(result) ? result : result?.data;

    if (Array.isArray(data) && data.length > 0) {
      //console.log("📥 Categorias sincronizadas da API:", data.length);
      

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return data.map((c: any): Category => ({
        id: String(c.id ?? c._id ?? c.slug ?? ""),
        slug: c.slug ?? "",
        name: c.name ?? c.title ?? "",
        emoji: c.emoji ?? null,
        // Aceita imageUrl, image_url ou image
        imageUrl: c.imageUrl ?? c.image_url ?? c.image ?? null,
      }));
    }

    console.warn("⚠️ API sem categorias, usando catalog.json");
    return MOCK_CATEGORIES;
  } catch (error) {
    console.warn("⚠️ Erro ao buscar categorias da API, usando mock:", error);
    return MOCK_CATEGORIES;
  }
}

/**
 * Busca parceiros de uma categoria na API.
 * Retorna [] se a categoria não tiver parceiros no banco.
 */
export async function fetchPartnersByCategoryFromAPI(
  slug: string
): Promise<Partner[]> {
  if (!slug) return [];

  try {
    // Tenta rota específica; se não existir, cai no syncPartnersFromAPI + filtro
    const response = await fetchWithTimeout(
      `${API_URL}categories/${slug}/partners`,
      {},
      4000
    );

    if (response.ok) {
      const result = await response.json();
      const data = Array.isArray(result) ? result : result?.data;
      console.log(`📥 Partners da categoria ${slug} sincronizados da API:`, data?.length ?? 0);

      if (Array.isArray(data) && data.length > 0) {
        return data.map((p: Partial<Partner>) => createPartner(p));
      }
    }
  } catch (error) {
    // silencioso — vamos tentar o fallback abaixo
  }

  // Fallback: pega todos e filtra
  try {
    const all = await syncPartnersFromAPI();
    return all.filter((p) => p.category?.slug === slug);
  } catch {
    return [];
  }
}

// Garantir que todos os partners tenham todas as propriedades required
export const MOCK_PARTNERS: Partner[] = (jsonData.partners || []).map((p) =>
  createPartner(p)
);

export const MOCK_PROMOS: Promo[] = jsonData.promos?.length
  ? jsonData.promos
  : [];

// ============ FUNÇÕES DE UTILIDADE ============

/**
 * Retorna a imagem predefinida para uma categoria
 */
export function getCategoryImage(
  category: Category | { slug: string; name: string; imageUrl?: string | null }
): string {
  if (category.imageUrl) {
    return category.imageUrl;
  }

  const slug = category.slug?.toLowerCase();
  if (slug && CATEGORY_IMAGES[slug]) {
    return CATEGORY_IMAGES[slug];
  }

  const name = category.name?.toLowerCase().trim();
  if (name) {
    const match = Object.entries(CATEGORY_IMAGES).find(
      ([key]) => name.includes(key) || key.includes(name)
    );
    if (match) {
      return match[1];
    }
  }

  return DEMO_IMAGES.categories.padrao;
}

/**
 * Retorna o emoji predefinido para uma categoria
 */
export function getCategoryEmoji(
  category: Category | { slug?: string; name?: string; emoji?: string | null }
): string {
  if (category.emoji) {
    return category.emoji;
  }

  const slug = category.slug?.toLowerCase();
  if (slug && CATEGORY_EMOJIS[slug]) {
    return CATEGORY_EMOJIS[slug];
  }

  const name = category.name?.toLowerCase()?.trim();
  if (name) {
    for (const [key, emoji] of Object.entries(CATEGORY_EMOJIS)) {
      if (name.includes(key) || key.includes(emoji)) {
        return emoji;
      }
    }
  }

  return CATEGORY_EMOJIS["padrao"] || "📍";
}

/**
 * Retorna a primeira imagem de um parceiro ou imagem padrão
 * Compatível com Partner do catalog e Partner da API
 */
type PartnerImageSource = Partner & {
  partner_images?: Array<{
    url?: string | null;
    display_order?: number | null;
  }>;
  imageUrl?: string | null;
};

export function getPartnerImage(partner: PartnerImageSource): string {
  // 1) Formato Supabase / API: partner_images[{ url }]
  if (partner.partner_images?.length) {
    const sorted = [...partner.partner_images].sort(
      (a, b) => (a.display_order ?? 0) - (b.display_order ?? 0)
    );
    return sorted[0]?.url ?? DEMO_IMAGES.placeholder;
  }

  // 2) Formato catalog / home: images: string[]
  if (Array.isArray(partner.images) && partner.images.length) {
    return partner.images[0] || DEMO_IMAGES.placeholder;
  }

  // 3) Se tem imageUrl direto
  if (partner.imageUrl) {
    return partner.imageUrl;
  }

  return DEMO_IMAGES.placeholder;
}

/**
 * Formata um valor para moeda brasileira
 */
export function formatPrice(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

/**
 * Gera link do WhatsApp para um parceiro
 */
export function whatsappLink(partner: Partner, message?: string): string {
  const phone = partner.whatsapp || partner.phone || "";
  const text =
    message ??
    `*Olá !* , *${partner.name} !* Encontrei vocês no Rota Milagres e gostaria de mais informações.`;
  return `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(
    text
  )}`;
}

/**
 * Gera link do Google Maps para um parceiro
 */
export function mapsLink(partner: Partner): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${partner.name} ${partner.address ?? ""}`
  )}`;
}

// ============ FUNÇÕES PARA ACESSAR OS DADOS ============

/**
 * Retorna todos os dados do catálogo
 */
export function getCatalogData(): CatalogData {
  return {
    categories: MOCK_CATEGORIES,
    partners: MOCK_PARTNERS,
    promos: MOCK_PROMOS,
  };
}

/**
 * Retorna dados da Home (parceiros em destaque, categorias, promoções)
 */
export function getMockHomeData(): HomeData {
  return {
    featuredPartners: MOCK_PARTNERS.filter((p) => p.featured === true),
    categories: MOCK_CATEGORIES,
    promos: MOCK_PROMOS,
  };
}

/**
 * Busca um parceiro pelo slug
 */
export function getPartnerBySlug(slug: string): Partner | null {
  return MOCK_PARTNERS.find((p) => p.slug === slug) || null;
}

/**
 * Busca parceiros por categoria (retorna array vazio se não encontrar)
 */
export function getPartnersByCategory(categorySlug: string): Partner[] {
  if (!categorySlug) return [];
  try {
    const partners = MOCK_PARTNERS.filter((p) => p.category?.slug === categorySlug);
    return partners || [];
  } catch (error) {
    console.error(`Erro ao buscar parceiros para categoria ${categorySlug}:`, error);
    return [];
  }
}




/**
 * Busca parceiros por cidade
 */
export function getPartnersByCity(citySlug: string): Partner[] {
  if (!citySlug) return [];
  return MOCK_PARTNERS.filter((p) =>
    p.city.toLowerCase().includes(citySlug.toLowerCase())
  );
}

/**
 * Busca uma categoria pelo slug
 */
export function getCategoryBySlug(slug: string): Category | null {
  if (!slug) return null;
  return MOCK_CATEGORIES.find((c) => c.slug === slug) || null;
}

/**
 * Busca parceiros por termo de busca
 */
export function searchPartners(query: string): Partner[] {
  if (!query) return MOCK_PARTNERS;
  const searchTerm = query.toLowerCase();
  return MOCK_PARTNERS.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm) ||
      p.city.toLowerCase().includes(searchTerm) ||
      p.short.toLowerCase().includes(searchTerm) ||
      p.description?.toLowerCase().includes(searchTerm)
  );
}

/**
 * Retorna parceiros em destaque
 */
export function getFeaturedPartners(): Partner[] {
  return MOCK_PARTNERS.filter((p) => p.featured === true);
}

/**
 * Retorna todas as categorias
 */
export function getCategories(): Category[] {
  return MOCK_CATEGORIES;
}

/**
 * Retorna todas as categorias (assíncrono - para uso com async/await)
 */
export async function getCategoriesAsync(): Promise<Category[]> {
  // Simular delay de rede
  await new Promise(resolve => setTimeout(resolve, 100));
  return MOCK_CATEGORIES;
}

/**
 * Retorna todas as promoções
 */
export function getPromos(): Promo[] {
  return MOCK_PROMOS;
}

/**
 * Retorna todas as cidades disponíveis
 */
export function getCities(): City[] {
  const cities = new Set(MOCK_PARTNERS.map((p) => p.city));
  return Array.from(cities) as City[];
}

// ============ FUNÇÕES DA API COM FALLBACK ============

/**
 * Função auxiliar para fazer fetch com timeout
 */
async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout = 5000
) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

/**
 * Busca dados da Home com fallback para mock
 */
export async function getHomeData(): Promise<HomeData> {
  try {
    const response = await fetchWithTimeout(`${API_URL}home`, {}, 3000);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();

    if (result.success && result.data?.featuredPartners?.length) {
      return result.data;
    }

    console.log("📦 Usando dados mock (API retornou vazio ou erro)");
    return getMockHomeData();
  } catch (error) {
    console.warn("⚠️ Erro na API, usando dados mock:", error);
    return getMockHomeData();
  }
}

/**
 * Busca parceiros em destaque da API com fallback
 */
export async function getFeaturedPartnersFromAPI(): Promise<Partner[]> {
  try {
    const response = await fetchWithTimeout(
      `${API_URL}partners/featured`,
      {},
      3000
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();
    const data = Array.isArray(result) ? result : result.data;

    if (data?.length) {
      return data;
    }

    return getFeaturedPartners();
  } catch (error) {
    console.warn("⚠️ Erro ao buscar parceiros em destaque, usando mock:", error);
    return getFeaturedPartners();
  }
}

/**
 * Sincroniza parceiros da API com fallback para mock
 */
export async function syncPartnersFromAPI(): Promise<Partner[]> {
  try {
    const response = await fetch(`${API_URL}debug/partners`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();
    if (result.success && result.data) {
      console.log("📥 Partners sincronizados da API:", result.data.length);
      return result.data.map((p: Partial<Partner>) => createPartner(p));
    }

    return MOCK_PARTNERS;
  } catch (error) {
    console.warn(
      "⚠️ Erro ao sincronizar partners da API, usando mock:",
      error
    );
    return MOCK_PARTNERS;
  }
}

// ============ EXPORTAÇÕES ADICIONAIS ============

// Re-exportar tipos para conveniência
export type { Category, Partner, Promo, HomeData, CatalogData, City };

// Exportar dados para uso direto
export const catalog = {
  categories: MOCK_CATEGORIES,
  partners: MOCK_PARTNERS,
  promos: MOCK_PROMOS,
};

// ============ API-FIRST (com cache em memória) ============

let _partnersCache: Partner[] | null = null;
let _partnersCacheAt = 0;
const PARTNERS_CACHE_TTL = 60_000; // 1 min

/**
 * Busca TODOS os parceiros da API.
 * Cache de 1 minuto para evitar request a cada navegação.
 */
export async function fetchAllPartnersFromAPI(): Promise<Partner[]> {
  const now = Date.now();
  if (_partnersCache && now - _partnersCacheAt < PARTNERS_CACHE_TTL) {
    return _partnersCache;
  }

  try {
    const res = await fetchWithTimeout(`${API_URL}partners`, {}, 5000);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const json = await res.json();
    const raw = Array.isArray(json) ? json : json?.data;

    if (Array.isArray(raw) && raw.length > 0) {
      _partnersCache = raw.map(createPartner);
      _partnersCacheAt = now;
      console.log("📥 Partners da API:", _partnersCache.length);
      return _partnersCache;
    }
  } catch (err) {
    console.warn("⚠️ /partners indisponível:", err);
  }

  // Fallback local
  return MOCK_PARTNERS;
}

/**
 * Busca UM parceiro pelo slug — API primeiro, catalog como fallback.
 */
export async function getPartnerBySlugAsync(
  slug: string
): Promise<Partner | null> {
  // 1) endpoint dedicado (se existir)
  try {
    const res = await fetchWithTimeout(
      `${API_URL}partners/${encodeURIComponent(slug)}`,
      {},
      5000
    );
    if (res.ok) {
      const json = await res.json();
      const raw = json?.data ?? json;
      if (raw && raw.slug) return createPartner(raw);
    }
  } catch {
    /* segue para o fallback */
  }

  // 2) filtra da lista completa
  const all = await fetchAllPartnersFromAPI();
  const found = all.find((p) => p.slug === slug);
  if (found) return found;

  // 3) último recurso: catalog local
  return getPartnerBySlug(slug);
}

/**
 * Busca parceiros de uma categoria — API primeiro, catalog como fallback.
 */
export async function getPartnersByCategoryAsync(
  slug: string
): Promise<Partner[]> {
  if (!slug) return [];

  // 1) endpoint por categoria
  try {
    const res = await fetchWithTimeout(
      `${API_URL}categorias/${encodeURIComponent(slug)}/partners`,
      {},
      5000
    );
    if (res.ok) {
      const json = await res.json();
      const raw = Array.isArray(json) ? json : json?.data;
      if (Array.isArray(raw) && raw.length > 0) {
        console.log(`📥 ${slug}: ${raw.length} da API`);
        return raw.map(createPartner);
      }
    }
  } catch (err) {
    console.warn(`⚠️ /categorias/${slug}/partners falhou:`, err);
  }

  // 2) filtra da lista completa
  const all = await fetchAllPartnersFromAPI();
  const filtered = all.filter((p) => p.category?.slug === slug);
  if (filtered.length > 0) return filtered;

  // 3) fallback: catalog local
  return getPartnersByCategory(slug);
}

// Exportar funções principais
export default {
  getCategories,
  getPartnersByCategory,
  getCategoryBySlug,
  getPartnerBySlug,
  getFeaturedPartners,
  getPromos,
  getCities,
  searchPartners,
  getPartnerImage,
  getCategoryImage,
  getCategoryEmoji,
  formatPrice,
  whatsappLink,
  mapsLink,
  getHomeData,
  getMockHomeData,
  getCatalogData,
  syncPartnersFromAPI,
  syncCategoriesFromAPI,
  fetchPartnersByCategoryFromAPI,

  MOCK_CATEGORIES,
  MOCK_PARTNERS,
  MOCK_PROMOS,
};