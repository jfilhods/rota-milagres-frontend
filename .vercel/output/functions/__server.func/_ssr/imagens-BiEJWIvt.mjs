import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { D as getPartnerImages, I as uploadPartnerImages, b as deletePartnerImage } from "./router-HQ7TexWm.mjs";
import { F as LoaderCircle, c as Upload, u as Trash2 } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/imagens-BiEJWIvt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ImagensPage() {
	const [images, setImages] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const inputRef = (0, import_react.useRef)(null);
	async function load() {
		setLoading(true);
		try {
			const list = ((await getPartnerImages()).data ?? []).sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
			setImages(list);
		} catch (err) {
			console.warn("Erro ao carregar imagens:", err);
			setImages([]);
		} finally {
			setLoading(false);
		}
	}
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	async function handleUpload(files) {
		if (!files || files.length === 0) return;
		setUploading(true);
		try {
			const uploaded = (await uploadPartnerImages(Array.from(files))).data ?? [];
			setImages((prev) => [...prev, ...uploaded]);
		} catch (err) {
			alert(err instanceof Error ? err.message : "Erro no upload.");
		} finally {
			setUploading(false);
			if (inputRef.current) inputRef.current.value = "";
		}
	}
	async function handleDelete(id) {
		if (!confirm("Remover esta imagem?")) return;
		try {
			await deletePartnerImage(id);
			setImages((prev) => prev.filter((img) => img.id !== id));
		} catch (err) {
			alert(err instanceof Error ? err.message : "Erro ao remover.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold md:text-3xl",
				children: "Imagens"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "A primeira imagem é usada como capa do seu perfil."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				onDragOver: (e) => e.preventDefault(),
				onDrop: (e) => {
					e.preventDefault();
					handleUpload(e.dataTransfer.files);
				},
				className: "rounded-2xl border-2 border-dashed border-border bg-card p-10 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "mx-auto size-8 text-muted-foreground" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm font-medium",
						children: "Arraste imagens aqui ou clique para selecionar"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "JPG, PNG ou WebP — até 5MB cada"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: inputRef,
						type: "file",
						accept: "image/jpeg,image/png,image/webp",
						multiple: true,
						hidden: true,
						onChange: (e) => handleUpload(e.target.files)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => inputRef.current?.click(),
						disabled: uploading,
						className: "mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50",
						children: [uploading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), "Selecionar imagens"]
					})
				]
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-center py-16 text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 size-5 animate-spin" }), "Carregando imagens..."]
			}) : images.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4",
				children: images.map((img, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "group relative aspect-square overflow-hidden rounded-xl border border-border bg-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: img.url,
							alt: "",
							className: "h-full w-full object-cover",
							loading: "lazy"
						}),
						i === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute left-2 top-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground",
							children: "CAPA"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => handleDelete(img.id),
							className: "absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white opacity-0 transition group-hover:opacity-100",
							"aria-label": "Remover",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
						})
					]
				}, img.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center text-sm text-muted-foreground",
				children: "Nenhuma imagem enviada ainda."
			})
		]
	});
}
//#endregion
export { ImagensPage as component };
