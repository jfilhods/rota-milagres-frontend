import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as useClienteAuth, u as useAuth } from "./router-BAnSfLYa.mjs";
import { $ as ChevronRight, O as Menu, W as Eye, Y as Circle, a as User, j as LogOut, o as UserPlus, p as Store, t as X, tt as Check, v as Shield, x as Search } from "../_libs/lucide-react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { a as Label2, c as Root2, d as SubTrigger2, f as Trigger, i as ItemIndicator2, l as Separator2, n as Content2, o as Portal2, r as Item2, s as RadioItem2, t as CheckboxItem2, u as SubContent2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppHeader-BPs7_08K.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
var DropdownMenuSubTrigger = import_react.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SubTrigger2, {
	ref,
	className: cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-auto" })]
}));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
var DropdownMenuSubContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubContent2, {
	ref,
	className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}));
DropdownMenuSubContent.displayName = SubContent2.displayName;
var DropdownMenuContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}) }));
DropdownMenuContent.displayName = Content2.displayName;
var DropdownMenuItem = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0", inset && "pl-8", className),
	...props
}));
DropdownMenuItem.displayName = Item2.displayName;
var DropdownMenuCheckboxItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CheckboxItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), children]
}));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
var DropdownMenuRadioItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-2 w-2 fill-current" }) })
	}), children]
}));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
var DropdownMenuLabel = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label2, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
	...props
}));
DropdownMenuLabel.displayName = Label2.displayName;
var DropdownMenuSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
DropdownMenuSeparator.displayName = Separator2.displayName;
var DropdownMenuShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("ml-auto text-xs tracking-widest opacity-60", className),
		...props
	});
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
var navLinks = [{
	to: "/categorias",
	label: "Categorias"
}, {
	to: "/buscar",
	label: "Buscar"
}];
function AppHeader() {
	const navigate = useNavigate();
	const [term, setTerm] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const { isAuthenticated, isAdmin, isPartner, userName, logout, user } = useAuth();
	const { cliente, isAuthenticated: isClienteAuthenticated, logout: logoutCliente } = useClienteAuth();
	const isCliente = isClienteAuthenticated && !!cliente;
	(0, import_react.useEffect)(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 10);
		};
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const expiredMessage = sessionStorage.getItem("session_expired_message");
		if (expiredMessage) {
			toast.warning(expiredMessage, {
				duration: 5e3,
				position: "top-center"
			});
			sessionStorage.removeItem("session_expired_message");
		}
	}, []);
	function submit(event) {
		event.preventDefault();
		navigate({
			to: "/buscar",
			search: { q: term || void 0 }
		});
		setOpen(false);
	}
	function handleLogout() {
		sessionStorage.setItem("session_expired_message", "Sessão encerrada");
		if (isCliente) logoutCliente();
		else logout();
		navigate({ to: "/" });
	}
	const getDashboardLink = () => {
		if (isAdmin) return "/admin";
		if (isPartner) return "/painel";
		if (isCliente) return "/clientes";
		return "/";
	};
	const getBadgeColor = () => {
		if (isAdmin) return "bg-purple-500/10 text-purple-600 border-purple-200 dark:bg-purple-500/20 dark:text-purple-400 dark:border-purple-500/30";
		if (isPartner) return "bg-blue-500/10 text-blue-600 border-blue-200 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30";
		if (isCliente) return "bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30";
		return "";
	};
	const getBadgeText = () => {
		if (isAdmin) return "Admin";
		if (isPartner) return "Parceiro";
		if (isCliente) return "Cliente";
		return "";
	};
	const dashboardLink = getDashboardLink();
	if (isAuthenticated || isCliente) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: `sticky top-0 z-50 transition-all duration-200 ${scrolled ? "border-b border-border/70 bg-background/95 backdrop-blur-md shadow-sm" : "bg-background/90 backdrop-blur-md"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl items-center justify-between px-4 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/rota-milagres-logo.png",
						alt: "Rota Milagres",
						className: "h-14 w-auto"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "hidden items-center gap-2 rounded-full bg-muted px-4 py-2 ring-1 ring-border md:flex md:w-80",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: term,
						onChange: (e) => setTerm(e.target.value),
						maxLength: 80,
						placeholder: "Buscar pousadas ou passeios...",
						"aria-label": "Buscar parceiros",
						className: "w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `hidden rounded-full border px-2 py-0.5 text-xs font-medium sm:inline-block ${getBadgeColor()}`,
							children: getBadgeText()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline",
								children: "Ver site"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								className: "flex items-center gap-2 pl-2 pr-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary",
									children: (isCliente ? cliente?.nome : user?.nome)?.[0]?.toUpperCase() || (isCliente ? cliente?.email : user?.email)?.[0]?.toUpperCase() || "U"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden text-sm font-medium md:inline-block",
									children: isCliente ? cliente?.nome?.split(" ")[0] || "Conta" : user?.nome?.split(" ")[0] || "Conta"
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
							align: "end",
							className: "w-56",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, {
									className: "font-normal",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium leading-none",
											children: isCliente ? cliente?.nome || "Cliente" : user?.nome || "Usuário"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs leading-none text-muted-foreground",
											children: isCliente ? cliente?.email || "" : user?.email || ""
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: dashboardLink,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "mr-2 h-4 w-4" }), "Meu perfil"]
									})
								}),
								isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/admin",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "mr-2 h-4 w-4" }), "Administração"]
									})
								}),
								isPartner && user && user.partner?.slug && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/parceiro/$slug",
										params: { slug: user.partner.slug },
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "mr-2 h-4 w-4" }), "Meu negócio"]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
									className: "text-red-600 focus:text-red-600",
									onClick: handleLogout,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "mr-2 h-4 w-4" }), "Sair"]
								})
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setOpen((v) => !v),
							"aria-label": "Abrir menu",
							className: "rounded-full p-2 text-foreground transition-colors hover:bg-muted lg:hidden",
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
						})
					]
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-t border-border bg-background px-4 py-4 lg:hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "mb-4 flex items-center gap-2 rounded-full bg-muted px-4 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: term,
					onChange: (e) => setTerm(e.target.value),
					maxLength: 80,
					placeholder: "O que você procura?",
					"aria-label": "Buscar parceiros",
					className: "w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						onClick: () => setOpen(false),
						className: "py-2 text-sm font-medium text-foreground",
						children: "Ver site"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: dashboardLink,
						onClick: () => setOpen(false),
						className: "py-2 text-sm font-medium text-primary",
						children: "Meu perfil"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							handleLogout();
							setOpen(false);
						},
						className: "py-2 text-left text-sm font-medium text-red-600",
						children: "Sair"
					})
				]
			})]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl items-center justify-between px-4 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/rota-milagres-logo.png",
					alt: "Rota Milagres",
					className: "h-14 w-auto"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "hidden items-center gap-2 rounded-full bg-muted px-4 py-2 ring-1 ring-border md:flex md:w-80",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: term,
						onChange: (e) => setTerm(e.target.value),
						maxLength: 80,
						placeholder: "Buscar pousadas ou passeios...",
						"aria-label": "Buscar parceiros",
						className: "w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "hidden items-center gap-1 lg:flex",
							children: navLinks.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: link.to,
								className: "rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
								activeProps: { className: "text-foreground" },
								children: link.label
							}, link.to))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/cadastro-cliente",
							search: {
								message: "cadastro",
								partner: ""
							},
							className: "flex items-center gap-1 rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-[1.02] hover:bg-emerald-700",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline",
								children: "Cadastre-se"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/entrar",
							className: "rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform hover:scale-[1.02]",
							children: "Entrar"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setOpen((v) => !v),
							"aria-label": "Abrir menu",
							className: "rounded-full p-2 text-foreground transition-colors hover:bg-muted lg:hidden",
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
						})
					]
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-t border-border bg-background px-4 py-4 lg:hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "mb-4 flex items-center gap-2 rounded-full bg-muted px-4 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: term,
					onChange: (e) => setTerm(e.target.value),
					maxLength: 80,
					placeholder: "O que você procura?",
					"aria-label": "Buscar parceiros",
					className: "w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex flex-col gap-2",
				children: [
					navLinks.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: link.to,
						onClick: () => setOpen(false),
						className: "py-2 text-sm font-medium text-foreground",
						children: link.label
					}, link.to)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "my-2 border-border" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/cadastro-cliente",
						search: {
							message: "cadastro",
							partner: ""
						},
						onClick: () => setOpen(false),
						className: "py-2 text-sm font-medium text-emerald-600",
						children: "Cadastre-se"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/entrar",
						onClick: () => setOpen(false),
						className: "py-2 text-sm font-medium text-foreground",
						children: "Entrar"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/planos",
						onClick: () => setOpen(false),
						className: "py-2 text-sm font-medium text-muted-foreground",
						children: "Seja um Parceiro"
					})
				]
			})]
		})]
	});
}
//#endregion
export { AppHeader as t };
