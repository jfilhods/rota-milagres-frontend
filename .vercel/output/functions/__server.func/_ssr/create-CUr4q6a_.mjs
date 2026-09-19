import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as createAdminClient } from "./api-cliente-admin-crIaRunS.mjs";
import { a as CardHeader, i as CardFooter, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-BfBj_YIE.mjs";
import { S as Save, dt as ArrowLeft } from "../_libs/lucide-react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { t as Switch } from "./switch-Cn1w-cIH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/create-CUr4q6a_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CreateClient() {
	const navigate = useNavigate();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [formData, setFormData] = (0, import_react.useState)({
		name: "",
		email: "",
		phone: "",
		cpf: "",
		password: "",
		active: true,
		role: "user"
	});
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.email) {
			toast.error("Email é obrigatório");
			return;
		}
		if (!formData.password || formData.password.length < 6) {
			toast.error("Senha deve ter pelo menos 6 caracteres");
			return;
		}
		try {
			setLoading(true);
			await createAdminClient({
				name: formData.name,
				email: formData.email,
				phone: formData.phone,
				cpf: formData.cpf,
				password: formData.password,
				active: formData.active,
				role: formData.role
			});
			toast.success("Cliente criado com sucesso!");
			navigate({ to: "/admin/clients" });
		} catch (error) {
			console.error("Erro ao criar cliente:", error);
			const message = typeof error === "object" && error !== null && "response" in error && typeof error.response === "object" && error.response !== null && "data" in error.response && typeof error.response.data === "object" && error.response.data !== null && "message" in error.response.data && typeof error.response.data.message === "string" ? error.response.data.message : "Erro ao criar cliente";
			toast.error(message);
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: handleSubmit,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-4 mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "ghost",
				onClick: () => navigate({ to: "/admin/clients" }),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "mr-2 h-4 w-4" }), "Voltar"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl font-semibold",
				children: "Novo Cliente"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Dados do Cliente" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Preencha as informações para criar um novo cliente na plataforma." })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 md:grid-cols-2 gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "name",
								children: "Nome completo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "name",
								placeholder: "Ex: João Silva",
								value: formData.name,
								onChange: (e) => setFormData({
									...formData,
									name: e.target.value
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "email",
								children: "Email *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "email",
								type: "email",
								placeholder: "Ex: joao@email.com",
								required: true,
								value: formData.email,
								onChange: (e) => setFormData({
									...formData,
									email: e.target.value
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "phone",
								children: "Telefone"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "phone",
								placeholder: "(11) 99999-9999",
								value: formData.phone,
								onChange: (e) => setFormData({
									...formData,
									phone: e.target.value
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "cpf",
								children: "CPF"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "cpf",
								placeholder: "000.000.000-00",
								value: formData.cpf,
								onChange: (e) => setFormData({
									...formData,
									cpf: e.target.value
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "password",
								children: "Senha *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "password",
								type: "password",
								placeholder: "Mínimo 6 caracteres",
								required: true,
								value: formData.password,
								onChange: (e) => setFormData({
									...formData,
									password: e.target.value
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "role",
								children: "Tipo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: formData.role,
								onValueChange: (value) => setFormData({
									...formData,
									role: value
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecione o tipo" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "user",
									children: "Usuário"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "admin",
									children: "Administrador"
								})] })]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center space-x-2 pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						id: "active",
						checked: formData.active,
						onCheckedChange: (checked) => setFormData({
							...formData,
							active: checked
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "active",
						children: "Cliente ativo"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardFooter, {
				className: "flex justify-end gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					onClick: () => navigate({ to: "/admin/clients" }),
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "submit",
					disabled: loading,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "mr-2 h-4 w-4" }), loading ? "Salvando..." : "Salvar Cliente"]
				})]
			})
		] })]
	});
}
//#endregion
export { CreateClient as component };
