// components/painel/ClientesList.tsx
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";

interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string | null;
  mensagem: string | null;
  status: 'pendente' | 'contatado' | 'convertido' | 'arquivado';
  created_at: string;
}

const statusMap: Record<
  Cliente["status"],
  { label: string; variant: "warning" | "info" | "success" | "secondary" }
> = {
  pendente: { label: "Pendente", variant: "warning" },
  contatado: { label: "Contatado", variant: "info" },
  convertido: { label: "Convertido", variant: "success" },
  arquivado: { label: "Arquivado", variant: "secondary" }
};

export function ClientesList() {
  const [page, setPage] = useState(0);
  const [statusFilter, setStatusFilter] = useState<string>("");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['clientes', page, statusFilter],
    queryFn: async () => {
      const params = new URLSearchParams({
        limit: '20',
        offset: String(page * 20)
      });
      if (statusFilter) params.append('status', statusFilter);
      
      const response = await fetch(`/api/partner/clientes?${params}`);
      const result = await response.json();
      
      if (!result.success) throw new Error(result.error);
      return result;
    }
  });

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/partner/clientes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (response.ok) {
        refetch();
      }
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Clientes</h2>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-md px-3 py-1"
        >
          <option value="">Todos</option>
          <option value="pendente">Pendentes</option>
          <option value="contatado">Contatados</option>
          <option value="convertido">Convertidos</option>
          <option value="arquivado">Arquivados</option>
        </select>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((cliente: Cliente) => (
              <TableRow key={cliente.id}>
                <TableCell className="font-medium">{cliente.nome}</TableCell>
                <TableCell>{cliente.email}</TableCell>
                <TableCell>{cliente.telefone || "-"}</TableCell>
                <TableCell>
                  <Badge variant={statusMap[cliente.status].variant as any}>
                    {statusMap[cliente.status].label}
                  </Badge>
                </TableCell>
                <TableCell>
                  {format(new Date(cliente.created_at), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                </TableCell>
                <TableCell>
                  <select
                    value={cliente.status}
                    onChange={(e) => handleStatusChange(cliente.id, e.target.value)}
                    className="border rounded-md px-2 py-1 text-sm"
                  >
                    <option value="pendente">Pendente</option>
                    <option value="contatado">Contatado</option>
                    <option value="convertido">Convertido</option>
                    <option value="arquivado">Arquivado</option>
                  </select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          Total: {data?.meta?.total || 0} clientes
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            onClick={() => setPage(p => p + 1)}
            disabled={!data?.data?.length || data.data.length < 20}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );
}