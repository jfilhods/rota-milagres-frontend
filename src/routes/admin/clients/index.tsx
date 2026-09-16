import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  getAdminClients,
  deleteAdminClient,
  type AdminClient,
} from "@/services/api-cliente-admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Mail,
  Phone,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const Route = createFileRoute("/admin/clients/")({
  component: ClientsList,
});

function ClientsList() {
  const [clients, setClients] = useState<AdminClient[]>([]);
  const [filteredClients, setFilteredClients] = useState<AdminClient[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [clientToDelete, setClientToDelete] = useState<AdminClient | null>(null);

  const loadClients = async () => {
    try {
      setLoading(true);
      const response = await getAdminClients();
      const list = response?.data ?? [];
      setClients(list);
      setFilteredClients(list);
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);
      toast.error("Erro ao carregar lista de clientes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredClients(clients);
      return;
    }
    const q = search.toLowerCase();
    setFilteredClients(
      clients.filter(
        (c) =>
          c.nome?.toLowerCase().includes(q) ||
          c.email?.toLowerCase().includes(q) ||
          c.telefone?.toLowerCase().includes(q) ||
          c.documento?.includes(search),
      ),
    );
  }, [search, clients]);

  const handleDelete = async () => {
    if (!clientToDelete) return;
    try {
      await deleteAdminClient(clientToDelete.id);
      toast.success("Cliente removido com sucesso!");
      setClientToDelete(null);
      await loadClients();
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
      toast.error("Erro ao remover cliente");
    }
  };

  const formatDate = (date: string) => {
    if (!date) return "—";
    try {
      return format(new Date(date), "dd/MM/yyyy HH:mm", { locale: ptBR });
    } catch {
      return date;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 animate-pulse rounded bg-muted" />
        <div className="h-10 w-full max-w-sm animate-pulse rounded-lg bg-muted" />
        <Card>
          <CardContent className="space-y-3 p-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-10 animate-pulse rounded bg-muted" />
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
            Clientes
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gerencie os clientes cadastrados na plataforma
          </p>
        </div>
        <Link to="/admin/clients/create">
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Novo Cliente
          </Button>
        </Link>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, email, telefone ou CPF..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <p className="text-sm text-muted-foreground tabular-nums">
          {filteredClients.length} de {clients.length} clientes
        </p>
      </div>

      {/* Table */}
      <Card className="overflow-hidden border-border/60">
        <CardHeader className="border-b bg-muted/30 py-3">
          <CardTitle className="flex items-center gap-2 text-base font-medium">
            <Users className="h-4 w-4 text-muted-foreground" />
            Lista de clientes
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="pl-4">Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="hidden md:table-cell">Telefone</TableHead>
                  <TableHead className="hidden lg:table-cell">CPF</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden sm:table-cell">Cadastro</TableHead>
                  <TableHead className="pr-4 text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-32 text-center">
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Users className="h-8 w-8 opacity-40" />
                        <p>
                          {search
                            ? "Nenhum cliente encontrado"
                            : "Nenhum cliente cadastrado"}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredClients.map((client) => (
                    <TableRow key={client.id} className="group">
                      <TableCell className="pl-4 font-medium">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                            {(client.nome || client.email || "?")
                              .charAt(0)
                              .toUpperCase()}
                          </div>
                          <span className="truncate max-w-[140px] sm:max-w-[200px]">
                            {client.nome || "—"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex max-w-[200px] items-center gap-1.5 truncate text-sm">
                          <Mail className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                          <span className="truncate">{client.email || "—"}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Phone className="h-3.5 w-3.5" />
                          {client.telefone || "—"}
                        </div>
                      </TableCell>
                      <TableCell className="hidden font-mono text-sm text-muted-foreground lg:table-cell">
                        {client.documento || "—"}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={client.active ?? client.active ? "default" : "secondary"}
                          className={
                            client.active ?? client.active
                              ? "bg-emerald-600 hover:bg-emerald-600"
                              : undefined
                          }
                        >
                          {client.active ?? client.active ? "Ativo" : "Inativo"}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatDate(client.created_at)}
                        </div>
                      </TableCell>
                      <TableCell className="pr-4 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-80 transition group-hover:opacity-100">
                          <Link to="/admin/clients/$id" params={{ id: client.id }}>
                            <Button variant="ghost" size="icon" title="Visualizar">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link
                            to="/admin/clients/$id/edit"
                            params={{ id: client.id }}
                          >
                            <Button variant="ghost" size="icon" title="Editar">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:text-destructive"
                                title="Excluir"
                                onClick={() => setClientToDelete(client)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Tem certeza que deseja excluir o cliente{" "}
                                  <strong>{client.nome || client.email}</strong>?
                                  Esta ação não pode ser desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={handleDelete}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Excluir
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}