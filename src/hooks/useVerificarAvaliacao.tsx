//useVerificarAvaliacao.tsx
import { useEffect, useState } from "react";
import { ClienteAvaliacao, verificarAvaliacaoCliente } from "@/services/api-cliente";

export function useVerificarAvaliacao(partnerId: string) {
  const [avaliou, setAvaliou] = useState(false);
  const [loading, setLoading] = useState(true);
  const [avaliacao, setAvaliacao] = useState<ClienteAvaliacao | null>(null);

  useEffect(() => {
    if (!partnerId) return;

    const verificar = async () => {
      setLoading(true);
      try {
        const response = await verificarAvaliacaoCliente(partnerId);
        if (response.data) {
          setAvaliou(response.data.avaliou);
          setAvaliacao(response.data.avaliacao || null);
        }
      } catch (error) {
        console.error("Erro ao verificar avaliação:", error);
      } finally {
        setLoading(false);
      }
    };

    verificar();
  }, [partnerId]);

  return { avaliou, loading, avaliacao };
}