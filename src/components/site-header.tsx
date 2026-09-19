// components/site-header.tsx
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Menu, Search, X, UserPlus, LogIn, Compass } from "lucide-react";
import { useState } from "react";


const navLinks = [
  { to: "/", label: "Home" },
  { to: "/categorias", label: "Categorias" },
  //{ to: "/planos", label: "Planos" },
] as const;

export function SiteHeader() {
  const [term, setTerm] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Não renderiza o header público dentro do painel
  if (pathname.startsWith("/painel")) {
    return null;
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const q = term.trim();
    if (!q) return;

    navigate({
      to: "/buscar",
      search: { q },
    });
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">

        {/* Logo + Search */}
        <div className="flex min-w-0 flex-1 items-center gap-8">
          {/* Logo */}
                    <Link to="/">
                        <img src="/icon-rota-milagres.png" alt="Rota Milagres" className="h-14 w-auto" />
                    </Link>

          {/* Search desktop */}
          <form
            onSubmit={submit}
            className="hidden max-w-md flex-1 items-center gap-2.5 rounded-2xl border border-border/60 bg-muted/40 px-4 py-2.5 transition-all focus-within:border-primary/40 focus-within:bg-background focus-within:ring-2 focus-within:ring-primary/10 md:flex"
          >
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              maxLength={80}
              placeholder="Buscar pousadas, restaurantes ou passeios..."
              aria-label="Buscar parceiros"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
            />
          </form>
        </div>

        {/* Nav + Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <nav className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="rounded-xl px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                activeProps={{
                  className: "bg-muted text-foreground",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mx-1 hidden h-5 w-px bg-border/60 sm:block lg:mx-2" />

          {/* <Link
            to="/planos"
            className="hidden rounded-xl px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:inline-flex"
          >
            Seja Parceiro
          </Link> */}

          <Link
            to="/cadastro-cliente"
            search={{
              message: "cadastro",
              partner: "",
            }}
            className="group flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-emerald-600/20 transition-all hover:bg-emerald-700 hover:shadow-md hover:shadow-emerald-600/25 active:scale-[0.98]"
          >
            <UserPlus className="size-4 transition-transform group-hover:scale-110" />
            <span className="hidden sm:inline">Cadastre-se</span>
          </Link>

          <Link
            to="/entrar"
            className="flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background shadow-sm transition-all hover:bg-foreground/90 hover:shadow-md active:scale-[0.98]"
          >
            <LogIn className="size-4 opacity-80" />
            <span className="hidden sm:inline">Entrar</span>
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="ml-1 flex h-10 w-10 items-center justify-center rounded-xl text-foreground transition-colors hover:bg-muted lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="animate-in fade-in slide-in-from-top-2 border-t border-border/50 bg-background/95 px-4 py-5 backdrop-blur-xl lg:hidden">
          {/* Search mobile */}
          <form
            onSubmit={submit}
            className="mb-5 flex items-center gap-2.5 rounded-2xl border border-border/60 bg-muted/50 px-4 py-3"
          >
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              maxLength={80}
              placeholder="O que você procura?"
              aria-label="Buscar parceiros"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </form>

          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                activeProps={{ className: "bg-muted" }}
              >
                {link.label}
              </Link>
            ))}

            <div className="my-3 h-px bg-border/60" />

            <Link
              to="/cadastro-cliente"
              search={{ message: "cadastro", partner: "" }}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold text-emerald-600 transition-colors hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
            >
              <UserPlus className="size-4" />
              Cadastre-se
            </Link>

            <Link
              to="/entrar"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              <LogIn className="size-4" />
              Entrar
            </Link>

            <Link
              to="/planos"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
            >
              Seja um Parceiro
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}