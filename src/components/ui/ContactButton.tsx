// components/ContactButton.tsx
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useClienteAuth } from "@/contexts/cliente-auth-context";
import { registrarClienteInteracao } from "@/services/api-cliente";
import { Loader2, MessageCircle } from "lucide-react";

interface ContactButtonProps {
  partnerId: string;
  partnerName: string;
  partnerPhone: string;
  className?: string;
  children?: React.ReactNode;
  onSuccess?: () => void;
  showToast?: boolean;
}

export function ContactButton({
  partnerId,
  partnerName,
  partnerPhone,
  className = "",
  children,
  onSuccess,
}: ContactButtonProps) {
  const { isAuthenticated } = useClienteAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleContact() {
    // Verifica se o cliente está autenticado
    if (!isAuthenticated) {
      // Salva a intenção no sessionStorage
      sessionStorage.setItem("redirect_after_login", window.location.pathname);
      sessionStorage.setItem("intended_action", JSON.stringify({
        partnerId,
        partnerName,
        actionType: "whatsapp",
        partnerPhone,
      }));

      // Redireciona para cadastro com mensagem
      navigate({
        to: "/cadastro-cliente",
        search: {
          message: `Cadastre-se para entrar em contato com ${partnerName}`,
          partner: partnerName,
        },
      });
      return;
    }

    try {
      setLoading(true);

      // Registra a interação
      await registrarClienteInteracao(partnerId);

      // Abre o WhatsApp
      const phone = partnerPhone.replace(/\D/g, "");
      window.open(`https://wa.me/${phone}`, "_blank");

      onSuccess?.();
    } catch (error) {
      console.error("Erro ao registrar interação:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleContact}
      disabled={loading}
      className={className}
    >
      {loading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        children || (
          <>
            <MessageCircle className="size-4" />
            WhatsApp
          </>
        )
      )}
    </button>
  );
}