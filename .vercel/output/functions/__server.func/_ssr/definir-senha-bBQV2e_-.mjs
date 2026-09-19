import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as changePassword, u as useAuth } from "./router-HQ7TexWm.mjs";
import { F as LoaderCircle } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/definir-senha-bBQV2e_-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ChangePasswordPage() {
	const navigate = useNavigate();
	const { user } = useAuth();
	const [newPassword, setNewPassword] = (0, import_react.useState)("");
	const [confirmPassword, setConfirmPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [success, setSuccess] = (0, import_react.useState)(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		if (newPassword.length < 8) {
			setError("A senha deve ter no mínimo 8 caracteres");
			return;
		}
		if (newPassword !== confirmPassword) {
			setError("As senhas não coincidem");
			return;
		}
		if (!user) {
			setError("Usuário não autenticado");
			return;
		}
		setLoading(true);
		try {
			const result = await changePassword(newPassword);
			const updatedUser = {
				...user,
				must_change_password: false
			};
			localStorage.setItem("user_data", JSON.stringify(updatedUser));
			setSuccess(true);
			setTimeout(() => {
				navigate({ to: "/painel" });
			}, 1e3);
			if (!result.success) throw new Error(result.error || "Erro ao alterar senha");
			if (result.data?.user?.must_change_password !== false) throw new Error("A senha foi alterada, mas a configuração de acesso não foi atualizada.");
			setSuccess(true);
			setTimeout(() => {
				navigate({ to: "/painel" });
			}, 1e3);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Erro ao alterar senha");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "px-4 py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-md rounded-2xl bg-card p-8 ring-1 ring-border shadow-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-8 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-medium",
					children: "Trocar senha"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Você precisa definir uma nova senha antes de continuar."
				})]
			}), success ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-primary/10 p-4 text-center text-primary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Senha alterada com sucesso!" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm",
					children: "Redirecionando para o painel..."
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-medium",
						children: ["Nova senha", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "password",
							required: true,
							minLength: 8,
							value: newPassword,
							onChange: (e) => setNewPassword(e.target.value),
							className: "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary",
							placeholder: "Mínimo 8 caracteres",
							autoComplete: "new-password"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-medium",
						children: ["Confirmar senha", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "password",
							required: true,
							minLength: 8,
							value: confirmPassword,
							onChange: (e) => setConfirmPassword(e.target.value),
							className: "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary",
							placeholder: "Digite novamente",
							autoComplete: "new-password"
						})]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-xl bg-destructive/10 p-3 text-sm text-destructive",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "submit",
						disabled: loading,
						className: "flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60",
						children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), loading ? "Alterando..." : "Alterar senha"]
					})
				]
			})]
		})
	});
}
//#endregion
export { ChangePasswordPage as component };
