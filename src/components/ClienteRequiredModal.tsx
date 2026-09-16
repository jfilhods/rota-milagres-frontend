// components/ClienteRequiredModal.tsx
import { Link } from "@tanstack/react-router";
import { X, UserPlus, LogIn } from "lucide-react";
import { DashboardLink } from "./DashboardLink";

interface ClienteRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  partnerName: string;
  action: string;
}

export function ClienteRequiredModal({
  isOpen,
  onClose,
  partnerName,
  action,
}: ClienteRequiredModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative max-w-md w-full rounded-2xl bg-card p-6 shadow-xl ring-1 ring-border">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 hover:bg-muted"
        >
          <X className="size-5" />
        </button>

        <div className="text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10">
            <UserPlus className="size-8 text-primary" />
          </div>

          <h2 className="mt-4 font-display text-2xl font-medium">
            Cadastre-se para continuar
          </h2>

          <p className="mt-2 text-muted-foreground">
            Para entrar em contato com <strong>{partnerName}</strong> via {action},
            você precisa ter um cadastro no Rota Milagres.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <DashboardLink
              to="/cadastro-cliente"
              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90"
              onClick={onClose}
            >
              <UserPlus className="size-4" />
              Criar cadastro gratuito
            </DashboardLink>

            <DashboardLink
              to="/entrar"
              className="flex items-center justify-center gap-2 rounded-xl border border-border px-5 py-3 font-medium transition hover:bg-muted"
              onClick={onClose}
            >
              <LogIn className="size-4" />
              Já tenho cadastro
            </DashboardLink>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Ao cadastrar você poderá acompanhar seus contatos, favoritar parceiros e muito mais.
          </p>
        </div>
      </div>
    </div>
  );
}