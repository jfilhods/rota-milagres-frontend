// components/dashboard-header.tsx (Header para usuários logados)
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Bell, LogOut, User, Settings, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";

interface DashboardHeaderProps {
  onMenuClick?: () => void;
  title?: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: string;
}

export function DashboardHeader({ 
  onMenuClick,
  title,
  subtitle,
  badge,
  badgeColor
}: DashboardHeaderProps) {
  const { user, logout, isAdmin, isPartner, isCliente } = useAuth();
  const navigate = useNavigate();

  // Configurações padrão baseadas no role
  const roleConfig = {
    admin: {
      title: title || "Painel Administrativo",
      subtitle: subtitle || `Olá, ${user?.nome || "Admin"}`,
      badge: badge || "Admin",
      badgeColor: badgeColor || "bg-purple-500/20 text-purple-300",
      dashboardLink: "/admin/dashboard",
      homeLink: "/admin",
    },
    partner: {
      title: title || "Painel do Parceiro",
      subtitle: subtitle || `Olá, ${user?.nome?.split(" ")[0] || "Parceiro"}`,
      badge: badge || "Parceiro",
      badgeColor: badgeColor || "bg-blue-500/20 text-blue-300",
      dashboardLink: "/partner/dashboard",
      homeLink: "/partner",
    },
    cliente: {
      title: title || "Minha Conta",
      subtitle: subtitle || `Olá, ${user?.nome?.split(" ")[0] || "Cliente"}`,
      badge: badge || "Cliente",
      badgeColor: badgeColor || "bg-emerald-500/20 text-emerald-300",
      dashboardLink: "/clientes",
      homeLink: "/clientes",
    },
  };

  // Determina qual configuração usar
  let config = {
    title: "Painel",
    subtitle: `Olá, ${user?.nome || "Usuário"}`,
    badge: "Usuário",
    badgeColor: "bg-background/20 text-background",
    dashboardLink: "/",
    homeLink: "/",
  };

  if (isAdmin) config = roleConfig.admin;
  else if (isPartner) config = roleConfig.partner;
  else if (isCliente) config = roleConfig.cliente;

  const handleLogout = async () => {
    await logout();
    navigate({ to: "/" });
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:px-6">
      {/* Lado esquerdo */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <Link to={config.homeLink} className="flex items-center gap-2 hover:opacity-80">
          <Home className="h-4 w-4 text-muted-foreground" />
          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold tracking-tight">{config.title}</h1>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${config.badgeColor}`}
              >
                {config.badge}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{config.subtitle}</p>
          </div>
        </Link>
      </div>

      {/* Lado direito */}
      <div className="flex items-center gap-2">
        {/* Notificações */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
        </Button>

        {/* Menu do usuário */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 pl-2 pr-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                {user?.nome?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "U"}
              </div>
              <span className="hidden text-sm font-medium md:inline-block">
                {user?.nome?.split(" ")[0] || "Conta"}
              </span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.nome || "Usuário"}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email || ""}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link to={config.dashboardLink}>
                <User className="mr-2 h-4 w-4" />
                Meu perfil
              </Link>
            </DropdownMenuItem>

            {isCliente && (
              <DropdownMenuItem asChild>
                <Link to="/clientes">
                  <Settings className="mr-2 h-4 w-4" />
                  Minha conta
                </Link>
              </DropdownMenuItem>
            )}

            {isPartner && user && user.partner?.slug && (
              <DropdownMenuItem asChild>
                <Link to="/categoria/$slug"
                params={{ slug: user.partner.slug }}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Gerenciar negócio
                </Link>
              </DropdownMenuItem>
            )}

            {isAdmin && (
              <DropdownMenuItem asChild>
                <Link to="/admin">
                  <Settings className="mr-2 h-4 w-4" />
                  Administração
                </Link>
              </DropdownMenuItem>
            )}

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="text-red-600 focus:text-red-600"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}