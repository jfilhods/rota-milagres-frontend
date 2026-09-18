import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { U as getClienteVouchers } from "./router-BAnSfLYa.mjs";
import { n as CardContent, t as Card } from "./card-BfBj_YIE.mjs";
import { F as LoaderCircle, X as CircleX, Z as CircleCheckBig, d as Ticket, it as Calendar } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vouchers-0ij4DuA-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ClienteVouchersPage() {
	const [vouchers, setVouchers] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		getClienteVouchers().then((res) => setVouchers(res.data || [])).catch(() => setVouchers([])).finally(() => setLoading(false));
	}, []);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin text-muted-foreground" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-2xl font-medium",
			children: "Meus vouchers"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children: "Cupons e descontos disponíveis"
		})] }), vouchers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "flex flex-col items-center gap-3 py-12 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "size-8 text-muted-foreground" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: "Você ainda não possui vouchers."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "text-sm text-primary hover:underline",
					children: "Explorar parceiros"
				})
			]
		}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-4",
			children: vouchers.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: v.partner?.name ?? "Parceiro"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground",
							children: ["Código: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono",
								children: v.codigo
							})]
						}),
						v.descricao && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm",
							children: v.descricao
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm",
							children: [
								v.desconto && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-green-600 font-semibold",
									children: [v.desconto, "% de desconto"]
								}),
								v.valor && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-green-600 font-semibold",
									children: ["R$ ", v.valor.toFixed(2)]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1 text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-4" }), v.validade_fim ? `Válido até ${new Date(v.validade_fim).toLocaleDateString("pt-BR")}` : "Sem data de validade"]
								})
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: v.status === "usado" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-4" }), " Usado"]
					}) : v.status === "expirado" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 text-red-500",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-4" }), " Expirado"]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 text-green-600",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "size-4" }), " Disponível"]
					}) })]
				}), v.partner?.slug && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/parceiro/$slug",
					params: { slug: v.partner.slug },
					className: "mt-2 inline-block text-sm text-primary hover:underline",
					children: "Ver parceiro"
				})]
			}) }, v.id))
		})]
	});
}
//#endregion
export { ClienteVouchersPage as component };
