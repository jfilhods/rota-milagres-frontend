// components/cliente/ClienteForm.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const clienteSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  telefone: z.string().optional(),
  mensagem: z.string().optional()
});

type ClienteFormData = z.infer<typeof clienteSchema>;

interface ClienteFormProps {
  partnerSlug: string;
  onSuccess?: () => void;
}

export function ClienteForm({ partnerSlug, onSuccess }: ClienteFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ClienteFormData>({
    resolver: zodResolver(clienteSchema)
  });

  const onSubmit = async (data: ClienteFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/cliente/public/${partnerSlug}/contato`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erro ao enviar contato");
      }

      reset();
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao enviar contato");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md">
          {error}
        </div>
      )}

      <div>
        <Input
          {...register("nome")}
          placeholder="Seu nome"
          disabled={isLoading}
        />
        {errors.nome && (
          <p className="text-sm text-red-500 mt-1">{errors.nome.message}</p>
        )}
      </div>

      <div>
        <Input
          {...register("email")}
          placeholder="Seu email"
          type="email"
          disabled={isLoading}
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Input
          {...register("telefone")}
          placeholder="Seu telefone (opcional)"
          disabled={isLoading}
        />
        {errors.telefone && (
          <p className="text-sm text-red-500 mt-1">{errors.telefone.message}</p>
        )}
      </div>

      <div>
        <Textarea
          {...register("mensagem")}
          placeholder="Sua mensagem (opcional)"
          rows={4}
          disabled={isLoading}
        />
        {errors.mensagem && (
          <p className="text-sm text-red-500 mt-1">{errors.mensagem.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? "Enviando..." : "Enviar Contato"}
      </Button>
    </form>
  );
}