import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { m as Outlet, v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as useAuthContext } from "./router-HQ7TexWm.mjs";
import { I as LayoutDashboard, U as Gift, at as CalendarDays, j as LogOut, p as Store, s as UserCog } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route--M1_YPh7.js
var import_jsx_runtime = require_jsx_runtime();
function AdminLayout() {
	const { user, logout, isAdmin } = useAuthContext();
	useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-muted/30",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
			className: "fixed inset-y-0 left-0 z-30 w-64 border-r bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-full flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-16 items-center border-b px-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin",
							className: "flex items-center gap-2 font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Admin Rota Milagres" })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex-1 space-y-1 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/admin",
								className: "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
								activeOptions: { exact: true },
								activeProps: { className: "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium bg-primary text-primary-foreground" },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { className: "h-4 w-4" }), "Dashboard"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/admin/partners",
								className: "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
								activeProps: { className: "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium bg-primary text-primary-foreground" },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "h-4 w-4" }), "Parceiros"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/admin/clients",
								className: "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
								activeProps: { className: "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium bg-primary text-primary-foreground" },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCog, { className: "h-4 w-4" }), "Clientes"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/admin/promos",
								className: "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
								activeProps: { className: "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium bg-primary text-primary-foreground" },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "h-4 w-4" }), "Promoções"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/admin/events",
								className: "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
								activeProps: { className: "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium bg-primary text-primary-foreground" },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "h-4 w-4" }), "Eventos"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 px-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium truncate",
								children: user?.email
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Administrador"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							className: "w-full justify-start gap-2",
							onClick: () => logout(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), "Sair"]
						})]
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "pl-64",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			})
		})]
	});
}
//#endregion
export { AdminLayout as component };
