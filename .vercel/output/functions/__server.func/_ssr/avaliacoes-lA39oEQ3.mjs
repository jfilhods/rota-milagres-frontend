import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as getClienteAvaliacoes } from "./router-HQ7TexWm.mjs";
import { n as CardContent, t as Card } from "./card-BfBj_YIE.mjs";
import { F as LoaderCircle, m as Star } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/avaliacoes-lA39oEQ3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ClienteAvaliacoesPage() {
	const [avaliacoes, setAvaliacoes] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		carregarAvaliacoes();
	}, []);
	const carregarAvaliacoes = async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await getClienteAvaliacoes();
			setAvaliacoes(response.data || []);
		} catch (err) {
			console.error("Erro ao carregar avaliações:", err);
			setError("Não foi possível carregar suas avaliações. Tente novamente.");
		} finally {
			setLoading(false);
		}
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin text-muted-foreground" })
	});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-center py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-red-500",
			children: error
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: carregarAvaliacoes,
			className: "mt-4 text-primary hover:underline",
			children: "Tentar novamente"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-2xl font-medium",
			children: "Minhas avaliações"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children: "Notas e comentários que você deixou nos parceiros"
		})] }), avaliacoes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "flex flex-col items-center gap-3 py-12 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-8 text-muted-foreground" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: "Você ainda não avaliou nenhum parceiro."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Abra a página de um parceiro e deixe sua nota e comentário."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "text-sm text-primary hover:underline",
					children: "Explorar parceiros"
				})
			]
		}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: avaliacoes.map((av) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/parceiro/$slug",
							params: { slug: av.partner?.slug || "" },
							className: "font-medium hover:text-primary hover:underline",
							children: av.partner?.name ?? "Parceiro"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm font-medium text-amber-600",
							children: ["★".repeat(av.nota), "☆".repeat(5 - av.nota)]
						})]
					}),
					av.comentario && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: av.comentario
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: new Date(av.created_at).toLocaleDateString("pt-BR")
					})
				]
			}) }, av.id))
		})]
	});
}
//#endregion
export { ClienteAvaliacoesPage as component };
