// src/routes/clientes/contatos.tsx
import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  getClienteConsultas,
  type ClienteConsulta,
} from "@/services/api-cliente";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/clientes/contatos")({
  component: ClienteContatosPage,
});

function ClienteContatosPage() {
  const [consultas, setConsultas] = useState<ClienteConsulta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getClienteConsultas()
      .then((res) => setConsultas(res.data || []))
      .catch(() => setConsultas([]))
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
        <h1 className="font-display text-2xl font-medium">Meus contatos</h1>
        <p className="text-muted-foreground">
          Histórico de interações com parceiros (WhatsApp, etc.)
        </p>
      </div>

      {consultas.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
            <MessageCircle className="size-8 text-muted-foreground" />
            <p className="text-muted-foreground">
              Você ainda não entrou em contato com nenhum parceiro.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {consultas.map((item) => (
            <Card key={item.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium">
                    {item.partner?.name ?? "Parceiro"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(item.created_at).toLocaleString("pt-BR")}
                    {item.partner_id ? ` · ${item.cliente_id}` : ""}
                  </p>
                </div>
                {item.partner?.slug && (
                  <Link
                    to="/parceiro/$slug"
                    params={{ slug: item.partner.slug }}
                    className="text-sm text-primary hover:underline"
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