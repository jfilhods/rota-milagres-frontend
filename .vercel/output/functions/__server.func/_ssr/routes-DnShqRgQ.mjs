import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Y as DEMO_IMAGES, l as Route$41, nt as getCategoryImage } from "./router-HQ7TexWm.mjs";
import { F as LoaderCircle, g as Sparkles, ut as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as AppHeader } from "./AppHeader-BEEr3yfu.mjs";
import { t as Praia_de_Porto_da_Rua_Sao_Miguel_dos_Milagres_Alagoas_default } from "./Praia_de_Porto_da_Rua_Sao_Miguel_dos_Milagres_Alagoas-B8omsM1E.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DnShqRgQ.js
var import_jsx_runtime = require_jsx_runtime();
var cities = [
	"São Miguel dos Milagres",
	"Porto de Pedras",
	"Japaratinga",
	"Passo de Camaragibe"
];
function Index() {
	const { featuredPartners, categories, promos, events, tides, tidesUrl } = Route$41.useLoaderData();
	const highlightCategories = categories.filter((c) => c.imageUrl || getCategoryImage(c)).slice(0, 5);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-4 py-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-7xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative overflow-hidden rounded-3xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: Praia_de_Porto_da_Rua_Sao_Miguel_dos_Milagres_Alagoas_default,
						alt: "Piscinas naturais e praia de areia branca na Rota Ecológica de Alagoas",
						width: 1600,
						height: 900,
						className: "aspect-[4/3] w-full object-cover md:aspect-[21/9]"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent p-6 md:p-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "max-w-[20ch] font-display text-3xl font-medium leading-tight text-background md:text-5xl",
							children: "Tudo que a Rota tem a oferecer"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-[52ch] text-sm text-background/80 md:text-base",
							children: cities.join(" · ")
						})]
					})]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-4 py-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-8 flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-medium",
						children: "Explore por categoria"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/categorias",
						className: "flex items-center gap-1 text-sm font-medium text-primary hover:underline",
						children: ["Ver todas as categorias ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
					})]
				}), categories.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-center py-12",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-8 animate-spin text-muted-foreground" })
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6",
					children: [highlightCategories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/categoria/$slug",
						params: { slug: category.slug },
						className: "group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-3 overflow-hidden rounded-xl ring-1 ring-border zoom-media",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: getCategoryImage(category),
								alt: category.name,
								loading: "lazy",
								width: 640,
								height: 640,
								className: "aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm font-medium",
							children: [
								category.emoji,
								" ",
								category.name
							]
						})]
					}, category.slug)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/categorias",
						className: "group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-border bg-muted transition-colors group-hover:bg-secondary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xl font-medium",
								children: "+"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[10px] font-medium uppercase tracking-wider text-muted-foreground",
								children: [categories.length - highlightCategories.length, " categorias"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium",
							children: "Mais opções"
						})]
					})]
				})]
			})
		}),
		promos.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-accent/50 py-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-tide",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), " Ofertas da maré"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-4 overflow-x-auto pb-4 no-scrollbar",
					children: promos.map((promo) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/parceiro/$slug",
						params: { slug: promo.partnerSlug },
						className: "flex min-w-[280px] gap-4 rounded-xl bg-card p-4 ring-1 ring-border hover-lift transition-shadow hover:shadow-lg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: promo.imageUrl || DEMO_IMAGES.placeholder,
							alt: promo.title,
							loading: "lazy",
							width: 200,
							height: 200,
							className: "size-20 shrink-0 rounded-lg object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 flex-col justify-between",
							children: [
								promo.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold text-primary",
									children: promo.badge
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-medium",
									children: promo.title
								}),
								promo.detail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate text-xs text-muted-foreground",
									children: promo.detail
								})
							]
						})]
					}, promo.id))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-4 py-16 bg-muted/40",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-2 font-display text-3xl font-medium",
						children: "Informações úteis para sua visita"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-[56ch] text-muted-foreground",
						children: "Marés, eventos e dicas de preservação para aproveitar a Rota Ecológica com consciência."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-6 lg:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-card p-6 ring-1 ring-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-4 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-2xl",
										children: "🌊"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-xl font-medium",
										children: "Tábua de Marés"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-4 text-sm text-muted-foreground",
									children: "Melhores horários de maré baixa para as piscinas naturais."
								}),
								tides.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "Consulte os horários atualizados no link abaixo."
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-3 text-sm",
									children: tides.slice(0, 3).map((t, i) => {
										const d = /* @__PURE__ */ new Date(t.day + "T12:00:00");
										const label = i === 0 ? "Hoje" : i === 1 ? "Amanhã" : d.toLocaleDateString("pt-BR", {
											weekday: "short",
											day: "2-digit",
											month: "2-digit"
										});
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between border-b border-border pb-2 last:border-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium",
												children: label
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-right text-muted-foreground",
												children: [
													"Baixa ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
														className: "text-foreground",
														children: t.low_time
													}),
													t.low_height != null && ` · ${t.low_height} m`
												]
											})]
										}, t.day);
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: tidesUrl || "https://tabuademares.com/br/alagoas/sao-miguel-dos-milagres",
									target: "_blank",
									rel: "noopener noreferrer",
									className: "mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline",
									children: ["Ver tábua completa ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-card p-6 ring-1 ring-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-4 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-2xl",
										children: "📢"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-xl font-medium",
										children: "Avisos & Eventos"
									})]
								}),
								events.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "Nenhum evento programado no momento."
								}) : (() => {
									const featured = events[0];
									if (!featured) return null;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "overflow-hidden rounded-xl border border-border",
										children: [featured.image_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: featured.image_url,
											alt: featured.title,
											loading: "lazy",
											className: "aspect-[16/9] w-full object-cover"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex aspect-[16/9] w-full items-center justify-center bg-muted text-3xl text-muted-foreground",
											children: "📅"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2 p-3",
											children: [
												featured.priority === "high" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase text-primary",
													children: "Destaque"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-medium text-sm leading-tight",
													children: featured.title
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "line-clamp-3 text-xs leading-relaxed text-muted-foreground",
													children: featured.description
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-[11px] text-muted-foreground",
													children: [
														"Até",
														" ",
														new Date(featured.end_date).toLocaleDateString("pt-BR")
													]
												})
											]
										})]
									});
								})(),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/eventos",
									className: "mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline",
									children: ["Ver todos os eventos ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-card p-6 ring-1 ring-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-4 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-2xl",
										children: "🪸"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-xl font-medium",
										children: "Preservação da Rota"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
									className: "space-y-3 text-sm text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-primary",
												children: "•"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												"Faça parte da ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "APA Costa dos Corais" }),
												" — maior unidade de conservação marinha do Brasil."
											] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-primary",
												children: "•"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Só jangada a vela ou remo nas áreas de recife (proibido motor)." })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-primary",
												children: "•"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Não pise nos corais, não alimente peixes e use protetor reef-safe." })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-primary",
												children: "•"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Apoie o Santuário do Peixe-Boi e a economia local." })]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/preservacao",
									className: "mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline",
									children: ["Saiba como preservar ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
								})
							]
						})
					]
				})]
			})
		})
	] });
}
//#endregion
export { Index as component };
