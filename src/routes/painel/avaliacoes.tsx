import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, Star, Send } from "lucide-react";
import { listReviews, replyReview, type Review } from "@/lib/partner-api";

export const Route = createFileRoute("/painel/avaliacoes")({
  component: AvaliacoesPage,
});

function AvaliacoesPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);

  async function reload() {
    setLoading(true);
    try {
      setReviews(await listReviews());
    } catch {
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    reload();
  }, []);

  async function handleReply(id: string) {
    if (!replyText.trim()) return;
    setSending(true);
    try {
      await replyReview(id, replyText.trim());
      setReplyingTo(null);
      setReplyText("");
      await reload();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao responder.");
    } finally {
      setSending(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-muted-foreground">
        <Loader2 className="mr-2 size-5 animate-spin" />
        Carregando avaliações...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold md:text-3xl">
          Avaliações
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Responda seus clientes e mantenha uma boa reputação.
        </p>
      </div>

      {reviews.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground">
          Ainda não há avaliações.
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <article
              key={r.id}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium">{r.authorName}</p>
                  <div className="mt-1 flex items-center gap-1 text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`size-3.5 ${
                          i < r.rating ? "fill-current" : "opacity-30"
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-xs text-muted-foreground">
                      {new Date(r.createdAt).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-3 text-sm text-muted-foreground">
                {r.comment}
              </p>

              {r.reply ? (
                <div className="mt-4 rounded-xl bg-muted/60 p-3 text-sm">
                  <p className="text-xs font-semibold text-primary">
                    Sua resposta
                  </p>
                  <p className="mt-1 text-muted-foreground">{r.reply}</p>
                </div>
              ) : replyingTo === r.id ? (
                <div className="mt-4">
                  <textarea
                    className="input min-h-[80px]"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Escreva sua resposta..."
                  />
                  <div className="mt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleReply(r.id)}
                      disabled={sending}
                      className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
                    >
                      {sending ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Send className="size-4" />
                      )}
                      Enviar resposta
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setReplyingTo(null);
                        setReplyText("");
                      }}
                      className="rounded-xl border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setReplyingTo(r.id);
                    setReplyText("");
                  }}
                  className="mt-4 text-sm font-medium text-primary hover:underline"
                >
                  Responder
                </button>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}