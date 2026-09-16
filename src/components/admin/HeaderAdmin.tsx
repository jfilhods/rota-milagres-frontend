import {
  Bell,
  Menu,
  ExternalLink,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { AuthUser } from "@/hooks/use-auth";

interface HeaderProps {
  user: AuthUser | null;
  onMenuClick?: () => void;
}

export function HeaderAdmin({
  user,
  onMenuClick,
}: HeaderProps) {
  const partnerName =
    user?.partner?.name || "Meu negócio";

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur md:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-xl p-2 hover:bg-muted lg:hidden"
        >
          <Menu className="size-6" />
        </button>

        <div>
          <h1 className="text-lg font-semibold">
            Painel do parceiro
          </h1>

          <p className="hidden text-sm text-muted-foreground sm:block">
            {partnerName}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link
          to="/"
          className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground sm:flex"
        >
          <ExternalLink className="size-4" />
          Ver site
        </Link>

        <button
          type="button"
          className="relative rounded-xl p-2.5 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <Bell className="size-5" />

          <span className="absolute right-2 top-2 size-2 rounded-full bg-primary" />
        </button>

        <div className="ml-2 flex size-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
          bot{partnerName.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}