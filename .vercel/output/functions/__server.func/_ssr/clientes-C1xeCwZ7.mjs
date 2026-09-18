import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { H as getClienteFavoritos, U as getClienteVouchers, V as getClienteConsultas, f as useClienteAuth } from "./router-BAnSfLYa.mjs";
import { n as CardContent, t as Card } from "./card-BfBj_YIE.mjs";
import { B as Heart, F as LoaderCircle, J as Clock, d as Ticket, ut as ArrowRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/clientes-C1xeCwZ7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ClienteDashboard() {
	const { cliente, isAuthenticated } = useClienteAuth();
	const [consultas, setConsultas] = (0, import_react.useState)([]);
	const [favoritos, setFavoritos] = (0, import_react.useState)([]);
	const [vouchers, setVouchers] = (0, import_react.useState)([]);
	const [loadingData, setLoadingData] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (!isAuthenticated) return;
		async function loadData() {
			try {
				setLoadingData(true);
				const [c, f, v] = await Promise.all([
					getClienteConsultas().catch(() => ({ data: [] })),
					getClienteFavoritos().catch(() => ({ data: [] })),
					getClienteVouchers().catch(() => ({ data: [] }))
				]);
				setConsultas(c.data || []);
				setFavoritos(f.data || []);
				setVouchers(v.data || []);
			} finally {
				setLoadingData(false);
			}
		}
		loadData();
	}, [isAuthenticated]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "font-display text-3xl font-medium",
					children: [
						"Olá, ",
						cliente?.nome?.split(" ")[0] || "cliente",
						" 👋"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: "Gerencie favoritos, contatos e avaliações"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/clientes/painel-cliente",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						children: ["Abrir painel", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-1 h-4 w-4" })]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "flex items-center gap-3 p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Contatos"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl",
							children: loadingData ? "—" : consultas.length
						})] })]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "flex items-center gap-3 p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Favoritos"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl",
							children: loadingData ? "—" : favoritos.length
						})] })]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "flex items-center gap-3 p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Vouchers"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl",
							children: loadingData ? "—" : vouchers.length
						})] })]
					}) })
				]
			}),
			loadingData ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center py-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin text-muted-foreground" })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl",
						children: "Últimos contatos"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/clientes/contatos",
						className: "text-sm text-primary hover:underline",
						children: "Ver todos"
					})]
				}), consultas.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: "Nenhum contato ainda"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: consultas.slice(0, 5).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: item.partner?.name ?? "Parceiro"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: new Date(item.created_at).toLocaleDateString("pt-BR")
						})]
					}) }, item.id))
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl",
						children: "Favoritos"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/clientes/favoritos",
						className: "text-sm text-primary hover:underline",
						children: "Ver todos"
					})]
				}), favoritos.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: "Nenhum favorito ainda"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: favoritos.filter((f) => f.partner?.slug).slice(0, 5).map((fav) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/parceiro/$slug",
						params: { slug: fav.partner.slug },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: "transition hover:ring-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
								className: "p-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: fav.partner?.name
								})
							})
						})
					}, fav.id))
				})] })]
			})
		]
	}) });
}
//#endregion
export { ClienteDashboard as component };
