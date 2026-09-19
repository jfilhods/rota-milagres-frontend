import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./_ssr/button-BkEeRci-.mjs";
import { y as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { i as Route$5 } from "./_ssr/router-HQ7TexWm.mjs";
import { r as getAdminClient } from "./_ssr/api-cliente-admin-crIaRunS.mjs";
import { a as CardHeader, n as CardContent, o as CardTitle, t as Card } from "./_ssr/card-BfBj_YIE.mjs";
import { t as Badge } from "./_ssr/badge-D1Dupn2y.mjs";
import { A as Mail, V as Hash, a as User, dt as ArrowLeft, h as SquarePen, it as Calendar, w as Phone } from "./_libs/lucide-react.mjs";
import { t as toast } from "./_libs/sonner.mjs";
import { n as format, t as ptBR } from "./_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-UA65CX00.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ViewClient() {
	const { id } = Route$5.useParams();
	const navigate = useNavigate();
	const [client, setClient] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const loadClient = async () => {
			try {
				setLoading(true);
				const response = await getAdminClient(id);
				if (response?.data) setClient(response.data);
			} catch (error) {
				console.error("Erro ao carregar cliente:", error);
				toast.error("Erro ao carregar dados do cliente");
			} finally {
				setLoading(false);
			}
		};
		loadClient();
	}, [id]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-muted-foreground",
				children: "Carregando..."
			})]
		})
	});
	if (!client) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-center py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children: "Cliente não encontrado"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			onClick: () => navigate({ to: "/admin/clients" }),
			className: "mt-4",
			children: "Voltar para lista"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						onClick: () => navigate({ to: "/admin/clients" }),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "mr-2 h-4 w-4" }), "Voltar"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-semibold",
						children: client.name || "Cliente"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: client.active ? "default" : "secondary",
						children: client.active ? "Ativo" : "Inativo"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => navigate({
					to: "/admin/clients/$id/edit",
					params: { id }
				}),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "mr-2 h-4 w-4" }), "Editar"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 md:grid-cols-2 gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-5 w-5" }), "Informações Pessoais"]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4 text-muted-foreground" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: "Nome:"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: client.name || "—" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4 text-muted-foreground" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: "Email:"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: client.email || "—" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4 text-muted-foreground" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: "Telefone:"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: client.phone || "—" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hash, { className: "h-4 w-4 text-muted-foreground" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: "CPF:"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: client.cpf || "—" })
						]
					})
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-5 w-5" }), "Informações da Conta"]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4 text-muted-foreground" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: "Cadastro:"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: client.created_at ? format(new Date(client.created_at), "dd/MM/yyyy HH:mm", { locale: ptBR }) : "—" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4 text-muted-foreground" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: "Última atualização:"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: client.updated_at ? format(new Date(client.updated_at), "dd/MM/yyyy HH:mm", { locale: ptBR }) : "—" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							children: "ID"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted-foreground",
							children: client.id
						})]
					})
				]
			})] })]
		})]
	});
}
//#endregion
export { ViewClient as component };
