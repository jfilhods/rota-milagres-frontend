import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { M as updateAdminEvent, _ as deleteAdminEvent, h as createAdminEvent, w as getAdminEvents } from "./router-BAnSfLYa.mjs";
import { C as Plus, F as LoaderCircle, T as Pencil, at as CalendarDays, l as TriangleAlert, u as Trash2 } from "../_libs/lucide-react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-CwLzEEob.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/events-DNVhNPGX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EMPTY_FORM = {
	title: "",
	description: "",
	start_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
	end_date: "",
	image_url: "",
	link: "",
	priority: "normal",
	active: true
};
function AdminEventsPage() {
	const [events, setEvents] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(EMPTY_FORM);
	async function reload() {
		setLoading(true);
		try {
			const res = await getAdminEvents();
			setEvents(res.data ?? []);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Erro ao carregar eventos");
			setEvents([]);
		} finally {
			setLoading(false);
		}
	}
	(0, import_react.useEffect)(() => {
		reload();
	}, []);
	function openNew() {
		setEditingId(null);
		setForm({
			...EMPTY_FORM,
			start_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
		});
		setOpen(true);
	}
	function openEdit(event) {
		setEditingId(event.id);
		setForm({
			title: event.title,
			description: event.description,
			start_date: event.start_date ? event.start_date.slice(0, 10) : "",
			end_date: event.end_date ? event.end_date.slice(0, 10) : "",
			image_url: event.image_url ?? "",
			link: event.link ?? "",
			priority: event.priority,
			active: event.active
		});
		setOpen(true);
	}
	async function handleSubmit(e) {
		e.preventDefault();
		if (!form.title.trim()) {
			toast.error("Informe um título");
			return;
		}
		if (!form.description.trim()) {
			toast.error("Informe uma descrição");
			return;
		}
		if (!form.end_date) {
			toast.error("Informe a data final (o anúncio expira automaticamente)");
			return;
		}
		setSaving(true);
		try {
			const payload = {
				title: form.title.trim(),
				description: form.description.trim(),
				start_date: form.start_date ? (/* @__PURE__ */ new Date(form.start_date + "T00:00:00")).toISOString() : (/* @__PURE__ */ new Date()).toISOString(),
				end_date: (/* @__PURE__ */ new Date(form.end_date + "T23:59:59")).toISOString(),
				image_url: form.image_url.trim() || null,
				link: form.link.trim() || null,
				priority: form.priority,
				active: form.active
			};
			if (editingId) {
				await updateAdminEvent(editingId, payload);
				toast.success("Evento atualizado!");
			} else {
				await createAdminEvent(payload);
				toast.success("Evento criado!");
			}
			setOpen(false);
			await reload();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Erro ao salvar");
		} finally {
			setSaving(false);
		}
	}
	async function handleDelete(event) {
		if (!confirm(`Excluir o aviso "${event.title}"?`)) return;
		try {
			await deleteAdminEvent(event.id);
			toast.success("Aviso excluído");
			await reload();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Erro ao excluir");
		}
	}
	async function toggleActive(event) {
		try {
			await updateAdminEvent(event.id, { active: !event.active });
			await reload();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Erro ao atualizar");
		}
	}
	function statusOf(event) {
		const now = Date.now();
		const end = new Date(event.end_date).getTime();
		const start = new Date(event.start_date).getTime();
		if (!event.active) return {
			label: "Inativo",
			className: "bg-muted text-muted-foreground"
		};
		if (end < now) return {
			label: "Expirado",
			className: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400"
		};
		if (start > now) return {
			label: "Agendado",
			className: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
		};
		return {
			label: "No ar",
			className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
		};
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold tracking-tight",
					children: "Avisos & Eventos"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: "Anúncios que aparecem na seção \"Informações úteis\" da home. Expiração automática pela data final."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: openNew,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 size-4" }), "Novo evento"]
				})]
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-center py-16 text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 size-5 animate-spin" }), " Carregando..."]
			}) : events.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground",
				children: "Nenhum aviso cadastrado ainda."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
				children: events.map((event) => {
					const st = statusOf(event);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col overflow-hidden rounded-2xl border border-border bg-card",
						children: [event.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: event.image_url,
							alt: event.title,
							className: "aspect-[16/9] w-full object-cover",
							loading: "lazy"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-1 flex-col gap-3 p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [event.priority === "high" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase text-primary",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-3" }), "Destaque"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-1 font-medium leading-tight",
											children: event.title
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${st.className}`,
										children: st.label
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "line-clamp-3 text-sm text-muted-foreground",
									children: event.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 text-xs text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-3" }),
										new Date(event.start_date).toLocaleDateString("pt-BR"),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" }),
										new Date(event.end_date).toLocaleDateString("pt-BR")
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-auto flex gap-2 pt-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											size: "sm",
											variant: "outline",
											onClick: () => openEdit(event),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "mr-1 size-3.5" }), " Editar"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											variant: "outline",
											onClick: () => toggleActive(event),
											children: event.active ? "Desativar" : "Ativar"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											variant: "outline",
											onClick: () => handleDelete(event),
											className: "ml-auto text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/30",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
										})
									]
								})
							]
						})]
					}, event.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-lg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editingId ? "Editar evento" : "Novo evento" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "O anúncio aparece na home enquanto estiver ativo e dentro do período definido." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSubmit,
						className: "space-y-4 py-2",
						children: [
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
									placeholder: "Ex: Festival do Peixe-Boi",
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "description",
									children: "Descrição *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									id: "description",
									className: "w-full rounded-md border border-border bg-background p-3 text-sm",
									rows: 4,
									value: form.description,
									onChange: (e) => setForm({
										...form,
										description: e.target.value
									}),
									placeholder: "Conte o que vai acontecer, onde, quando...",
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "start_date",
										children: "Início"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "start_date",
										type: "date",
										value: form.start_date,
										onChange: (e) => setForm({
											...form,
											start_date: e.target.value
										})
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "end_date",
											children: "Fim *"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "end_date",
											type: "date",
											value: form.end_date,
											onChange: (e) => setForm({
												...form,
												end_date: e.target.value
											}),
											required: true
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-muted-foreground",
											children: "O anúncio expira sozinho após essa data."
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "image_url",
									children: "URL da imagem"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "image_url",
									value: form.image_url,
									onChange: (e) => setForm({
										...form,
										image_url: e.target.value
									}),
									placeholder: "https://..."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "link",
									children: "Link (opcional)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "link",
									value: form.link,
									onChange: (e) => setForm({
										...form,
										link: e.target.value
									}),
									placeholder: "https://..."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Prioridade" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex items-center gap-2 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "radio",
											name: "priority",
											value: "normal",
											checked: form.priority === "normal",
											onChange: () => setForm({
												...form,
												priority: "normal"
											})
										}), "Normal"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex items-center gap-2 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "radio",
											name: "priority",
											value: "high",
											checked: form.priority === "high",
											onChange: () => setForm({
												...form,
												priority: "high"
											})
										}), "Destaque"]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: form.active,
									onChange: (e) => setForm({
										...form,
										active: e.target.checked
									})
								}), "Deixar ativo imediatamente"]
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
export { AdminEventsPage as component };
