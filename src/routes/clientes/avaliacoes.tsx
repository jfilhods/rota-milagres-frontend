// src/routes/clientes/avaliacoes.tsx
import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Star } from "lucide-react";
import { getClienteAvaliacoes, type ClienteAvaliacao } from "@/services/api-cliente";

export const Route = createFileRoute("/clientes/avaliacoes")({
  component: ClienteAvaliacoesPage,
});

function ClienteAvaliacoesPage() {
  const [avaliacoes, setAvaliacoes] = useState<ClienteAvaliacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    carregarAvaliacoes();
  }, []);

  const carregarAvaliacoes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getClienteAvaliacoes();
      setAvaliacoes(response.data || []);
    } catch (err) {
      console.error("Erro ao carregar avaliações:", err);
      setError("Não foi possível carregar suas avaliações. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={carregarAvaliacoes}
          className="mt-4 text-primary hover:underline"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-medium">Minhas avaliações</h1>
        <p className="text-muted-foreground">
          Notas e comentários que você deixou nos parceiros
        </p>
      </div>

      {avaliacoes.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
            <Star className="size-8 text-muted-foreground" />
            <p className="text-muted-foreground">
              Você ainda não avaliou nenhum parceiro.
            </p>
            <p className="text-sm text-muted-foreground">
              Abra a página de um parceiro e deixe sua nota e comentário.
            </p>
            <Link to="/" className="text-sm text-primary hover:underline">
              Explorar parceiros
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {avaliacoes.map((av) => (
            <Card key={av.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Link 
                    to="/parceiro/$slug" 
                    params={{ slug: av.partner?.slug || "" }}
                    className="font-medium hover:text-primary hover:underline"
                  >
                    {av.partner?.name ?? "Parceiro"}
                  </Link>
                  <span className="text-sm font-medium text-amber-600">
                    {"★".repeat(av.nota)}
                    {"☆".repeat(5 - av.nota)}
                  </span>
                </div>
                {av.comentario && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {av.comentario}
                  </p>
                )}
                <p className="mt-1 text-xs text-muted-foreground">
                  {new Date(av.created_at).toLocaleDateString("pt-BR")}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}