// routes/planos.tsx
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { useAuth } from "@/hooks/use-auth";

type PlanId = "gratuito" | "bronze" | "prata" | "ouro";

interface Plan {
  id: PlanId;
  name: string;
  price: string;
  period: string;
  features: string[];
  highlight?: boolean;
  cta: string;
}

const plans: Plan[] = [
  {
    id: "gratuito",
    name: "Gratuito",
    price: "R$ 0",
    period: "por 30 dias",
    features: [
      "Cadastro completo",
      "Divulgação básica",
      "Botão de WhatsApp",
      "1 foto de capa",
    ],
    cta: "Começar grátis",
  },
  {
    id: "bronze",
    name: "Bronze",
    price: "R$ 39,90",
    period: "por mês",
    features: [
      "Página completa",
      "Até 10 fotos",
      "WhatsApp e telefone",
      "Localização no mapa",
    ],
    cta: "Assinar Bronze",
  },
  {
    id: "prata",
    name: "Prata",
    price: "R$ 69,90",
    period: "por mês",
    features: [
      "Tudo do Bronze",
      "Cardápio ou tabela de passeios",
      "Promoções e cupons",
      "Estatísticas de acesso",
    ],
    highlight: true,
    cta: "Assinar Prata",
  },
  {
    id: "ouro",
    name: "Ouro",
    price: "R$ 99,90",
    period: "por mês",
    features: [
      "Tudo do Prata",
      "Destaque na página inicial",
      "Anúncios patrocinados",
      "Prioridade nas buscas",
    ],
    cta: "Assinar Ouro",
  },
];

export const Route = createFileRoute("/planos")({
  head: () => ({
    meta: [
      { title: "Seja um Parceiro — planos do Rota Milagres" },
      {
        name: "description",
        content:
          "Divulgue sua pousada, restaurante ou passeio na Rota Ecológica de Alagoas. Planos a partir de R$ 39,90/mês e 30 dias grátis.",
      },
      { property: "og:title", content: "Seja um Parceiro — Rota Milagres" },
      {
        property: "og:description",
        content:
          "Página própria, fotos, cardápio, promoções e contato direto no WhatsApp.",
      },
    ],
  }),
  component: PlansPage,
});

function PlansPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  function handleChoose(planId: PlanId) {
    if (user) {
      // já logado → vai direto pro onboarding com o plano pré-selecionado
      navigate({
        to: "/onboarding",
        search: { plano: planId },
      });
    } else {
      // não logado → cadastro com o plano na query
      navigate({
        to: "/cadastro-parceiro",
        search: { plano: planId },
      });
    }
  }

  return (
    <>
      <SiteHeader />
      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-[56ch]">
            <span className="text-xs font-semibold uppercase tracking-widest text-tide">
              Seja um Parceiro
            </span>
            <h1 className="mt-3 font-display text-3xl font-medium md:text-4xl">
              Sua empresa na vitrine do turismo da Rota
            </h1>
            <p className="mt-4 text-muted-foreground">
              Comece grátis por 30 dias. Depois escolha o plano que combina com o
              tamanho do seu negócio — sem fidelidade e com cancelamento quando
              quiser.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`flex flex-col rounded-2xl p-6 ring-1 ${
                  plan.highlight ? "bg-accent ring-tide" : "bg-card ring-border"
                }`}
              >
                <span className="text-sm font-semibold uppercase tracking-widest text-tide">
                  {plan.name}
                </span>
                <span className="mt-3 font-display text-3xl font-medium">
                  {plan.price}
                </span>
                <span className="text-xs text-muted-foreground">
                  {plan.period}
                </span>
                <ul className="mt-6 flex-1 space-y-3 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-tide" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => handleChoose(plan.id)}
                  className={`mt-6 rounded-xl py-3 text-center text-sm font-medium transition-transform hover:scale-[1.02] ${
                    plan.highlight
                      ? "bg-primary text-primary-foreground"
                      : "bg-foreground text-background"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl bg-card p-6 ring-1 ring-border md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-medium">Precisa de ajuda para escolher?</p>
              <p className="text-sm text-muted-foreground">
                Fale com um consultor e receba uma recomendação personalizada.
              </p>
            </div>
            <a
              href="https://wa.me/558291189998?text=Ol%C3%A1!%20Quero%20ajuda%20para%20escolher%20um%20plano%20no%20Rota%20Milagres."
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-medium text-white hover:bg-emerald-700"
            >
              Falar no WhatsApp
            </a>
          </div>

          <p className="mt-10 text-sm text-muted-foreground">
            Em breve: painel do parceiro com métricas de visualizações, cliques
            no WhatsApp e rotas abertas, além de reservas online com PIX e
            cartão.
          </p>
        </div>
      </section>
    </>
  );
}