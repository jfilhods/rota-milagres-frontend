// pages/definir-senha.tsx
import { useEffect, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";

// Define o tipo dos parâmetros de busca
interface SearchParams {
  token?: string;
  type?: string;
  error?: string;
  error_code?: string;
  error_description?: string;
}

export function DefinirSenhaPage() {
  const search = useSearch({ from: "/definir-senha" }) as SearchParams;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    // Verifica se há erro na URL
    const errorDesc = search.error_description;
    if (errorDesc) {
      setError(decodeURIComponent(errorDesc));
      return;
    }

    // Verifica se há erro de expiração
    if (search.error_code === "otp_expired") {
      setError("O link de convite expirou. Por favor, solicite um novo convite ao administrador.");
      return;
    }

    // Tenta confirmar o convite automaticamente
    const handleInvite = async () => {
      const token = search.token;
      const type = search.type;

      console.log("🔍 Parâmetros recebidos:", { token, type, search });

      if (token && type === "invite") {
        setLoading(true);
        try {
          // Tenta verificar o OTP com o token
          const { data, error } = await supabase.auth.verifyOtp({
            token_hash: token,
            type: "invite",
          });

          if (error) {
            console.error("❌ Erro ao verificar OTP:", error);
            
            // Se o token expirou ou é inválido
            if (error.message.includes("expired") || error.message.includes("invalid")) {
              setError("O link de convite expirou ou é inválido. Solicite um novo convite.");
            } else {
              setError(error.message);
            }
            return;
          }

          console.log("✅ Convite verificado com sucesso:", data);
          
          // Pega o email do usuário
          if (data.user?.email) {
            setEmail(data.user.email);
          }
          
          setSuccess(true);
        } catch (err) {
          console.error("❌ Erro ao processar convite:", err);
          setError(err instanceof Error ? err.message : "Link inválido ou expirado");
        } finally {
          setLoading(false);
        }
      } else {
        // Se não tem token, verifica se o usuário já está logado
        const checkSession = async () => {
          const { data: sessionData } = await supabase.auth.getSession();
          if (sessionData.session) {
            // Usuário já está logado, vai direto para definir senha
            setEmail(sessionData.session.user.email || "");
            setSuccess(true);
          }
        };
        checkSession();
      }
    };

    handleInvite();
  }, [search]);

  const handleSetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const confirmPassword = (form.elements.namedItem("confirmPassword") as HTMLInputElement).value;

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Atualiza a senha do usuário
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        console.error("❌ Erro ao definir senha:", error);
        throw error;
      }

      console.log("✅ Senha definida com sucesso:", data);
      setSuccess(true);
      
      // Aguarda 3 segundos e redireciona para o login
      setTimeout(() => {
        navigate({ to: "/entrar" });
      }, 3000);
    } catch (err) {
      console.error("❌ Erro ao definir senha:", err);
      setError(err instanceof Error ? err.message : "Erro ao definir senha");
    } finally {
      setLoading(false);
    }
  };

  // Se tiver erro, mostra a mensagem
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🔗</div>
            <h2 className="text-2xl font-bold text-red-600 mb-4">Link inválido</h2>
          </div>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800">
              <strong>O que fazer?</strong>
            </p>
            <ul className="text-sm text-yellow-700 mt-2 space-y-1 list-disc list-inside">
              <li>Solicite um novo convite ao administrador</li>
              <li>Verifique se você está usando o link correto do e-mail</li>
              <li>O link é válido por apenas 24 horas</li>
            </ul>
          </div>
          <button
            onClick={() => window.location.href = "/"}
            className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Voltar para o início
          </button>
        </div>
      </div>
    );
  }

  // Se sucesso, mostra mensagem de confirmação
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
          <div className="text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-green-600 mb-4">Senha definida com sucesso!</h2>
            {email && (
              <p className="text-gray-600 mb-2">
                <strong>Email:</strong> {email}
              </p>
            )}
            <p className="text-gray-600 mb-4">
              Sua senha foi definida. Você será redirecionado para o login em instantes.
            </p>
            <div className="animate-pulse text-center text-sm text-gray-400">
              Redirecionando...
            </div>
            <button
              onClick={() => navigate({ to: "/entrar" })}
              className="mt-4 w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Ir para o login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Formulário para definir a senha
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🔐</div>
          <h1 className="text-2xl font-bold text-gray-900">Definir sua senha</h1>
          <p className="text-gray-600 mt-2">
            Escolha uma senha segura para acessar o painel do parceiro.
          </p>
          {email && (
            <p className="text-sm text-gray-500 mt-1">
              Email: <strong>{email}</strong>
            </p>
          )}
        </div>

        <form onSubmit={handleSetPassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nova senha
            </label>
            <input
              type="password"
              name="password"
              required
              minLength={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="Mínimo 6 caracteres"
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">
              Use letras, números e caracteres especiais para uma senha mais forte
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar senha
            </label>
            <input
              type="password"
              name="confirmPassword"
              required
              minLength={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="Digite a senha novamente"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                Definindo...
              </span>
            ) : (
              "Definir senha"
            )}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400">
            O link de convite é válido por 24 horas. Se expirou, solicite um novo.
          </p>
        </div>
      </div>
    </div>
  );
}