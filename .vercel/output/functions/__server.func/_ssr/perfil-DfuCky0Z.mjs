import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { F as LoaderCircle, S as Save } from "../_libs/lucide-react.mjs";
import { a as updateMyPartner } from "./partner-api-DTcfnYts.mjs";
import { t as usePartner } from "./use-partner-o36-CqkP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/perfil-DfuCky0Z.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PerfilPage() {
	const partner = usePartner();
	const [form, setForm] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [saved, setSaved] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!partner) return;
		setForm({
			name: partner.name ?? "",
			short: partner.short ?? "",
			description: partner.description ?? "",
			city: partner.city ?? "",
			address: partner.address ?? "",
			phone: partner.phone ?? "",
			whatsapp: partner.whatsapp ?? "",
			instagram: partner.instagram ?? "",
			website: partner.website ?? "",
			hours_of_operation: partner.hours_of_operation ?? "",
			priceFrom: partner.priceFrom != null ? String(partner.priceFrom) : ""
		});
	}, [partner]);
	if (!form) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground",
		children: "Carregando dados do parceiro..."
	});
	const set = (k, v) => setForm((f) => f ? {
		...f,
		[k]: v
	} : f);
	async function handleSubmit(e) {
		e.preventDefault();
		if (!form) return;
		setSaving(true);
		setSaved(false);
		try {
			const payload = {
				name: form.name,
				short: form.short,
				description: form.description || null,
				city: form.city,
				address: form.address || null,
				phone: form.phone,
				whatsapp: form.whatsapp,
				instagram: form.instagram || null,
				website: form.website || null,
				hours_of_operation: form.hours_of_operation || null,
				priceFrom: form.priceFrom ? Number(form.priceFrom) : null
			};
			await updateMyPartner(payload);
			setSaved(true);
			setTimeout(() => setSaved(false), 3e3);
		} catch (err) {
			alert(err instanceof Error ? err.message : "Erro ao salvar.");
		} finally {
			setSaving(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: handleSubmit,
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold md:text-3xl",
				children: "Meu negócio"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Esses dados aparecem no seu perfil público da Rota Milagres."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				title: "Informações principais",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Nome do negócio",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "input",
							value: form.name,
							onChange: (e) => set("name", e.target.value),
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Descrição curta",
						hint: "Até 120 caracteres",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "input",
							maxLength: 120,
							value: form.short,
							onChange: (e) => set("short", e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Descrição completa",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							className: "input min-h-[120px]",
							value: form.description,
							onChange: (e) => set("description", e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Cidade",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "input",
								value: form.city,
								onChange: (e) => set("city", e.target.value)
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Endereço",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "input",
								value: form.address,
								onChange: (e) => set("address", e.target.value)
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Preço a partir de (R$)",
						hint: "Opcional",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							min: 0,
							step: "0.01",
							className: "input",
							value: form.priceFrom,
							onChange: (e) => set("priceFrom", e.target.value)
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				title: "Contato",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "WhatsApp",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "input",
								value: form.whatsapp,
								onChange: (e) => set("whatsapp", e.target.value),
								placeholder: "(82) 99999-9999"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Telefone",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "input",
								value: form.phone,
								onChange: (e) => set("phone", e.target.value)
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Instagram",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "input",
								value: form.instagram,
								onChange: (e) => set("instagram", e.target.value),
								placeholder: "@seunegocio"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Site",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "input",
								value: form.website,
								onChange: (e) => set("website", e.target.value),
								placeholder: "https://..."
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Horário de atendimento",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "input",
							value: form.hours_of_operation,
							onChange: (e) => set("hours_of_operation", e.target.value),
							placeholder: "Seg a Sáb, 08h às 18h"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "submit",
					disabled: saving,
					className: "flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50",
					children: [saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-4" }), "Salvar alterações"]
				}), saved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm text-emerald-600",
					children: "Salvo com sucesso!"
				})]
			})
		]
	});
}
function Section({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl border border-border bg-card p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-5 font-display text-lg font-semibold",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-4",
			children
		})]
	});
}
function Field({ label, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "mb-1.5 flex items-center justify-between text-sm font-medium",
			children: [label, hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs font-normal text-muted-foreground",
				children: hint
			})]
		}), children]
	});
}
//#endregion
export { PerfilPage as component };
