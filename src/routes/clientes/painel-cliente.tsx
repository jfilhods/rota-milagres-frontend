// src/routes/clientes/painel-cliente.tsx
import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useClienteAuth } from "@/contexts/cliente-auth-context";
import {
  getClienteConsultas,
  getClienteFavoritos,
  getClienteVouchers,
  type ClienteConsulta,
  type ClienteFavorito,
  type ClienteVoucher,
} from "@/services/api-cliente";
import { Loader2, Heart, Ticket, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/clientes/painel-cliente")({
  component: ClientePainelPage,
});

function ClientePainelPage() {
  const { cliente } = useClienteAuth();
  const [consultas, setConsultas] = useState<ClienteConsulta[]>([]);
  const [favoritos, setFavoritos] = useState<ClienteFavorito[]>([]);
  const [vouchers, setVouchers] = useState<ClienteVoucher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [c, f, v] = await Promise.all([
          getClienteConsultas().catch(() => ({ data: [] })),
          getClienteFavoritos().catch(() => ({ data: [] })),
          getClienteVouchers().catch(() => ({ data: [] })),
        ]);
        setConsultas(c.data || []);
        setFavoritos(f.data || []);
        setVouchers(v.data || []);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-medium">Painel do cliente</h1>
        <p className="text-muted-foreground">
          Visão completa dos seus contatos, favoritos e vouchers
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Contatos */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl flex items-center gap-2">
              <Clock className="size-5" /> Contatos
            </h2>
            <Link
              to="/clientes/contatos"
              className="text-sm text-primary hover:underline"
            >
              Ver todos
            </Link>
          </div>
          {consultas.length === 0 ? (
            <p className="text-muted-foreground">Nenhum contato ainda</p>
          ) : (
            <div className="space-y-3">
              {consultas.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <p className="font-medium">
                      {item.partner?.name ?? "Parceiro"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(item.created_at).toLocaleDateString("pt-BR")}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Favoritos */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl flex items-center gap-2">
              <Heart className="size-5" /> Favoritos
            </h2>
            <Link
              to="/clientes/favoritos"
              className="text-sm text-primary hover:underline"
            >
              Ver todos
            </Link>
          </div>
          {favoritos.length === 0 ? (
            <p className="text-muted-foreground">Nenhum favorito ainda</p>
          ) : (
            <div className="space-y-3">
              {favoritos.map((fav) => (
                <Link
                  key={fav.id}
                  to="/parceiro/$slug"
                  params={{ slug: fav.partner?.slug || "" }}
                >
                  <Card className="transition hover:ring-2 hover:ring-primary">
                    <CardContent className="p-4">
                      <p className="font-medium">{fav.partner?.name ?? "Parceiro"}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Vouchers */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl flex items-center gap-2">
              <Ticket className="size-5" /> Vouchers
            </h2>
            <Link
              to="/clientes/vouchers"
              className="text-sm text-primary hover:underline"
            >
              Ver todos
            </Link>
          </div>
          {vouchers.length === 0 ? (
            <p className="text-muted-foreground">Nenhum voucher ainda</p>
          ) : (
            <div className="space-y-3">
              {vouchers.slice(0, 5).map((v) => (
                <Card key={v.id}>
                  <CardContent className="p-4">
                    <p className="font-medium">{v.partner?.name ?? "Parceiro"}</p>
                    <p className="text-sm text-muted-foreground">
                      Código: {v.codigo}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}