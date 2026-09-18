import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as getAdminPartners, v as deleteAdminPartner } from "./router-BAnSfLYa.mjs";
import { n as CardContent, t as Card } from "./card-BfBj_YIE.mjs";
import { C as Plus, T as Pencil, u as Trash2 } from "../_libs/lucide-react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/partners-CjauerQV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PartnersList() {
	const [partners, setPartners] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const loadPartners = async () => {
		try {
			setLoading(true);
			const res = await getAdminPartners();
			setPartners(res.data || []);
		} catch {
			toast.error("Erro ao carregar parceiros");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		loadPartners();
	}, []);
	const handleDelete = async (id) => {
		if (!confirm("Tem certeza que deseja excluir este parceiro?")) return;
		try {
			await deleteAdminPartner(id);
			toast.success("Parceiro excluído");
			loadPartners();
		} catch {
			toast.error("Erro ao excluir parceiro");
		}
	};
	const getPlan = (partner) => {
		if (!partner.subscriptions) return "N/A";
		if (Array.isArray(partner.subscriptions)) return partner.subscriptions[0]?.plan_type ?? "N/A";
		return partner.subscriptions.plan_type ?? "N/A";
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "py-12 text-center text-muted-foreground",
		children: "Carregando parceiros..."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold tracking-tight",
				children: "Parceiros"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "Gerencie os parceiros do marketplace"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/admin/partners/create",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), "Novo Parceiro"] })
			})]
		}), partners.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "py-12 text-center text-muted-foreground",
			children: "Nenhum parceiro cadastrado ainda."
		}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4",
			children: partners.map((partner) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex items-center justify-between p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold",
							children: partner.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground",
							children: ["Slug: ", partner.slug]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-4 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"Status:",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: partner.active ? "text-green-600" : "text-red-600",
									children: partner.active ? "Ativo" : "Inativo"
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Plano: ", getPlan(partner)] })]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin/partners/$id/edit",
						params: { "id": partner.id },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "mr-1 h-3.5 w-3.5" }), "Editar"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "destructive",
						size: "sm",
						onClick: () => handleDelete(partner.id),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-1 h-3.5 w-3.5" }), "Excluir"]
					})]
				})]
			}) }, partner.id))
		})]
	});
}
//#endregion
export { PartnersList as component };
