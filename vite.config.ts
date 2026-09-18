import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite"; // <-- importe o plugin
import path from "node:path";
import { fileURLToPath } from "node:url";
import { nitro } from "nitro/vite"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    tailwindcss(), // <-- adicionado primeiro
    tanstackStart({
      server: { entry: "src/server" },
    }),
    nitro({
        preset: "vercel", // Essencial para o deploy na Vercel
      }),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 8080,
    host: true,
  },
});