// src/contexts/cliente-auth-context.tsx
import React, {
  createContext,
  useContext,
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

interface ClienteAuthContextType {
  cliente: Cliente | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<Cliente>;
  register: (data: ClienteRegisterData) => Promise<Cliente>;
  logout: () => void;
}

const ClienteAuthContext = createContext<ClienteAuthContextType | undefined>(
  undefined
);

export function ClienteAuthProvider({ children }: { children: React.ReactNode }) {
  const [cliente, setCliente] = useState<Cliente | null>(() => getStoredCliente());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSession = useCallback(async () => {
    const token = localStorage.getItem("cliente_token");
    const clienteSalvo = getStoredCliente();

    // Se não houver token, finaliza sem cliente
    if (!token) {
      setCliente(null);
      setLoading(false);
      return;
    }

    try {
      const response = await getClienteProfile();
      if (response.success && response.data?.cliente) {
        const clienteAtual = response.data.cliente;
        setCliente(clienteAtual);
        // Atualiza o localStorage com os dados mais recentes
        localStorage.setItem("cliente_data", JSON.stringify(clienteAtual));
        localStorage.setItem("cliente", JSON.stringify(clienteAtual));
        setError(null);
      } else {
        throw new Error("Perfil do cliente inválido");
      }
    } catch (err) {
      console.error("❌ Erro ao validar token do cliente:", err);

      // Se for erro 401 (token expirado/inválido), desloga
      // Caso contrário, mantém o cliente salvo (para não perder a sessão por falha de rede)
      const status =
        typeof err === "object" && err !== null && "status" in err
          ? (err as { status?: number }).status
          : undefined;

      if (status === 401 || (err instanceof Error && err.message.includes("401"))) {
        logoutCliente();
        setCliente(null);
      } else {
        // Mantém o cliente do localStorage, mas marca erro
        setCliente(clienteSalvo);
        setError("Falha ao validar sessão, mas você permanece logado localmente.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginCliente(email, password);
      if (!response.success || !response.data?.token || !response.data?.cliente) {
        throw new Error("Login inválido");
      }
      setCliente(response.data.cliente);
      return response.data.cliente;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao realizar login";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: ClienteRegisterData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await registerCliente(data);
      if (!response.success || !response.data?.token || !response.data?.cliente) {
        throw new Error("Cadastro inválido");
      }
      setCliente(response.data.cliente);
      return response.data.cliente;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao cadastrar";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    logoutCliente();
    setCliente(null);
    setError(null);
  };

  const value = {
    cliente,
    loading,
    error,
    isAuthenticated: !!cliente,
    login,
    register,
    logout,
  };

  return (
    <ClienteAuthContext.Provider value={value}>
      {children}
    </ClienteAuthContext.Provider>
  );
}

export function useClienteAuth() {
  const context = useContext(ClienteAuthContext);
  if (!context) {
    throw new Error("useClienteAuth must be used within ClienteAuthProvider");
  }
  return context;
}