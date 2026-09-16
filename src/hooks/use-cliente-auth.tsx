
// src/hooks/use-cliente-auth.tsx

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  loginCliente,
  getClienteProfile,
  registerCliente,
  logoutCliente,
  getStoredCliente,
  type Cliente,
  type ClienteRegisterData,
} from "@/services/api-cliente";

export function useClienteAuth() {
  const [cliente, setCliente] =
    useState<Cliente | null>(() => {
      return getStoredCliente();
    });

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  // ==========================================================
  // RESTAURAR SESSÃO
  // ==========================================================

  const loadSession = useCallback(async () => {
    const token = localStorage.getItem(
      "cliente_token",
    );

    const clienteSalvo =
      getStoredCliente();

    console.log(
      "🔍 RESTAURANDO SESSÃO CLIENTE",
      {
        temToken: Boolean(token),
        temCliente: Boolean(clienteSalvo),







        
      },
    );

    // --------------------------------------------------------
    // Não existe token
    // --------------------------------------------------------

    if (!token) {
      console.log(
        "⚠️ Nenhum cliente_token encontrado",
      );

      setCliente(null);
      setLoading(false);

      return;
    }

    // --------------------------------------------------------
    // Temos token → validar com backend
    // --------------------------------------------------------

    try {
      console.log(
        "🔐 Validando token do cliente...",
      );

      const response =
        await getClienteProfile();

      console.log(
        "✅ Perfil recuperado:",
        response,
      );

      if (
        response.success &&
        response.data?.cliente
      ) {
        const clienteAtual =
          response.data.cliente;

        setCliente(clienteAtual);

        localStorage.setItem(
          "cliente_data",
          JSON.stringify(clienteAtual),
        );

        localStorage.setItem(
          "cliente",
          JSON.stringify(clienteAtual),
        );

        setError(null);

        console.log(
          "✅ Sessão do cliente restaurada:",
          clienteAtual.nome,
        );
      } else {
        throw new Error(
          "Perfil do cliente inválido",
        );
      }
    } catch (err) {
      console.error(
        "❌ Token do cliente inválido:",
        err,
      );

      logoutCliente();

      setCliente(null);

      setError(
        err instanceof Error
          ? err.message
          : "Sessão inválida",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // ==========================================================
  // INIT
  // ==========================================================

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  // ==========================================================
  // LOGIN
  // ==========================================================

  const login = async (
    email: string,
    password: string,
  ) => {
    setLoading(true);
    setError(null);

    try {
      console.log(
        "🔐 Iniciando login do cliente...",
      );

      const response =
        await loginCliente(
          email,
          password,
        );

      console.log(
        "📦 RESPOSTA RECEBIDA NO HOOK:",
        response,
      );

      if (
        !response.success ||
        !response.data?.token ||
        !response.data?.cliente
      ) {
        throw new Error(
          "Login inválido",
        );
      }

      // ------------------------------------------------------
      // IMPORTANTE:
      // loginCliente já salvou o token.
      // Aqui apenas atualizamos o estado React.
      // ------------------------------------------------------

      setCliente(
        response.data.cliente,
      );

      console.log(
        "✅ LOGIN CONCLUÍDO",
      );

      console.log(
        "🎫 TOKEN EXISTE:",
        Boolean(
          localStorage.getItem(
            "cliente_token",
          ),
        ),
      );

      console.log(
        "👤 CLIENTE:",
        response.data.cliente,
      );

      return response.data.cliente;
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Erro ao realizar login";

      console.error(
        "❌ LOGIN CLIENTE:",
        message,
      );

      setError(message);

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // REGISTER
  // ==========================================================

  const register = async (
    data: ClienteRegisterData,
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response =
        await registerCliente(data);

      if (
        !response.success ||
        !response.data?.token ||
        !response.data?.cliente
      ) {
        throw new Error(
          "Cadastro inválido",
        );
      }

      setCliente(
        response.data.cliente,
      );

      return response.data.cliente;
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Erro ao cadastrar";

      setError(message);

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // LOGOUT
  // ==========================================================

  const logout = () => {
    console.log(
      "🚪 Logout cliente",
    );

    logoutCliente();

    setCliente(null);
    setError(null);
  };

  return {
    cliente,
    loading,
    error,

    isAuthenticated:
      Boolean(cliente),

    login,
    register,
    logout,
  };
}

