// components/FavoritarButton.tsx
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useClienteAuth } from '@/contexts/cliente-auth-context';
import { getFavoritoStatus, toggleFavorito } from '@/services/api-cliente';
import { useNavigate } from '@tanstack/react-router';

interface FavoritarButtonProps {
  partnerId: string;
  partnerName: string;
}

export function FavoritarButton({ partnerId, partnerName }: FavoritarButtonProps) {
  const { isAuthenticated } = useClienteAuth();
  const navigate = useNavigate();
  const [isFavorito, setIsFavorito] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    getFavoritoStatus(partnerId)
      .then(res => setIsFavorito(res.isFavorito))
      .catch(() => setIsFavorito(false))
      .finally(() => setLoading(false));
  }, [partnerId, isAuthenticated]);

  const handleToggle = async () => {
    if (!isAuthenticated) {
      // Redireciona para cadastro/login com intenção
      sessionStorage.setItem('redirect_after_login', window.location.pathname);
      sessionStorage.setItem('intended_action', JSON.stringify({
        partnerId,
        partnerName,
        actionType: 'favoritar',
      }));
      navigate({ to: '/cadastro-cliente', search: { message: undefined, partner: undefined } });
      return;
    }

    setLoading(true);
    try {
      const result = await toggleFavorito(partnerId);
      setIsFavorito(result.isFavorito);
    } catch (error) {
      console.error('Erro ao alternar favorito:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition ${
        isFavorito
          ? 'border-red-300 bg-red-50 text-red-600 dark:bg-red-950/30'
          : 'border-border hover:bg-muted'
      }`}
    >
      <Heart className={`size-5 ${isFavorito ? 'fill-current' : ''}`} />
      {isFavorito ? 'Favoritado' : 'Favoritar'}
    </button>
  );
}