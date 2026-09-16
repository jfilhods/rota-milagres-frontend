import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { z } from "zod";
import { PartnerCard } from "@/components/partner-card";
import { getCategories, getPartnersByCity, searchPartners } from "@/lib/catalog";
import type { Partner, Category } from "@/lib/catalog";
import { SiteHeader } from "@/components/site-header";

const searchSchema = z.object({
  q: z.string().max(80).optional(),
});

export const Route = createFileRoute("/buscar")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Busca inteligente — Rota Milagres" },
      {
        name: "description",
        content:
          "Filtre por cidade, categoria, preço e avaliação para encontrar pousadas, restaurantes e passeios na Rota Ecológica de Alagoas.",
      },
      { property: "og:title", content: "Busca inteligente — Rota Milagres" },
      {
        property: "og:description",
        content: "Encontre o parceiro ideal filtrando por cidade, categoria, preço e avaliação.",
      },
    ],
  }),
  component: SearchPage,
});

// Cidades disponíveis
const CITIES = [
  "São Miguel dos Milagres",
  "Porto de Pedras",
  "Japaratinga",
  "Passo de Camaragibe",
];

function SearchPage() {
  const { q } = Route.useSearch();
  const [term, setTerm] = useState(q ?? "");
  const [city, setCity] = useState("todas");
  const [category, setCategory] = useState("todas");
  const [maxPrice, setMaxPrice] = useState(500);
  const [minRating, setMinRating] = useState(0);
  const [results, setResults] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  // Carrega categorias
  useEffect(() => {
    try {
      setCategories(getCategories());
    } catch (error) {
      console.error(error);
    }
  }, []);

  // Busca parceiros
  useEffect(() => {
    const fetchPartners = async () => {
      setLoading(true);
      try {
        let partners: Partner[] = [];

        if (term) {
          // Busca por termo
          partners = await searchPartners(term);
        } else if (city !== "todas") {
          // Busca por cidade
          partners = await getPartnersByCity(city);
        } else {
          // Busca todos (usando mock ou API)
          const { getMockHomeData } = await import("@/lib/catalog.ts");
          partners = getMockHomeData().featuredPartners;
        }

        // Aplica filtros
        let filtered = partners;

        // Filtro por categoria
        if (category !== "todas") {
          filtered = filtered.filter(
            (p) => p.category?.slug === category
          );
        }

        // Filtro por preço
        if (maxPrice < 500) {
          filtered = filtered.filter(
            (p) => (p.priceFrom || 0) <= maxPrice
          );
        }

        // Filtro por avaliação
        if (minRating > 0) {
          filtered = filtered.filter(
            (p) => p.rating >= minRating
          );
        }

        setResults(filtered);
      } catch (error) {
        console.error("Erro na busca:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, [term, city, category, maxPrice, minRating]);

  return (

    <>
    <SiteHeader/>
    <section className="px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-display text-3xl font-medium">Busca inteligente</h1>
        <p className="mt-2 text-muted-foreground">
          Filtre por nome, cidade, categoria, preço e avaliação.
        </p>

        <div className="mt-8 grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="space-y-6 rounded-2xl bg-card p-5 ring-1 ring-border lg:sticky lg:top-24 lg:self-start">
            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Nome
              </span>
              <span className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 ring-1 ring-border">
                <Search className="size-4 text-muted-foreground" />
                <input
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  maxLength={80}
                  placeholder="Ex.: jangada"
                  className="w-full bg-transparent text-sm outline-none"
                />
              </span>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Cidade
              </span>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-lg bg-muted px-3 py-2 text-sm ring-1 ring-border outline-none"
              >
                <option value="todas">Todas as cidades</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Categoria
              </span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg bg-muted px-3 py-2 text-sm ring-1 ring-border outline-none"
              >
                <option value="todas">Todas as categorias</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.emoji} {c.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Preço até R$ {maxPrice}
              </span>
              <input
                type="range"
                min={20}
                max={500}
                step={10}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </label>

            <div>
              <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Avaliação mínima
              </span>
              <div className="flex gap-2">
                {[0, 4, 4.5, 4.8].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setMinRating(value)}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium ring-1 transition-colors ${
                      minRating === value
                        ? "bg-foreground text-background ring-transparent"
                        : "bg-muted text-muted-foreground ring-border"
                    }`}
                  >
                    {value === 0 ? "Todas" : `${value}+`}
                  </button>
                ))}
              </div>
            </div>

            {loading && (
              <div className="text-center text-sm text-muted-foreground">
                Carregando...
              </div>
            )}
          </aside>

          <div>
            <p className="mb-6 text-sm text-muted-foreground">
              {results.length} resultado{results.length === 1 ? "" : "s"}
            </p>
            {results.length === 0 && !loading ? (
              <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
                Nenhum parceiro encontrado com esses filtros.
              </div>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((partner: Partner) => (
                  <PartnerCard
                    key={partner.slug}
                    partner={{ ...partner, active: true }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
    </>
  );
}