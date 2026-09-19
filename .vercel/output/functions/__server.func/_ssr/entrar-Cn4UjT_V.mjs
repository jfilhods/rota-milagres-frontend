import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as useClienteAuth, u as useAuth } from "./router-HQ7TexWm.mjs";
import { t as SiteHeader } from "./site-header-_VbCWHFa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/entrar-Cn4UjT_V.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const navigate = useNavigate();
	const { login: loginAdminPartner } = useAuth();
	const { login: loginCliente } = useClienteAuth();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	async function handleSubmit(e) {
		e.preventDefault();
		if (loading) return;
		setLoading(true);
		setError("");
		localStorage.removeItem("auth_token");
		localStorage.removeItem("auth_refresh_token");
		localStorage.removeItem("auth_expires_at");
		try {
			const cliente = await loginCliente(email, password);
			if (!cliente.ativo || !cliente.email || !cliente.id) throw new Error("Resposta inválida do servidor");
			await navigate({
				to: "/clientes",
				replace: true
			});
			return;
		} catch (clienteError) {
			console.log("⚠️ Login de cliente não realizado.", clienteError);
		}
		try {
			localStorage.removeItem("cliente_token");
			localStorage.removeItem("cliente_refresh_token");
			localStorage.removeItem("cliente_expires_at");
			localStorage.removeItem("cliente_data");
			localStorage.removeItem("cliente");
			await loginAdminPartner({
				email,
				password
			});
			return;
		} catch (adminError) {
			console.error("❌ Login de admin/parceiro também falhou:", adminError);
			setError(adminError instanceof Error ? adminError.message : "Email ou senha inválidos");
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md space-y-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-medium",
					children: "Entrar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted-foreground",
					children: "Acesse sua conta no Rota Milagres"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "mt-8 space-y-6",
				children: [
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-lg bg-destructive/10 p-3 text-sm text-destructive",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "email",
						className: "block text-sm font-medium",
						children: "Email"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "email",
						type: "email",
						value: email,
						onChange: (e) => setEmail(e.target.value),
						required: true,
						autoComplete: "email",
						className: "mt-1 w-full rounded-lg border border-input bg-background px-4 py-2",
						placeholder: "seu@email.com"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "password",
						className: "block text-sm font-medium",
						children: "Senha"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "password",
						type: "password",
						value: password,
						onChange: (e) => setPassword(e.target.value),
						required: true,
						autoComplete: "current-password",
						className: "mt-1 w-full rounded-lg border border-input bg-background px-4 py-2",
						placeholder: "••••••••"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: loading,
						className: "w-full rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50",
						children: loading ? "Entrando..." : "Entrar"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 text-center text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground",
							children: "Ainda não possui uma conta?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/cadastro-cliente",
							search: {
								message: void 0,
								partner: void 0
							},
							className: "text-primary hover:underline",
							children: "Cadastre-se como cliente"
						})]
					})
				]
			})]
		})
	})] });
}
//#endregion
export { LoginPage as component };
