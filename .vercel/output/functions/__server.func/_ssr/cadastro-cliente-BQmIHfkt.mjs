import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { b as useSearch, v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as useClienteAuth } from "./router-HQ7TexWm.mjs";
import { F as LoaderCircle, G as EyeOff, R as Info, W as Eye, X as CircleX, Z as CircleCheckBig, o as UserPlus } from "../_libs/lucide-react.mjs";
import { t as AppHeader } from "./AppHeader-BEEr3yfu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cadastro-cliente-BQmIHfkt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CadastroClientePage() {
	const { register, loading, error } = useClienteAuth();
	const search = useSearch({ from: "/cadastro-cliente" });
	const navigate = useNavigate();
	const [nome, setNome] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [cpf, setCpf] = (0, import_react.useState)("");
	const [telefone, setTelefone] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [warningMessage, setWarningMessage] = (0, import_react.useState)(search.message || null);
	const [cpfStatus, setCpfStatus] = (0, import_react.useState)(null);
	const validarCPF = (cpf) => {
		const raw = cpf.replace(/\D/g, "");
		if (raw.length !== 11) return false;
		if (/^(\d)\1{10}$/.test(raw)) return false;
		let soma = 0;
		for (let i = 0; i < 9; i++) soma += Number(raw[i]) * (10 - i);
		let resto = 11 - soma % 11;
		const dig1 = resto >= 10 ? 0 : resto;
		soma = 0;
		for (let i = 0; i < 10; i++) soma += Number(raw[i]) * (11 - i);
		resto = 11 - soma % 11;
		const dig2 = resto >= 10 ? 0 : resto;
		return Number(raw[9]) === dig1 && Number(raw[10]) === dig2;
	};
	const handleCpfChange = (e) => {
		const raw = e.target.value.replace(/\D/g, "").slice(0, 11);
		setCpf(raw);
		if (raw.length === 11) setCpfStatus(validarCPF(raw) ? "valid" : "invalid");
		else setCpfStatus("incomplete");
	};
	(0, import_react.useEffect)(() => {
		if (search.message) setWarningMessage(search.message);
	}, [search.message]);
	const [validationError, setValidationError] = (0, import_react.useState)(null);
	async function handleSubmit(event) {
		event.preventDefault();
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
				password
			});
			navigate({ to: "/clientes" });
		} catch {}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "px-4 py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-md rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-8 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-4 font-display text-2xl font-medium",
							children: "Criar cadastro"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Cadastre-se para entrar em contato com os parceiros."
						})
					]
				}),
				warningMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800 dark:border-blue-800/30 dark:bg-blue-950/30 dark:text-blue-300",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "mt-0.5 size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: warningMessage }), search.partner && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs opacity-75",
						children: "Você será redirecionado após o cadastro."
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm font-medium",
							children: ["Nome", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								value: nome,
								onChange: (e) => setNome(e.target.value),
								className: "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary",
								placeholder: "Seu nome"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm font-medium",
							children: ["E-mail", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								required: true,
								value: email,
								onChange: (e) => setEmail(e.target.value),
								className: "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary",
								placeholder: "voce@email.com"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-sm font-medium",
								children: ["CPF", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									required: true,
									value: cpf,
									onChange: handleCpfChange,
									className: "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary",
									placeholder: "000.000.000-00",
									maxLength: 11
								})]
							}), cpfStatus && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-sm",
								children: [
									cpfStatus === "valid" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "size-4 text-green-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-green-600",
										children: "CPF válido"
									})] }),
									cpfStatus === "invalid" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-4 text-red-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-red-600",
										children: "CPF inválido"
									})] }),
									cpfStatus === "incomplete" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Digite os 11 números do CPF"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm font-medium",
							children: ["Telefone", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "tel",
								value: telefone,
								onChange: (e) => setTelefone(e.target.value),
								className: "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary",
								placeholder: "(82) 99999-9999"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm font-medium",
							children: ["Senha", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative mt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: showPassword ? "text" : "password",
									required: true,
									minLength: 8,
									value: password,
									onChange: (e) => setPassword(e.target.value),
									className: "w-full rounded-xl border border-border bg-background px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-primary",
									placeholder: "Mínimo 8 caracteres"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setShowPassword((value) => !value),
									className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground",
									children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-5" })
								})]
							})]
						}),
						(validationError || error) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive",
							children: validationError || error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							disabled: loading,
							className: "flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground disabled:opacity-60",
							children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), loading ? "Criando cadastro..." : "Criar cadastro"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 text-center text-sm",
					children: [
						"Já possui cadastro?",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/entrar",
							className: "font-medium text-primary hover:underline",
							children: "Entrar"
						})
					]
				})
			]
		})
	})] });
}
//#endregion
export { CadastroClientePage as component };
