// routes/__root.tsx
import { QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { ClienteAuthProvider } from "@/contexts/cliente-auth-context";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AuthProvider, useAuth } from "@/hooks/use-auth";

import type { RouterContext } from "@/router";
import { AppHeader } from '@/components/AppHeader'

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

// Criar a rota raiz com o contexto tipado
export const Route = createRootRouteWithContext<RouterContext>()({
 head: () => ({
  meta: [
    { charSet: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { title: "Rota Milagres — Descrubra tudo na Rota dos Corais, Alagoas" },
    {
      name: "description",
      content:
        "Marketplace de turismo de São Miguel dos Milagres, Porto de Pedras, Japaratinga e Passo de Camaragibe.",
    },
    { name: "theme-color", content: "#0e7490" },

    // Open Graph (Facebook, WhatsApp, LinkedIn, etc.)
    { property: "og:title", content: "Rota Milagres" },
    {
      property: "og:description",
      content:
        "Pousadas, restaurantes, passeios e serviços da Rota Ecológica de Alagoas.",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://rotamilagres.vercel.app" }, // ajuste para seu domínio
    { property: "og:site_name", content: "Rota Milagres" },
    { property: "og:locale", content: "pt_BR" },
    {
      property: "og:image",
      content: "https://rotamilagres.vercel.app/icon-rota-milagres.png", // ajuste o domínio
    },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: "Rota Milagres — Descrubra tudo na Rota dos Corais, Alagoas" },

    // Twitter / X
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Rota Milagres" },
    {
      name: "twitter:description",
      content:
        "Pousadas, restaurantes, passeios e serviços da Rota Ecológica de Alagoas.",
    },
    {
      name: "twitter:image",
      content: "https://rotamilagres.vercel.app/icon-rota-milagres.png",
    },
  ],
  links: [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap",
    },
    { rel: "stylesheet", href: appCss },
    { rel: "icon", href: "/icon-rota-milagres.png", type: "image/x-icon" },
    { rel: "icon", type: "image/png", href: "/icon-rota-milagres.png" },
    { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
  ],
}),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,

});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

// O contexto de autenticação só pode ser consumido por componentes dentro do
// AuthProvider. Por isso, o layout fica separado do componente que registra os
// providers globais.
function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ClienteAuthProvider>
          <div className="flex min-h-screen flex-col">
            {/* REMOVA O SITEHEADER DAQUI */}
            {/* <SiteHeader /> */}

            <main className="flex-1">
              <Outlet />
            </main>

            <SiteFooter />
          </div>
        </ClienteAuthProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}


function RootLayout() {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      {user && (
        <SiteHeader
        />
      )}
      <AppHeader />
      <main className="flex-1">
        <Outlet />
      </main>

      <SiteFooter />
    </div>
  );
}
