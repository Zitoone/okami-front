/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_API_URL: string
  // ajouter ici d’autres variables si besoin
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}