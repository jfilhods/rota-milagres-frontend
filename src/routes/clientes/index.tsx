// src/routes/clientes/index.tsx
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
import { Loader2, Heart, Ticket, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";


export const Route = createFileRoute("/clientes/")({
  component: ClienteDashboard,
});

function ClienteDashboard() {
  const { cliente, isAuthenticated } = useClienteAuth();
  const [consultas, setConsultas] = useState<ClienteConsulta[]>([]);
  const [favoritos, setFavoritos] = useState<ClienteFavorito[]>([]);
  const [vouchers, setVouchers] = useState<ClienteVoucher[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) return;

    async function loadData() {
      try {
        setLoadingData(true);
        const [c, f, v] = await Promise.all([
          getClienteConsultas().catch(() => ({ data: [] })),
          getClienteFavoritos().catch(() => ({ data: [] })),
          getClienteVouchers().catch(() => ({ data: [] })),
        ]);
        setConsultas(c.data || []);
        setFavoritos(f.data || []);
        setVouchers(v.data || []);
      } finally {
        setLoadingData(false);
      }
    }

    loadData();
  }, [isAuthenticated]);

  return (
    <>
    
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-medium">
            Olá, {cliente?.nome?.split(" ")[0] || "cliente"} 👋
          </h1>
          <p className="text-muted-foreground">
            Gerencie favoritos, contatos e avaliações
          </p>
        </div>
        <Link to="/clientes/painel-cliente">
          <Button variant="outline">
            Abrir painel
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-3 p-6">
            <Clock className="size-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Contatos</p>
              <p className="font-display text-2xl">
                {loadingData ? "—" : consultas.length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-6">
            <Heart className="size-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Favoritos</p>
              <p className="font-display text-2xl">
                {loadingData ? "—" : favoritos.length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-6">
            <Ticket className="size-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Vouchers</p>
              <p className="font-display text-2xl">
                {loadingData ? "—" : vouchers.length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {loadingData ? (
        <div className="flex justify-center py-12">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-2">
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl">Últimos contatos</h2>
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
                {consultas.slice(0, 5).map((item) => (
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

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl">Favoritos</h2>
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
                {favoritos
                  .filter((f) => f.partner?.slug)
                  .slice(0, 5)
                  .map((fav) => (
                    <Link
                      key={fav.id}
                      to="/parceiro/$slug"
                      params={{ slug: fav.partner!.slug }}
                    >
                      <Card className="transition hover:ring-primary">
                        <CardContent className="p-4">
                          <p className="font-medium">{fav.partner?.name}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
    </>
  );
}