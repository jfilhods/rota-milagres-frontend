// routes/cadastro-cliente.tsx
import { FormEvent, useEffect, useState } from "react";
import {
    createFileRoute,
    Link,
    useNavigate,
    useSearch,
} from "@tanstack/react-router";
import { registerCliente } from "@/services/api-cliente"; 
import {
    Eye,
    EyeOff,
    Loader2,
    UserPlus,
    Info,
    CheckCircle,
    XCircle,
} from "lucide-react";

import { useClienteAuth } from "@/contexts/cliente-auth-context";
import { AppHeader } from "@/components/AppHeader";

export const Route = createFileRoute("/cadastro-cliente")({
    component: CadastroClientePage,
    validateSearch: (search: Record<string, unknown>) => {
        return {
            message: search["message"] as string | undefined,
            partner: search["partner"] as string | undefined,
        };
    },
});

function CadastroClientePage() {
    const { register, loading, error } = useClienteAuth();
    const search = useSearch({ from: "/cadastro-cliente" });
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Mensagem de aviso
    const [warningMessage, setWarningMessage] = useState<string | null>(
        search.message || null
    );

    // Estado para feedback do CPF
    const [cpfStatus, setCpfStatus] = useState<"valid" | "invalid" | "incomplete" | null>(null);

    // Validação de CPF
    const validarCPF = (cpf: string): boolean => {
        const raw = cpf.replace(/\D/g, "");
        if (raw.length !== 11) return false;
        if (/^(\d)\1{10}$/.test(raw)) return false;

        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += Number(raw[i]) * (10 - i);
        }
        let resto = 11 - (soma % 11);
        const dig1 = resto >= 10 ? 0 : resto;

        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += Number(raw[i]) * (11 - i);
        }
        resto = 11 - (soma % 11);
        const dig2 = resto >= 10 ? 0 : resto;

        return Number(raw[9]) === dig1 && Number(raw[10]) === dig2;
    };

    // Atualiza o status do CPF em tempo real
    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Remove tudo que não for número e limita a 11 dígitos
        const raw = e.target.value.replace(/\D/g, "").slice(0, 11);
        setCpf(raw);

        // Avalia o status
        if (raw.length === 11) {
            setCpfStatus(validarCPF(raw) ? "valid" : "invalid");
        } else {
            setCpfStatus("incomplete");
        }
    };

    useEffect(() => {
        if (search.message) {
            setWarningMessage(search.message);
        }
    }, [search.message]);

    // Estado para erro de validação local
    const [validationError, setValidationError] = useState<string | null>(null);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // Valida CPF
        if (!validarCPF(cpf)) {
            setValidationError("CPF inválido. Digite um CPF válido (ex: 000.000.000-00).");
            return;
        }
        setValidationError(null);

        try {
            await register({
                nome,
                email,
                documento: cpf,
                telefone,
                password,
            });

            navigate({
                to: "/clientes",
            });
        } catch {
            // erro já tratado pelo hook
        }
    }

    return (
        <>
        <AppHeader/>
        <section className="px-4 py-20">
            <div className="mx-auto max-w-md rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border">
                <div className="mb-8 text-center">
                    <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                        <UserPlus className="size-5" />
                    </div>

                    <h1 className="mt-4 font-display text-2xl font-medium">
                        Criar cadastro
                    </h1>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Cadastre-se para entrar em contato com os parceiros.
                    </p>
                </div>

                {/* Mensagem de aviso */}
                {warningMessage && (
                    <div className="mb-4 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800 dark:border-blue-800/30 dark:bg-blue-950/30 dark:text-blue-300">
                        <Info className="mt-0.5 size-4 shrink-0" />
                        <div>
                            <p>{warningMessage}</p>
                            {search.partner && (
                                <p className="mt-1 text-xs opacity-75">
                                    Você será redirecionado após o cadastro.
                                </p>
                            )}
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block text-sm font-medium">
                        Nome
                        <input
                            required
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Seu nome"
                        />
                    </label>

                    <label className="block text-sm font-medium">
                        E-mail
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                            placeholder="voce@email.com"
                        />
                    </label>

                    {/* Campo CPF com feedback */}
                    <div className="space-y-1">
                        <label className="block text-sm font-medium">
                            CPF
                            <input
                                type="text"
                                required
                                value={cpf}
                                onChange={handleCpfChange}
                                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                                placeholder="000.000.000-00"
                                maxLength={11} // apenas números, mas serve como garantia extra
                            />
                        </label>
                        {/* Feedback do CPF */}
                        {cpfStatus && (
                            <div className="flex items-center gap-2 text-sm">
                                {cpfStatus === "valid" && (
                                    <>
                                        <CheckCircle className="size-4 text-green-600" />
                                        <span className="text-green-600">CPF válido</span>
                                    </>
                                )}
                                {cpfStatus === "invalid" && (
                                    <>
                                        <XCircle className="size-4 text-red-600" />
                                        <span className="text-red-600">CPF inválido</span>
                                    </>
                                )}
                                {cpfStatus === "incomplete" && (
                                    <span className="text-muted-foreground">
                                        Digite os 11 números do CPF
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    <label className="block text-sm font-medium">
                        Telefone
                        <input
                            type="tel"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                            placeholder="(82) 99999-9999"
                        />
                    </label>

                    <label className="block text-sm font-medium">
                        Senha
                        <div className="relative mt-2">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                minLength={8}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-xl border border-border bg-background px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Mínimo 8 caracteres"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((value) => !value)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                            >
                                {showPassword ? (
                                    <EyeOff className="size-5" />
                                ) : (
                                    <Eye className="size-5" />
                                )}
                            </button>
                        </div>
                    </label>

                    {/* Exibe erro de validação local ou erro do hook */}
                    {(validationError || error) && (
                        <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                            {validationError || error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground disabled:opacity-60"
                    >
                        {loading && <Loader2 className="size-4 animate-spin" />}
                        {loading ? "Criando cadastro..." : "Criar cadastro"}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm">
                    Já possui cadastro?{" "}
                    <Link
                        to="/entrar"
                        className="font-medium text-primary hover:underline"
                    >
                        Entrar
                    </Link>
                </div>
            </div>
        </section>
    </>
    );
}