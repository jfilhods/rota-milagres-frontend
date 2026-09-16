import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="bg-foreground px-4 py-16 text-background/70">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-12 md:flex-row">
        <div className="max-w-[40ch]">
          <span className="mb-4 block font-display text-2xl font-semibold text-background">
            Rota Milagres
          </span>
          <p className="text-sm leading-relaxed">
            Conectando turistas ao coração da Costa dos Corais: São Miguel dos Milagres, Porto de Pedras,
            Japaratinga e Passo de Camaragibe.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-16 gap-y-8">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-background">Descubra</span>
            <Link to="/categorias" className="text-sm transition-colors hover:text-background">
              Categorias
            </Link>
            <Link
              to="/categoria/$slug"
              params={{ slug: "passeios-de-jangada" }}
              className="text-sm transition-colors hover:text-background"
            >
              Passeios
            </Link>
            <Link
              to="/categoria/$slug"
              params={{ slug: "restaurantes" }}
              className="text-sm transition-colors hover:text-background"
            >
              Gastronomia
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-background">Negócios</span>
            <Link to="/planos" className="text-sm transition-colors hover:text-background">
              Seja Parceiro
            </Link>
            <Link to="/planos" className="text-sm transition-colors hover:text-background">
              Planos
            </Link>
            <Link to="/entrar" className="text-sm transition-colors hover:text-background">
              Entrar
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-background">Ajuda</span>
            <Link to="/buscar" className="text-sm transition-colors hover:text-background">
              Busca inteligente
            </Link>
            <a href="https://wa.me/558291189998" className="text-sm transition-colors hover:text-background">
              Suporte
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-7xl flex-col justify-between gap-4 border-t border-background/10 pt-8 sm:flex-row">
        <span className="text-xs">© 2026 Rota Milagres Marketplace.</span>
        <span className="text-xs">Feito com amor em Alagoas</span>
      </div>
    </footer>
  );
}
