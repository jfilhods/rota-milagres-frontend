// components/admin/SidebarAdmin.tsx
import { Link, useRouter } from "@tanstack/react-router";
import { LayoutDashboard, Users, Store, CreditCard, Settings, LogOut, ShieldCheck } from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/admin" },
  { icon: Store, label: "Parceiros", to: "/admin/parceiros" },
  { icon: Users, label: "Usuários", to: "/admin/usuarios" },
  { icon: CreditCard, label: "Assinaturas", to: "/admin/assinaturas" },
  { icon: Settings, label: "Configurações", to: "/admin/configuracoes" },
];

export function SidebarAdmin({ user, logout }: any) {
  const router = useRouter();
  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-card p-4 shadow-xl">
      <div className="flex h-full flex-col">
        <div className="mb-6 flex items-center gap-2 border-b border-border pb-4">
          <ShieldCheck className="size-6 text-primary" />
          <div>
            <p className="text-sm font-medium">Admin</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                router.state.location.pathname === item.to
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={logout}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10"
        >
          <LogOut size={18} /> Sair
        </button>
      </div>
    </aside>
  );
}