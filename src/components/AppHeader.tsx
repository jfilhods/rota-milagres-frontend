// components/AppHeader.tsx
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, X, UserPlus, User, LogOut, Shield, Store, Home, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useClienteAuth } from "@/contexts/cliente-auth-context";
import logo from "@/assets/rota-milagres-logo.png";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const navLinks = [
    { to: "/categorias", label: "Categorias" },
    { to: "/buscar", label: "Buscar" },
    //{ to: "/planos", label: "Planos" },
] as const;

export function AppHeader() {
    const navigate = useNavigate();
    const [term, setTerm] = useState("");
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // ========================================================
    // ADMIN / PARCEIRO
    // ========================================================
    const {
        isAuthenticated,
        isAdmin,
        isPartner,
        userName,
        logout,
        user,
    } = useAuth();

    // ========================================================
    // CLIENTE
    // ========================================================
    const {
        cliente,
        isAuthenticated: isClienteAuthenticated,
        logout: logoutCliente,
    } = useClienteAuth();

    const isCliente = isClienteAuthenticated && !!cliente;

    // ========================================================
    // SCROLL
    // ========================================================
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // ========================================================
    // MENSAGEM DE EXPIRAÇÃO
    // ========================================================
    useEffect(() => {
        const expiredMessage = sessionStorage.getItem(
            "session_expired_message"
        );

        if (expiredMessage) {
            toast.warning(expiredMessage, {
                duration: 5000,
                position: "top-center",
            });

            sessionStorage.removeItem("session_expired_message");
        }
    }, []);

    // ========================================================
    // BUSCA
    // ========================================================
    function submit(event: React.FormEvent) {
        event.preventDefault();

        navigate({
            to: "/buscar",
            search: {
                q: term || undefined,
            },
        });

        setOpen(false);
    }

    // ========================================================
    // LOGOUT
    // ========================================================
    function handleLogout() {
        sessionStorage.setItem(
            "session_expired_message",
            "Sessão encerrada"
        );

        if (isCliente) {
            logoutCliente();
        } else {
            logout();
        }

        navigate({
            to: "/",
        });
    }

    // ========================================================
    // DASHBOARD
    // ========================================================
    const getDashboardLink = (): "/admin" | "/painel" | "/clientes" | "/" => {
        if (isAdmin) return "/admin";
        if (isPartner) return "/painel";
        if (isCliente) return "/clientes";

        return "/";
    };

    // ========================================================
    // ÍCONE
    // ========================================================
    const getUserIcon = () => {
        if (isAdmin) {
            return <Shield className="size-4" />;
        }

        if (isPartner) {
            return <Store className="size-4" />;
        }

        if (isCliente) {
            return <User className="size-4" />;
        }

        return <User className="size-4" />;
    };

    // ========================================================
    // COR DO BADGE
    // ========================================================
    const getBadgeColor = () => {
        if (isAdmin) {
            return "bg-purple-500/10 text-purple-600 border-purple-200 dark:bg-purple-500/20 dark:text-purple-400 dark:border-purple-500/30";
        }

        if (isPartner) {
            return "bg-blue-500/10 text-blue-600 border-blue-200 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30";
        }

        if (isCliente) {
            return "bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30";
        }

        return "";
    };

    // ========================================================
    // TEXTO DO BADGE
    // ========================================================
    const getBadgeText = () => {
        if (isAdmin) return "Admin";
        if (isPartner) return "Parceiro";
        if (isCliente) return "Cliente";

        return "";
    };

    const dashboardLink = getDashboardLink();

    // Se estiver autenticado, mostra o header com perfil
    if (isAuthenticated || isCliente) {
        return (
            <header className={`sticky top-0 z-50 transition-all duration-200 ${scrolled
                ? 'border-b border-border/70 bg-background/95 backdrop-blur-md shadow-sm'
                : 'bg-background/90 backdrop-blur-md'
                }`}>
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
                    {/* Logo */}
                    <Link to="/">
                        <img src="/rota-milagres-logo.png" alt="Rota Milagres" className="h-14 w-auto" />
                    </Link>

                    {/* Busca */}
                    <form
                        onSubmit={submit}
                        className="hidden items-center gap-2 rounded-full bg-muted px-4 py-2 ring-1 ring-border md:flex md:w-80"
                    >
                        <Search className="size-4 shrink-0 text-muted-foreground" />
                        <input
                            value={term}
                            onChange={(e) => setTerm(e.target.value)}
                            maxLength={80}
                            placeholder="Buscar pousadas ou passeios..."
                            aria-label="Buscar parceiros"
                            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                        />
                    </form>

                    {/* Ações - Logado */}
                    <div className="flex items-center gap-2">
                        {/* Badge do tipo de usuário */}
                        <span className={`hidden rounded-full border px-2 py-0.5 text-xs font-medium sm:inline-block ${getBadgeColor()}`}>
                            {getBadgeText()}
                        </span>

                        {/* Botão Ver Site */}
                        <Link
                            to="/"
                            className="flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                            <Eye className="size-4" />
                            <span className="hidden sm:inline">Ver site</span>
                        </Link>

                        {/* Menu do Perfil */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="flex items-center gap-2 pl-2 pr-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                                        {(isCliente ? cliente?.nome : user?.nome)?.[0]?.toUpperCase()
                                            || (isCliente ? cliente?.email : user?.email)?.[0]?.toUpperCase()
                                            || "U"}
                                    </div>
                                    <span className="hidden text-sm font-medium md:inline-block">
                                        {isCliente
                                            ? cliente?.nome?.split(" ")[0] || "Conta"
                                            : user?.nome?.split(" ")[0] || "Conta"}
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{isCliente
                                            ? cliente?.nome || "Cliente"
                                            : user?.nome || "Usuário"}</p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {isCliente
                                                ? cliente?.email || ""
                                                : user?.email || ""}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                <DropdownMenuItem asChild>
                                    <Link to={dashboardLink}>
                                        <User className="mr-2 h-4 w-4" />
                                        Meu perfil
                                    </Link>
                                </DropdownMenuItem>

                                {isAdmin && (
                                    <DropdownMenuItem asChild>
                                        <Link to="/admin">
                                            <Shield className="mr-2 h-4 w-4" />
                                            Administração
                                        </Link>
                                    </DropdownMenuItem>
                                )}

                                {isPartner && user && user.partner?.slug && (
                                    <DropdownMenuItem asChild>
                                        <Link to="/parceiro/$slug"
                                            params={{ slug: user.partner.slug }}
                                        >
                                            <Store className="mr-2 h-4 w-4" />
                                            Meu negócio
                                        </Link>
                                    </DropdownMenuItem>
                                )}

                                <DropdownMenuSeparator />

                                <DropdownMenuItem
                                    className="text-red-600 focus:text-red-600"
                                    onClick={handleLogout}
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Sair
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Menu Mobile */}
                        <button
                            type="button"
                            onClick={() => setOpen((v) => !v)}
                            aria-label="Abrir menu"
                            className="rounded-full p-2 text-foreground transition-colors hover:bg-muted lg:hidden"
                        >
                            {open ? <X className="size-5" /> : <Menu className="size-5" />}
                        </button>
                    </div>
                </div>

                {/* Menu Mobile expandido */}
                {open && (
                    <div className="border-t border-border bg-background px-4 py-4 lg:hidden">
                        <form onSubmit={submit} className="mb-4 flex items-center gap-2 rounded-full bg-muted px-4 py-2">
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
                        <nav className="flex flex-col gap-2">
                            <Link
                                to="/"
                                onClick={() => setOpen(false)}
                                className="py-2 text-sm font-medium text-foreground"
                            >
                                Ver site
                            </Link>
                            <Link
                                to={dashboardLink}
                                onClick={() => setOpen(false)}
                                className="py-2 text-sm font-medium text-primary"
                            >
                                Meu perfil
                            </Link>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setOpen(false);
                                }}
                                className="py-2 text-left text-sm font-medium text-red-600"
                            >
                                Sair
                            </button>
                        </nav>
                    </div>
                )}
            </header>
        );
    }

    // Se NÃO estiver autenticado, mostra o header público
    return (
        <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
                {/* Logo */}
                <img src="/rota-milagres-logo.png" alt="Rota Milagres" className="h-14 w-auto" />

                {/* Busca */}
                <form
                    onSubmit={submit}
                    className="hidden items-center gap-2 rounded-full bg-muted px-4 py-2 ring-1 ring-border md:flex md:w-80"
                >
                    <Search className="size-4 shrink-0 text-muted-foreground" />
                    <input
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        maxLength={80}
                        placeholder="Buscar pousadas ou passeios..."
                        aria-label="Buscar parceiros"
                        className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    />
                </form>

                {/* Ações - Não Logado */}
                <div className="flex items-center gap-2">
                    <nav className="hidden items-center gap-1 lg:flex">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                activeProps={{ className: "text-foreground" }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* <Link
                        to="/planos"
                        className="hidden rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
                    >
                        Seja um Parceiro
                    </Link> */}

                    <Link
                        to="/cadastro-cliente"
                        search={{
                            message: "cadastro",
                            partner: "",
                        }}
                        className="flex items-center gap-1 rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-[1.02] hover:bg-emerald-700"
                    >
                        <UserPlus className="size-4" />
                        <span className="hidden sm:inline">Cadastre-se</span>
                    </Link>

                    <Link
                        to="/entrar"
                        className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
                    >
                        Entrar
                    </Link>

                    {/* Menu Mobile */}
                    <button
                        type="button"
                        onClick={() => setOpen((v) => !v)}
                        aria-label="Abrir menu"
                        className="rounded-full p-2 text-foreground transition-colors hover:bg-muted lg:hidden"
                    >
                        {open ? <X className="size-5" /> : <Menu className="size-5" />}
                    </button>
                </div>
            </div>

            {/* Menu Mobile expandido */}
            {open && (
                <div className="border-t border-border bg-background px-4 py-4 lg:hidden">
                    <form onSubmit={submit} className="mb-4 flex items-center gap-2 rounded-full bg-muted px-4 py-2">
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
                    <nav className="flex flex-col gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                onClick={() => setOpen(false)}
                                className="py-2 text-sm font-medium text-foreground"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <hr className="my-2 border-border" />
                        <Link
                            to="/cadastro-cliente"
                            search={{
                                message: "cadastro",
                                partner: "",
                            }}
                            onClick={() => setOpen(false)}
                            className="py-2 text-sm font-medium text-emerald-600"
                        >
                            Cadastre-se
                        </Link>
                        <Link
                            to="/entrar"
                            onClick={() => setOpen(false)}
                            className="py-2 text-sm font-medium text-foreground"
                        >
                            Entrar
                        </Link>
                        <Link
                            to="/planos"
                            onClick={() => setOpen(false)}
                            className="py-2 text-sm font-medium text-muted-foreground"
                        >
                            Seja um Parceiro
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}