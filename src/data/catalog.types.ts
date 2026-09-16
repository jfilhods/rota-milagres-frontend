// data/catalog.types.ts

export type City =
  | "São Miguel dos Milagres"
  | "Porto de Pedras"
  | "Japaratinga"
  | "Passo de Camaragibe";

export type Category = {
  id: string;
  slug: string;
  name: string;
  emoji: string | null;
  imageUrl: string | null;
};

export type ApiRoomType = {
  id: string;
  title: string;
  description?: string | null;
  price_per_night: number;
  capacity_adults?: number;
  amenities?: string[] | null;
};

export type ApiTour = {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  duration_minutes?: number | null;
  max_capacity?: number | null;
  active?: boolean;
};

// Tipo base para Partner (sem propriedades opcionais problemáticas)
export type Partner = {
  id: string;
  slug: string;
  name: string;
  city: string;
  rating: number;
  reviewCount: number;
  short: string;
  description: string | null; // Mudado de optional para required com null
  priceFrom: number | null;
  whatsapp: string;
  phone: string;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  images: string[];
  featured: boolean; // Mudado de optional para required
  schedules?: string[];
  pricesPerPerson?: string[];
  familyPackages?: string[];
  category: {  // Mudado de optional para required
    id: string;
    name: string;
    slug: string;
  } | null; // Pode ser null
  hours_of_operation: string | null; // Mudado de optional para required com null
  instagram: string | null; // Mudado de optional para required com null
  website: string | null; // Mudado de optional para required com null
  tours?: ApiTour[];
  room_types?: ApiRoomType[];
  videoUrl?: string | null;
  tourDescription?: TourDescription | null;
  packages?: TourPackage[];
};

export type Promo = {
  id: string;
  title: string;
  detail: string | null;
  badge: string | null;
  imageUrl: string | null;
  partnerSlug: string;
};

export type HomeData = {
  featuredPartners: Partner[];
  categories: Category[];
  promos: Promo[];
};

export type CatalogData = {
  categories: Category[];
  partners: Partner[];
  promos: Promo[];
};

export interface TourPackage {
  id: string;
  name: string;
  people: number;
  price: number;
}

export interface TourDescription {
  title: string;
  text: string;
}



