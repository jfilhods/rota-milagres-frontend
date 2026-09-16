// src/routes/eventos.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarDays, Loader2 } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { fetchPublicEvents, type EventNotice } from "@/services/api";

export const Route = createFileRoute("/eventos")({
  head: () => ({
    meta: [
      { title: "Avisos & Eventos — Rota Milagres" },
      {
        name: "description",
        content:
          "Fique por dentro dos eventos, festivais e avisos da Rota Ecológica de Alagoas — São Miguel dos Milagres, Porto de Pedras, Japaratinga e Passo de Camaragibe.",
      },
      {
        property: "og:title",
        content: "Avisos & Eventos — Rota Milagres",
      },
      {
        property: "og:description",
        content:
          "Programação cultural, festivais gastronômicos, ações ambientais e avisos úteis para sua visita.",
      },
    ],
  }),
  component: EventosPage,
});

function EventosPage() {
  const [events, setEvents] = useState<EventNotice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublicEvents()
      .then(setEvents)
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

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

        {/* Header */}
        <section className="mx-auto max-w-6xl px-4 pt-8">
          <div className="flex items-start gap-3">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-2xl">
              📢
            </div>
            <div>
              <h1 className="font-display text-3xl font-medium md:text-4xl">
                Avisos & Eventos
              </h1>
              <p className="mt-2 max-w-[60ch] text-muted-foreground">
                Programação cultural, festivais gastronômicos, ações
                ambientais e avisos úteis para aproveitar a Rota Ecológica.
              </p>
            </div>
          </div>
        </section>

        {/* Conteúdo */}
        <section className="mx-auto max-w-6xl px-4 pt-10">
          {loading ? (
            <div className="flex items-center justify-center py-20 text-muted-foreground">
              <Loader2 className="mr-2 size-5 animate-spin" />
              Carregando eventos...
            </div>
          ) : events.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border py-20 text-center text-muted-foreground">
              Nenhum evento programado no momento. Volte em breve!
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}

/* ============================================================
   CARD DE EVENTO (página /eventos)
============================================================ */

function EventCard({ event }: { event: EventNotice }) {
  const isHigh = event.priority === "high";

  return (
    <article
      className={`overflow-hidden rounded-2xl border bg-card transition hover:shadow-lg ${
        isHigh ? "border-primary/40" : "border-border"
      }`}
    >
      {/* Imagem */}
      {event.image_url ? (
        <img
          src={event.image_url}
          alt={event.title}
          loading="lazy"
          className="aspect-[16/9] w-full object-cover"
        />
      ) : (
        <div className="flex aspect-[16/9] w-full items-center justify-center bg-muted text-4xl text-muted-foreground">
          📅
        </div>
      )}

      {/* Conteúdo */}
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            {isHigh && (
              <span className="inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                Destaque
              </span>
            )}
            <h2 className="mt-1 font-display text-lg font-medium leading-tight">
              {event.title}
            </h2>
          </div>
        </div>

        <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
          {event.description}
        </p>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarDays className="size-3.5" />
          {formatDateRange(event.start_date, event.end_date)}
        </div>

        {event.link && (
          <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Saiba mais <ArrowRight className="size-4" />
          </a>
        )}
      </div>
    </article>
  );
}

/* ============================================================
   HELPERS
============================================================ */

function formatDateRange(startIso: string, endIso: string): string {
  const start = new Date(startIso);
  const end = new Date(endIso);

  const sameDay =
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth() &&
    start.getDate() === end.getDate();

  if (sameDay) {
    return start.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  const startStr = start.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });
  const endStr = end.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return `${startStr} → ${endStr}`;
}