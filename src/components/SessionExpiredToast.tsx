// components/SessionExpiredToast.tsx
import { useEffect } from "react";
import { toast } from "sonner"; // ou use seu sistema de toast preferido

export function SessionExpiredToast({ message }: { message: string }) {
  useEffect(() => {
    toast.warning(message, {
      duration: 5000,
      position: "top-center",
    });
  }, [message]);

  return null;
}