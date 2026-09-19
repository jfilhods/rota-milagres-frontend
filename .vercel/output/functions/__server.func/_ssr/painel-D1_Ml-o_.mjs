import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { m as Outlet, v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as useAuth } from "./router-HQ7TexWm.mjs";
import { J as Clock, K as ExternalLink, O as Menu, U as Gift, at as CalendarDays, ct as Bell, j as LogOut, m as Star, nt as ChartColumn, ot as Building2, rt as Camera, t as X, y as Settings, z as House } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/painel-D1_Ml-o_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Sidebar({ user, open = true, onClose, onLogout }) {
	const menuItems = [
		{
			label: "Visão geral",
			to: "/painel",
			icon: House,
			exact: true
		},
		{
			label: "Meu negócio",
			to: "/painel/perfil",
			icon: Building2
		},
		{
			label: "Imagens",
			to: "/painel/imagens",
			icon: Camera
		},
		{
			label: "Promoções",
			to: "/painel/promocoes",
			icon: Gift
		},
		{
			label: "Horários",
			to: "/painel/horarios",
			icon: Clock
		},
		{
			label: "Reservas",
			to: "/painel/reservas",
			icon: CalendarDays
		},
		{
			label: "Avaliações",
			to: "/painel/avaliacoes",
			icon: Star
		},
		{
			label: "Estatísticas",
			to: "/painel/estatisticas",
			icon: ChartColumn
		}
	];
	const bottomItems = [{
		label: "Configurações",
		to: "/painel/configuracoes",
		icon: Settings
	}];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [open && onClose && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-40 bg-black/40 lg:hidden",
		onClick: onClose
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: `
          fixed inset-y-0 left-0 z-50
          flex w-72 flex-col
          border-r border-border bg-card
          transition-transform duration-300
          lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-20 items-center justify-between border-b border-border px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/painel",
					className: "flex items-center gap-3",
					onClick: onClose,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg font-semibold",
						children: "Rota Milagres"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Painel do parceiro"
					})] })]
				}), onClose && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					className: "rounded-lg p-2 hover:bg-muted lg:hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex-1 overflow-y-auto p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
						children: "Gestão"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-1",
						children: menuItems.map((item) => {
							const Icon = item.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								...item.exact && { activeOptions: { exact: true } },
								activeProps: { className: "bg-primary text-primary-foreground shadow-sm" },
								inactiveProps: { className: "text-muted-foreground hover:bg-muted hover:text-foreground" },
								className: "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
								onClick: onClose,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label })]
							}, item.to);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-3 mt-8 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
						children: "Conta"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-1",
						children: bottomItems.map((item) => {
							const Icon = item.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								activeProps: { className: "bg-primary text-primary-foreground" },
								inactiveProps: { className: "text-muted-foreground hover:bg-muted hover:text-foreground" },
								className: "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
								onClick: onClose,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" }), item.label]
							}, item.to);
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-border p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: onLogout,
					className: "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-5" }), "Sair"]
				})
			})
		]
	})] });
}
function Header({ user, onMenuClick }) {
	const partnerName = user?.partner?.name || "Meu negócio";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-30 flex h-20 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur md:px-6 lg:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onMenuClick,
				className: "rounded-xl p-2 hover:bg-muted lg:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-6" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Painel do parceiro"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "hidden text-sm text-muted-foreground sm:block",
				children: partnerName
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground sm:flex",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-4" }), "Ver site"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "relative rounded-xl p-2.5 text-muted-foreground hover:bg-muted hover:text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute right-2 top-2 size-2 rounded-full bg-primary" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "ml-2 flex size-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary",
					children: partnerName.charAt(0).toUpperCase()
				})
			]
		})]
	});
}
function PanelLayout() {
	const { user, loading, logout } = useAuth();
	const navigate = useNavigate();
	const [sidebarOpen, setSidebarOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!loading && !user) navigate({ to: "/entrar" });
	}, [
		user,
		loading,
		navigate
	]);
	if (loading || !user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center text-muted-foreground",
		children: "Carregando..."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {
			user,
			open: sidebarOpen,
			onClose: () => setSidebarOpen(false),
			onLogout: () => void logout()
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col lg:pl-72",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
				user,
				onMenuClick: () => setSidebarOpen(true),
				onLogout: () => void logout()
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 p-4 md:p-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			})]
		})]
	});
}
//#endregion
export { PanelLayout as component };
