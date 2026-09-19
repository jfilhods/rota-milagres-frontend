import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as getAdminData, F as updateAdminSubscription, N as updateAdminPartner, T as getAdminPartners, j as resetPartnerPasswordByPartnerId, n as Route } from "./router-HQ7TexWm.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-CwLzEEob.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/edit-Du_dj5gp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function toNumber(v) {
	if (v.trim() === "") return null;
	const n = Number(v.replace(",", "."));
	return Number.isFinite(n) ? n : null;
}
function pickFirst(value) {
	if (Array.isArray(value)) return value[0] ?? null;
	return value ?? null;
}
var EMPTY_FORM = {
	name: "",
	slug: "",
	email: "",
	category_id: "",
	city_id: "",
	plan_type: "gratuito",
	short_description: "",
	description: "",
	price_from: "",
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
};
function EditPartner() {
	const { id } = Route.useParams();
	const navigate = useNavigate();
	const [fetching, setFetching] = (0, import_react.useState)(true);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)(EMPTY_FORM);
	const [categories, setCategories] = (0, import_react.useState)([]);
	const [cities, setCities] = (0, import_react.useState)([]);
	const [showPasswordModal, setShowPasswordModal] = (0, import_react.useState)(false);
	const [newPassword, setNewPassword] = (0, import_react.useState)("");
	const [confirmPassword, setConfirmPassword] = (0, import_react.useState)("");
	const [resetting, setResetting] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const load = async () => {
			try {
				setFetching(true);
				const [catsRes, citiesRes] = await Promise.all([getAdminData("categories").catch(() => ({ data: [] })), getAdminData("cities").catch(() => ({ data: [] }))]);
				setCategories(catsRes.data || []);
				setCities(citiesRes.data || []);
				const found = ((await getAdminPartners()).data || []).find((p) => p.id === id);
				if (!found) {
					toast.error("Parceiro não encontrado");
					navigate({ to: "/admin/partners" });
					return;
				}
				const p = found;
				const sub = pickFirst(p.subscriptions);
				const categoryObj = pickFirst(p.categories);
				const cityObj = pickFirst(p.cities);
				setForm({
					name: p.name ?? "",
					slug: p.slug ?? "",
					email: p.email ?? p.owner_email ?? "",
					category_id: p.category_id ?? categoryObj?.id ?? "",
					city_id: p.city_id ?? cityObj?.id ?? "",
					plan_type: sub?.plan_type ?? "gratuito",
					short_description: p.short_description ?? "",
					description: p.description ?? "",
					price_from: p.price_from != null ? String(p.price_from) : "",
					phone: p.phone ?? "",
					whatsapp: p.whatsapp ?? "",
					instagram: p.instagram ?? "",
					website: p.website ?? "",
					hours_of_operation: p.hours_of_operation ?? "",
					address: p.address ?? "",
					latitude: p.latitude != null ? p.latitude : 0,
					longitude: p.longitude != null ? p.longitude : 0,
					featured: !!p.featured,
					active: p.active ?? true
				});
			} catch {
				toast.error("Erro ao carregar parceiro");
			} finally {
				setFetching(false);
			}
		};
		if (id) load();
	}, [id, navigate]);
	const set = (k, v) => setForm((f) => ({
		...f,
		[k]: v
	}));
	const handleSubmit = async (e) => {
		e.preventDefault();
		setSaving(true);
		try {
			const payload = {
				name: form.name || void 0,
				slug: form.slug || void 0,
				category_id: form.category_id || void 0,
				city_id: form.city_id || void 0,
				short_description: form.short_description || null,
				description: form.description || null,
				price_from: form.price_from === "" ? null : toNumber(form.price_from),
				phone: form.phone || null,
				whatsapp: form.whatsapp || null,
				instagram: form.instagram || null,
				website: form.website || null,
				hours_of_operation: form.hours_of_operation || null,
				address: form.address || null,
				latitude: form.latitude === 0 ? null : form.latitude,
				longitude: form.longitude === 0 ? null : form.longitude,
				featured: form.featured,
				active: form.active
			};
			await updateAdminPartner(id, payload);
			try {
				await updateAdminSubscription(id, { plan_type: form.plan_type });
			} catch {}
			toast.success("Parceiro atualizado!");
			navigate({ to: "/admin/partners" });
		} catch (error) {
			const msg = error instanceof Error ? error.message : "Erro ao atualizar";
			toast.error(msg);
		} finally {
			setSaving(false);
		}
	};
	const handleResetPassword = async () => {
		if (!newPassword || newPassword.length < 8) {
			toast.error("Senha deve ter no mínimo 8 caracteres");
			return;
		}
		if (newPassword !== confirmPassword) {
			toast.error("As senhas não conferem");
			return;
		}
		setResetting(true);
		try {
			await resetPartnerPasswordByPartnerId(id, newPassword);
			toast.success("Senha alterada com sucesso!");
			setShowPasswordModal(false);
			setNewPassword("");
			setConfirmPassword("");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Erro ao alterar senha");
		} finally {
			setResetting(false);
		}
	};
	if (fetching) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "py-12 text-center text-muted-foreground",
		children: "Carregando parceiro..."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-3xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold tracking-tight",
				children: "Editar Parceiro"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-muted-foreground",
				children: ["Atualize as informações de ", form.name || "parceiro"]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
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
									onChange: (e) => set("name", e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "slug",
										children: "Slug"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "slug",
										value: form.slug,
										onChange: (e) => set("slug", e.target.value),
										placeholder: "pousada-mare-alta"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Deixe vazio e o slug será gerado automaticamente a partir do nome."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "email",
										children: "E-mail do proprietário"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "email",
										value: form.email,
										readOnly: true,
										className: "bg-muted/50"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "O e-mail não pode ser alterado aqui (é o login do parceiro)."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Categoria *" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: form.category_id,
										onValueChange: (val) => set("category_id", val),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecione" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: cat.id,
											children: cat.name
										}, cat.id)) })]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Cidade *" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: form.city_id,
										onValueChange: (val) => set("city_id", val),
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
									onValueChange: (val) => set("plan_type", val),
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
									value: form.short_description,
									onChange: (e) => set("short_description", e.target.value)
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
									value: form.description,
									onChange: (e) => set("description", e.target.value)
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
									value: form.price_from,
									onChange: (e) => set("price_from", e.target.value),
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
										value: form.phone,
										onChange: (e) => set("phone", e.target.value)
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "whatsapp",
										children: "WhatsApp"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "whatsapp",
										value: form.whatsapp,
										onChange: (e) => set("whatsapp", e.target.value)
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
										value: form.instagram,
										onChange: (e) => set("instagram", e.target.value)
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "website",
										children: "Site"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "website",
										value: form.website,
										onChange: (e) => set("website", e.target.value)
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
									value: form.address,
									onChange: (e) => set("address", e.target.value)
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
										value: form.latitude,
										onChange: (e) => set("latitude", e.target.value === "" ? 0 : parseFloat(e.target.value))
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
										value: form.longitude,
										onChange: (e) => set("longitude", e.target.value === "" ? 0 : parseFloat(e.target.value))
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
									value: form.hours_of_operation,
									onChange: (e) => set("hours_of_operation", e.target.value),
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
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: form.active,
									onChange: (e) => set("active", e.target.checked)
								}), "Ativo no site"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: form.featured,
									onChange: (e) => set("featured", e.target.checked)
								}), "Em destaque na home"]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-3 pt-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								disabled: saving,
								children: saving ? "Salvando..." : "Salvar alterações"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								onClick: () => navigate({ to: "/admin/partners" }),
								children: "Cancelar"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								onClick: () => setShowPasswordModal(true),
								children: "Resetar senha"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: showPasswordModal,
				onOpenChange: setShowPasswordModal,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Resetar senha do parceiro" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
							"Defina uma nova senha para ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: form.name }),
							". O parceiro poderá alterá-la depois pelo painel."
						] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "new-password",
									children: "Nova senha"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "new-password",
									type: "password",
									value: newPassword,
									onChange: (e) => setNewPassword(e.target.value),
									placeholder: "Mínimo 8 caracteres",
									autoComplete: "new-password"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "confirm-password",
									children: "Confirmar senha"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "confirm-password",
									type: "password",
									value: confirmPassword,
									onChange: (e) => setConfirmPassword(e.target.value),
									placeholder: "Repita a senha",
									autoComplete: "new-password"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								onClick: () => {
									setShowPasswordModal(false);
									setNewPassword("");
									setConfirmPassword("");
								},
								disabled: resetting,
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								onClick: handleResetPassword,
								disabled: resetting,
								children: resetting ? "Alterando..." : "Confirmar"
							})]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { EditPartner as component };
