import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { V as getClienteConsultas } from "./router-HQ7TexWm.mjs";
import { n as CardContent, t as Card } from "./card-BfBj_YIE.mjs";
import { D as MessageCircle, F as LoaderCircle } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contatos-DlGs7Z4g.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ClienteContatosPage() {
	const [consultas, setConsultas] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		getClienteConsultas().then((res) => setConsultas(res.data || [])).catch(() => setConsultas([])).finally(() => setLoading(false));
	}, []);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin text-muted-foreground" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-2xl font-medium",
			children: "Meus contatos"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children: "Histórico de interações com parceiros (WhatsApp, etc.)"
		})] }), consultas.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "flex flex-col items-center gap-3 py-12 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-8 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "Você ainda não entrou em contato com nenhum parceiro."
			})]
		}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: consultas.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex items-center justify-between p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: item.partner?.name ?? "Parceiro"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground",
					children: [new Date(item.created_at).toLocaleString("pt-BR"), item.partner_id ? ` · ${item.cliente_id}` : ""]
				})] }), item.partner?.slug && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/parceiro/$slug",
					params: { slug: item.partner.slug },
					className: "text-sm text-primary hover:underline",
					children: "Ver parceiro"
				})]
			}) }, item.id))
		})]
	});
}
//#endregion
export { ClienteContatosPage as component };
