import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { x as fetchPublicEvents } from "./router-HQ7TexWm.mjs";
import { F as LoaderCircle, at as CalendarDays, dt as ArrowLeft, ut as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as AppHeader } from "./AppHeader-BEEr3yfu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/eventos-CR8qkjpA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EventosPage() {
	const [events, setEvents] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		fetchPublicEvents().then(setEvents).catch(() => setEvents([])).finally(() => setLoading(false));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "pb-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-6xl px-4 pt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "inline-flex items-center gap-2 rounded-full border border-border bg-background/90 px-4 py-2 text-sm font-medium shadow-sm transition hover:border-primary/50 hover:bg-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Voltar para a home"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-6xl px-4 pt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-2xl",
						children: "📢"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl font-medium md:text-4xl",
						children: "Avisos & Eventos"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-[60ch] text-muted-foreground",
						children: "Programação cultural, festivais gastronômicos, ações ambientais e avisos úteis para aproveitar a Rota Ecológica."
					})] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-6xl px-4 pt-10",
				children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-center py-20 text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 size-5 animate-spin" }), "Carregando eventos..."]
				}) : events.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-2xl border border-dashed border-border py-20 text-center text-muted-foreground",
					children: "Nenhum evento programado no momento. Volte em breve!"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-6 md:grid-cols-2",
					children: events.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventCard, { event }, event.id))
				})
			})
		]
	})] });
}
function EventCard({ event }) {
	const isHigh = event.priority === "high";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: `overflow-hidden rounded-2xl border bg-card transition hover:shadow-lg ${isHigh ? "border-primary/40" : "border-border"}`,
		children: [event.image_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: event.image_url,
			alt: event.title,
			loading: "lazy",
			className: "aspect-[16/9] w-full object-cover"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex aspect-[16/9] w-full items-center justify-center bg-muted text-4xl text-muted-foreground",
			children: "📅"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3 p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-start justify-between gap-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [isHigh && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary",
							children: "Destaque"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 font-display text-lg font-medium leading-tight",
							children: event.title
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "whitespace-pre-line text-sm leading-relaxed text-muted-foreground",
					children: event.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-3.5" }), formatDateRange(event.start_date, event.end_date)]
				}),
				event.link && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: event.link,
					target: "_blank",
					rel: "noopener noreferrer",
					className: "inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline",
					children: ["Saiba mais ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
				})
			]
		})]
	});
}
function formatDateRange(startIso, endIso) {
	const start = new Date(startIso);
	const end = new Date(endIso);
	if (start.getFullYear() === end.getFullYear() && start.getMonth() === end.getMonth() && start.getDate() === end.getDate()) return start.toLocaleDateString("pt-BR", {
		day: "2-digit",
		month: "long",
		year: "numeric"
	});
	return `${start.toLocaleDateString("pt-BR", {
		day: "2-digit",
		month: "short"
	})} → ${end.toLocaleDateString("pt-BR", {
		day: "2-digit",
		month: "short",
		year: "numeric"
	})}`;
}
//#endregion
export { EventosPage as component };
