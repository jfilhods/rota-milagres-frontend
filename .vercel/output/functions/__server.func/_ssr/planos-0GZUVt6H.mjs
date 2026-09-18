import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { tt as Check } from "../_libs/lucide-react.mjs";
import { t as SiteHeader } from "./site-header-_VbCWHFa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/planos-0GZUVt6H.js
var import_jsx_runtime = require_jsx_runtime();
var plans = [
	{
		name: "Gratuito",
		price: "R$ 0",
		period: "por 30 dias",
		features: [
			"Cadastro completo",
			"Divulgação básica",
			"Botão de WhatsApp",
			"1 foto de capa"
		]
	},
	{
		name: "Bronze",
		price: "R$ 39,90",
		period: "por mês",
		features: [
			"Página completa",
			"Até 10 fotos",
			"WhatsApp e telefone",
			"Localização no mapa"
		]
	},
	{
		name: "Prata",
		price: "R$ 69,90",
		period: "por mês",
		features: [
			"Tudo do Bronze",
			"Cardápio ou tabela de passeios",
			"Promoções e cupons",
			"Estatísticas de acesso"
		],
		highlight: true
	},
	{
		name: "Ouro",
		price: "R$ 99,90",
		period: "por mês",
		features: [
			"Tudo do Prata",
			"Destaque na página inicial",
			"Anúncios patrocinados",
			"Prioridade nas buscas"
		]
	}
];
function PlansPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "px-4 py-14",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-[56ch]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-semibold uppercase tracking-widest text-tide",
							children: "Seja um Parceiro"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 font-display text-3xl font-medium md:text-4xl",
							children: "Sua empresa na vitrine do turismo da Rota"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-muted-foreground",
							children: "Comece grátis por 30 dias. Depois escolha o plano que combina com o tamanho do seu negócio — sem fidelidade e com cancelamento quando quiser."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4",
					children: plans.map((plan) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `flex flex-col rounded-2xl p-6 ring-1 ${plan.highlight ? "bg-accent ring-tide" : "bg-card ring-border"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-semibold uppercase tracking-widest text-tide",
								children: plan.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-3 font-display text-3xl font-medium",
								children: plan.price
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: plan.period
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-6 flex-1 space-y-3 text-sm",
								children: plan.features.map((feature) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-4 shrink-0 text-tide" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: feature
									})]
								}, feature))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://wa.me/558291189998?text=Ol%C3%A1!%20Quero%20anunciar%20no%20Rota%20Milagres.",
								target: "_blank",
								rel: "noreferrer",
								className: `mt-6 rounded-xl py-3 text-center text-sm font-medium transition-transform hover:scale-[1.02] ${plan.highlight ? "bg-primary text-primary-foreground" : "bg-foreground text-background"}`,
								children: "Quero este plano"
							})
						]
					}, plan.name))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-10 text-sm text-muted-foreground",
					children: "Em breve: painel do parceiro com métricas de visualizações, cliques no WhatsApp e rotas abertas, além de reservas online com PIX e cartão."
				})
			]
		})
	})] });
}
//#endregion
export { PlansPage as component };
