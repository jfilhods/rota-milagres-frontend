// components/ClienteActionButton.tsx
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useClienteAuth } from "@/contexts/cliente-auth-context";
import { registrarClienteInteracao, adicionarFavorito } from "@/services/api-cliente";
import { Loader2 } from "lucide-react";

interface Props {
  children: React.ReactNode;
  partnerId: string;
  partnerName: string;
  partnerPhone?: string;
  actionType: "whatsapp" | "contato" | "visita" | "favoritar";
  className?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function ClienteActionButton({
  children,
  partnerId,
  partnerName,
  partnerPhone,
  actionType,
  className = "",
  onSuccess,
  onError,
}: Props) {
  const { isAuthenticated } = useClienteAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    // WhatsApp → abre direto, sem exigir cadastro
    if (actionType === "whatsapp" && partnerPhone) {
      const phone = partnerPhone.replace(/\D/g, "");
      window.open(`https://wa.me/${phone}`, "_blank");

      // Se estiver logado, registra a interação em background (opcional)
      if (isAuthenticated) {
        registrarClienteInteracao(partnerId).catch(console.error);
      }

      onSuccess?.();
      return;
    }

    // Demais ações (favoritar, contato, visita) → exigem cadastro
    if (!isAuthenticated) {
      sessionStorage.setItem("redirect_after_login", window.location.pathname);
      sessionStorage.setItem(
        "intended_action",
        JSON.stringify({
          partnerId,
          partnerName,
          actionType,
          partnerPhone: partnerPhone || null,
        }),
      );

      navigate({
        to: "/cadastro-cliente",
        search: {
          message: `Cadastre-se para ${
            actionType === "favoritar" ? "favoritar" : "entrar em contato com"
          } ${partnerName}`,
          partner: partnerName,
        },
      });
      return;
    }

    try {
      setLoading(true);

      if (actionType === "favoritar") {
        await adicionarFavorito(partnerId);
      } else {
        await registrarClienteInteracao(partnerId);
      }

      onSuccess?.();
    } catch (error) {
      console.error("Erro na ação:", error);
      onError?.(error as Error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button onClick={handleClick} disabled={loading} className={className}>
      {loading ? <Loader2 className="size-4 animate-spin" /> : children}
    </button>
  );
}