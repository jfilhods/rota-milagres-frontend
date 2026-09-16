// src/components/ReservaJangadaModal.tsx
import { useState } from "react";
import { MessageCircle } from "lucide-react";

export function ReservaJangadaModal({
  isOpen,
  onClose,
  partnerName,
  whatsappNumber,
}: {
  isOpen: boolean;
  onClose: () => void;
  partnerName: string;
  whatsappNumber: string | null | undefined;
}) {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [pessoas, setPessoas] = useState(1);

  const handleEnviar = () => {
    if (!nome.trim() || !telefone.trim()) {
      alert("Por favor, preencha nome e telefone.");
      return;
    }
    const numeroWhatsApp = whatsappNumber?.replace(/\D/g, "");
    if (!numeroWhatsApp) {
      alert("Este parceiro ainda não possui um WhatsApp cadastrado.");
      return;
    }
    const mensagem =
      `Olá, gostaria de reservar um passeio de jangada com ${partnerName}.\n\n` +
      `Nome: ${nome.trim()}\n` +
      `Telefone: ${telefone.trim()}\n` +
      `Nº de pessoas: ${pessoas}\n\n` +
      `Aguardando confirmação.`;
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
    onClose();
    setNome("");
    setTelefone("");
    setPessoas(1);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reserva-jangada-title"
    >
      <div className="w-full max-w-md rounded-2xl bg-background p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 id="reserva-jangada-title" className="text-xl font-medium">
              Reservar passeio
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Preencha seus dados para enviar a solicitação via WhatsApp.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            ×
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <label htmlFor="reserva-nome" className="block text-sm font-medium">
              Seu nome
            </label>
            <input
              id="reserva-nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm focus:border-primary focus:outline-none"
              placeholder="Ex: João Silva"
              autoComplete="name"
            />
          </div>
          <div>
            <label htmlFor="reserva-telefone" className="block text-sm font-medium">
              Seu telefone
            </label>
            <input
              id="reserva-telefone"
              type="tel"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm focus:border-primary focus:outline-none"
              placeholder="(99) 99999-9999"
              autoComplete="tel"
            />
          </div>
          <div>
            <label htmlFor="reserva-pessoas" className="block text-sm font-medium">
              Quantas pessoas?
            </label>
            <select
              id="reserva-pessoas"
              value={pessoas}
              onChange={(e) => setPessoas(Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm focus:border-primary focus:outline-none"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "pessoa" : "pessoas"}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={handleEnviar}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 py-2.5 font-medium text-white transition hover:bg-green-700"
          >
            <MessageCircle className="size-4" />
            Enviar via WhatsApp
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-border py-2.5 font-medium transition hover:bg-muted"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}