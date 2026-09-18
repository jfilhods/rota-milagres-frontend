import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { G as getPartnerAvaliacoes, Q as formatPrice, R as criarClienteAvaliacao, W as getFavoritoStatus, a as Route$7, at as getPartnerImage, f as useClienteAuth, pt as whatsappLink, q as toggleFavorito, ut as mapsLink, z as criarVoucherJangada } from "./router-BAnSfLYa.mjs";
import { B as Heart, D as MessageCircle, E as Mountain, F as LoaderCircle, H as Globe, J as Clock, L as Instagram, M as LogIn, a as User, d as Ticket, dt as ArrowLeft, i as Users, it as Calendar, k as MapPin, m as Star, n as Waves, o as UserPlus, t as X, w as Phone } from "../_libs/lucide-react.mjs";
import { t as AppHeader } from "./AppHeader-BPs7_08K.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/parceiro._slug-Bu2nBgvy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FavoritarButton({ partnerId, partnerName }) {
	const { isAuthenticated } = useClienteAuth();
	const navigate = useNavigate();
	const [isFavorito, setIsFavorito] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (!isAuthenticated) {
			setLoading(false);
			return;
		}
		getFavoritoStatus(partnerId).then((res) => setIsFavorito(res.isFavorito)).catch(() => setIsFavorito(false)).finally(() => setLoading(false));
	}, [partnerId, isAuthenticated]);
	const handleToggle = async () => {
		if (!isAuthenticated) {
			sessionStorage.setItem("redirect_after_login", window.location.pathname);
			sessionStorage.setItem("intended_action", JSON.stringify({
				partnerId,
				partnerName,
				actionType: "favoritar"
			}));
			navigate({
				to: "/cadastro-cliente",
				search: {
					message: void 0,
					partner: void 0
				}
			});
			return;
		}
		setLoading(true);
		try {
			const result = await toggleFavorito(partnerId);
			setIsFavorito(result.isFavorito);
		} catch (error) {
			console.error("Erro ao alternar favorito:", error);
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick: handleToggle,
		disabled: loading,
		className: `flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition ${isFavorito ? "border-red-300 bg-red-50 text-red-600 dark:bg-red-950/30" : "border-border hover:bg-muted"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: `size-5 ${isFavorito ? "fill-current" : ""}` }), isFavorito ? "Favoritado" : "Favoritar"]
	});
}
function PartnerAvaliacoesList({ partnerId, refreshTrigger = 0 }) {
	const [avaliacoes, setAvaliacoes] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const [media, setMedia] = (0, import_react.useState)(null);
	const loadAvaliacoes = async () => {
		setLoading(true);
		setError(null);
		try {
			const dados = (await getPartnerAvaliacoes(partnerId)).data || [];
			setAvaliacoes(dados);
			if (dados.length > 0) {
				const soma = dados.reduce((acc, curr) => acc + curr.nota, 0);
				setMedia(Number((soma / dados.length).toFixed(1)));
			} else setMedia(null);
		} catch (error) {
			console.error("Erro ao carregar avaliações:", error);
			setError("Não foi possível carregar as avaliações");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		loadAvaliacoes();
	}, [partnerId, refreshTrigger]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center py-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin text-muted-foreground" })
	});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-center py-8 text-red-500",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: error }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: loadAvaliacoes,
			className: "mt-2 text-primary hover:underline",
			children: "Tentar novamente"
		})]
	});
	if (avaliacoes.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-center py-8 text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Este parceiro ainda não possui avaliações." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm",
			children: "Seja o primeiro a avaliar!"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 p-3 bg-muted/30 rounded-lg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-3xl font-bold",
				children: media
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex",
				children: [
					1,
					2,
					3,
					4,
					5
				].map((star) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `size-5 ${star <= Math.round(media || 0) ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}` }, star))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-sm text-muted-foreground",
				children: [
					avaliacoes.length,
					" ",
					avaliacoes.length === 1 ? "avaliação" : "avaliações"
				]
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-4",
			children: avaliacoes.map((av) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b pb-4 last:border-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium",
							children: av.cliente?.nome || "Anônimo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex",
							children: [
								1,
								2,
								3,
								4,
								5
							].map((star) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `size-4 ${star <= av.nota ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}` }, star))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground",
						children: new Date(av.created_at).toLocaleDateString("pt-BR", {
							day: "2-digit",
							month: "long",
							year: "numeric"
						})
					})]
				}), av.comentario && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: av.comentario
				})]
			}, av.id))
		})]
	});
}
function AvaliacaoForm({ partnerId, onSuccess }) {
	const { isAuthenticated } = useClienteAuth();
	const navigate = useNavigate();
	const [nota, setNota] = (0, import_react.useState)(0);
	const [comentario, setComentario] = (0, import_react.useState)("");
	const [enviando, setEnviando] = (0, import_react.useState)(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!isAuthenticated) {
			sessionStorage.setItem("redirect_after_login", window.location.pathname);
			sessionStorage.setItem("intended_action", JSON.stringify({
				partnerId,
				actionType: "avaliacao"
			}));
			navigate({
				to: "/cadastro-cliente",
				search: {
					message: void 0,
					partner: void 0
				}
			});
			return;
		}
		if (nota === 0) {
			alert("Selecione uma nota");
			return;
		}
		setEnviando(true);
		try {
			await criarClienteAvaliacao(partnerId, nota, comentario.trim() || void 0);
			onSuccess();
			setNota(0);
			setComentario("");
		} catch (error) {
			console.error("Erro ao enviar avaliação:", error);
			alert("Erro ao enviar avaliação. Tente novamente.");
		} finally {
			setEnviando(false);
		}
	};
	if (!isAuthenticated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick: () => {
			sessionStorage.setItem("redirect_after_login", window.location.pathname);
			navigate({
				to: "/entrar",
				search: {
					message: void 0,
					partner: void 0
				}
			});
		},
		className: "text-sm text-primary hover:underline",
		children: "Faça login para avaliar"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: handleSubmit,
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "block text-sm font-medium",
				children: "Sua nota"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1 mt-1",
				children: [
					1,
					2,
					3,
					4,
					5
				].map((star) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setNota(star),
					className: "text-2xl text-amber-500 transition",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `size-6 ${star <= nota ? "fill-current" : ""}` })
				}, star))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: "comentario",
				className: "block text-sm font-medium",
				children: "Comentário (opcional)"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				id: "comentario",
				rows: 3,
				value: comentario,
				onChange: (e) => setComentario(e.target.value),
				className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary",
				placeholder: "Conte sua experiência..."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "submit",
				disabled: enviando || nota === 0,
				className: "flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition hover:opacity-90 disabled:opacity-50",
				children: [enviando ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-4" }), "Enviar avaliação"]
			})
		]
	});
}
function DashboardLink({ to, onClick, className, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		onClick,
		className,
		children
	});
}
function ClienteRequiredModal({ isOpen, onClose, partnerName, action }) {
	if (!isOpen) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 bg-black/50 backdrop-blur-sm",
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative max-w-md w-full rounded-2xl bg-card p-6 shadow-xl ring-1 ring-border",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: onClose,
				className: "absolute right-4 top-4 rounded-full p-1 hover:bg-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "size-8 text-primary" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 font-display text-2xl font-medium",
						children: "Cadastre-se para continuar"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-muted-foreground",
						children: [
							"Para entrar em contato com ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: partnerName }),
							" via ",
							action,
							", você precisa ter um cadastro no Rota Milagres."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-col gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DashboardLink, {
							to: "/cadastro-cliente",
							className: "flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90",
							onClick: onClose,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "size-4" }), "Criar cadastro gratuito"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DashboardLink, {
							to: "/entrar",
							className: "flex items-center justify-center gap-2 rounded-xl border border-border px-5 py-3 font-medium transition hover:bg-muted",
							onClick: onClose,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "size-4" }), "Já tenho cadastro"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-xs text-muted-foreground",
						children: "Ao cadastrar você poderá acompanhar seus contatos, favoritar parceiros e muito mais."
					})
				]
			})]
		})]
	});
}
function VoucherJangada({ partnerId, partnerName, onSuccess, onClose, tipo }) {
	const [quantidade, setQuantidade] = (0, import_react.useState)(1);
	const [dataPasseio, setDataPasseio] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [success, setSuccess] = (0, import_react.useState)(false);
	const { isAuthenticated } = useClienteAuth();
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("🔄 Iniciando reserva...");
		console.log("📋 Partner ID:", partnerId);
		console.log("📋 Tipo do Partner ID:", typeof partnerId);
		if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(partnerId)) {
			console.error("❌ Partner ID não é um UUID válido:", partnerId);
			setError("ID do parceiro inválido. Por favor, recarregue a página.");
			return;
		}
		if (!isAuthenticated) {
			console.log("🔒 Usuário não autenticado");
			setError("É necessário estar autenticado para reservar um passeio.");
			return;
		}
		setLoading(true);
		setError(null);
		try {
			console.log("📤 Enviando requisição para criar voucher...");
			console.log("📋 Dados enviados:", {
				partner_id: partnerId,
				quantidade_pessoas: quantidade,
				data_passeio: dataPasseio
			});
			const response = await criarVoucherJangada(partnerId, quantidade, dataPasseio);
			console.log("📥 Resposta:", response);
			if (response.success) {
				console.log("✅ Voucher criado com sucesso!");
				setSuccess(true);
				setTimeout(() => {
					onSuccess?.();
					onClose?.();
				}, 2e3);
			} else {
				console.error("❌ Erro ao criar voucher:", response.message);
				setError(response.message || "Erro ao criar voucher. Tente novamente.");
			}
		} catch (err) {
			console.error("❌ Erro na requisição:", err);
			if (err instanceof Error && err.message.includes("autenticado")) setError("É necessário estar autenticado para reservar um passeio.");
			else setError(err instanceof Error ? err.message : "Erro ao criar voucher");
		} finally {
			setLoading(false);
		}
	};
	const valorTotal = 25 * quantidade;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-md rounded-2xl bg-card p-6 shadow-2xl ring-1 ring-border",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "absolute right-4 top-4 rounded-full p-1.5 hover:bg-muted transition",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "size-6 text-primary" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-medium",
						children: "Reservar Passeio"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: partnerName
					})] })]
				}),
				success ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "py-8 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "size-8" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-medium",
							children: "Voucher criado com sucesso!"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Você será redirecionado em instantes."
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					className: "space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-sm font-medium",
							children: "Quantidade de pessoas"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setQuantidade(Math.max(1, quantidade - 1)),
									className: "flex h-10 w-10 items-center justify-center rounded-lg border border-border hover:bg-muted transition",
									children: "-"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-1 items-center justify-center gap-2 rounded-lg border border-border px-4 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-lg font-medium",
										children: quantidade
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setQuantidade(Math.min(10, quantidade + 1)),
									className: "flex h-10 w-10 items-center justify-center rounded-lg border border-border hover:bg-muted transition",
									children: "+"
								})
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-sm font-medium",
							children: "Data do passeio (opcional)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "date",
								value: dataPasseio,
								onChange: (e) => setDataPasseio(e.target.value),
								className: "w-full rounded-lg border border-border bg-background pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary",
								min: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
							})]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-muted/40 p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Valor por pessoa"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: "R$ 25,00"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Quantidade"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-medium",
										children: [
											quantidade,
											" pessoa",
											quantidade > 1 ? "s" : ""
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 border-t border-border pt-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-primary",
											children: ["R$ ", valorTotal.toFixed(2)]
										})]
									})
								})
							]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: loading,
							className: "w-full rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-50",
							children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center justify-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), "Criando voucher..."]
							}) : `Reservar por R$ ${valorTotal.toFixed(2)}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-center text-xs text-muted-foreground",
							children: "* Pagamento via PIX para confirmar a reserva"
						})
					]
				})
			]
		})
	});
}
function PartnerPage() {
	const { partner } = Route$7.useLoaderData();
	const { isAuthenticated } = useClienteAuth();
	const [active, setActive] = (0, import_react.useState)(0);
	const [showVoucherModal, setShowVoucherModal] = (0, import_react.useState)(false);
	const [showAuthModal, setShowAuthModal] = (0, import_react.useState)(false);
	const [reservaModal, setReservaModal] = (0, import_react.useState)({
		open: false,
		partnerId: "",
		partnerName: "",
		tipo: "jangada"
	});
	const categoryName = partner.category?.name || "Estabelecimento";
	const categorySlug = partner.category?.slug?.toLowerCase() || "";
	const contactPhone = partner.whatsapp || partner.phone;
	const partnerData = partner;
	const images = partner.images?.filter(Boolean).length ? partner.images.filter(Boolean) : [getPartnerImage(partner)];
	const mainImage = images[active] || images[0];
	const isJangada = categorySlug === "jangadas" || categorySlug === "jangada" || categorySlug.includes("jangada") || categoryName.toLowerCase().includes("jangada");
	const isQuadriciclo = categorySlug === "quadriculos" || categorySlug === "quadriculo";
	const isSpecialPasseio = isJangada || isQuadriciclo;
	const isBuggy = categorySlug === "buggy" || categorySlug === "buggies";
	const passeioNome = isQuadriciclo || isBuggy || isJangada ? isQuadriciclo ? "Passeio de quadriciclo" : isBuggy ? "Passeio de buggy" : "Passeio de jangada" : categoryName;
	const passeioExperiencia = isQuadriciclo ? "Passeio de quadriciclo" : "Piscinas naturais";
	const packages = partnerData.packages && partnerData.packages.length > 0 ? partnerData.packages : [
		{
			id: "pacote-1",
			name: "1 pessoa",
			people: 1,
			price: 100
		},
		{
			id: "pacote-2",
			name: "2 pessoas",
			people: 2,
			price: 190
		},
		{
			id: "pacote-3",
			name: "3 pessoas",
			people: 3,
			price: 280
		},
		{
			id: "pacote-4",
			name: "4 pessoas",
			people: 4,
			price: 380
		},
		{
			id: "pacote-5",
			name: "5 pessoas",
			people: 5,
			price: 450
		},
		{
			id: "pacote-6",
			name: "6 pessoas",
			people: 6,
			price: 550
		},
		{
			id: "pacote-7",
			name: "7 pessoas",
			people: 7,
			price: 640
		},
		{
			id: "pacote-8",
			name: "8 pessoas",
			people: 8,
			price: 730
		},
		{
			id: "pacote-9",
			name: "9 pessoas",
			people: 9,
			price: 800
		},
		{
			id: "pacote-10",
			name: "10 pessoas",
			people: 10,
			price: 900
		}
	];
	const descriptionTitle = partnerData.tourDescription?.title || (isQuadriciclo ? "Viva uma aventura de quadriciclo em São Miguel dos Milagres" : isJangada ? "Viva as piscinas naturais de São Miguel dos Milagres" : `Conheça ${partner.name}`);
	const descriptionText = partnerData.tourDescription?.text || partner.description || partner.short || `Conheça ${partner.name} e aproveite uma experiência especial em ${partner.city}.`;
	const toursList = partner.tours?.length ? partner.tours : [];
	const handleReserveClick = () => {
		if (isJangada || isQuadriciclo || isBuggy) {
			setReservaModal({
				open: true,
				partnerId: partner.id,
				partnerName: partner.name,
				tipo: isJangada ? "jangada" : isQuadriciclo ? "quadriciclo" : "buggy"
			});
			return;
		}
		const phone = partner.whatsapp || partner.phone;
		if (phone) {
			const cleaned = phone.replace(/\D/g, "");
			const message = encodeURIComponent(`Olá! Vi seu perfil na Rota Milagres e gostaria de mais informações sobre ${partner.name}.`);
			window.open(`https://wa.me/${cleaned}?text=${message}`, "_blank");
		} else alert("Este parceiro ainda não possui um número de WhatsApp disponível.");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "pb-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-6xl px-4 pt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap items-center gap-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/categorias",
							params: { slug: categorySlug },
							className: "inline-flex items-center gap-2 rounded-full border border-border bg-background/90 px-4 py-2 text-sm font-medium shadow-sm transition hover:border-primary/50 hover:bg-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }),
								"Voltar para ",
								categoryName
							]
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "mx-auto max-w-6xl px-4 pt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-6 lg:grid-cols-5 lg:items-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "lg:col-span-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "overflow-hidden rounded-2xl bg-muted shadow-sm ring-1 ring-border",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative aspect-[16/10] w-full",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: mainImage,
											alt: `${partner.name} — foto ${active + 1}`,
											className: "h-full w-full object-cover"
										}), images.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm",
											children: [
												active + 1,
												" / ",
												images.length
											]
										})]
									})
								}),
								images.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar",
									children: images.map((image, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setActive(index),
										"aria-label": `Ver foto ${index + 1}`,
										className: `size-16 shrink-0 overflow-hidden rounded-xl ring-2 transition-all ${active === index ? "ring-primary" : "ring-transparent opacity-70 hover:opacity-100"}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: image,
											alt: "",
											loading: "lazy",
											width: 128,
											height: 128,
											className: "size-full object-cover"
										})
									}, `${image}-${index}`))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary",
											children: [isJangada ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Waves, { className: "size-3.5" }) : isQuadriciclo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mountain, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5" }), isSpecialPasseio ? passeioNome : categoryName]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
											className: "font-display text-2xl font-semibold md:text-3xl",
											children: partner.name
										}),
										partner.rating > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-3 flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-sm font-semibold text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-4 fill-current" }), partner.rating.toFixed(1)]
											}), partner.reviewCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-sm text-muted-foreground",
												children: [partner.reviewCount, " avaliações"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 text-sm leading-relaxed text-muted-foreground",
											children: partner.short || partner.description || "Uma experiência especial em São Miguel dos Milagres."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoCard, {
													icon: MapPin,
													title: "Local",
													value: partner.city || "São Miguel dos Milagres"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoCard, {
													icon: Clock,
													title: "Horário",
													value: partner.hours_of_operation || "Consulte o parceiro"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoCard, {
													icon: isQuadriciclo ? Mountain : isJangada ? Waves : Users,
													title: isSpecialPasseio ? "Experiência" : "Atendimento",
													value: isSpecialPasseio ? passeioExperiencia : "Consulte disponibilidade"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoCard, {
													icon: Star,
													title: "Avaliação",
													value: partner.rating > 0 ? `${partner.rating.toFixed(1)} / 5` : "Ainda sem avaliações"
												})
											]
										})
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "lg:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sticky top-6 rounded-2xl border border-border bg-card p-5 shadow-sm",
								children: [
									partner.priceFrom != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-5 rounded-xl bg-muted/50 p-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: "A partir de"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 font-display text-2xl font-semibold text-primary",
											children: formatPrice(partner.priceFrom)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-display text-lg font-semibold",
										children: isSpecialPasseio ? "Escolha seu pacote" : "Entre em contato"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs leading-relaxed text-muted-foreground",
										children: isSpecialPasseio ? "Quanto maior o grupo, melhor o valor." : "Fale diretamente com o parceiro para consultar disponibilidade e condições."
									}),
									isSpecialPasseio && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-4 max-h-[390px] space-y-2 overflow-y-auto pr-1",
										children: packages.map((pkg) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => {
												setReservaModal({
													open: true,
													partnerId: partner.id,
													partnerName: partner.name,
													tipo: isQuadriciclo ? "quadriciclo" : "jangada"
												});
											},
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
									partner.whatsapp && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: whatsappLink(partner),
										target: "_blank",
										rel: "noreferrer",
										className: "mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-whatsapp px-4 py-3 font-medium text-whatsapp-foreground transition-opacity hover:opacity-90",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-5" }), categorySlug === "pousadas" || categorySlug === "chales" || categorySlug === "chalés" ? "Reservar pelo WhatsApp" : "Conversar no WhatsApp"]
									}),
									partner.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: `tel:${partner.phone.replace(/\D/g, "")}`,
										className: "mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 font-medium transition hover:bg-muted",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" }), partner.phone]
									}),
									partner.address && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: mapsLink(partner),
										target: "_blank",
										rel: "noreferrer",
										className: "mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-muted/40 px-4 py-3 font-medium transition hover:bg-muted",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4" }), "Ver localização"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-5 space-y-3 border-t border-border pt-5",
										children: [
											partner.instagram && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: `https://instagram.com/${partner.instagram.replace("@", "")}`,
												target: "_blank",
												rel: "noreferrer",
												className: "flex items-center gap-3 text-sm text-muted-foreground transition hover:text-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "truncate",
													children: ["@", partner.instagram.replace("@", "")]
												})]
											}),
											partner.website && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: partner.website.startsWith("http") ? partner.website : `https://${partner.website}`,
												target: "_blank",
												rel: "noreferrer",
												className: "flex items-center gap-3 text-sm text-muted-foreground transition hover:text-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "truncate",
													children: partner.website.replace(/^https?:\/\//, "")
												})]
											}),
											partner.address && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-start gap-3 text-sm text-muted-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mt-0.5 size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "leading-relaxed",
													children: partner.address
												})]
											}),
											partner.hours_of_operation && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-start gap-3 text-sm text-muted-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "mt-0.5 size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "leading-relaxed",
													children: partner.hours_of_operation
												})]
											})
										]
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
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-semibold uppercase tracking-wider text-primary",
									children: "Sobre o parceiro"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-2 font-display text-2xl font-medium md:text-3xl",
									children: descriptionTitle
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-base leading-7 text-muted-foreground",
									children: descriptionText
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 rounded-2xl border border-border bg-muted/40 p-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "size-5 text-primary" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-xl font-medium",
										children: "Informações"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mt-4 space-y-2 text-sm text-muted-foreground",
										children: partner.schedules?.length ? partner.schedules.map((schedule, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex items-start gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: schedule })]
										}, index)) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
											partner.address && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex items-start gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Localização: ", partner.address] })]
											}),
											partner.hours_of_operation && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex items-start gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
													"Horário:",
													" ",
													partner.hours_of_operation
												] })]
											}),
											partner.whatsapp && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex items-start gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Atendimento disponível pelo WhatsApp." })]
											}),
											isJangada && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex items-start gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Passeio sujeito à disponibilidade e condições da maré." })]
											}),
											isQuadriciclo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex items-start gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Consulte horários e condições diretamente na reserva." })]
											}),
											!partner.address && !partner.hours_of_operation && !partner.whatsapp && !isJangada && !isQuadriciclo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex items-start gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Entre em contato para obter informações sobre este parceiro." })]
											})
										] })
									})]
								})]
							})
						}),
						toursList.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl font-medium",
								children: "Passeios disponíveis"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-5 grid gap-4 sm:grid-cols-2",
								children: toursList.map((tour) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl border border-border bg-card p-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-medium",
											children: tour.name
										}),
										tour.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-sm text-muted-foreground",
											children: tour.description
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground",
											children: [tour.duration_minutes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5" }),
													Math.floor(tour.duration_minutes / 60),
													"h"
												]
											}), tour.max_capacity && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-3.5" }),
													tour.max_capacity,
													" pessoas"
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-4 flex items-center justify-between gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium text-primary",
												children: formatPrice(tour.price)
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: handleReserveClick,
												className: "flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "size-4" }), "Reservar"]
											})]
										})
									]
								}, tour.id || tour.name))
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "mx-auto max-w-6xl px-4 pt-12",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-border pt-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl font-medium",
								children: "Avaliações dos clientes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FavoritarButton, {
								partnerId: partner.id,
								partnerName: partner.name
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 grid gap-8 md:grid-cols-[1fr_400px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartnerAvaliacoesList, { partnerId: partner.id }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-border bg-muted/40 p-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-medium",
										children: "Deixe sua avaliação"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: "Sua opinião ajuda outros viajantes a escolherem."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvaliacaoForm, {
											partnerId: partner.id,
											onSuccess: () => {
												window.location.reload();
											}
										})
									})
								]
							})]
						})]
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReservationModal, {
			isOpen: reservaModal.open,
			onClose: () => setReservaModal({
				open: false,
				partnerId: "",
				partnerName: "",
				tipo: "jangada"
			}),
			partnerName: partner.name,
			whatsappNumber: contactPhone,
			tipo: reservaModal.tipo,
			packages
		}),
		showAuthModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClienteRequiredModal, {
			isOpen: showAuthModal,
			onClose: () => setShowAuthModal(false),
			partnerName: partner.name,
			action: "reservar um passeio"
		}),
		showVoucherModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoucherJangada, {
			partnerId: partner.id,
			partnerName: partner.name,
			tipo: isJangada ? "jangada" : isQuadriciclo ? "quadriciclo" : "buggy",
			onSuccess: () => setShowVoucherModal(false),
			onClose: () => setShowVoucherModal(false)
		})
	] });
}
function InfoCard({ icon: Icon, title, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-w-0 items-center gap-3 rounded-2xl border border-border bg-card p-3.5",
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
function ReservationModal({ isOpen, onClose, partnerName, whatsappNumber, tipo = "jangada", packages }) {
	const [name, setName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [selectedPackageId, setSelectedPackageId] = (0, import_react.useState)(packages[0]?.id || "");
	const selectedPackage = packages.find((item) => item.id === selectedPackageId) || packages[0];
	function handleSubmit(event) {
		event.preventDefault();
		if (!name.trim()) return;
		if (!phone.trim()) return;
		if (!selectedPackage) return;
		const whatsapp = whatsappNumber?.replace(/\D/g, "");
		const message = [
			`*Olá !* Quero fazer uma reserva de ${tipo === "quadriciclo" ? "passeio de quadriciclo" : "passeio de jangada"} pela *Rota Milagres*.`,
			"",
			`Parceiro: ${partnerName}`,
			`Nome: ${name.trim()}`,
			`Celular: ${phone.trim()}`,
			`Pacote: ${selectedPackage.name}`,
			`Pessoas: ${selectedPackage.people}`,
			`Valor: ${formatPrice(selectedPackage.price)}`,
			"",
			"*Gostaria de confirmar a disponibilidade.*"
		].join("\n");
		if (whatsapp) {
			const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
			window.open(url, "_blank");
			onClose();
			setName("");
			setPhone("");
			setSelectedPackageId(packages[0]?.id || "");
			return;
		}
		console.log("📋 Dados da reserva:", {
			partnerName,
			name: name.trim(),
			phone: phone.trim(),
			package: selectedPackage
		});
		alert("Reserva preenchida! O WhatsApp deste parceiro ainda não foi configurado.");
		onClose();
	}
	if (!isOpen) return null;
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
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Pacote escolhido"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 font-semibold",
										children: selectedPackage.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-0.5 text-xs text-muted-foreground",
										children: [
											selectedPackage.people,
											" ",
											selectedPackage.people === 1 ? "pessoa" : "pessoas"
										]
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
export { PartnerPage as component };
