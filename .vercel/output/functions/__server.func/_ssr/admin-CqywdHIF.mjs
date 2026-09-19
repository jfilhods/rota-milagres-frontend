import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as getAdminDashboard, T as getAdminPartners } from "./router-HQ7TexWm.mjs";
import { a as CardHeader, n as CardContent, o as CardTitle, t as Card } from "./card-BfBj_YIE.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { C as Plus, f as Tags, i as Users, k as MapPin, ot as Building2, p as Store, q as CreditCard, ut as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-CqywdHIF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STAT_CARDS = [
	{
		title: "Parceiros",
		key: "partners",
		icon: Store,
		accent: "text-sky-600 dark:text-sky-400",
		iconBg: "bg-sky-500/10"
	},
	{
		title: "Usuários",
		key: "users",
		icon: Users,
		accent: "text-violet-600 dark:text-violet-400",
		iconBg: "bg-violet-500/10"
	},
	{
		title: "Assinaturas",
		key: "subscriptions",
		icon: CreditCard,
		accent: "text-emerald-600 dark:text-emerald-400",
		iconBg: "bg-emerald-500/10"
	},
	{
		title: "Categorias",
		key: "categories",
		icon: Tags,
		accent: "text-amber-600 dark:text-amber-400",
		iconBg: "bg-amber-500/10"
	},
	{
		title: "Cidades",
		key: "cities",
		icon: MapPin,
		accent: "text-rose-600 dark:text-rose-400",
		iconBg: "bg-rose-500/10"
	}
];
function planBadgeVariant(plan) {
	const p = plan.toLowerCase();
	if (p === "ouro") return "default";
	if (p === "prata") return "secondary";
	if (p === "bronze") return "outline";
	return "outline";
}
function AdminDashboard() {
	const [stats, setStats] = (0, import_react.useState)(null);
	const [partners, setPartners] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const load = async () => {
			try {
				setLoading(true);
				const [statsRes, partnersRes] = await Promise.all([getAdminDashboard().catch(() => null), getAdminPartners().catch(() => null)]);
				if (statsRes?.data) setStats(statsRes.data);
				if (partnersRes?.data) setPartners(partnersRes.data);
			} catch {
				toast.error("Erro ao carregar dashboard");
			} finally {
				setLoading(false);
			}
		};
		load();
	}, []);
	const getPlan = (partner) => {
		if (!partner.subscriptions) return "N/A";
		if (Array.isArray(partner.subscriptions)) return partner.subscriptions[0]?.plan_type ?? "N/A";
		return partner.subscriptions.plan_type ?? "N/A";
	};
	const getStatValue = (key) => {
		if (key === "partners" || key === "partnersFallback") return stats?.partners ?? partners.length;
		return stats?.[key];
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-semibold tracking-tight md:text-3xl",
					children: "Dashboard"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Visão geral da plataforma e parceiros cadastrados"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/admin/partners/create",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "w-full sm:w-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), "Novo Parceiro"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-5",
				children: STAT_CARDS.map((card) => {
					const Icon = card.icon;
					const value = getStatValue(card.key);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "overflow-hidden border-border/60 transition-shadow hover:shadow-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							className: "flex flex-row items-center justify-between space-y-0 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								className: "text-sm font-medium text-muted-foreground",
								children: card.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `flex h-8 w-8 items-center justify-center rounded-lg ${card.iconBg}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-4 w-4 ${card.accent}` })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-16 animate-pulse rounded bg-muted" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-2xl font-bold tabular-nums tracking-tight",
							children: value ?? "—"
						}) })]
					}, card.title);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold tracking-tight",
						children: "Parceiros"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							"Últimos ",
							Math.min(partners.length, 10),
							" cadastrados"
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin/partners",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							className: "shrink-0",
							children: ["Ver todos", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-1.5 h-3.5 w-3.5" })]
						})
					})]
				}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3",
					children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "flex items-center gap-4 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 w-10 animate-pulse rounded-xl bg-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-40 animate-pulse rounded bg-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-56 animate-pulse rounded bg-muted" })]
						})]
					}) }, i))
				}) : partners.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "border-dashed",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "flex flex-col items-center justify-center gap-3 py-14 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-muted",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-6 w-6 text-muted-foreground" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: "Nenhum parceiro cadastrado"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "Cadastre o primeiro parceiro para começar."
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/admin/partners/create",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									className: "mt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), "Novo Parceiro"]
								})
							})
						]
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3",
					children: partners.slice(0, 10).map((partner) => {
						const plan = getPlan(partner);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: "border-border/60 transition-all hover:border-primary/30 hover:shadow-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex min-w-0 items-start gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-semibold text-primary",
										children: partner.name?.charAt(0)?.toUpperCase() || "P"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "truncate font-medium leading-tight",
													children: partner.name
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													variant: partner.active ? "default" : "secondary",
													className: partner.active ? "bg-emerald-600 hover:bg-emerald-600" : void 0,
													children: partner.active ? "Ativo" : "Inativo"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													variant: planBadgeVariant(plan),
													className: "capitalize",
													children: plan
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-0.5 truncate text-sm text-muted-foreground",
											children: ["/", partner.slug]
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/admin/partners/$id/edit",
									params: { id: partner.id },
									className: "sm:shrink-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										size: "sm",
										className: "w-full sm:w-auto",
										children: "Editar"
									})
								})]
							})
						}, partner.id);
					})
				})]
			})
		]
	});
}
//#endregion
export { AdminDashboard as component };
