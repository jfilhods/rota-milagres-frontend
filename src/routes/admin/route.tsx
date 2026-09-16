// src/routes/admin/route.tsx
import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useAuthContext } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  LogOut,
  Store,
  UserCog,
  Gift,
  CalendarDays,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const { user, logout, isAdmin } = useAuthContext();
  const navigate = useNavigate();

  // Proteção básica de rota
  // if (!isAdmin) {
  //   return (
  //     <div className="flex min-h-screen items-center justify-center">
  //       <div className="text-center space-y-4">
  //         <h1 className="text-2xl font-bold">Acesso restrito</h1>
  //         <p className="text-muted-foreground">
  //           Você precisa ser administrador para acessar esta área.
  //         </p>
  //         <Button onClick={() => navigate({ to: "/entrar" })}>
  //           Fazer login
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 w-64 border-r bg-background">
        <div className="flex h-full flex-col">
          {/* Logo / Título */}
          <div className="flex h-16 items-center border-b px-6">
            <Link to="/admin" className="flex items-center gap-2 font-semibold">
              <LayoutDashboard className="h-5 w-5 text-primary" />
              <span>Admin Rota Milagres</span>
            </Link>
          </div>

          {/* Navegação */}
          <nav className="flex-1 space-y-1 p-4">
            <Link
              to="/admin"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
              activeOptions={{ exact: true }}
              activeProps={{
                className:
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium bg-primary text-primary-foreground",
              }}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>

            <Link
              to="/admin/partners"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
              activeProps={{
                className:
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium bg-primary text-primary-foreground",
              }}
            >
              <Store className="h-4 w-4" />
              Parceiros
            </Link>

            <Link
              to="/admin/clients"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
              activeProps={{
                className:
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium bg-primary text-primary-foreground",
              }}
            >
              <UserCog className="h-4 w-4" />
              Clientes
            </Link>
            <Link
              to="/admin/promos"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
              activeProps={{
                className:
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium bg-primary text-primary-foreground",
              }}
            >
              <Gift className="h-4 w-4" />
              Promoções
            </Link>
            <Link
              to="/admin/events"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
              activeProps={{
                className:
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium bg-primary text-primary-foreground",
              }}
            >
              <CalendarDays className="h-4 w-4" />
              Eventos
            </Link>
          </nav>

          {/* Usuário + Logout */}
          <div className="border-t p-4">
            <div className="mb-3 px-3">
              <p className="text-sm font-medium truncate">{user?.email}</p>
              <p className="text-xs text-muted-foreground">Administrador</p>
            </div>
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => logout()}
            >
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <main className="pl-64">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}