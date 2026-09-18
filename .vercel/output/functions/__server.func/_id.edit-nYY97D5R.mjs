import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./_ssr/button-BkEeRci-.mjs";
import { y as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { r as Route$1 } from "./_ssr/router-BAnSfLYa.mjs";
import { a as updateAdminClient, r as getAdminClient } from "./_ssr/api-cliente-admin-crIaRunS.mjs";
import { a as CardHeader, i as CardFooter, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./_ssr/card-BfBj_YIE.mjs";
import { S as Save, dt as ArrowLeft } from "./_libs/lucide-react.mjs";
import { t as toast } from "./_libs/sonner.mjs";
import { t as Input } from "./_ssr/input-B8Q2ztVi.mjs";
import { t as Label } from "./_ssr/label-DBD1bRRP.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./_ssr/select-Dg1urBTx.mjs";
import { t as Switch } from "./_ssr/switch-Cn1w-cIH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id.edit-nYY97D5R.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EditClient() {
	const { id } = Route$1.useParams();
	const navigate = useNavigate();
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [formData, setFormData] = (0, import_react.useState)({
		nome: "",
		email: "",
		telefone: "",
		documento: "",
		active: true,
		role: "user"
	});
	(0, import_react.useEffect)(() => {
		const loadClient = async () => {
			try {
				setLoading(true);
				const response = await getAdminClient(id);
				if (response?.data) {
					const client = response.data;
					setFormData({
						nome: client.nome || "",
						email: client.email || "",
						telefone: client.telefone || "",
						documento: client.documento || "",
						active: client.active,
						role: client.role || "user"
					});
				}
			} catch (error) {
				console.error("Erro ao carregar cliente:", error);
				toast.error("Erro ao carregar dados do cliente");
			} finally {
				setLoading(false);
			}
		};
		loadClient();
	}, [id]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.email) return toast.error("Email é obrigatório");
		try {
			setSaving(true);
			await updateAdminClient(id, {
				name: formData.nome ?? "",
				email: formData.email,
				phone: formData.telefone ?? "",
				cpf: formData.documento?.replace(/\D/g, "") ?? "",
				active: formData.active ?? true,
				role: formData.role === "admin" ? "admin" : "user"
			});
			toast.success("Cliente atualizado com sucesso!");
			navigate({
				to: "/admin/clients/$id",
				params: { id }
			});
		} catch (error) {
			console.error("Erro ao atualizar cliente:", error);
			toast.error("Erro ao atualizar cliente");
		} finally {
			setSaving(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: handleSubmit,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-4 mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "ghost",
				onClick: () => navigate({
					to: "/admin/clients/$id",
					params: { id }
				}),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "mr-2 h-4 w-4" }), "Voltar"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl font-semibold",
				children: "Editar Cliente"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Dados do Cliente" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Atualize as informações do cliente." })] }),
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
								value: formData.nome || "",
								onChange: (e) => setFormData({
									...formData,
									nome: e.target.value
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
								value: formData.email || "",
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
								value: formData.telefone || "",
								onChange: (e) => setFormData({
									...formData,
									telefone: e.target.value
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
								value: formData.documento || "",
								onChange: (e) => setFormData({
									...formData,
									documento: e.target.value
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "role",
								children: "Tipo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: formData.role || "user",
								onValueChange: (value) => {
									if (value === "user" || value === "admin" || value === "partner") setFormData({
										...formData,
										role: value
									});
								},
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
						checked: formData.active ?? true,
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
					onClick: () => navigate({
						to: "/admin/clients/$id",
						params: { id }
					}),
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "submit",
					disabled: saving,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "mr-2 h-4 w-4" }), saving ? "Salvando..." : "Salvar Alterações"]
				})]
			})
		] })]
	});
}
//#endregion
export { EditClient as component };
