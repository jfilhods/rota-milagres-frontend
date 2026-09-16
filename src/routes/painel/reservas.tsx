import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, Check, X as XIcon } from "lucide-react";
import {
  listReservations,
  updateReservationStatus,
  type Reservation,
} from "@/lib/partner-api";
import { formatPrice } from "@/lib/catalog";

export const Route = createFileRoute("/painel/reservas")({
  component: ReservasPage,
});

const STATUS_LABEL: Record<Reservation["status"], string> = {
  pending: "Pendente",
  confirmed: "Confirmada",
  cancelled: "Cancelada",
  done: "Concluída",
};

const STATUS_CLASS: Record<Reservation["status"], string> = {
  pending: "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400",
  confirmed:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-400",
  done: "bg-muted text-muted-foreground",
};

function ReservasPage() {
  const [items, setItems] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  async function reload() {
    setLoading(true);
    try {
      setItems(await listReservations());
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    reload();
  }, []);

  async function change(id: string, status: Reservation["status"]) {
    try {
      await updateReservationStatus(id, status);
      await reload();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao atualizar.");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-muted-foreground">
        <Loader2 className="mr-2 size-5 animate-spin" />
        Carregando reservas...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold md:text-3xl">
          Reservas
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Acompanhe e gerencie os pedidos de reserva dos seus clientes.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground">
          Nenhuma reserva recebida ainda.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/40 text-left text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Cliente</th>
                <th className="px-4 py-3">Contato</th>
                <th className="px-4 py-3">Pacote</th>
                <th className="px-4 py-3">Valor</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {items.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-medium">{r.customerName}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {r.customerPhone}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {r.packageName ?? "—"}
                    {r.people ? ` · ${r.people}p` : ""}
                  </td>
                  <td className="px-4 py-3">
                    {r.price != null ? formatPrice(r.price) : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_CLASS[r.status]}`}
                    >
                      {STATUS_LABEL[r.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      {r.status === "pending" && (
                        <>
                          <button
                            type="button"
                            onClick={() => change(r.id, "confirmed")}
                            className="rounded-lg p-2 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                            title="Confirmar"
                          >
                            <Check className="size-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => change(r.id, "cancelled")}
                            className="rounded-lg p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                            title="Cancelar"
                          >
                            <XIcon className="size-4" />
                          </button>
                        </>
                      )}
                      {r.status === "confirmed" && (
                        <button
                          type="button"
                          onClick={() => change(r.id, "done")}
                          className="rounded-lg px-3 py-1.5 text-xs font-medium hover:bg-muted"
                        >
                          Marcar como concluída
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}