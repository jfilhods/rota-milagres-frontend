// routes/categorias.tsx

import { createFileRoute, Link } from "@tanstack/react-router";
import {
  syncCategoriesFromAPI,
  getPartnersByCategory,
  getCategoryImage,
  getCategoryEmoji,
  type Category,
} from "@/lib/catalog";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/categorias")({
  head: () => ({
    meta: [
      { title: "Todas as categorias — Rota Milagres" },
      {
        name: "description",
        content:
          "Restaurantes, pousadas, chalés, jangada, buggy, transfer, mercados, farmácias e mais na Rota Ecológica de Alagoas.",
      },
    ],
  }),
  loader: async () => {
      // Categorias vêm SEMPRE da API (fallback automático para catalog.json)
      const categories = await syncCategoriesFromAPI();
      return { categories };
    },
    component: CategoriesPage,
});



function CategoriesPage() {
  const { categories } = Route.useLoaderData() as { categories: Category[] };

  // Não listar a categoria "promoção"
  const visibleCategories = categories.filter((category) => {
    const slug = category.slug?.toLowerCase() ?? "";
    const name = category.name?.toLowerCase() ?? "";

    return (
      slug !== "promocao" &&
      slug !== "promoção" &&
      slug !== "promocoes" &&
      slug !== "promoções" &&
      slug !== "ofertas" &&
      !name.includes("promoção") &&
      !name.includes("promocao")
    );
  });

 const getPartnerCount = (slug: string): number => {
    try {
      const partners = getPartnersByCategory(slug);
      return Array.isArray(partners) ? partners.length : 0;
    } catch (error) {
      console.error(`Erro ao contar parceiros para categoria ${slug}:`, error);
      return 0;
    }
  };

  return (
    <>
      <SiteHeader />
      <section className="px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-display text-3xl font-medium">Todas as categorias</h1>
          <p className="mt-2 max-w-[56ch] text-muted-foreground">
            {visibleCategories.length} categorias para você explorar em São Miguel dos Milagres,
            Porto de Pedras, Japaratinga e Passo de Camaragibe.
          </p>

          {visibleCategories.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground">
              Nenhuma categoria disponível no momento.
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {visibleCategories.map((category) => {
                const count = getPartnerCount(category.slug);
                // Usa imageUrl do JSON/API; se não houver, cai no mapeamento DEMO_IMAGES do catalog
                const imageUrl = getCategoryImage(category);
                const emoji = getCategoryEmoji(category);

                return (
                  <Link
                    key={category.slug}
                    to="/categoria/$slug"
                    params={{ slug: category.slug }}
                    className="group overflow-hidden rounded-xl bg-card ring-1 ring-border transition hover:ring-2 hover:ring-primary/50 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={category.name}
                        loading="lazy"
                        width={640}
                        height={480}
                        className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          // Plano B visual: esconde a img quebrada e mostra emoji
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          const parent = target.parentElement;
                          if (parent && !parent.querySelector("[data-emoji-fallback]")) {
                            const fallback = document.createElement("div");
                            fallback.dataset["emojiFallback"] = "1";
                            fallback.className =
                              "flex aspect-[4/3] items-center justify-center bg-accent text-4xl";
                            fallback.textContent = emoji || "📌";
                            parent.appendChild(fallback);
                          }
                        }}
                      />
                    </div>
                    <div className="p-3">
                      <span className="block text-sm font-medium">
                        {emoji} {category.name}
                      </span>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {getPartnerCount(category.slug)} {getPartnerCount(category.slug) === 1 ? "parceiro" : "parceiros"}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}