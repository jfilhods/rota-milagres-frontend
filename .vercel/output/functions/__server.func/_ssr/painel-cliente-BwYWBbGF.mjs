import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { H as getClienteFavoritos, U as getClienteVouchers, V as getClienteConsultas, f as useClienteAuth } from "./router-HQ7TexWm.mjs";
import { n as CardContent, t as Card } from "./card-BfBj_YIE.mjs";
import { B as Heart, F as LoaderCircle, J as Clock, d as Ticket } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/painel-cliente-BwYWBbGF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ClientePainelPage() {
	const { cliente } = useClienteAuth();
	const [consultas, setConsultas] = (0, import_react.useState)([]);
	const [favoritos, setFavoritos] = (0, import_react.useState)([]);
	const [vouchers, setVouchers] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		async function loadData() {
			try {
				setLoading(true);
				const [c, f, v] = await Promise.all([
					getClienteConsultas().catch(() => ({ data: [] })),
					getClienteFavoritos().catch(() => ({ data: [] })),
					getClienteVouchers().catch(() => ({ data: [] }))
				]);
				setConsultas(c.data || []);
				setFavoritos(f.data || []);
				setVouchers(v.data || []);
			} finally {
				setLoading(false);
			}
		}
		loadData();
	}, []);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin text-muted-foreground" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-2xl font-medium",
			children: "Painel do cliente"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children: "Visão completa dos seus contatos, favoritos e vouchers"
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-xl flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-5" }), " Contatos"]
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
					children: consultas.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: item.partner?.name ?? "Parceiro"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: new Date(item.created_at).toLocaleDateString("pt-BR")
						})]
					}) }, item.id))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-xl flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-5" }), " Favoritos"]
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
					children: favoritos.map((fav) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/parceiro/$slug",
						params: { slug: fav.partner?.slug || "" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: "transition hover:ring-2 hover:ring-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
								className: "p-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: fav.partner?.name ?? "Parceiro"
								})
							})
						})
					}, fav.id))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-xl flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "size-5" }), " Vouchers"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/clientes/vouchers",
						className: "text-sm text-primary hover:underline",
						children: "Ver todos"
					})]
				}), vouchers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: "Nenhum voucher ainda"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: vouchers.slice(0, 5).map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: v.partner?.name ?? "Parceiro"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground",
							children: ["Código: ", v.codigo]
						})]
					}) }, v.id))
				})] })
			]
		})]
	});
}
//#endregion
export { ClientePainelPage as component };
