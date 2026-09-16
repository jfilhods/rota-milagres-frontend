// src/routes/admin/clients/route.tsx
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users } from "lucide-react";

export const Route = createFileRoute("/admin/clients")({
  component: ClientsLayout,
});

function ClientsLayout() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/admin">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Users className="h-8 w-8" />
            Clientes
          </h1>
          <p className="text-muted-foreground">
            Gerencie todos os clientes da plataforma
          </p>
        </div>
      </div>
      <Outlet />
    </div>
  );
}