
// src/routes/clientes/route.tsx

import {
  createFileRoute,
  Link,
  Outlet,
  useNavigate,
} from "@tanstack/react-router";

import { useClienteAuth } from "@/contexts/cliente-auth-context";

import { Button } from "@/components/ui/button";

import {
  LayoutDashboard,
  Heart,
  MessageCircle,
  Star,
  LogOut,
  User,
} from "lucide-react";

export const Route = createFileRoute("/clientes")({
  component: ClienteLayout,
});

function ClienteLayout() {

  const navigate = useNavigate();

  const {
    cliente,
    loading,
    isAuthenticated,
    logout,
  } = useClienteAuth();

  // ----------------------------------------------------------
  // IMPORTANTE:
  // Enquanto o hook estiver verificando o localStorage/API,
  // NÃO devemos decidir que o usuário está deslogado.
  // -----------------------------
  // -----------------------------

  const handleLogout = () => {
  logout();

  navigate({
    to: "/entrar",
  });
};

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />

          <p className="text-sm text-muted-foreground">
            Verificando sua sessão...
          </p>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------
  // SEM SESSÃO
  // ----------------------------------------------------------

  if (!isAuthenticated || !cliente) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
        <User className="h-10 w-10 text-muted-foreground" />

        <h1 className="text-2xl font-bold">
          Acesso restrito
        </h1>

        <p className="text-muted-foreground">
          Faça login para acessar sua área.
        </p>

        <Link to="/entrar">
          <Button type="button">
            Fazer login
          </Button>
        </Link>
      </div>
    );
  }

  // ----------------------------------------------------------
  // AUTENTICADO
  // ----------------------------------------------------------

  const navClass =
    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted";

  const activeClass =
    "flex items-center gap-3 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground";

  return (
    <div className="min-h-screen bg-muted/30">

      {/* SIDEBAR */}

      <aside className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r bg-background">

        <div className="flex h-16 items-center border-b px-6">
          <Link
            to="/clientes"
            className="flex items-center gap-2 font-semibold"
          >
            <User className="h-5 w-5 text-primary" />

            <span>
              Minha Área
            </span>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 p-4">

          <Link
            to="/clientes"
            activeOptions={{
              exact: true,
            }}
            className={navClass}
            activeProps={{
              className: activeClass,
            }}
          >
            <LayoutDashboard className="h-4 w-4" />
            Início
          </Link>

          <Link
            to="/clientes/painel-cliente"
            className={navClass}
            activeProps={{
              className: activeClass,
            }}
          >
            <LayoutDashboard className="h-4 w-4" />
            Painel
          </Link>

          <Link
            to="/clientes/favoritos"
            className={navClass}
            activeProps={{
              className: activeClass,
            }}
          >
            <Heart className="h-4 w-4" />
            Favoritos
          </Link>

          <Link
            to="/clientes/contatos"
            className={navClass}
            activeProps={{
              className: activeClass,
            }}
          >
            <MessageCircle className="h-4 w-4" />
            Contatos
          </Link>

          <Link
            to="/clientes/avaliacoes"
            className={navClass}
            activeProps={{
              className: activeClass,
            }}
          >
            <Star className="h-4 w-4" />
            Avaliações
          </Link>

          <Link
            to="/clientes/perfil"
            className={navClass}
            activeProps={{
              className: activeClass,
            }}
          >
            <User className="h-4 w-4" />
            Meu perfil
          </Link>

          <Link
            to="/"
            className={`${navClass} mt-4 text-muted-foreground`}
          >
            ← Voltar ao site
          </Link>

        </nav>

        {/* USUÁRIO */}

        <div className="border-t p-4">

          <div className="mb-3 px-3">
            <p className="truncate text-sm font-medium">
              {cliente.nome || "Cliente"}
            </p>

            <p className="truncate text-xs text-muted-foreground">
              {cliente.email || ""}
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Button>

        </div>

      </aside>

      {/* CONTEÚDO */}

      <main className="pl-64">
        <div className="p-8">
          <Outlet />
        </div>
      </main>

    </div>
  );
}

