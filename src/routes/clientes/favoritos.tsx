// src/routes/clientes/favoritos.tsx
import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { getClienteFavoritos, type ClienteFavorito } from "@/services/api-cliente";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Heart } from "lucide-react";

export const Route = createFileRoute("/clientes/favoritos")({
  component: ClienteFavoritosPage,
});

function ClienteFavoritosPage() {
  const [favoritos, setFavoritos] = useState<ClienteFavorito[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getClienteFavoritos()
      .then((res) => setFavoritos(res.data || []))
      .catch(() => setFavoritos([]))
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
        <h1 className="font-display text-2xl font-medium">Meus favoritos</h1>
        <p className="text-muted-foreground">Parceiros que você salvou como favoritos</p>
      </div>

      {favoritos.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
            <Heart className="size-8 text-muted-foreground" />
            <p className="text-muted-foreground">Você ainda não tem favoritos.</p>
            <Link to="/" className="text-sm text-primary hover:underline">
              Explorar parceiros
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {favoritos.map((fav) => (
            <Link
              key={fav.id}
              to="/parceiro/$slug"
              params={{ slug: fav.partner?.slug || "" }}
              className="block"
            >
              <Card className="transition hover:ring-2 hover:ring-primary">
                <CardContent className="p-4">
                  <p className="font-medium">{fav.partner?.name ?? "Parceiro"}</p>
                  <p className="text-sm text-muted-foreground">
                    Adicionado em {new Date(fav.created_at).toLocaleDateString("pt-BR")}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}