// src/routes/painel.tsx
import { Outlet, useNavigate, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Sidebar } from "@/components/painel/Sidebar";
import { Header } from "@/components/painel/Header";

export const Route = createFileRoute("/painel")({
  component: PanelLayout,
});

function PanelLayout() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: "/entrar" });
    }
  }, [user, loading, navigate]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        Carregando...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        user={user}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={() => void logout()}
      />

      <div className="flex flex-1 flex-col lg:pl-72">
        <Header
          user={user}
          onMenuClick={() => setSidebarOpen(true)}
          onLogout={() => void logout()}
        />

        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}