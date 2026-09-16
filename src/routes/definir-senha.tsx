import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { changePassword } from "@/services/api";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/definir-senha")({
  component: ChangePasswordPage,
});

function ChangePasswordPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);

    if (newPassword.length < 8) {
      setError("A senha deve ter no mínimo 8 caracteres");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    if (!user) {
      setError("Usuário não autenticado");
      return;
    }

    setLoading(true);

    try {
      const result = await changePassword(newPassword);

      const updatedUser = {
        ...user,
        must_change_password: false,
      };

      localStorage.setItem(
        "user_data",
        JSON.stringify(updatedUser)
      );

      setSuccess(true);

      setTimeout(() => {
        navigate({
          to: "/painel",
        });
      }, 1000);

      if (!result.success) {
        throw new Error(
          result.error || "Erro ao alterar senha"
        );
      }

      if (
        result.data?.user?.must_change_password !== false
      ) {
        throw new Error(
          "A senha foi alterada, mas a configuração de acesso não foi atualizada."
        );
      }

      setSuccess(true);

      setTimeout(() => {
        navigate({ to: "/painel" });
      }, 1000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erro ao alterar senha"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-md rounded-2xl bg-card p-8 ring-1 ring-border shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="font-display text-2xl font-medium">
            Trocar senha
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Você precisa definir uma nova senha antes de continuar.
          </p>
        </div>

        {success ? (
          <div className="rounded-xl bg-primary/10 p-4 text-center text-primary">
            <p>Senha alterada com sucesso!</p>
            <p className="text-sm">
              Redirecionando para o painel...
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <label className="block text-sm font-medium">
              Nova senha

              <input
                type="password"
                required
                minLength={8}
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                placeholder="Mínimo 8 caracteres"
                autoComplete="new-password"
              />
            </label>

            <label className="block text-sm font-medium">
              Confirmar senha

              <input
                type="password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                placeholder="Digite novamente"
                autoComplete="new-password"
              />
            </label>

            {error && (
              <div className="rounded-xl bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60"
            >
              {loading && (
                <Loader2 className="size-4 animate-spin" />
              )}

              {loading
                ? "Alterando..."
                : "Alterar senha"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}