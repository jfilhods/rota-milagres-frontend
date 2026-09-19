import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { Q as formatPrice } from "./router-HQ7TexWm.mjs";
import { F as LoaderCircle, t as X, tt as Check } from "../_libs/lucide-react.mjs";
import { n as listReservations, o as updateReservationStatus } from "./partner-api-DTcfnYts.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reservas-BqOWevpa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUS_LABEL = {
	pending: "Pendente",
	confirmed: "Confirmada",
	cancelled: "Cancelada",
	done: "Concluída"
};
var STATUS_CLASS = {
	pending: "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400",
	confirmed: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400",
	cancelled: "bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-400",
	done: "bg-muted text-muted-foreground"
};
function ReservasPage() {
	const [items, setItems] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	async function reload() {
		setLoading(true);
		try {
			setItems(await listReservations());
		} catch {
			setItems([]);
		} finally {
			setLoading(false);
		}
	}
	(0, import_react.useEffect)(() => {
		reload();
	}, []);
	async function change(id, status) {
		try {
			await updateReservationStatus(id, status);
			await reload();
		} catch (err) {
			alert(err instanceof Error ? err.message : "Erro ao atualizar.");
		}
	}
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-center py-16 text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 size-5 animate-spin" }), "Carregando reservas..."]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-2xl font-semibold md:text-3xl",
			children: "Reservas"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Acompanhe e gerencie os pedidos de reserva dos seus clientes."
		})] }), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground",
			children: "Nenhuma reserva recebida ainda."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden rounded-2xl border border-border bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "border-b border-border bg-muted/40 text-left text-xs uppercase text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3",
							children: "Cliente"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3",
							children: "Contato"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3",
							children: "Pacote"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3",
							children: "Valor"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3",
							children: "Status"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-right",
							children: "Ações"
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: items.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border last:border-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 font-medium",
							children: r.customerName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-muted-foreground",
							children: r.customerPhone
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "px-4 py-3 text-muted-foreground",
							children: [r.packageName ?? "—", r.people ? ` · ${r.people}p` : ""]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							children: r.price != null ? formatPrice(r.price) : "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_CLASS[r.status]}`,
								children: STATUS_LABEL[r.status]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-end gap-1",
								children: [r.status === "pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => change(r.id, "confirmed"),
									className: "rounded-lg p-2 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30",
									title: "Confirmar",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => change(r.id, "cancelled"),
									className: "rounded-lg p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30",
									title: "Cancelar",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
								})] }), r.status === "confirmed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => change(r.id, "done"),
									className: "rounded-lg px-3 py-1.5 text-xs font-medium hover:bg-muted",
									children: "Marcar como concluída"
								})]
							})
						})
					]
				}, r.id)) })]
			})
		})]
	});
}
//#endregion
export { ReservasPage as component };
