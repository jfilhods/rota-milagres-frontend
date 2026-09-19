import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as useClienteAuth } from "./router-HQ7TexWm.mjs";
import { F as LoaderCircle, P as LockKeyhole } from "../_libs/lucide-react.mjs";
import { t as SiteHeader } from "./site-header-_VbCWHFa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cliente-login-CKhey9YS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ClienteLoginPage() {
	const { login, loading, error } = useClienteAuth();
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	async function handleSubmit(event) {
		event.preventDefault();
		try {
			await login(email, password);
			navigate({ to: "/clientes" });
		} catch {}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "px-4 py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-md rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-8 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-4 font-display text-2xl font-medium",
							children: "Área do cliente"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Entre para acompanhar seus contatos com parceiros."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							required: true,
							value: email,
							onChange: (e) => setEmail(e.target.value),
							className: "w-full rounded-xl border border-border bg-background px-4 py-3",
							placeholder: "Seu e-mail"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "password",
							required: true,
							value: password,
							onChange: (e) => setPassword(e.target.value),
							className: "w-full rounded-xl border border-border bg-background px-4 py-3",
							placeholder: "Sua senha"
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-xl bg-destructive/10 p-3 text-sm text-destructive",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							disabled: loading,
							className: "flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-primary-foreground",
							children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), loading ? "Entrando..." : "Entrar"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 text-center text-sm",
					children: [
						"Ainda não possui cadastro?",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/cadastro-cliente",
							search: {
								message: void 0,
								partner: void 0
							},
							className: "font-medium text-primary",
							children: "Criar cadastro"
						})
					]
				})
			]
		})
	})] });
}
//#endregion
export { ClienteLoginPage as component };
