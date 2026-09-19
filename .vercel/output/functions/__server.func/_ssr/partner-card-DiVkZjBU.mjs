import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { K as registrarClienteInteracao, L as adicionarFavorito, at as getPartnerImage, f as useClienteAuth } from "./router-HQ7TexWm.mjs";
import { F as LoaderCircle } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/partner-card-DiVkZjBU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ClienteActionButton({ children, partnerId, partnerName, partnerPhone, actionType, className = "", onSuccess, onError }) {
	const { isAuthenticated } = useClienteAuth();
	const navigate = useNavigate();
	const [loading, setLoading] = (0, import_react.useState)(false);
	async function handleClick() {
		if (actionType === "whatsapp" && partnerPhone) {
			const phone = partnerPhone.replace(/\D/g, "");
			window.open(`https://wa.me/${phone}`, "_blank");
			if (isAuthenticated) registrarClienteInteracao(partnerId).catch(console.error);
			onSuccess?.();
			return;
		}
		if (!isAuthenticated) {
			sessionStorage.setItem("redirect_after_login", window.location.pathname);
			sessionStorage.setItem("intended_action", JSON.stringify({
				partnerId,
				partnerName,
				actionType,
				partnerPhone: partnerPhone || null
			}));
			navigate({
				to: "/cadastro-cliente",
				search: {
					message: `Cadastre-se para ${actionType === "favoritar" ? "favoritar" : "entrar em contato com"} ${partnerName}`,
					partner: partnerName
				}
			});
			return;
		}
		try {
			setLoading(true);
			if (actionType === "favoritar") await adicionarFavorito(partnerId);
			else await registrarClienteInteracao(partnerId);
			onSuccess?.();
		} catch (error) {
			console.error("Erro na ação:", error);
			onError?.(error);
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick: handleClick,
		disabled: loading,
		className,
		children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : children
	});
}
function getPartnerImageUrl(partner) {
	return getPartnerImage(partner) || null;
}
function PartnerCard({ partner }) {
	const partnerPhone = partner.whatsapp || partner.phone || void 0;
	const imageUrl = getPartnerImageUrl(partner);
	const description = partner.short || partner.description || "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-hidden rounded-xl bg-card ring-1 ring-border transition-shadow hover:shadow-lg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/parceiro/$slug",
			params: { slug: partner.slug },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "aspect-[4/3] overflow-hidden bg-muted",
				children: imageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: imageUrl,
					alt: partner.name,
					loading: "lazy",
					className: "h-full w-full object-cover transition-transform duration-300 hover:scale-105"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-full w-full items-center justify-center text-sm text-muted-foreground",
					children: "Sem imagem"
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/parceiro/$slug",
					params: { slug: partner.slug },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg hover:underline",
						children: partner.name
					})
				}),
				description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "line-clamp-2 text-sm text-muted-foreground",
					children: description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [partnerPhone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClienteActionButton, {
						partnerId: partner.id,
						partnerName: partner.name,
						partnerPhone,
						actionType: "whatsapp",
						className: "flex-1 rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700",
						children: "WhatsApp"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClienteActionButton, {
						partnerId: partner.id,
						partnerName: partner.name,
						actionType: "favoritar",
						className: "rounded-xl border border-border px-4 py-2 text-sm font-medium hover:bg-muted",
						children: "❤️"
					})]
				})
			]
		})]
	});
}
//#endregion
export { PartnerCard as t };
