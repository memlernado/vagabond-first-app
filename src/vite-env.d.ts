/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TODOS_COLLECTION_ID: string;
  readonly VITE_APPWRITE_DB: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
