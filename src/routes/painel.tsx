// src/routes/painel.tsx
import { useRef, useEffect, useState } from "react";
import { Outlet, useNavigate, createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { Sidebar } from "@/components/painel/Sidebar";
import { Header } from "@/components/painel/Header";
import { OnboardingModal } from "@/components/painel/OnboardingModal";
import type { Partner } from "@/lib/catalog";

export const Route = createFileRoute("/painel")({
  component: PanelLayout,
});

// painel.tsx
function hasCompleteData(partner: unknown): boolean {
  if (!partner || typeof partner !== "object") return false;

  const p = partner as {
    name?: string | null;
    category_id?: string | null;
    city_id?: string | null;
    category?: unknown;
    city?: unknown;
    whatsapp?: string | null;
  };

  return Boolean(
    p.name?.trim() &&
      (p.category_id || p.category) &&
      (p.city_id || p.city) &&
      p.whatsapp?.trim()
  );
}

function PanelLayout() {
  const { user, loading, logout, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const lastLog = useRef<string>("");

  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: "/entrar" });
    }
  }, [user, loading, navigate]);

  // log único por estado
  const sig = `${user?.partner_id ?? "none"}-${hasCompleteData(user?.partner)}`;
  if (lastLog.current !== sig) {
    lastLog.current = sig;
    console.log("[painel] user:", user);
    console.log("[painel] completo?", hasCompleteData(user?.partner));
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        Carregando...
      </div>
    );
  }

  if (!user) return null;

  // Sem partner OU com dados incompletos → modal
  if (!user.partner_id || !hasCompleteData(user.partner)) {
    return (
      <OnboardingModal
        userEmail={user.email}
        userName={user.nome ?? ""}
        onSuccess={async () => {
          await refreshUser();
          navigate({ to: "/painel", replace: true });
        }}
      />
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