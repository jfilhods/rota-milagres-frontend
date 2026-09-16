// src/routes/clientes/perfil.tsx
import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useClienteAuth } from "@/contexts/cliente-auth-context";
import { updateClientePerfil, type Cliente } from "@/services/api-cliente";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/clientes/perfil")({
  component: ClientePerfilPage,
});

function ClientePerfilPage() {
  const { cliente } = useClienteAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<Partial<Cliente>>({
    nome: "",
    telefone: "",
    documento: "",
    data_nascimento: "",
  });

  useEffect(() => {
    if (cliente) {
      setForm({
        nome: cliente.nome || "",
        telefone: cliente.telefone || "",
        documento: cliente.documento || "",
        data_nascimento: cliente.data_nascimento || "",
      });
    }
  }, [cliente]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateClientePerfil(form);
      toast.success("Perfil atualizado com sucesso!");
      navigate({ to: "/clientes" });
    } catch (error) {
      toast.error("Erro ao atualizar perfil. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (!cliente) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-lg">
      <div>
        <h1 className="font-display text-2xl font-medium">Meus dados</h1>
        <p className="text-muted-foreground">Atualize suas informações pessoais</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="nome">Nome completo</Label>
              <Input
                id="nome"
                name="nome"
                value={form.nome || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                name="telefone"
                value={form.telefone || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="documento">CPF / CNPJ</Label>
              <Input
                id="documento"
                name="documento"
                value={form.documento || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="data_nascimento">Data de nascimento</Label>
              <Input
                id="data_nascimento"
                name="data_nascimento"
                type="date"
                value={form.data_nascimento || ""}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center gap-3 pt-2">
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
                Salvar alterações
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate({ to: "/clientes" })}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}