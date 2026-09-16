// routes/painel/imagens.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Loader2, Trash2, Upload } from "lucide-react";
import {
  getPartnerImages,
  uploadPartnerImages,
  deletePartnerImage,
} from "@/services/api";

export const Route = createFileRoute("/painel/imagens")({
  component: ImagensPage,
});

type PartnerImage = {
  id: string;
  url: string;
  display_order?: number;
};

function ImagensPage() {
  const [images, setImages] = useState<PartnerImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function load() {
    setLoading(true);
    try {
      const res = await getPartnerImages();
      const list = (res.data ?? []).sort(
        (a, b) => (a.display_order ?? 0) - (b.display_order ?? 0)
      );
      setImages(list);
    } catch (err) {
      console.warn("Erro ao carregar imagens:", err);
      setImages([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const res = await uploadPartnerImages(Array.from(files));
      const uploaded = res.data ?? [];
      setImages((prev) => [...prev, ...uploaded]);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro no upload.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Remover esta imagem?")) return;
    try {
      await deletePartnerImage(id);
      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao remover.");
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold md:text-3xl">
          Imagens
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          A primeira imagem é usada como capa do seu perfil.
        </p>
      </div>

      {/* Dropzone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleUpload(e.dataTransfer.files);
        }}
        className="rounded-2xl border-2 border-dashed border-border bg-card p-10 text-center"
      >
        <Upload className="mx-auto size-8 text-muted-foreground" />
        <p className="mt-3 text-sm font-medium">
          Arraste imagens aqui ou clique para selecionar
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          JPG, PNG ou WebP — até 5MB cada
        </p>

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          hidden
          onChange={(e) => handleUpload(e.target.files)}
        />

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
        >
          {uploading && <Loader2 className="size-4 animate-spin" />}
          Selecionar imagens
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-16 text-muted-foreground">
          <Loader2 className="mr-2 size-5 animate-spin" />
          Carregando imagens...
        </div>
      ) : images.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((img, i) => (
            <div
              key={img.id}
              className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-muted"
            >
              <img
                src={img.url}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />

              {i === 0 && (
                <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
                  CAPA
                </span>
              )}

              <button
                type="button"
                onClick={() => handleDelete(img.id)}
                className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white opacity-0 transition group-hover:opacity-100"
                aria-label="Remover"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-sm text-muted-foreground">
          Nenhuma imagem enviada ainda.
        </p>
      )}
    </div>
  );
}