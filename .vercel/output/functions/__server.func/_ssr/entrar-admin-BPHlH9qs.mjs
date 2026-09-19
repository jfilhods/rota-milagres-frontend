import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { k as login } from "./router-HQ7TexWm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/entrar-admin-BPHlH9qs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminLoginPage() {
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		try {
			const response = await login(email, password);
			localStorage.removeItem("cliente_token");
			localStorage.removeItem("cliente_refresh_token");
			localStorage.removeItem("cliente_expires_at");
			localStorage.removeItem("cliente_data");
			localStorage.setItem("auth_token", response.token);
			localStorage.setItem("auth_refresh_token", response.refresh_token);
			if (response.expires_at !== void 0) localStorage.setItem("auth_expires_at", String(response.expires_at));
			switch (response.user.role) {
				case "admin":
					await navigate({ to: "/admin" });
					break;
				case "owner":
				case "manager":
					await navigate({ to: "/admin" });
					break;
				default: throw new Error("Perfil de usuário não autorizado.");
			}
		} catch (err) {
			console.error("Erro no login administrativo:", err);
			setError(err instanceof Error ? err.message : "Email ou senha inválidos");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md space-y-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-medium",
					children: "Área administrativa"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted-foreground",
					children: "Entre como administrador ou parceiro"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "space-y-6",
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
						autoComplete: "username",
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-t pt-5 text-center text-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/entrar",
							className: "text-muted-foreground hover:text-primary",
							children: "Voltar para login de cliente"
						})
					})
				]
			})]
		})
	});
}
//#endregion
export { AdminLoginPage as component };
