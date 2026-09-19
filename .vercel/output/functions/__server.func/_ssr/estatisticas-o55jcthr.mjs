import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { F as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as getStats } from "./partner-api-DTcfnYts.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/estatisticas-o55jcthr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EstatisticasPage() {
	const [stats, setStats] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		getStats().then(setStats).catch(() => setStats(null)).finally(() => setLoading(false));
	}, []);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-center py-16 text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 size-5 animate-spin" }), "Carregando estatísticas..."]
	});
	if (!stats) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground",
		children: "Sem dados disponíveis."
	});
	const maxMonth = Math.max(...stats.monthlyViews.map((m) => m.total), 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold md:text-3xl",
				children: "Estatísticas"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Acompanhe o desempenho do seu perfil."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						label: "Visualizações",
						value: stats.views
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						label: "Últimos 30 dias",
						value: stats.viewsLast30
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						label: "Cliques no WhatsApp",
						value: stats.whatsappClicks
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						label: "Favoritos",
						value: stats.favorites
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-border bg-card p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-5 font-display text-lg font-semibold",
					children: "Visualizações por mês"
				}), stats.monthlyViews.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Ainda sem dados suficientes."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: stats.monthlyViews.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-12 text-xs font-medium text-muted-foreground",
								children: m.month
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex-1 overflow-hidden rounded-full bg-muted",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-3 rounded-full bg-primary transition-all",
									style: { width: `${m.total / maxMonth * 100}%` }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-12 text-right text-sm font-semibold",
								children: m.total
							})
						]
					}, m.month))
				})]
			})
		]
	});
}
function Card({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-border bg-card p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 font-display text-3xl font-semibold",
			children: value
		})]
	});
}
//#endregion
export { EstatisticasPage as component };
