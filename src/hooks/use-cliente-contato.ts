import { useNavigate } from "@tanstack/react-router";
import { registrarClienteInteracao } from "@/services/api-cliente";
import { useClienteAuth } from "@/contexts/cliente-auth-context";

export function useClienteContato() {
  const navigate = useNavigate();
  const { isAuthenticated } = useClienteAuth();

  async function entrarEmContato(
    partnerId: string,
    tipo = "contato",
    partnerPhone?: string,
  ) {
    if (!isAuthenticated) {
      sessionStorage.setItem(
        "redirect_after_login",
        "/clientes",
      );

      sessionStorage.setItem(
        "intended_action",
        JSON.stringify({
          partnerId,
          actionType: tipo,
          partnerPhone,
        }),
      );

      navigate({
        to: "/clientes",
      });

      return false;
    }

    try {
      await registrarClienteInteracao(partnerId);

      if (tipo === "whatsapp" && partnerPhone) {
        const phone = partnerPhone.replace(/\D/g, "");

        window.open(
          `https://wa.me/${phone}`,
          "_blank",
        );
      }

      return true;
    } catch (error) {
      console.error(
        "Erro ao registrar interação:",
        error,
      );

      return false;
    }
  }

  return {
    entrarEmContato,
  };
}