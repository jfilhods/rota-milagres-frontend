import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { O as getPartnerPromos } from "./router-BAnSfLYa.mjs";
import { F as LoaderCircle, U as Gift, g as Sparkles, it as Calendar } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/promocoes-U8tCq1fD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function isActive(p) {
	if (!p.active) return false;
	const now = Date.now();
	if (p.starts_at && new Date(p.starts_at).getTime() > now) return false;
	if (p.ends_at && new Date(p.ends_at).getTime() < now) return false;
	return true;
}
function PromocoesPage() {
	const [promos, setPromos] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		getPartnerPromos().then((res) => setPromos(res.data ?? [])).catch(() => setPromos([])).finally(() => setLoading(false));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex size-11 items-center justify-center rounded-xl bg-primary/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "size-5 text-primary" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-semibold md:text-3xl",
					children: "Promoções"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Pacotes criados pela equipe Rota Milagres em parceria com você. Aparecem automaticamente na home do site."
				})] })]
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-center py-16 text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 size-5 animate-spin" }), " Carregando..."]
			}) : promos.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground",
				children: "Você ainda não tem promoções. Fale com a equipe para criar um pacote junto."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
				children: promos.map((p) => {
					const active = isActive(p);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "overflow-hidden rounded-2xl border border-border bg-card",
						children: [p.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: p.image_url,
							alt: p.title,
							className: "aspect-[16/9] w-full object-cover",
							loading: "lazy"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [p.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1 text-xs font-semibold text-primary",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3" }), p.badge]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-0.5 font-medium leading-tight",
											children: p.title
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${active ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400" : "bg-muted text-muted-foreground"}`,
										children: active ? "No ar" : "Fora do ar"
									})]
								}),
								p.detail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: p.detail
								}),
								(p.starts_at || p.ends_at) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 text-xs text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-3" }),
										p.starts_at && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: new Date(p.starts_at).toLocaleDateString("pt-BR") }),
										p.starts_at && p.ends_at && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" }),
										p.ends_at && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: new Date(p.ends_at).toLocaleDateString("pt-BR") })
									]
								})
							]
						})]
					}, p.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border bg-muted/40 p-5 text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
					className: "text-foreground",
					children: "Quer uma promoção?"
				}), " Entre em contato com a equipe Rota Milagres pelo WhatsApp e monte um pacote com desconto, cortesia ou brinde."]
			})
		]
	});
}
//#endregion
export { PromocoesPage as component };
