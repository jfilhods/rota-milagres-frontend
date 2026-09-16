import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) navigate({ to: "/entrar" });
  }, [loading, isAuthenticated, navigate]);

  if (loading || !isAuthenticated) return null;
  return <>{children}</>;
}
