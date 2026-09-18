import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { H as getClienteFavoritos } from "./router-BAnSfLYa.mjs";
import { n as CardContent, t as Card } from "./card-BfBj_YIE.mjs";
import { B as Heart, F as LoaderCircle } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/favoritos-BGzfzKlA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ClienteFavoritosPage() {
	const [favoritos, setFavoritos] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		getClienteFavoritos().then((res) => setFavoritos(res.data || [])).catch(() => setFavoritos([])).finally(() => setLoading(false));
	}, []);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin text-muted-foreground" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-2xl font-medium",
			children: "Meus favoritos"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children: "Parceiros que você salvou como favoritos"
		})] }), favoritos.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "flex flex-col items-center gap-3 py-12 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-8 text-muted-foreground" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: "Você ainda não tem favoritos."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "text-sm text-primary hover:underline",
					children: "Explorar parceiros"
				})
			]
		}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
			children: favoritos.map((fav) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/parceiro/$slug",
				params: { slug: fav.partner?.slug || "" },
				className: "block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "transition hover:ring-2 hover:ring-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: fav.partner?.name ?? "Parceiro"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground",
							children: ["Adicionado em ", new Date(fav.created_at).toLocaleDateString("pt-BR")]
						})]
					})
				})
			}, fav.id))
		})]
	});
}
//#endregion
export { ClienteFavoritosPage as component };
