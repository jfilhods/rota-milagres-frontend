// src/routes/admin/route.tsx
import {
  createFileRoute,
  Link,
  Outlet,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  LogOut,
  Store,
  UserCog,
  Gift,
  CalendarDays,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils"; // se não tiver, use template string

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

const NAV = [
  {
    to: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    to: "/admin/partners",
    label: "Parceiros",
    icon: Store,
  },
  {
    to: "/admin/clients",
    label: "Clientes",
    icon: UserCog,
  },
  {
    to: "/admin/promos",
    label: "Promoções",
    icon: Gift,
  },
  {
    to: "/admin/events",
    label: "Eventos",
    icon: CalendarDays,
  },
] as const;

function AdminLayout() {
  const { user, logout, isAdmin } = useAuthContext();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const [mobileOpen, setMobileOpen] = useState(false);

  // Fecha o menu ao mudar de rota
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Trava scroll do body com menu aberto no mobile
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Proteção de rota (descomente quando quiser)
  // if (!isAdmin) {
  //   return (
  //     <div className="flex min-h-screen items-center justify-center p-6">
  //       <div className="max-w-sm space-y-4 text-center">
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

  const isActive = (to: string, exact?: boolean) => {
    if (exact) return pathname === to || pathname === `${to}/`;
    return pathname === to || pathname.startsWith(`${to}/`);
  };

  const navLinkClass = (active: boolean) =>
    cn(
      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
      active
        ? "bg-primary text-primary-foreground"
        : "text-muted-foreground hover:bg-muted hover:text-foreground"
    );

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-14 shrink-0 items-center justify-between border-b px-4 md:h-16 md:px-6">
        <Link
          to="/admin"
          className="flex items-center gap-2 font-semibold"
          onClick={() => setMobileOpen(false)}
        >
          <LayoutDashboard className="h-5 w-5 text-primary" />
          <span className="truncate">Admin Rota Milagres</span>
        </Link>
        <button
          type="button"
          className="rounded-md p-2 text-muted-foreground hover:bg-muted md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Fechar menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-3 md:p-4">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.to, "exact" in item && item.exact);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={navLinkClass(active)}
              onClick={() => setMobileOpen(false)}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User + logout */}
      <div className="shrink-0 border-t p-3 md:p-4">
        <div className="mb-3 px-1">
          <p className="truncate text-sm font-medium">{user?.email}</p>
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
  );

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Overlay mobile */}
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          aria-label="Fechar menu"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar — drawer no mobile, fixa no desktop */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[min(100%,16rem)] border-r bg-background shadow-xl transition-transform duration-200 ease-out md:z-30 md:w-64 md:translate-x-0 md:shadow-none",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Área principal */}
      <div className="md:pl-64">
        {/* Top bar mobile */}
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:hidden">
          <button
            type="button"
            className="rounded-md p-2 text-foreground hover:bg-muted"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">Admin Rota Milagres</p>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}