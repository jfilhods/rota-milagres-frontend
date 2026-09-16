// src/routes/preservacao.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, X as XIcon } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import heroImage from "@/assets/Praia_de_Porto_da_Rua_Sao_Miguel_dos_Milagres_Alagoas.jpg";

export const Route = createFileRoute("/preservacao")({
  head: () => ({
    meta: [
      { title: "Preservação da Rota Ecológica — Rota Milagres" },
      {
        name: "description",
        content:
          "Como visitar a Rota Ecológica de Alagoas respeitando os corais, o Santuário do Peixe-Boi e a APA Costa dos Corais — a maior unidade de conservação marinha do Brasil.",
      },
      {
        property: "og:title",
        content: "Preservação da Rota Ecológica — Rota Milagres",
      },
      {
        property: "og:description",
        content:
          "Boas práticas para curtir as piscinas naturais, os corais e a vida marinha com consciência.",
      },
    ],
  }),
  component: PreservacaoPage,
});

/* ---------- Conteúdos ---------- */

const DO_LIST = [
  {
    title: "Jangada a vela ou remo",
    text:
      "Nas áreas de recife, apenas jangadas tradicionais a vela ou remo são permitidas. É a forma mais autêntica — e menos agressiva — de conhecer as piscinas naturais.",
  },
  {
    title: "Protetor solar reef-safe",
    text:
      "Use protetor mineral (zinco ou titânio), sem oxibenzona ou octinoxato. Esses filtros químicos são tóxicos para os corais e já foram proibidos em vários destinos do mundo.",
  },
  {
    title: "Guia autorizado no Peixe-Boi",
    text:
      "A visita ao Santuário do Peixe-Boi, no Rio Tatuamunha, só pode ser feita com guias credenciados pelo ICMBio. Eles garantem o respeito à distância dos animais.",
  },
  {
    title: "Leve seu lixo de volta",
    text:
      "A Rota tem coleta limitada. Traga uma sacola, recolha tudo que produziu — inclusive bitucas de cigarro e embalagens pequenas que voam fácil.",
  },
  {
    title: "Prefira consumo local",
    text:
      "Restaurantes, pousadas e artesãos da região dependem do turismo consciente. Isso mantém a comunidade viva e o ecossistema protegido.",
  },
  {
    title: "Fotografe sem flash nos animais",
    text:
      "O flash estressa peixes, tartarugas e o peixe-boi. Aproxime-se devagar, mantenha distância segura e deixe o animal se aproximar se quiser.",
  },
];

const DONT_LIST = [
  {
    title: "Não pise nos corais",
    text:
      "Corais são animais vivos, crescem milímetros por ano e não se regeneram rápido. Pisar destrói colônias centenárias. Ao flutuar nas piscinas, mantenha os pés longe do fundo.",
  },
  {
    title: "Não toque nem alimente os peixes",
    text:
      "Alimentar altera o comportamento natural e a dieta dos peixes. Tocar remove a camada protetora da pele deles e transmite doenças.",
  },
  {
    title: "Não leve conchas, areia ou corais",
    text:
      "É proibido por lei federal (Instrução Normativa do ICMBio). O que é do mar, fica no mar.",
  },
  {
    title: "Não use lancha ou jet ski nos recifes",
    text:
      "Além de proibido, o motor e o rastro de óleo afugentam a fauna e destroem o recife. Fora das áreas de recife, respeite as zonas de velocidade e distância da costa.",
  },
  {
    title: "Não persiga nem cerque animais",
    text:
      "Tartarugas, peixe-boi e golfinhos precisam subir para respirar. Cercar ou perseguir causa pânico e pode levar à morte por afogamento.",
  },
  {
    title: "Não deixe lixo na praia ou no mar",
    text:
      "Plástico e bitucas são confundidos com comida pela fauna marinha. Uma sacola pode matar uma tartaruga. Leve o seu lixo de volta.",
  },
];

const FACTS = [
  {
    number: "1",
    label: "Maior unidade de conservação marinha federal do Brasil",
    detail: "APA Costa dos Corais — criada em 1997, com 413 mil hectares.",
  },
  {
    number: "12+",
    label: "Municípios protegidos",
    detail:
      "De Tamandaré (PE) até Maceió (AL), incluindo toda a Rota Ecológica.",
  },
  {
    number: "11",
    label: "Espécies de corais",
    detail:
      "Recifes de coral são o ecossistema marinho mais biodiverso do Atlântico Sul.",
  },
  {
    number: "~30",
    label: "Peixes-bois no santuário",
    detail:
      "O Rio Tatuamunha é um dos últimos refúgios do peixe-boi-marinho no Brasil.",
  },
];

/* ---------- Página ---------- */

function PreservacaoPage() {
  return (
    <>
      <AppHeader />

      <main className="pb-16">
        {/* Voltar */}
        <div className="mx-auto max-w-6xl px-4 pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/90 px-4 py-2 text-sm font-medium shadow-sm transition hover:border-primary/50 hover:bg-muted"
          >
            <ArrowLeft className="size-4" />
            Voltar para a home
          </Link>
        </div>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-6">
          <div className="relative overflow-hidden rounded-3xl">
            <img
              src={heroImage}
              alt="Praia e piscinas naturais da Rota Ecológica de Alagoas"
              className="aspect-[21/9] w-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-foreground/75 via-foreground/20 to-transparent p-6 md:p-10">
              <span className="mb-2 inline-flex w-fit items-center gap-2 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                🪸 Preservação
              </span>
              <h1 className="max-w-[26ch] font-display text-3xl font-medium leading-tight text-background md:text-5xl">
                Visite a Rota Ecológica com consciência
              </h1>
              <p className="mt-3 max-w-[60ch] text-sm text-background/85 md:text-base">
                A gente é parte da APA Costa dos Corais — a maior unidade de
                conservação marinha federal do Brasil. Aqui, cada cuidado
                importa para que as próximas gerações continuem vendo esse
                espetáculo.
              </p>
            </div>
          </div>
        </section>

        {/* Fatos */}
        <section className="mx-auto max-w-6xl px-4 pt-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FACTS.map((fact) => (
              <div
                key={fact.label}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <p className="font-display text-4xl font-semibold text-primary">
                  {fact.number}
                </p>
                <p className="mt-2 text-sm font-medium leading-snug">
                  {fact.label}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {fact.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Faça / Não faça */}
        <section className="mx-auto max-w-6xl px-4 pt-16">
          <div className="mb-10 max-w-2xl">
            <h2 className="font-display text-3xl font-medium">
              Como aproveitar e preservar
            </h2>
            <p className="mt-3 text-muted-foreground">
              Pequenas atitudes mudam completamente o impacto da sua visita.
              A lista abaixo é o mínimo que a gente pede a todo turista que
              chega na Rota.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* FAÇA */}
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                <Check className="size-3.5" />
                Faça
              </div>

              <div className="space-y-4">
                {DO_LIST.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-border bg-card p-5"
                  >
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* NÃO FAÇA */}
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-700 dark:bg-red-950/40 dark:text-red-400">
                <XIcon className="size-3.5" />
                Evite
              </div>

              <div className="space-y-4">
                {DONT_LIST.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-border bg-card p-5"
                  >
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bloco APA */}
        <section className="mx-auto max-w-6xl px-4 pt-16">
          <div className="rounded-3xl border border-border bg-muted/40 p-8 md:p-10">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                  Sobre a APA Costa dos Corais
                </span>
                <h2 className="mt-2 font-display text-2xl font-medium md:text-3xl">
                  Uma área de 413 mil hectares protegida por lei federal
                </h2>
                <p className="mt-4 max-w-[60ch] text-base leading-7 text-muted-foreground">
                  Criada em 1997, a Área de Proteção Ambiental Costa dos
                  Corais é a maior unidade de conservação marinha federal do
                  Brasil. Ela protege recifes de coral, manguezais,
                  estuários e uma fauna riquíssima — do peixe-boi-marinho às
                  tartarugas e cavalos-marinhos. É aqui que a Rota Ecológica
                  está inserida.
                </p>
                <p className="mt-3 max-w-[60ch] text-base leading-7 text-muted-foreground">
                  Toda a gestão é feita pelo ICMBio, em parceria com
                  prefeituras, comunidades tradicionais e o setor de
                  turismo. Ao escolher operadores locais conscientes, você
                  fortalece esse trabalho.
                </p>
              </div>

              <a
                href="https://www.gov.br/icmbio/pt-br/assuntos/biodiversidade/unidade-de-conservacao/unidades-de-biomas/marinho/lista-de-ucs/apa-costa-dos-corais"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                Página oficial no ICMBio
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="mx-auto max-w-6xl px-4 pt-16">
          <div className="rounded-3xl bg-primary p-8 text-primary-foreground md:p-10">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <h2 className="font-display text-2xl font-medium md:text-3xl">
                  Vem conhecer do jeito certo
                </h2>
                <p className="mt-2 max-w-[52ch] text-sm text-primary-foreground/85 md:text-base">
                  Nossos parceiros são escolhidos por respeitar o
                  ecossistema local. Aproveite a Rota com quem cuida dela.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/categorias"
                  className="inline-flex items-center gap-2 rounded-xl bg-background px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-background/90"
                >
                  Ver categorias
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-xl border border-primary-foreground/30 px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-foreground/10"
                >
                  Voltar à home
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}