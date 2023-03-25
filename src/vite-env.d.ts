/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TODOS_COLLECTION_ID: string;
  readonly VITE_DB_ID: string;
  readonly VITE_PROJECT_ID: string;
  readonly VITE_APP_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
