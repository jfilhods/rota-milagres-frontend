// src/routes/clientes/vouchers.tsx
import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { getClienteVouchers, type ClienteVoucher } from "@/services/api-cliente";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Ticket, Calendar, CheckCircle, XCircle } from "lucide-react";

export const Route = createFileRoute("/clientes/vouchers")({
  component: ClienteVouchersPage,
});

function ClienteVouchersPage() {
  const [vouchers, setVouchers] = useState<ClienteVoucher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getClienteVouchers()
      .then((res) => setVouchers(res.data || []))
      .catch(() => setVouchers([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-medium">Meus vouchers</h1>
        <p className="text-muted-foreground">Cupons e descontos disponíveis</p>
      </div>

      {vouchers.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
            <Ticket className="size-8 text-muted-foreground" />
            <p className="text-muted-foreground">Você ainda não possui vouchers.</p>
            <Link to="/" className="text-sm text-primary hover:underline">
              Explorar parceiros
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {vouchers.map((v) => (
            <Card key={v.id}>
              <CardContent className="p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-medium">{v.partner?.name ?? "Parceiro"}</p>
                    <p className="text-sm text-muted-foreground">
                      Código: <span className="font-mono">{v.codigo}</span>
                    </p>
                    {v.descricao && (
                      <p className="mt-1 text-sm">{v.descricao}</p>
                    )}
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                      {v.desconto && (
                        <span className="text-green-600 font-semibold">
                          {v.desconto}% de desconto
                        </span>
                      )}
                      {v.valor && (
                        <span className="text-green-600 font-semibold">
                          R$ {v.valor.toFixed(2)}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="size-4" />
                        {v.validade_fim
                          ? `Válido até ${new Date(v.validade_fim).toLocaleDateString("pt-BR")}`
                          : "Sem data de validade"}
                      </span>
                    </div>
                  </div>
                  <div>
                    {v.status === "usado" ? (
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <XCircle className="size-4" /> Usado
                      </span>
                    ) : v.status === "expirado" ? (
                      <span className="flex items-center gap-1 text-red-500">
                        <XCircle className="size-4" /> Expirado
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="size-4" /> Disponível
                      </span>
                    )}
                  </div>
                </div>
                {v.partner?.slug && (
                  <Link
                    to="/parceiro/$slug"
                    params={{ slug: v.partner.slug }}
                    className="mt-2 inline-block text-sm text-primary hover:underline"
                  >
                    Ver parceiro
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}