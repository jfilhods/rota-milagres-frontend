// components/partner/PartnerAvaliacoesList.tsx
import { useEffect, useState } from "react";
import { Star, Loader2 } from "lucide-react";
import { getPartnerAvaliacoes, type ClienteAvaliacao } from "@/services/api-cliente";

interface PartnerAvaliacoesListProps {
  partnerId: string;
  refreshTrigger?: number;
}

export function PartnerAvaliacoesList({ partnerId, refreshTrigger = 0 }: PartnerAvaliacoesListProps) {
  const [avaliacoes, setAvaliacoes] = useState<ClienteAvaliacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [media, setMedia] = useState<number | null>(null);

  const loadAvaliacoes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getPartnerAvaliacoes(partnerId);
      const dados = response.data || [];
      setAvaliacoes(dados);
      if (dados.length > 0) {
        const soma = dados.reduce((acc, curr) => acc + curr.nota, 0);
        setMedia(Number((soma / dados.length).toFixed(1)));
      } else {
        setMedia(null);
      }
    } catch (error) {
      console.error("Erro ao carregar avaliações:", error);
      setError("Não foi possível carregar as avaliações");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAvaliacoes();
  }, [partnerId, refreshTrigger]);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>{error}</p>
        <button onClick={loadAvaliacoes} className="mt-2 text-primary hover:underline">
          Tentar novamente
        </button>
      </div>
    );
  }

  if (avaliacoes.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Este parceiro ainda não possui avaliações.</p>
        <p className="text-sm">Seja o primeiro a avaliar!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Média */}
      <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
        <span className="text-3xl font-bold">{media}</span>
        <div>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`size-5 ${
                  star <= Math.round(media || 0)
                    ? "fill-amber-400 text-amber-400"
                    : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {avaliacoes.length} {avaliacoes.length === 1 ? "avaliação" : "avaliações"}
          </span>
        </div>
      </div>

      {/* Lista de avaliações */}
      <div className="space-y-4">
        {avaliacoes.map((av) => (
          <div key={av.id} className="border-b pb-4 last:border-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-medium">
                  {av.cliente?.nome || 'Anônimo'}
                </span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`size-4 ${
                        star <= av.nota
                          ? "fill-amber-400 text-amber-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <span className="text-xs text-muted-foreground">
                {new Date(av.created_at).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric"
                })}
              </span>
            </div>
            {av.comentario && (
              <p className="mt-2 text-sm text-muted-foreground">{av.comentario}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}