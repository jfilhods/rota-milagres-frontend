import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
    getAdminPromos,
    createAdminPromo,
    updateAdminPromo,
    deleteAdminPromo,
    getAdminPartners,
    cleanupExpiredPromos,
    type AdminPromo,
    type PromoInput,
    type AdminPartner,
} from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Loader2, Pencil, Plus, Trash2, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/admin/promos")({
    component: AdminPromosPage,
});

const EMPTY: PromoInput = {
    partner_id: "",
    title: "",
    detail: "",
    badge: "",
    image_url: "",
    active: true,
    starts_at: "",
    ends_at: "",
};

function AdminPromosPage() {
    const [promos, setPromos] = useState<AdminPromo[]>([]);
    const [partners, setPartners] = useState<AdminPartner[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [cleaning, setCleaning] = useState(false);
    const [open, setOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState<PromoInput>(EMPTY);

    const activePartners = partners.filter((p) => p.active);

    async function reload() {
        setLoading(true);
        try {
            const [promosRes, partnersRes] = await Promise.all([
                getAdminPromos(),
                getAdminPartners(),
            ]);
            setPromos(promosRes.data || []);
            setPartners(partnersRes.data || []);
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Erro ao carregar");
            setPromos([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        reload();
    }, []);

    function openNew() {
        setEditingId(null);
        setForm(EMPTY);
        setOpen(true);
    }

    function openEdit(promo: AdminPromo) {
        setEditingId(promo.id);
        setForm({
            partner_id: promo.partner_id,
            title: promo.title,
            detail: promo.detail ?? "",
            badge: promo.badge ?? "",
            image_url: promo.image_url ?? "",
            active: promo.active,
            starts_at: promo.starts_at ? promo.starts_at.slice(0, 10) : "",
            ends_at: promo.ends_at ? promo.ends_at.slice(0, 10) : "",
        });
        setOpen(true);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!form.partner_id || !form.title.trim()) {
            toast.error("Selecione um parceiro e informe um título");
            return;
        }

        setSaving(true);
        try {
            const payload: PromoInput = {
                partner_id: form.partner_id,
                title: form.title.trim(),
                detail: form.detail?.trim() || null,
                badge: form.badge?.trim() || null,
                image_url: form.image_url?.trim() || null,
                active: form.active ?? true,
                starts_at: form.starts_at ? new Date(form.starts_at).toISOString() : null,
                ends_at: form.ends_at ? new Date(form.ends_at).toISOString() : null,
            };

            if (editingId) {
                await updateAdminPromo(editingId, payload);
                toast.success("Promoção atualizada!");
            } else {
                await createAdminPromo(payload);
                toast.success("Promoção criada!");
            }

            setOpen(false);
            await reload();
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Erro ao salvar");
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(promo: AdminPromo) {
        if (!confirm(`Excluir a promoção "${promo.title}"?`)) return;
        try {
            await deleteAdminPromo(promo.id);
            toast.success("Promoção excluída");
            await reload();
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Erro ao excluir");
        }
    }

    async function handleCleanup() {
        if (!confirm("Remover todas as promoções já expiradas?")) return;
        setCleaning(true);
        try {
            const res = await cleanupExpiredPromos();
            toast.success(res.data?.message ?? "Limpeza concluída");
            await reload();
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Erro ao limpar");
        } finally {
            setCleaning(false);
        }
    }
    function daysUntil(dateStr: string | null): number | null {
        if (!dateStr) return null;
        const diff = new Date(dateStr).getTime() - Date.now();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    }

    async function toggleActive(promo: AdminPromo) {
        try {
            await updateAdminPromo(promo.id, { active: !promo.active });
            await reload();
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Erro ao atualizar");
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Promoções</h1>
                    <p className="text-muted-foreground">
                        Crie pacotes com parceiros e destaque na home do site.
                    </p>
                </div>
                <Button variant="outline" onClick={handleCleanup} disabled={cleaning}>
                    {cleaning ? (
                        <Loader2 className="mr-2 size-4 animate-spin" />
                    ) : (
                        <Trash2 className="mr-2 size-4" />
                    )}
                    Limpar expiradas
                </Button>
                <Button onClick={openNew}>
                    <Plus className="mr-2 size-4" />
                    Nova promoção
                </Button>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-16 text-muted-foreground">
                    <Loader2 className="mr-2 size-5 animate-spin" /> Carregando...
                </div>
            ) : promos.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground">
                    Nenhuma promoção cadastrada ainda.
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {promos.map((promo) => (
                        <div
                            key={promo.id}
                            className="overflow-hidden rounded-2xl border border-border bg-card"
                        >
                            {promo.image_url && (
                                <img
                                    src={promo.image_url}
                                    alt={promo.title}
                                    className="aspect-[16/9] w-full object-cover"
                                    loading="lazy"
                                />
                            )}
                            <div className="space-y-3 p-4">
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        {promo.badge && (
                                            <span className="text-xs font-semibold text-primary">
                                                {promo.badge}
                                            </span>
                                        )}
                                        <h3 className="font-medium leading-tight">{promo.title}</h3>
                                    </div>
                                    <span
                                        className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${promo.active
                                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                                            : "bg-muted text-muted-foreground"
                                            }`}
                                    >
                                        {promo.active ? "Ativa" : "Inativa"}
                                    </span>
                                </div>

                                {promo.detail && (
                                    <p className="line-clamp-2 text-sm text-muted-foreground">
                                        {promo.detail}
                                    </p>
                                )}

                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <ExternalLink className="size-3" />
                                    {promo.partners?.name || "Parceiro não vinculado"}
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => openEdit(promo)}
                                    >
                                        <Pencil className="mr-1 size-3.5" /> Editar
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => toggleActive(promo)}
                                    >
                                        {promo.active ? "Desativar" : "Ativar"}
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleDelete(promo)}
                                        className="ml-auto text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/30"
                                    >
                                        <Trash2 className="size-3.5" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Dialog criar/editar */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>
                            {editingId ? "Editar promoção" : "Nova promoção"}
                        </DialogTitle>
                        <DialogDescription>
                            Essa promoção aparecerá na home do site quando estiver ativa.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4 py-2">
                        <div className="space-y-2">
                            <Label>Parceiro *</Label>
                            <Select
                                value={form.partner_id}
                                onValueChange={(val) => setForm({ ...form, partner_id: val })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione o parceiro" />
                                </SelectTrigger>
                                <SelectContent>
                                    {activePartners.length === 0 ? (
                                        <div className="px-3 py-2 text-sm text-muted-foreground">
                                            Nenhum parceiro ativo no momento.
                                        </div>
                                    ) : (
                                        activePartners.map((p) => (
                                            <SelectItem key={p.id} value={p.id}>
                                                {p.name}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="title">Título *</Label>
                            <Input
                                id="title"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                placeholder="Ex: Pacote Romântico"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="detail">Descrição</Label>
                            <Input
                                id="detail"
                                value={form.detail ?? ""}
                                onChange={(e) => setForm({ ...form, detail: e.target.value })}
                                placeholder="Ex: 2 diárias com café da manhã e jantar"
                            />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="badge">Selo / Badge</Label>
                                <Input
                                    id="badge"
                                    value={form.badge ?? ""}
                                    onChange={(e) => setForm({ ...form, badge: e.target.value })}
                                    placeholder="Ex: 25% OFF"
                                />
                            </div>
                            {(() => {
                                const d = daysUntil(promos.find((p) => p.id === editingId)?.ends_at ?? null);
                                if (d === null) return null;
                                if (d < 0)
                                    return (
                                        <span className="text-xs font-medium text-red-600">
                                            Expirada há {Math.abs(d)} dia(s)
                                        </span>
                                    );
                                if (d <= 3)
                                    return (
                                        <span className="text-xs font-medium text-amber-600">
                                            Expira em {d} dia(s)
                                        </span>
                                    );
                                return null;
                            })()}
                            <div className="space-y-2">
                                <Label htmlFor="image_url">URL da imagem</Label>
                                <Input
                                    id="image_url"
                                    value={form.image_url ?? ""}
                                    onChange={(e) =>
                                        setForm({ ...form, image_url: e.target.value })
                                    }
                                    placeholder="https://..."
                                />
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="starts_at">Início</Label>
                                <Input
                                    id="starts_at"
                                    type="date"
                                    value={form.starts_at ?? ""}
                                    onChange={(e) =>
                                        setForm({ ...form, starts_at: e.target.value })
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="ends_at">Fim</Label>
                                <Input
                                    id="ends_at"
                                    type="date"
                                    value={form.ends_at ?? ""}
                                    onChange={(e) =>
                                        setForm({ ...form, ends_at: e.target.value })
                                    }
                                />
                            </div>
                        </div>

                        <label className="flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                checked={form.active ?? true}
                                onChange={(e) =>
                                    setForm({ ...form, active: e.target.checked })
                                }
                            />
                            Deixar ativa imediatamente
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