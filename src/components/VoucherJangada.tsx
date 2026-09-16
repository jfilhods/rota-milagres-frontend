// components/VoucherJangada.tsx
import { useState } from "react";
import { Ticket, User, Calendar, X, Loader2 } from "lucide-react";
import { criarVoucherJangada } from "@/services/api-cliente";
import { useClienteAuth } from "@/contexts/cliente-auth-context";

interface VoucherJangadaProps {
  partnerId: string;
  partnerName: string;
  onSuccess?: () => void;
  onClose?: () => void;
  tipo: "jangada" | "quadriciclo" | "buggy";
}

export function VoucherJangada({ partnerId, partnerName, onSuccess, onClose, tipo }: VoucherJangadaProps) {
  const [quantidade, setQuantidade] = useState(1);
  const [dataPasseio, setDataPasseio] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { isAuthenticated } = useClienteAuth();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  console.log("🔄 Iniciando reserva...");
  console.log("📋 Partner ID:", partnerId);
  console.log("📋 Tipo do Partner ID:", typeof partnerId);
  
  // Verificar se o ID é um UUID válido
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(partnerId)) {
    console.error("❌ Partner ID não é um UUID válido:", partnerId);
    setError("ID do parceiro inválido. Por favor, recarregue a página.");
    return;
  }
  
  // Verifica autenticação
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
      }, 2000);
    } else {
      console.error("❌ Erro ao criar voucher:", response.message);
      setError(response.message || "Erro ao criar voucher. Tente novamente.");
    }
  } catch (err) {
    console.error("❌ Erro na requisição:", err);
    if (err instanceof Error && err.message.includes("autenticado")) {
      setError("É necessário estar autenticado para reservar um passeio.");
    } else {
      setError(err instanceof Error ? err.message : "Erro ao criar voucher");
    }
  } finally {
    setLoading(false);
  }
};

  const valorTotal = 25 * quantidade;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-card p-6 shadow-2xl ring-1 ring-border">
        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 hover:bg-muted transition"
        >
          <X className="size-4" />
        </button>

        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Ticket className="size-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-medium">Reservar Passeio</h2>
            <p className="text-sm text-muted-foreground">{partnerName}</p>
          </div>
        </div>

        {success ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
              <Ticket className="size-8" />
            </div>
            <h3 className="text-lg font-medium">Voucher criado com sucesso!</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Você será redirecionado em instantes.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Quantidade de pessoas */}
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Quantidade de pessoas
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQuantidade(Math.max(1, quantidade - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border hover:bg-muted transition"
                >
                  -
                </button>
                <div className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border px-4 py-2">
                  <User className="size-4 text-muted-foreground" />
                  <span className="text-lg font-medium">{quantidade}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setQuantidade(Math.min(10, quantidade + 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border hover:bg-muted transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Data do passeio */}
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Data do passeio (opcional)
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="date"
                  value={dataPasseio}
                  onChange={(e) => setDataPasseio(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            {/* Resumo */}
            <div className="rounded-lg bg-muted/40 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Valor por pessoa</span>
                <span className="font-medium">R$ 25,00</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Quantidade</span>
                <span className="font-medium">{quantidade} pessoa{quantidade > 1 ? 's' : ''}</span>
              </div>
              <div className="mt-2 border-t border-border pt-2">
                <div className="flex items-center justify-between font-medium">
                  <span>Total</span>
                  <span className="text-primary">R$ {valorTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="size-4 animate-spin" />
                  Criando voucher...
                </span>
              ) : (
                `Reservar por R$ ${valorTotal.toFixed(2)}`
              )}
            </button>

            <p className="text-center text-xs text-muted-foreground">
              * Pagamento via PIX para confirmar a reserva
            </p>
          </form>
        )}
      </div>
    </div>
  );
}