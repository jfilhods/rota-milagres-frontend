import { createRouter } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import type { AuthContextType } from "@/hooks/use-auth";
import { routeTree } from "@/routeTree.gen";

export type RouterContext = {
  queryClient: QueryClient;
  auth: AuthContextType;
};

const emptyAuth: AuthContextType = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  isAdmin: false,
  isPartner: false,
  currentRole: null,
  userName: "",

  login: async () => {},
  logout: async () => {},
  refreshUser: async () => {},
};

export function getRouter() {
  const queryClient = new QueryClient();

  return createRouter({
    routeTree,

    context: {
      queryClient,
      auth: emptyAuth,
    },
  });
}

export const router = getRouter();

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}