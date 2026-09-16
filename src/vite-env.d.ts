/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // outras variáveis se houver
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
