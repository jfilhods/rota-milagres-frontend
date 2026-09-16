// src/routes/admin/events.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  getAdminEvents,
  createAdminEvent,
  updateAdminEvent,
  deleteAdminEvent,
  type EventNotice,
} from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  Loader2,
  Plus,
  Pencil,
  Trash2,
  CalendarDays,
  AlertTriangle,
} from "lucide-react";

export const Route = createFileRoute("/admin/events")({
  component: AdminEventsPage,
});

type FormState = {
  title: string;
  description: string;
  start_date: string; // YYYY-MM-DD
  end_date: string;   // YYYY-MM-DD
  image_url: string;
  link: string;
  priority: "high" | "normal";
  active: boolean;
};

const EMPTY_FORM: FormState = {
  title: "",
  description: "",
  start_date: new Date().toISOString().slice(0, 10),
  end_date: "",
  image_url: "",
  link: "",
  priority: "normal",
  active: true,
};

function AdminEventsPage() {
  const [events, setEvents] = useState<EventNotice[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);

  /* ---------- Carrega lista ---------- */
  async function reload() {
    setLoading(true);
    try {
      const res = await getAdminEvents();
      setEvents(res.data ?? []);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao carregar eventos");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    reload();
  }, []);

  /* ---------- Abrir modais ---------- */
  function openNew() {
    setEditingId(null);
    setForm({
      ...EMPTY_FORM,
      start_date: new Date().toISOString().slice(0, 10),
    });
    setOpen(true);
  }

  function openEdit(event: EventNotice) {
    setEditingId(event.id);
    setForm({
      title: event.title,
      description: event.description,
      start_date: event.start_date ? event.start_date.slice(0, 10) : "",
      end_date: event.end_date ? event.end_date.slice(0, 10) : "",
      image_url: event.image_url ?? "",
      link: event.link ?? "",
      priority: event.priority,
      active: event.active,
    });
    setOpen(true);
  }

  /* ---------- Salvar ---------- */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.title.trim()) {
      toast.error("Informe um título");
      return;
    }
    if (!form.description.trim()) {
      toast.error("Informe uma descrição");
      return;
    }
    if (!form.end_date) {
      toast.error("Informe a data final (o anúncio expira automaticamente)");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        start_date: form.start_date
          ? new Date(form.start_date + "T00:00:00").toISOString()
          : new Date().toISOString(),
        end_date: new Date(form.end_date + "T23:59:59").toISOString(),
        image_url: form.image_url.trim() || null,
        link: form.link.trim() || null,
        priority: form.priority,
        active: form.active,
      };

      if (editingId) {
        await updateAdminEvent(editingId, payload);
        toast.success("Evento atualizado!");
      } else {
        await createAdminEvent(payload);
        toast.success("Evento criado!");
      }

      setOpen(false);
      await reload();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  }

  /* ---------- Excluir ---------- */
  async function handleDelete(event: EventNotice) {
    if (!confirm(`Excluir o aviso "${event.title}"?`)) return;
    try {
      await deleteAdminEvent(event.id);
      toast.success("Aviso excluído");
      await reload();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao excluir");
    }
  }

  /* ---------- Ativar / desativar ---------- */
  async function toggleActive(event: EventNotice) {
    try {
      await updateAdminEvent(event.id, { active: !event.active });
      await reload();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao atualizar");
    }
  }

  /* ---------- Helpers de status ---------- */
  function statusOf(event: EventNotice): {
    label: string;
    className: string;
  } {
    const now = Date.now();
    const end = new Date(event.end_date).getTime();
    const start = new Date(event.start_date).getTime();

    if (!event.active) {
      return {
        label: "Inativo",
        className: "bg-muted text-muted-foreground",
      };
    }
    if (end < now) {
      return {
        label: "Expirado",
        className:
          "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400",
      };
    }
    if (start > now) {
      return {
        label: "Agendado",
        className:
          "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
      };
    }
    return {
      label: "No ar",
      className:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
    };
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Avisos & Eventos
          </h1>
          <p className="text-muted-foreground">
            Anúncios que aparecem na seção "Informações úteis" da home.
            Expiração automática pela data final.
          </p>
        </div>

        <Button onClick={openNew}>
          <Plus className="mr-2 size-4" />
          Novo evento
        </Button>
      </div>

      {/* Lista */}
      {loading ? (
        <div className="flex items-center justify-center py-16 text-muted-foreground">
          <Loader2 className="mr-2 size-5 animate-spin" /> Carregando...
        </div>
      ) : events.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground">
          Nenhum aviso cadastrado ainda.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => {
            const st = statusOf(event);
            return (
              <div
                key={event.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
              >
                {event.image_url && (
                  <img
                    src={event.image_url}
                    alt={event.title}
                    className="aspect-[16/9] w-full object-cover"
                    loading="lazy"
                  />
                )}

                <div className="flex flex-1 flex-col gap-3 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      {event.priority === "high" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase text-primary">
                          <AlertTriangle className="size-3" />
                          Destaque
                        </span>
                      )}
                      <h3 className="mt-1 font-medium leading-tight">
                        {event.title}
                      </h3>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${st.className}`}
                    >
                      {st.label}
                    </span>
                  </div>

                  <p className="line-clamp-3 text-sm text-muted-foreground">
                    {event.description}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CalendarDays className="size-3" />
                    {new Date(event.start_date).toLocaleDateString("pt-BR")}
                    <span>→</span>
                    {new Date(event.end_date).toLocaleDateString("pt-BR")}
                  </div>

                  <div className="mt-auto flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEdit(event)}
                    >
                      <Pencil className="mr-1 size-3.5" /> Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleActive(event)}
                    >
                      {event.active ? "Desativar" : "Ativar"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(event)}
                      className="ml-auto text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/30"
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Dialog criar/editar */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Editar evento" : "Novo evento"}
            </DialogTitle>
            <DialogDescription>
              O anúncio aparece na home enquanto estiver ativo e dentro do
              período definido.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                placeholder="Ex: Festival do Peixe-Boi"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição *</Label>
              <textarea
                id="description"
                className="w-full rounded-md border border-border bg-background p-3 text-sm"
                rows={4}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Conte o que vai acontecer, onde, quando..."
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="start_date">Início</Label>
                <Input
                  id="start_date"
                  type="date"
                  value={form.start_date}
                  onChange={(e) =>
                    setForm({ ...form, start_date: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end_date">Fim *</Label>
                <Input
                  id="end_date"
                  type="date"
                  value={form.end_date}
                  onChange={(e) =>
                    setForm({ ...form, end_date: e.target.value })
                  }
                  required
                />
                <p className="text-[11px] text-muted-foreground">
                  O anúncio expira sozinho após essa data.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">URL da imagem</Label>
              <Input
                id="image_url"
                value={form.image_url}
                onChange={(e) =>
                  setForm({ ...form, image_url: e.target.value })
                }
                placeholder="https://..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="link">Link (opcional)</Label>
              <Input
                id="link"
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
                placeholder="https://..."
              />
            </div>

            <div className="space-y-2">
              <Label>Prioridade</Label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="priority"
                    value="normal"
                    checked={form.priority === "normal"}
                    onChange={() =>
                      setForm({ ...form, priority: "normal" })
                    }
                  />
                  Normal
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="priority"
                    value="high"
                    checked={form.priority === "high"}
                    onChange={() =>
                      setForm({ ...form, priority: "high" })
                    }
                  />
                  Destaque
                </label>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) =>
                  setForm({ ...form, active: e.target.checked })
                }
              />
              Deixar ativo imediatamente
            </label>

            <DialogFooter className="gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={saving}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? "Salvando..." : editingId ? "Salvar" : "Criar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}