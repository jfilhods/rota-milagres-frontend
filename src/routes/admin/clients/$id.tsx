// src/routes/admin/clients/$id.tsx
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getAdminClient, type AdminClient } from "@/services/api-cliente-admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Mail, Phone, User, Calendar, Hash } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const Route = createFileRoute("/admin/clients/$id")({
  component: ViewClient,
});

function ViewClient() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState<AdminClient | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadClient = async () => {
      try {
        setLoading(true);
        const response = await getAdminClient(id);
        if (response?.data) {
          setClient(response.data);
        }
      } catch (error) {
        console.error("Erro ao carregar cliente:", error);
        toast.error("Erro ao carregar dados do cliente");
      } finally {
        setLoading(false);
      }
    };

    loadClient();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Cliente não encontrado</p>
        <Button onClick={() => navigate({ to: "/admin/clients" })} className="mt-4">
          Voltar para lista
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate({ to: "/admin/clients" })}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <h2 className="text-2xl font-semibold">{client.name || "Cliente"}</h2>
          <Badge variant={client.active ? "default" : "secondary"}>
            {client.active ? "Ativo" : "Inativo"}
          </Badge>
        </div>
        <Button onClick={() => navigate({ to: "/admin/clients/$id/edit", params: { id } })}>
          <Edit className="mr-2 h-4 w-4" />
          Editar
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Informações Pessoais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Nome:</span>
              <span>{client.name || "—"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Email:</span>
              <span>{client.email || "—"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Telefone:</span>
              <span>{client.phone || "—"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Hash className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">CPF:</span>
              <span>{client.cpf || "—"}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Informações da Conta
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Cadastro:</span>
              <span>
                {client.created_at
                  ? format(new Date(client.created_at), "dd/MM/yyyy HH:mm", {
                      locale: ptBR,
                    })
                  : "—"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Última atualização:</span>
              <span>
                {client.updated_at
                  ? format(new Date(client.updated_at), "dd/MM/yyyy HH:mm", {
                      locale: ptBR,
                    })
                  : "—"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">ID</Badge>
              <span className="text-sm text-muted-foreground">{client.id}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}