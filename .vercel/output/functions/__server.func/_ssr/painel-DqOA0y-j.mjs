import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as Heart, D as MessageCircle, F as LoaderCircle, W as Eye, m as Star, ut as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as getStats } from "./partner-api-DTcfnYts.mjs";
import { t as usePartner } from "./use-partner-o36-CqkP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/painel-DqOA0y-j.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function OverviewPage() {
	const partner = usePartner();
	const [stats, setStats] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		getStats().then(setStats).catch(() => setStats(null)).finally(() => setLoading(false));
	}, []);
	if (!partner) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground",
		children: "Nenhum parceiro vinculado à sua conta."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "font-display text-2xl font-semibold md:text-3xl",
				children: ["Olá, ", partner.name]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Aqui está o resumo do seu negócio na Rota Milagres."
			})] }),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-center py-16 text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 size-5 animate-spin" }), "Carregando estatísticas..."]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Eye,
						label: "Visualizações",
						value: stats?.views ?? 0,
						hint: `${stats?.viewsLast30 ?? 0} nos últimos 30 dias`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: MessageCircle,
						label: "Cliques no WhatsApp",
						value: stats?.whatsappClicks ?? 0,
						hint: `${stats?.whatsappClicksLast30 ?? 0} nos últimos 30 dias`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Star,
						label: "Avaliação média",
						value: stats?.avgRating ? stats.avgRating.toFixed(1) : partner.rating.toFixed(1),
						hint: `${stats?.reviewCount ?? partner.reviewCount} avaliações`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Heart,
						label: "Favoritos",
						value: stats?.favorites ?? 0,
						hint: "Pessoas que salvaram seu perfil"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickAction, {
						to: "/painel/perfil",
						title: "Completar meu negócio",
						description: "Adicione fotos, descrição, horários e formas de contato."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickAction, {
						to: "/painel/promocoes",
						title: "Criar uma promoção",
						description: "Destaque seu negócio com ofertas para os visitantes."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickAction, {
						to: "/painel/imagens",
						title: "Gerenciar imagens",
						description: "Envie fotos que aparecem no seu perfil público."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickAction, {
						to: "/painel/avaliacoes",
						title: "Responder avaliações",
						description: "Interaja com seus clientes e melhore sua reputação."
					})
				]
			})
		]
	});
}
function StatCard({ icon: Icon, label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-border bg-card p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex size-10 items-center justify-center rounded-xl bg-primary/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5 text-primary" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: label
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 font-display text-3xl font-semibold",
				children: value
			}),
			hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: hint
			})
		]
	});
}
function QuickAction({ to, title, description }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: "group flex items-center justify-between rounded-2xl border border-border bg-card p-5 transition hover:border-primary/50 hover:bg-muted/40",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-medium",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: description
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-5 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" })]
	});
}
//#endregion
export { OverviewPage as component };
