import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as onboardPartner, C as getAdminData } from "./router-BAnSfLYa.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/create-_OswPYmg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CreatePartner() {
	const navigate = useNavigate();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [categories, setCategories] = (0, import_react.useState)([]);
	const [cities, setCities] = (0, import_react.useState)([]);
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		email: "",
		category_id: "",
		city_id: "",
		plan_type: "gratuito",
		send_invite: false,
		slug: "",
		short_description: "",
		description: "",
		price_from: 0,
		phone: "",
		whatsapp: "",
		instagram: "",
		website: "",
		hours_of_operation: "",
		address: "",
		latitude: 0,
		longitude: 0,
		featured: false,
		active: true
	});
	const toNumber = (v) => {
		if (v.trim() === "") return null;
		const n = Number(v.replace(",", "."));
		return Number.isFinite(n) ? n : null;
	};
	(0, import_react.useEffect)(() => {
		Promise.all([getAdminData("categories").catch(() => ({ data: [] })), getAdminData("cities").catch(() => ({ data: [] }))]).then(([catsRes, citiesRes]) => {
			setCategories(catsRes.data || []);
			setCities(citiesRes.data || []);
		});
	}, []);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!form.category_id || !form.city_id) {
			toast.error("Selecione categoria e cidade");
			return;
		}
		setLoading(true);
		try {
			const res = await onboardPartner(form);
			toast.success(res.data?.message || res.message || "Parceiro criado com sucesso!");
			navigate({ to: "/admin/partners" });
		} catch (error) {
			const message = error instanceof Error ? error.message : "Erro ao criar parceiro";
			toast.error(message);
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-3xl space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-bold tracking-tight",
			children: "Novo Parceiro"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children: "Cadastre um novo parceiro com todos os dados do perfil."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSubmit,
			className: "space-y-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-semibold",
							children: "Básico"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "name",
								children: "Nome do estabelecimento *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "name",
								required: true,
								value: form.name,
								onChange: (e) => setForm({
									...form,
									name: e.target.value
								}),
								placeholder: "Ex: Pousada Maré Alta"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "slug",
									children: "Slug (opcional)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "slug",
									value: form.slug || "",
									onChange: (e) => setForm({
										...form,
										slug: e.target.value
									}),
									placeholder: "pousada-mare-alta"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Deixe vazio para gerar automaticamente a partir do nome."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "owner_email",
								children: "E-mail do proprietário *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "owner_email",
								type: "email",
								required: true,
								value: form.email,
								onChange: (e) => setForm({
									...form,
									email: e.target.value
								}),
								placeholder: "dono@email.com"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Categoria *" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: form.category_id,
									onValueChange: (val) => setForm({
										...form,
										category_id: val
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecione" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: cat.id,
										children: cat.name
									}, cat.id)) })]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Cidade *" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: form.city_id,
									onValueChange: (val) => setForm({
										...form,
										city_id: val
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecione" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: cities.map((city) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: city.id,
										children: city.name
									}, city.id)) })]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Plano" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: form.plan_type,
								onValueChange: (val) => setForm({
									...form,
									plan_type: val
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "gratuito",
										children: "Gratuito"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "bronze",
										children: "Bronze"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "prata",
										children: "Prata"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "ouro",
										children: "Ouro"
									})
								] })]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-semibold",
							children: "Descrição"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "short_description",
								children: "Descrição curta"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "short_description",
								maxLength: 140,
								value: form.short_description || "",
								onChange: (e) => setForm({
									...form,
									short_description: e.target.value
								}),
								placeholder: "Ex: Pousada à beira-mar em Milagres"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "description",
								children: "Descrição completa"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								id: "description",
								className: "w-full rounded-md border border-border bg-background p-3 text-sm",
								rows: 5,
								value: form.description || "",
								onChange: (e) => setForm({
									...form,
									description: e.target.value
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "price_from",
								children: "Preço a partir de (R$)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "price_from",
								type: "number",
								min: 0,
								step: "0.01",
								value: form.price_from ?? "",
								onChange: (e) => setForm({
									...form,
									price_from: toNumber(e.target.value) || 0
								}),
								placeholder: "350.00"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-semibold",
							children: "Contato"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "phone",
									children: "Telefone"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "phone",
									value: form.phone || "",
									onChange: (e) => setForm({
										...form,
										phone: e.target.value
									})
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "whatsapp",
									children: "WhatsApp"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "whatsapp",
									value: form.whatsapp || "",
									onChange: (e) => setForm({
										...form,
										whatsapp: e.target.value
									}),
									placeholder: "5582999999999"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "instagram",
									children: "Instagram"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "instagram",
									value: form.instagram || "",
									onChange: (e) => setForm({
										...form,
										instagram: e.target.value
									}),
									placeholder: "@seunegocio"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "website",
									children: "Site"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "website",
									value: form.website || "",
									onChange: (e) => setForm({
										...form,
										website: e.target.value
									}),
									placeholder: "https://..."
								})]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-semibold",
							children: "Localização & horário"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "address",
								children: "Endereço"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "address",
								value: form.address || "",
								onChange: (e) => setForm({
									...form,
									address: e.target.value
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "latitude",
									children: "Latitude"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "latitude",
									type: "number",
									step: "any",
									value: form.latitude ?? "",
									onChange: (e) => setForm({
										...form,
										latitude: toNumber(e.target.value) || 0
									}),
									placeholder: "-9.05000000"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "longitude",
									children: "Longitude"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "longitude",
									type: "number",
									step: "any",
									value: form.longitude ?? "",
									onChange: (e) => setForm({
										...form,
										longitude: toNumber(e.target.value) || 0
									}),
									placeholder: "-35.23000000"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "hours_of_operation",
								children: "Horário de atendimento"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "hours_of_operation",
								value: form.hours_of_operation || "",
								onChange: (e) => setForm({
									...form,
									hours_of_operation: e.target.value
								}),
								placeholder: "Seg a Sáb, 08h às 18h"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-semibold",
						children: "Visibilidade"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: !!form.active,
									onChange: (e) => setForm({
										...form,
										active: e.target.checked
									})
								}), "Ativo no site"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: !!form.featured,
									onChange: (e) => setForm({
										...form,
										featured: e.target.checked
									})
								}), "Em destaque na home"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: !!form.send_invite,
									onChange: (e) => setForm({
										...form,
										send_invite: e.target.checked
									})
								}), "Enviar convite por e-mail"]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-3 pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: loading,
						children: loading ? "Criando..." : "Criar Parceiro"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						onClick: () => navigate({ to: "/admin/partners" }),
						children: "Cancelar"
					})]
				})
			]
		})]
	});
}
//#endregion
export { CreatePartner as component };
