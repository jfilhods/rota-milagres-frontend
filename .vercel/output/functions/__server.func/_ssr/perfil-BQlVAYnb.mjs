import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { J as updateClientePerfil, f as useClienteAuth } from "./router-HQ7TexWm.mjs";
import { n as CardContent, t as Card } from "./card-BfBj_YIE.mjs";
import { F as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/perfil-BQlVAYnb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ClientePerfilPage() {
	const { cliente } = useClienteAuth();
	const navigate = useNavigate();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		nome: "",
		telefone: "",
		documento: "",
		data_nascimento: ""
	});
	(0, import_react.useEffect)(() => {
		if (cliente) setForm({
			nome: cliente.nome || "",
			telefone: cliente.telefone || "",
			documento: cliente.documento || "",
			data_nascimento: cliente.data_nascimento || ""
		});
	}, [cliente]);
	const handleChange = (e) => {
		setForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value
		}));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await updateClientePerfil(form);
			toast.success("Perfil atualizado com sucesso!");
			navigate({ to: "/clientes" });
		} catch (error) {
			toast.error("Erro ao atualizar perfil. Tente novamente.");
		} finally {
			setLoading(false);
		}
	};
	if (!cliente) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin text-muted-foreground" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 max-w-lg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-2xl font-medium",
			children: "Meus dados"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children: "Atualize suas informações pessoais"
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "nome",
						children: "Nome completo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "nome",
						name: "nome",
						value: form.nome || "",
						onChange: handleChange,
						required: true
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "telefone",
						children: "Telefone"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "telefone",
						name: "telefone",
						value: form.telefone || "",
						onChange: handleChange
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "documento",
						children: "CPF / CNPJ"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "documento",
						name: "documento",
						value: form.documento || "",
						onChange: handleChange
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "data_nascimento",
						children: "Data de nascimento"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "data_nascimento",
						name: "data_nascimento",
						type: "date",
						value: form.data_nascimento || "",
						onChange: handleChange
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "submit",
							disabled: loading,
							children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 size-4 animate-spin" }), "Salvar alterações"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							onClick: () => navigate({ to: "/clientes" }),
							children: "Cancelar"
						})]
					})
				]
			})
		}) })]
	});
}
//#endregion
export { ClientePerfilPage as component };
