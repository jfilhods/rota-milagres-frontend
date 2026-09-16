import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, LogOut, Mail, Lock } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/painel/configuracoes")({
  component: ConfiguracoesPage,
});

function ConfiguracoesPage() {
  const { user, logout } = useAuth();
  const [saving, setSaving] = useState(false);

  async function handleUpdateEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    // TODO: chamar endpoint de atualização
    setTimeout(() => setSaving(false), 800);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold md:text-3xl">
          Configurações
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Gerencie os dados de acesso da sua conta.
        </p>
      </div>

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-5 flex items-center gap-2 font-display text-lg font-semibold">
          <Mail className="size-4" />
          E-mail
        </h2>
        <form onSubmit={handleUpdateEmail} className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">
              E-mail atual
            </span>
            <input
              type="email"
              className="input"
              defaultValue={user?.email ?? ""}
              readOnly
            />
          </label>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium transition hover:bg-muted disabled:opacity-50"
          >
            {saving && <Loader2 className="size-4 animate-spin" />}
            Solicitar troca de e-mail
          </button>
        </form>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-5 flex items-center gap-2 font-display text-lg font-semibold">
          <Lock className="size-4" />
          Senha
        </h2>
        <p className="text-sm text-muted-foreground">
          Enviaremos um link para você redefinir sua senha por e-mail.
        </p>
        <button
          type="button"
          className="mt-4 inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium transition hover:bg-muted"
        >
          Redefinir senha
        </button>
      </section>

      <section className="rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-900/40 dark:bg-red-950/20">
        <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-red-700 dark:text-red-400">
          <LogOut className="size-4" />
          Sair da conta
        </h2>
        <p className="mt-2 text-sm text-red-700/80 dark:text-red-400/80">
          Você precisará entrar novamente para acessar o painel.
        </p>
        <button
          type="button"
          onClick={() => void logout()}
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          <LogOut className="size-4" />
          Sair
        </button>
      </section>
    </div>
  );
}