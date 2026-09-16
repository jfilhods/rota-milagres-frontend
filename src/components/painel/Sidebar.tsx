// src/components/painel/Sidebar.tsx
import {
  BarChart3,
  Building2,
  CalendarDays,
  Camera,
  Gift,
  Home,
  LogOut,
  Settings,
  Star,
  X,
  Clock,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { User } from "@/hooks/use-auth";

interface SidebarProps {
  user: User;
  open?: boolean;
  onClose?: () => void;
  onLogout: () => void;
}

export function Sidebar({
  user,
  open = true,
  onClose,
  onLogout,
}: SidebarProps) {
  const menuItems = [
    {
      label: "Visão geral",
      to: "/painel",
      icon: Home,
      exact: true, // 👈 só ele precisa
    },
    { label: "Meu negócio", to: "/painel/perfil", icon: Building2 },
    { label: "Imagens", to: "/painel/imagens", icon: Camera },
    { label: "Promoções", to: "/painel/promocoes", icon: Gift },
    { label: "Horários", to: "/painel/horarios", icon: Clock },
    { label: "Reservas", to: "/painel/reservas", icon: CalendarDays },
    { label: "Avaliações", to: "/painel/avaliacoes", icon: Star },
    { label: "Estatísticas", to: "/painel/estatisticas", icon: BarChart3 },
  ];

  const bottomItems = [
    { label: "Configurações", to: "/painel/configuracoes", icon: Settings },
  ];

  return (
    <>
      {open && onClose && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-72 flex-col
          border-r border-border bg-card
          transition-transform duration-300
          lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-border px-6">
          <Link
            to="/painel"
            className="flex items-center gap-3"
            onClick={onClose}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Building2 className="size-5" />
            </div>

            <div>
              <p className="font-display text-lg font-semibold">
                Rota Milagres
              </p>
              <p className="text-xs text-muted-foreground">
                Painel do parceiro
              </p>
            </div>
          </Link>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 hover:bg-muted lg:hidden"
            >
              <X className="size-5" />
            </button>
          )}
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto p-4">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Gestão
          </p>

          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  {...(item.exact && { activeOptions: { exact: true } })}
                  activeProps={{
                    className:
                      "bg-primary text-primary-foreground shadow-sm",
                  }}
                  inactiveProps={{
                    className:
                      "text-muted-foreground hover:bg-muted hover:text-foreground",
                  }}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition"
                  onClick={onClose}
                >
                  <Icon className="size-5 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <p className="mb-3 mt-8 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Conta
          </p>

          <div className="space-y-1">
            {bottomItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  activeProps={{
                    className: "bg-primary text-primary-foreground",
                  }}
                  inactiveProps={{
                    className:
                      "text-muted-foreground hover:bg-muted hover:text-foreground",
                  }}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition"
                  onClick={onClose}
                >
                  <Icon className="size-5" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Rodapé */}
        <div className="border-t border-border p-4">
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="size-5" />
            Sair
          </button>
        </div>
      </aside>
    </>
  );
}