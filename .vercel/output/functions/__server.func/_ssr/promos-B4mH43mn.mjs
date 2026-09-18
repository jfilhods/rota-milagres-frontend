import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { E as getAdminPromos, P as updateAdminPromo, T as getAdminPartners, g as createAdminPromo, m as cleanupExpiredPromos, y as deleteAdminPromo } from "./router-BAnSfLYa.mjs";
import { C as Plus, F as LoaderCircle, K as ExternalLink, T as Pencil, u as Trash2 } from "../_libs/lucide-react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-CwLzEEob.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/promos-B4mH43mn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EMPTY = {
	partner_id: "",
	title: "",
	detail: "",
	badge: "",
	image_url: "",
	active: true,
	starts_at: "",
	ends_at: ""
};
function AdminPromosPage() {
	const [promos, setPromos] = (0, import_react.useState)([]);
	const [partners, setPartners] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [cleaning, setCleaning] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(EMPTY);
	const activePartners = partners.filter((p) => p.active);
	async function reload() {
		setLoading(true);
		try {
			const [promosRes, partnersRes] = await Promise.all([getAdminPromos(), getAdminPartners()]);
			setPromos(promosRes.data || []);
			setPartners(partnersRes.data || []);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Erro ao carregar");
			setPromos([]);
		} finally {
			setLoading(false);
		}
	}
	(0, import_react.useEffect)(() => {
		reload();
	}, []);
	function openNew() {
		setEditingId(null);
		setForm(EMPTY);
		setOpen(true);
	}
	function openEdit(promo) {
		setEditingId(promo.id);
		setForm({
			partner_id: promo.partner_id,
			title: promo.title,
			detail: promo.detail ?? "",
			badge: promo.badge ?? "",
			image_url: promo.image_url ?? "",
			active: promo.active,
			starts_at: promo.starts_at ? promo.starts_at.slice(0, 10) : "",
			ends_at: promo.ends_at ? promo.ends_at.slice(0, 10) : ""
		});
		setOpen(true);
	}
	async function handleSubmit(e) {
		e.preventDefault();
		if (!form.partner_id || !form.title.trim()) {
			toast.error("Selecione um parceiro e informe um título");
			return;
		}
		setSaving(true);
		try {
			const payload = {
				partner_id: form.partner_id,
				title: form.title.trim(),
				detail: form.detail?.trim() || null,
				badge: form.badge?.trim() || null,
				image_url: form.image_url?.trim() || null,
				active: form.active ?? true,
				starts_at: form.starts_at ? new Date(form.starts_at).toISOString() : null,
				ends_at: form.ends_at ? new Date(form.ends_at).toISOString() : null
			};
			if (editingId) {
				await updateAdminPromo(editingId, payload);
				toast.success("Promoção atualizada!");
			} else {
				await createAdminPromo(payload);
				toast.success("Promoção criada!");
			}
			setOpen(false);
			await reload();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Erro ao salvar");
		} finally {
			setSaving(false);
		}
	}
	async function handleDelete(promo) {
		if (!confirm(`Excluir a promoção "${promo.title}"?`)) return;
		try {
			await deleteAdminPromo(promo.id);
			toast.success("Promoção excluída");
			await reload();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Erro ao excluir");
		}
	}
	async function handleCleanup() {
		if (!confirm("Remover todas as promoções já expiradas?")) return;
		setCleaning(true);
		try {
			const res = await cleanupExpiredPromos();
			toast.success(res.data?.message ?? "Limpeza concluída");
			await reload();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Erro ao limpar");
		} finally {
			setCleaning(false);
		}
	}
	function daysUntil(dateStr) {
		if (!dateStr) return null;
		const diff = new Date(dateStr).getTime() - Date.now();
		return Math.ceil(diff / 864e5);
	}
	async function toggleActive(promo) {
		try {
			await updateAdminPromo(promo.id, { active: !promo.active });
			await reload();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Erro ao atualizar");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-bold tracking-tight",
						children: "Promoções"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: "Crie pacotes com parceiros e destaque na home do site."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						onClick: handleCleanup,
						disabled: cleaning,
						children: [cleaning ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-2 size-4" }), "Limpar expiradas"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: openNew,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 size-4" }), "Nova promoção"]
					})
				]
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-center py-16 text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 size-5 animate-spin" }), " Carregando..."]
			}) : promos.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground",
				children: "Nenhuma promoção cadastrada ainda."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
				children: promos.map((promo) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "overflow-hidden rounded-2xl border border-border bg-card",
					children: [promo.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: promo.image_url,
						alt: promo.title,
						className: "aspect-[16/9] w-full object-cover",
						loading: "lazy"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [promo.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold text-primary",
									children: promo.badge
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-medium leading-tight",
									children: promo.title
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${promo.active ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400" : "bg-muted text-muted-foreground"}`,
									children: promo.active ? "Ativa" : "Inativa"
								})]
							}),
							promo.detail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "line-clamp-2 text-sm text-muted-foreground",
								children: promo.detail
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3" }), promo.partners?.name || "Parceiro não vinculado"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2 pt-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "outline",
										onClick: () => openEdit(promo),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "mr-1 size-3.5" }), " Editar"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "outline",
										onClick: () => toggleActive(promo),
										children: promo.active ? "Desativar" : "Ativar"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "outline",
										onClick: () => handleDelete(promo),
										className: "ml-auto text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/30",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
									})
								]
							})
						]
					})]
				}, promo.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-lg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editingId ? "Editar promoção" : "Nova promoção" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Essa promoção aparecerá na home do site quando estiver ativa." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSubmit,
						className: "space-y-4 py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Parceiro *" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: form.partner_id,
									onValueChange: (val) => setForm({
										...form,
										partner_id: val
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecione o parceiro" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: activePartners.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "px-3 py-2 text-sm text-muted-foreground",
										children: "Nenhum parceiro ativo no momento."
									}) : activePartners.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: p.id,
										children: p.name
									}, p.id)) })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "title",
									children: "Título *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "title",
									value: form.title,
									onChange: (e) => setForm({
										...form,
										title: e.target.value
									}),
									placeholder: "Ex: Pacote Romântico",
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "detail",
									children: "Descrição"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "detail",
									value: form.detail ?? "",
									onChange: (e) => setForm({
										...form,
										detail: e.target.value
									}),
									placeholder: "Ex: 2 diárias com café da manhã e jantar"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "badge",
											children: "Selo / Badge"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "badge",
											value: form.badge ?? "",
											onChange: (e) => setForm({
												...form,
												badge: e.target.value
											}),
											placeholder: "Ex: 25% OFF"
										})]
									}),
									(() => {
										const d = daysUntil(promos.find((p) => p.id === editingId)?.ends_at ?? null);
										if (d === null) return null;
										if (d < 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs font-medium text-red-600",
											children: [
												"Expirada há ",
												Math.abs(d),
												" dia(s)"
											]
										});
										if (d <= 3) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs font-medium text-amber-600",
											children: [
												"Expira em ",
												d,
												" dia(s)"
											]
										});
										return null;
									})(),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "image_url",
											children: "URL da imagem"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "image_url",
											value: form.image_url ?? "",
											onChange: (e) => setForm({
												...form,
												image_url: e.target.value
											}),
											placeholder: "https://..."
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "starts_at",
										children: "Início"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "starts_at",
										type: "date",
										value: form.starts_at ?? "",
										onChange: (e) => setForm({
											...form,
											starts_at: e.target.value
										})
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "ends_at",
										children: "Fim"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "ends_at",
										type: "date",
										value: form.ends_at ?? "",
										onChange: (e) => setForm({
											...form,
											ends_at: e.target.value
										})
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: form.active ?? true,
									onChange: (e) => setForm({
										...form,
										active: e.target.checked
									})
								}), "Deixar ativa imediatamente"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
								className: "gap-2 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									onClick: () => setOpen(false),
									disabled: saving,
									children: "Cancelar"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									disabled: saving,
									children: saving ? "Salvando..." : editingId ? "Salvar" : "Criar"
								})]
							})
						]
					})]
				})
			})
		]
	});
}
//#endregion
export { AdminPromosPage as component };
