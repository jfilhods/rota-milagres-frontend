import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { $ as getCategories, c as Route$39, ct as getPartnersByCity, dt as searchPartners } from "./router-HQ7TexWm.mjs";
import { x as Search } from "../_libs/lucide-react.mjs";
import { t as SiteHeader } from "./site-header-_VbCWHFa.mjs";
import { t as PartnerCard } from "./partner-card-DiVkZjBU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/buscar-DK6X5ph8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CITIES = [
	"São Miguel dos Milagres",
	"Porto de Pedras",
	"Japaratinga",
	"Passo de Camaragibe"
];
function SearchPage() {
	const { q } = Route$39.useSearch();
	const [term, setTerm] = (0, import_react.useState)(q ?? "");
	const [city, setCity] = (0, import_react.useState)("todas");
	const [category, setCategory] = (0, import_react.useState)("todas");
	const [maxPrice, setMaxPrice] = (0, import_react.useState)(500);
	const [minRating, setMinRating] = (0, import_react.useState)(0);
	const [results, setResults] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [categories, setCategories] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		try {
			setCategories(getCategories());
		} catch (error) {
			console.error(error);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		const fetchPartners = async () => {
			setLoading(true);
			try {
				let partners = [];
				if (term) partners = await searchPartners(term);
				else if (city !== "todas") partners = await getPartnersByCity(city);
				else {
					const { getMockHomeData } = await import("../_libs/_.mjs").then((n) => n.t);
					partners = getMockHomeData().featuredPartners;
				}
				let filtered = partners;
				if (category !== "todas") filtered = filtered.filter((p) => p.category?.slug === category);
				if (maxPrice < 500) filtered = filtered.filter((p) => (p.priceFrom || 0) <= maxPrice);
				if (minRating > 0) filtered = filtered.filter((p) => p.rating >= minRating);
				setResults(filtered);
			} catch (error) {
				console.error("Erro na busca:", error);
				setResults([]);
			} finally {
				setLoading(false);
			}
		};
		fetchPartners();
	}, [
		term,
		city,
		category,
		maxPrice,
		minRating
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "px-4 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-medium",
					children: "Busca inteligente"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted-foreground",
					children: "Filtre por nome, cidade, categoria, preço e avaliação."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "space-y-6 rounded-2xl bg-card p-5 ring-1 ring-border lg:sticky lg:top-24 lg:self-start",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-2 block text-xs font-semibold uppercase tracking-widest text-muted-foreground",
									children: "Nome"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2 rounded-lg bg-muted px-3 py-2 ring-1 ring-border",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: term,
										onChange: (e) => setTerm(e.target.value),
										maxLength: 80,
										placeholder: "Ex.: jangada",
										className: "w-full bg-transparent text-sm outline-none"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-2 block text-xs font-semibold uppercase tracking-widest text-muted-foreground",
									children: "Cidade"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: city,
									onChange: (e) => setCity(e.target.value),
									className: "w-full rounded-lg bg-muted px-3 py-2 text-sm ring-1 ring-border outline-none",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "todas",
										children: "Todas as cidades"
									}), CITIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: c,
										children: c
									}, c))]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-2 block text-xs font-semibold uppercase tracking-widest text-muted-foreground",
									children: "Categoria"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: category,
									onChange: (e) => setCategory(e.target.value),
									className: "w-full rounded-lg bg-muted px-3 py-2 text-sm ring-1 ring-border outline-none",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "todas",
										children: "Todas as categorias"
									}), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: c.slug,
										children: [
											c.emoji,
											" ",
											c.name
										]
									}, c.slug))]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mb-2 block text-xs font-semibold uppercase tracking-widest text-muted-foreground",
									children: ["Preço até R$ ", maxPrice]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "range",
									min: 20,
									max: 500,
									step: 10,
									value: maxPrice,
									onChange: (e) => setMaxPrice(Number(e.target.value)),
									className: "w-full accent-primary"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-2 block text-xs font-semibold uppercase tracking-widest text-muted-foreground",
								children: "Avaliação mínima"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-2",
								children: [
									0,
									4,
									4.5,
									4.8
								].map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setMinRating(value),
									className: `rounded-full px-3 py-1.5 text-xs font-medium ring-1 transition-colors ${minRating === value ? "bg-foreground text-background ring-transparent" : "bg-muted text-muted-foreground ring-border"}`,
									children: value === 0 ? "Todas" : `${value}+`
								}, value))
							})] }),
							loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-center text-sm text-muted-foreground",
								children: "Carregando..."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mb-6 text-sm text-muted-foreground",
						children: [
							results.length,
							" resultado",
							results.length === 1 ? "" : "s"
						]
					}), results.length === 0 && !loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-2xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground",
						children: "Nenhum parceiro encontrado com esses filtros."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-8 sm:grid-cols-2 xl:grid-cols-3",
						children: results.map((partner) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartnerCard, { partner: {
							...partner,
							active: true
						} }, partner.slug))
					})] })]
				})
			]
		})
	})] });
}
//#endregion
export { SearchPage as component };
