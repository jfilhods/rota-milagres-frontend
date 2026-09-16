// components/AvaliacaoForm.tsx
import { useState } from 'react';
import { Star, Loader2 } from 'lucide-react';
import { useClienteAuth } from '@/contexts/cliente-auth-context';
import { criarClienteAvaliacao } from '@/services/api-cliente';
import { useNavigate } from '@tanstack/react-router';

interface AvaliacaoFormProps {
  partnerId: string;
  onSuccess: () => void;
}

export function AvaliacaoForm({ partnerId, onSuccess }: AvaliacaoFormProps) {
  const { isAuthenticated } = useClienteAuth();
  const navigate = useNavigate();
  const [nota, setNota] = useState(0);
  const [comentario, setComentario] = useState('');
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      sessionStorage.setItem('redirect_after_login', window.location.pathname);
      sessionStorage.setItem('intended_action', JSON.stringify({
        partnerId,
        actionType: 'avaliacao',
      }));
      navigate({ to: '/cadastro-cliente', search: { message: undefined, partner: undefined } });
      return;
    }
    if (nota === 0) {
      alert('Selecione uma nota');
      return;
    }
    setEnviando(true);
    try {
      await criarClienteAvaliacao(partnerId, nota, comentario.trim() || undefined);
      onSuccess();
      setNota(0);
      setComentario('');
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error);
      alert('Erro ao enviar avaliação. Tente novamente.');
    } finally {
      setEnviando(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <button
        onClick={() => {
          sessionStorage.setItem('redirect_after_login', window.location.pathname);
          navigate({ to: '/entrar', search: { message: undefined, partner: undefined } });
        }}
        className="text-sm text-primary hover:underline"
      >
        Faça login para avaliar
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Sua nota</label>
        <div className="flex gap-1 mt-1">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              type="button"
              onClick={() => setNota(star)}
              className="text-2xl text-amber-500 transition"
            >
              <Star className={`size-6 ${star <= nota ? 'fill-current' : ''}`} />
            </button>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="comentario" className="block text-sm font-medium">Comentário (opcional)</label>
        <textarea
          id="comentario"
          rows={3}
          value={comentario}
          onChange={e => setComentario(e.target.value)}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
          placeholder="Conte sua experiência..."
        />
      </div>
      <button
        type="submit"
        disabled={enviando || nota === 0}
        className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
      >
        {enviando ? <Loader2 className="size-4 animate-spin" /> : <Star className="size-4" />}
        Enviar avaliação
      </button>
    </form>
  );
}