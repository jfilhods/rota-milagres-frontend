// src/routes/admin/partners/index.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  getAdminPartners,
  deleteAdminPartner,
  type AdminPartner,
} from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/partners/")({
  component: PartnersList,
});

function PartnersList() {
  const [partners, setPartners] = useState<AdminPartner[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPartners = async () => {
    try {
      setLoading(true);
      const res = await getAdminPartners();
      setPartners(res.data || []);
    } catch {
      toast.error("Erro ao carregar parceiros");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPartners();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este parceiro?")) return;
    try {
      await deleteAdminPartner(id);
      toast.success("Parceiro excluído");
      loadPartners();
    } catch {
      toast.error("Erro ao excluir parceiro");
    }
  };

  const getPlan = (partner: AdminPartner) => {
    if (!partner.subscriptions) return "N/A";
    if (Array.isArray(partner.subscriptions)) {
      return partner.subscriptions[0]?.plan_type ?? "N/A";
    }
    return partner.subscriptions.plan_type ?? "N/A";
  };

  if (loading) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        Carregando parceiros...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Parceiros</h1>
          <p className="text-muted-foreground">
            Gerencie os parceiros do marketplace
          </p>
        </div>
        <Link to="/admin/partners/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Parceiro
          </Button>
        </Link>
      </div>

      {partners.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            Nenhum parceiro cadastrado ainda.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {partners.map((partner) => (
            <Card key={partner.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="space-y-1">
                  <h3 className="font-semibold">{partner.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Slug: {partner.slug}
                  </p>
                  <div className="flex gap-4 text-sm">
                    <span>
                      Status:{" "}
                      <span
                        className={
                          partner.active ? "text-green-600" : "text-red-600"
                        }
                      >
                        {partner.active ? "Ativo" : "Inativo"}
                      </span>
                    </span>
                    <span>Plano: {getPlan(partner)}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link
                    to="/admin/partners/$id/edit"
                    params={{ "id": partner.id }}
                  >
                    <Button variant="outline" size="sm">
                      <Pencil className="mr-1 h-3.5 w-3.5" />
                      Editar
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(partner.id)}
                  >
                    <Trash2 className="mr-1 h-3.5 w-3.5" />
                    Excluir
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}