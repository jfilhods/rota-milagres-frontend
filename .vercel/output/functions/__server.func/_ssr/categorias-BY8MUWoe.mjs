import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { nt as getCategoryImage, ot as getPartnersByCategory, s as Route$37, tt as getCategoryEmoji } from "./router-BAnSfLYa.mjs";
import { t as SiteHeader } from "./site-header-_VbCWHFa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/categorias-BY8MUWoe.js
var import_jsx_runtime = require_jsx_runtime();
function CategoriesPage() {
	const { categories } = Route$37.useLoaderData();
	const visibleCategories = categories.filter((category) => {
		const slug = category.slug?.toLowerCase() ?? "";
		const name = category.name?.toLowerCase() ?? "";
		return slug !== "promocao" && slug !== "promoção" && slug !== "promocoes" && slug !== "promoções" && slug !== "ofertas" && !name.includes("promoção") && !name.includes("promocao");
	});
	const getPartnerCount = (slug) => {
		try {
			const partners = getPartnersByCategory(slug);
			return Array.isArray(partners) ? partners.length : 0;
		} catch (error) {
			console.error(`Erro ao contar parceiros para categoria ${slug}:`, error);
			return 0;
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "px-4 py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-medium",
					children: "Todas as categorias"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 max-w-[56ch] text-muted-foreground",
					children: [visibleCategories.length, " categorias para você explorar em São Miguel dos Milagres, Porto de Pedras, Japaratinga e Passo de Camaragibe."]
				}),
				visibleCategories.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground",
					children: "Nenhuma categoria disponível no momento."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4",
					children: visibleCategories.map((category) => {
						getPartnerCount(category.slug);
						const imageUrl = getCategoryImage(category);
						const emoji = getCategoryEmoji(category);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/categoria/$slug",
							params: { slug: category.slug },
							className: "group overflow-hidden rounded-xl bg-card ring-1 ring-border transition hover:ring-2 hover:ring-primary/50 hover:-translate-y-1 hover:shadow-lg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: imageUrl,
									alt: category.name,
									loading: "lazy",
									width: 640,
									height: 480,
									className: "aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105",
									onError: (e) => {
										const target = e.target;
										target.style.display = "none";
										const parent = target.parentElement;
										if (parent && !parent.querySelector("[data-emoji-fallback]")) {
											const fallback = document.createElement("div");
											fallback.dataset["emojiFallback"] = "1";
											fallback.className = "flex aspect-[4/3] items-center justify-center bg-accent text-4xl";
											fallback.textContent = emoji || "📌";
											parent.appendChild(fallback);
										}
									}
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "block text-sm font-medium",
									children: [
										emoji,
										" ",
										category.name
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: [
										getPartnerCount(category.slug),
										" ",
										getPartnerCount(category.slug) === 1 ? "parceiro" : "parceiros"
									]
								})]
							})]
						}, category.slug);
					})
				})
			]
		})
	})] });
}
//#endregion
export { CategoriesPage as component };
