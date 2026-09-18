import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { d as useRouterState, v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { M as LogIn, O as Menu, o as UserPlus, t as X, x as Search } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-header-_VbCWHFa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var navLinks = [{
	to: "/",
	label: "Home"
}, {
	to: "/categorias",
	label: "Categorias"
}];
function SiteHeader() {
	const [term, setTerm] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	if (useRouterState({ select: (s) => s.location.pathname }).startsWith("/painel")) return null;
	function submit(event) {
		event.preventDefault();
		const q = term.trim();
		if (!q) return;
		navigate({
			to: "/buscar",
			search: { q }
		});
		setOpen(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 items-center gap-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/rota-milagres-logo.png",
						alt: "Rota Milagres",
						className: "h-14 w-auto"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "hidden max-w-md flex-1 items-center gap-2.5 rounded-2xl border border-border/60 bg-muted/40 px-4 py-2.5 transition-all focus-within:border-primary/40 focus-within:bg-background focus-within:ring-2 focus-within:ring-primary/10 md:flex",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: term,
						onChange: (e) => setTerm(e.target.value),
						maxLength: 80,
						placeholder: "Buscar pousadas, restaurantes ou passeios...",
						"aria-label": "Buscar parceiros",
						className: "w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1.5 sm:gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "hidden items-center gap-0.5 lg:flex",
						children: navLinks.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: link.to,
							className: "rounded-xl px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
							activeProps: { className: "bg-muted text-foreground" },
							children: link.label
						}, link.to))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-1 hidden h-5 w-px bg-border/60 sm:block lg:mx-2" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/cadastro-cliente",
						search: {
							message: "cadastro",
							partner: ""
						},
						className: "group flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-emerald-600/20 transition-all hover:bg-emerald-700 hover:shadow-md hover:shadow-emerald-600/25 active:scale-[0.98]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "size-4 transition-transform group-hover:scale-110" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: "Cadastre-se"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/entrar",
						className: "flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background shadow-sm transition-all hover:bg-foreground/90 hover:shadow-md active:scale-[0.98]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "size-4 opacity-80" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: "Entrar"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setOpen((v) => !v),
						"aria-label": open ? "Fechar menu" : "Abrir menu",
						className: "ml-1 flex h-10 w-10 items-center justify-center rounded-xl text-foreground transition-colors hover:bg-muted lg:hidden",
						children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
					})
				]
			})]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "animate-in fade-in slide-in-from-top-2 border-t border-border/50 bg-background/95 px-4 py-5 backdrop-blur-xl lg:hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "mb-5 flex items-center gap-2.5 rounded-2xl border border-border/60 bg-muted/50 px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: term,
					onChange: (e) => setTerm(e.target.value),
					maxLength: 80,
					placeholder: "O que você procura?",
					"aria-label": "Buscar parceiros",
					className: "w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex flex-col gap-1",
				children: [
					navLinks.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: link.to,
						onClick: () => setOpen(false),
						className: "rounded-xl px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted",
						activeProps: { className: "bg-muted" },
						children: link.label
					}, link.to)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-3 h-px bg-border/60" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/cadastro-cliente",
						search: {
							message: "cadastro",
							partner: ""
						},
						onClick: () => setOpen(false),
						className: "flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold text-emerald-600 transition-colors hover:bg-emerald-50 dark:hover:bg-emerald-950/30",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "size-4" }), "Cadastre-se"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/entrar",
						onClick: () => setOpen(false),
						className: "flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "size-4" }), "Entrar"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/planos",
						onClick: () => setOpen(false),
						className: "rounded-xl px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted",
						children: "Seja um Parceiro"
					})
				]
			})]
		})]
	});
}
//#endregion
export { SiteHeader as t };
