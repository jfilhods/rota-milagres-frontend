import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { F as LoaderCircle, b as Send, m as Star } from "../_libs/lucide-react.mjs";
import { i as replyReview, r as listReviews } from "./partner-api-DTcfnYts.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/avaliacoes-Dqt7YKBl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AvaliacoesPage() {
	const [reviews, setReviews] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [replyingTo, setReplyingTo] = (0, import_react.useState)(null);
	const [replyText, setReplyText] = (0, import_react.useState)("");
	const [sending, setSending] = (0, import_react.useState)(false);
	async function reload() {
		setLoading(true);
		try {
			setReviews(await listReviews());
		} catch {
			setReviews([]);
		} finally {
			setLoading(false);
		}
	}
	(0, import_react.useEffect)(() => {
		reload();
	}, []);
	async function handleReply(id) {
		if (!replyText.trim()) return;
		setSending(true);
		try {
			await replyReview(id, replyText.trim());
			setReplyingTo(null);
			setReplyText("");
			await reload();
		} catch (err) {
			alert(err instanceof Error ? err.message : "Erro ao responder.");
		} finally {
			setSending(false);
		}
	}
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-center py-16 text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 size-5 animate-spin" }), "Carregando avaliações..."]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-2xl font-semibold md:text-3xl",
			children: "Avaliações"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Responda seus clientes e mantenha uma boa reputação."
		})] }), reviews.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground",
			children: "Ainda não há avaliações."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-4",
			children: reviews.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-2xl border border-border bg-card p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-start justify-between gap-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: r.authorName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 flex items-center gap-1 text-amber-500",
							children: [Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `size-3.5 ${i < r.rating ? "fill-current" : "opacity-30"}` }, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-1 text-xs text-muted-foreground",
								children: new Date(r.createdAt).toLocaleDateString("pt-BR")
							})]
						})] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted-foreground",
						children: r.comment
					}),
					r.reply ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 rounded-xl bg-muted/60 p-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold text-primary",
							children: "Sua resposta"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-muted-foreground",
							children: r.reply
						})]
					}) : replyingTo === r.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							className: "input min-h-[80px]",
							value: replyText,
							onChange: (e) => setReplyText(e.target.value),
							placeholder: "Escreva sua resposta..."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => handleReply(r.id),
								disabled: sending,
								className: "inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50",
								children: [sending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" }), "Enviar resposta"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setReplyingTo(null);
									setReplyText("");
								},
								className: "rounded-xl border border-border px-4 py-2 text-sm font-medium hover:bg-muted",
								children: "Cancelar"
							})]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setReplyingTo(r.id);
							setReplyText("");
						},
						className: "mt-4 text-sm font-medium text-primary hover:underline",
						children: "Responder"
					})
				]
			}, r.id))
		})]
	});
}
//#endregion
export { AvaliacoesPage as component };
