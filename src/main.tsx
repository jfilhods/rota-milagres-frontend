//src/main.tsx

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { router } from "./router";
import { AuthProvider } from "@/hooks/use-auth";
import "./styles.css";

// O QueryClient já está no router, mas precisamos dele para o provider
const queryClient = router.options.context.queryClient;
console.log("main.tsx carregado!");


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);