/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HOST_URL: string;
  readonly VITE_STATIC_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
