// src/routes/admin/clients/$id.edit.tsx
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getAdminClient, updateAdminClient, type AdminClient } from "@/services/api-cliente-admin";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { ArrowLeft, Save } from "lucide-react";

export const Route = createFileRoute("/admin/clients/$id/edit")({
  component: EditClient,
});

function EditClient() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<AdminClient>>({
    nome: "",
    email: "",
    telefone: "",
    documento: "",
    active: true,
    role: "user",
  });

  useEffect(() => {
    const loadClient = async () => {
      try {
        setLoading(true);
        const response = await getAdminClient(id);
        if (response?.data) {
          const client = response.data;
          setFormData({
            nome: client.nome || "",
            email: client.email || "",
            telefone: client.telefone || "",
            documento: client.documento || "",
            active: client.active,
            role: client.role || "user",
          });
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

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.email) {
    return toast.error("Email é obrigatório");
  }

  try {
    setSaving(true);

    await updateAdminClient(id, {
      name: formData.nome ?? "",
      email: formData.email,
      phone: formData.telefone ?? "",
      cpf: formData.documento?.replace(/\D/g, "") ?? "",
      active: formData.active ?? true,
      role: formData.role === "admin" ? "admin" : "user",
    });

    toast.success("Cliente atualizado com sucesso!");
    navigate({ to: "/admin/clients/$id", params: { id } });
  } catch (error: unknown) {
    console.error("Erro ao atualizar cliente:", error);
    toast.error("Erro ao atualizar cliente");
  } finally {
    setSaving(false);
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-4 mb-6">
        <Button
          type="button"
          variant="ghost"
          onClick={() => navigate({ to: "/admin/clients/$id", params: { id } })}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        <h2 className="text-2xl font-semibold">Editar Cliente</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dados do Cliente</CardTitle>
          <CardDescription>Atualize as informações do cliente.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome completo</Label>
              <Input
                id="name"
                placeholder="Ex: João Silva"
                value={formData.nome || ""}
                onChange={(e) =>
                  setFormData({ ...formData, nome: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="Ex: joao@email.com"
                required
                value={formData.email || ""}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                placeholder="(11) 99999-9999"
                value={formData.telefone || ""}
                onChange={(e) =>
                  setFormData({ ...formData, telefone: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                placeholder="000.000.000-00"
                value={formData.documento || ""}
                onChange={(e) =>
                  setFormData({ ...formData, documento: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Tipo</Label>
              <Select
                value={formData.role || "user"}
                onValueChange={(value) => {
                  if (value === "user" || value === "admin" || value === "partner") {
                    setFormData({
                      ...formData,
                      role: value,
                    });
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="user">Usuário</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Switch
              id="active"
              checked={formData.active ?? true}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, active: checked })
              }
            />
            <Label htmlFor="active">Cliente ativo</Label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate({ to: "/admin/clients/$id", params: { id } })}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={saving}>
            <Save className="mr-2 h-4 w-4" />
            {saving ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}