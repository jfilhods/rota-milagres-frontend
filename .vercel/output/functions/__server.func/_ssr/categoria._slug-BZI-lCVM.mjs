import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Q as formatPrice, at as getPartnerImage, et as getCategoryBySlug, ft as syncCategoriesFromAPI, o as Route$23, st as getPartnersByCategoryAsync } from "./router-BAnSfLYa.mjs";
import { $ as ChevronRight, D as MessageCircle, E as Mountain, J as Clock, _ as ShoppingBag, d as Ticket, dt as ArrowLeft, i as Users, k as MapPin, lt as Bed, m as Star, n as Waves, r as Utensils, st as Briefcase, t as X } from "../_libs/lucide-react.mjs";
import { t as SiteHeader } from "./site-header-_VbCWHFa.mjs";
import { t as PartnerCard } from "./partner-card-CuDXww2z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/categoria._slug-BZI-lCVM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CategoryPage() {
	const { slug } = Route$23.useParams();
	const [category, setCategory] = (0, import_react.useState)(null);
	const [partners, setPartners] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		let mounted = true;
		async function load() {
			try {
				const [apiCategories, list] = await Promise.all([syncCategoriesFromAPI(), getPartnersByCategoryAsync(slug)]);
				const cat = apiCategories.find((c) => c.slug === slug) ?? getCategoryBySlug(slug);
				const filteredPartners = list.filter((partner) => {
					const catSlug = partner.category?.slug?.toLowerCase() ?? "";
					return catSlug !== "promocao" && catSlug !== "promoção" && catSlug !== "promocoes" && catSlug !== "promoções" && catSlug !== "ofertas";
				});
				if (mounted) {
					setCategory(cat);
					setPartners(filteredPartners);
					setLoading(false);
				}
			} catch (err) {
				console.error("❌ Erro ao carregar categoria:", err);
				if (mounted) {
					setCategory(getCategoryBySlug(slug));
					setPartners([]);
					setLoading(false);
				}
			}
		}
		load();
		return () => {
			mounted = false;
		};
	}, [slug]);
	const getCategoryIcon = (categorySlug) => {
		return {
			pousadas: Bed,
			chales: Bed,
			"chalés": Bed,
			hospedagem: Bed,
			hotel: Bed,
			jangadas: Waves,
			jangada: Waves,
			quadriciclos: Mountain,
			quadriciclo: Mountain,
			restaurantes: Utensils,
			"comida-e-bebida": Utensils,
			lojas: ShoppingBag,
			artesanato: ShoppingBag,
			passeios: Mountain,
			"guias-turisticos": Briefcase
		}[categorySlug] || Briefcase;
	};
	const CategoryIcon = category ? getCategoryIcon(slug) : Briefcase;
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "px-4 py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-7xl text-center text-muted-foreground",
			children: "Carregando..."
		})
	});
	if (!category) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "px-4 py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-medium",
				children: "Categoria não encontrada"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/categorias",
				className: "mt-4 inline-block text-primary hover:underline",
				children: "← Voltar para todas as categorias"
			})]
		})
	});
	const isPousadas = slug === "pousadas" || slug === "chales" || slug === "chalés" || slug === "hospedagem" || slug === "hotel";
	const isJangadas = slug === "jangadas" || slug === "jangada";
	const isQuadriciclos = slug === "quadriciclos" || slug === "quadriciclo";
	if (isJangadas) {
		const jangada = partners.find((partner) => partner.category?.slug === "jangadas");
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}), !jangada ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-4 py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-3xl text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Waves, { className: "mx-auto size-12 text-primary/60" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-5 font-display text-3xl font-medium",
						children: "Passeio de Jangada"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-muted-foreground",
						children: "Em breve teremos informações sobre o passeio de jangada."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/categorias",
						className: "mt-6 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition hover:border-primary/50 hover:bg-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Voltar para categorias"]
					})
				]
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JangadaPage, { jangada })] });
	}
	if (isQuadriciclos) {
		const quadriciclo = partners.find((partner) => partner.category?.slug === "quadriciclos" || partner.category?.slug === "quadriciclo");
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}), !quadriciclo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-4 py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-3xl text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mountain, { className: "mx-auto size-12 text-primary/60" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-5 font-display text-3xl font-medium",
						children: "Passeio de Quadriciclo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-muted-foreground",
						children: "Em breve teremos informações sobre o passeio de quadriciclo."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/categorias",
						className: "mt-6 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition hover:border-primary/50 hover:bg-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Voltar para categorias"]
					})
				]
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JangadaPage, {
			jangada: quadriciclo,
			tipo: "quadriciclo"
		})] });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "px-4 py-8 md:py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "flex items-center gap-2 text-sm text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/",
									className: "transition hover:text-foreground hover:underline",
									children: "Início"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3.5" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/categorias",
									className: "transition hover:text-foreground hover:underline",
									children: "Categorias"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3.5" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-foreground",
									children: category.name
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex items-start gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-2xl",
								children: category.emoji || /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryIcon, { className: "size-7 text-primary" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-2xl font-medium md:text-3xl",
								children: category.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: partners.length > 0 ? `${partners.length} ${partners.length === 1 ? "parceiro" : "parceiros"} disponíveis` : "Em breve novos parceiros"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/categorias",
							className: "mt-4 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition hover:border-primary/50 hover:bg-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Voltar para categorias"]
						})
					]
				}),
				isPousadas && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
					children: partners.map((partner) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/parceiro/$slug",
						params: { slug: partner.slug },
						className: "group overflow-hidden rounded-xl bg-card ring-1 ring-border transition hover:-translate-y-1 hover:ring-2 hover:ring-primary/50 hover:shadow-lg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative aspect-[4/3] overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: getPartnerImage(partner),
								alt: partner.name,
								className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",
								loading: "lazy"
							}), partner.priceFrom != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute bottom-2 right-2 rounded-full bg-background/95 px-2.5 py-1 text-xs font-semibold shadow-sm backdrop-blur",
								children: [
									"a partir de",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-primary",
										children: formatPrice(partner.priceFrom)
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "line-clamp-1 text-sm font-medium leading-tight",
										children: partner.name
									}), partner.rating > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex shrink-0 items-center gap-0.5 text-xs text-amber-500",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3 fill-current" }), partner.rating.toFixed(1)]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 flex items-center gap-1 text-xs text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3" }), partner.city]
								}),
								partner.short && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1.5 line-clamp-2 text-xs text-muted-foreground",
									children: partner.short
								})
							]
						})]
					}, partner.slug))
				}),
				!isPousadas && !isJangadas && !isQuadriciclos && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
					children: partners.length > 0 ? partners.map((partner) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "transition hover:-translate-y-1 hover:ring-2 hover:ring-primary/50",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartnerCard, { partner })
					}, partner.slug)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "col-span-full rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground",
						children: "Em breve parceiros nesta categoria."
					})
				})
			]
		})
	})] });
}
function JangadaPage({ jangada, tipo = "jangada" }) {
	const [showReservation, setShowReservation] = (0, import_react.useState)(false);
	const isQuadriculo = tipo === "quadriciclo";
	const passeioNome = isQuadriculo ? "Passeio de Quadriciclo" : "Passeio de Jangada";
	const passeioExperiencia = isQuadriculo ? "Passeio de quadriciclo" : "Piscinas naturais";
	const mainImage = (jangada.images?.filter(Boolean) || [])[0] || getPartnerImage(jangada);
	const packages = jangada.packages && jangada.packages.length > 0 ? jangada.packages : [{
		id: "jangada-1",
		name: "1 pessoa",
		people: 1,
		price: 100
	}, {
		id: "jangada-2",
		name: "2 pessoas",
		people: 2,
		price: 190
	}];
	const descriptionTitle = jangada.tourDescription?.title || (isQuadriculo ? "Viva uma aventura de quadriciclo em São Miguel dos Milagres" : "Viva as piscinas naturais de São Miguel dos Milagres");
	jangada.tourDescription?.text || jangada.description;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "pb-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-6xl px-4 pt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/categorias",
					className: "inline-flex items-center gap-2 rounded-full border border-border bg-background/90 px-4 py-2 text-sm font-medium shadow-sm transition hover:border-primary/50 hover:bg-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Voltar para categorias"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-6xl px-4 pt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-6 lg:grid-cols-5 lg:items-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-hidden rounded-2xl bg-muted shadow-sm ring-1 ring-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: mainImage,
								alt: jangada.name,
								className: "aspect-[16/10] w-full object-cover"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary",
									children: [isQuadriculo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mountain, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Waves, { className: "size-3.5" }), passeioNome]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "font-display text-2xl font-semibold md:text-3xl",
									children: jangada.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted-foreground",
									children: jangada.short || "Uma experiência inesquecível pelas piscinas naturais."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoCard, {
											icon: Clock,
											title: "Duração",
											value: "3h30 a 4h"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoCard, {
											icon: Users,
											title: "Capacidade",
											value: "Até 12 pessoas"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoCard, {
											icon: MapPin,
											title: "Local",
											value: jangada.city || "São Miguel dos Milagres"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoCard, {
											icon: isQuadriculo ? Mountain : Waves,
											title: "Experiência",
											value: passeioExperiencia
										})
									]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "sticky top-6 rounded-2xl border border-border bg-card p-5 shadow-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-lg font-semibold",
									children: "Escolha seu pacote"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: "Quanto maior o grupo, melhor o valor"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 max-h-[420px] space-y-2 overflow-y-auto pr-1",
									children: packages.map((pkg) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setShowReservation(true),
										className: "flex w-full items-center justify-between rounded-xl border border-border bg-background px-4 py-3 text-left transition hover:border-primary/50 hover:bg-muted/50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium",
											children: pkg.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-muted-foreground",
											children: [
												pkg.people,
												" ",
												pkg.people === 1 ? "pessoa" : "pessoas"
											]
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-display text-base font-semibold text-primary",
											children: formatPrice(pkg.price)
										})]
									}, pkg.id))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setShowReservation(true),
									className: "mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4" }), "Fazer reserva"]
								})
							]
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-6xl px-4 pt-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-3xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-semibold uppercase tracking-wider text-primary",
							children: "O passeio"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-2xl font-medium md:text-3xl",
							children: descriptionTitle
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 rounded-2xl border border-border bg-muted/40 p-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "size-5 text-primary" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-xl font-medium",
								children: "Informações e regras do passeio"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-4 space-y-2 text-sm text-muted-foreground",
								children: jangada.schedules?.length ? jangada.schedules.map((schedule, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" }), schedule]
								}, index)) : isQuadriculo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" }), "Saídas em grupo ou privativas, mediante agendamento prévio."]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" }), "Roteiro por praias, trilhas e mirantes da Rota Ecológica."]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" }), "Condutor habilitado incluso — não é necessário ter experiência."]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" }), "Idade mínima e capacidade variam conforme o veículo (consulte a reserva)."]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" }), "Uso obrigatório de capacete e cinto de segurança durante o trajeto."]
									})
								] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" }), "Saídas conforme a maré."]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" }), "Passeio pelas piscinas naturais."]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" }), "Consulte os horários disponíveis no momento da reserva."]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" }), "Capacidade máxima de 12 pessoas por jangada."]
									})
								] })
							})] })]
						})
					}),
					!isQuadriculo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xl font-medium",
							children: "Veja como é a experiência"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 overflow-hidden rounded-2xl bg-black",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("video", {
								controls: true,
								playsInline: true,
								preload: "metadata",
								poster: mainImage,
								className: "max-h-[480px] w-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
									src: "/videos/jangada.mp4",
									type: "video/mp4"
								}), "Seu navegador não suporta reprodução de vídeo."]
							})
						})]
					})
				]
			}),
			showReservation && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReservationModal, {
				jangada,
				packages,
				tipo,
				onClose: () => setShowReservation(false)
			})
		]
	});
}
function InfoCard({ icon: Icon, title, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3 rounded-2xl border border-border bg-card p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5 text-primary" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-0.5 truncate text-sm font-semibold",
				children: value
			})]
		})]
	});
}
function ReservationModal({ jangada, packages, tipo = "jangada", onClose }) {
	const [name, setName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [selectedPackageId, setSelectedPackageId] = (0, import_react.useState)(packages[0]?.id || "");
	const selectedPackage = packages.find((item) => item.id === selectedPackageId) || packages[0];
	function handleSubmit(event) {
		event.preventDefault();
		if (!name.trim()) return;
		if (!phone.trim()) return;
		if (!selectedPackage) return;
		const whatsapp = jangada.whatsapp?.replace(/\D/g, "");
		const message = [
			`*Olá !* Quero fazer uma reserva de *${tipo === "quadriciclo" ? "passeio de quadriciclo" : "passeio de jangada"}* pela Rota Milagres.`,
			`Nome: ${name.trim()}`,
			`Celular: ${phone.trim()}`,
			`Pacote: ${selectedPackage.name}`,
			`Pessoas: ${selectedPackage.people}`,
			`Valor: ${formatPrice(selectedPackage.price)}`,
			"Gostaria de confirmar a disponibilidade."
		].join("\n");
		if (whatsapp) {
			const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
			window.open(url, "_blank");
			onClose();
		} else {
			console.log("📋 Dados da reserva:", {
				name: name.trim(),
				phone: phone.trim(),
				package: selectedPackage
			});
			alert("Reserva preenchida! O WhatsApp do passeio ainda não foi configurado.");
			onClose();
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm",
		onMouseDown: (event) => {
			if (event.target === event.currentTarget) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "reservation-title",
			className: "relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-background p-6 shadow-2xl md:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					"aria-label": "Fechar",
					className: "absolute right-4 top-4 flex size-9 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pr-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-12 items-center justify-center rounded-2xl bg-primary/10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "size-6 text-primary" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "reservation-title",
							className: "mt-5 font-display text-2xl font-medium md:text-3xl",
							children: "Faça sua reserva"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-6 text-muted-foreground",
							children: "Preencha seus dados e escolha o pacote desejado."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					className: "mt-7 space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "reservation-name",
							className: "mb-2 block text-sm font-medium",
							children: "Nome"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "reservation-name",
							type: "text",
							value: name,
							onChange: (event) => setName(event.target.value),
							placeholder: "Seu nome",
							autoComplete: "name",
							required: true,
							className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "reservation-phone",
							className: "mb-2 block text-sm font-medium",
							children: "Número do celular"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "reservation-phone",
							type: "tel",
							value: phone,
							onChange: (event) => setPhone(event.target.value),
							placeholder: "(82) 99999-9999",
							autoComplete: "tel",
							required: true,
							className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "reservation-package",
							className: "mb-2 block text-sm font-medium",
							children: "Qual pacote você deseja?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							id: "reservation-package",
							value: selectedPackageId,
							onChange: (event) => setSelectedPackageId(event.target.value),
							className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10",
							children: packages.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: item.id,
								children: [
									item.name,
									" —",
									" ",
									formatPrice(item.price)
								]
							}, item.id))
						})] }),
						selectedPackage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-2xl bg-muted/60 p-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Pacote escolhido"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-semibold",
									children: selectedPackage.name
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Total"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 font-display text-xl font-semibold text-primary",
										children: formatPrice(selectedPackage.price)
									})]
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							className: "flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-5" }), "Enviar reserva"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-center text-xs leading-5 text-muted-foreground",
							children: "Ao enviar, você será direcionado para o WhatsApp para confirmar a disponibilidade do passeio."
						})
					]
				})
			]
		})
	});
}
//#endregion
export { CategoryPage as component };
