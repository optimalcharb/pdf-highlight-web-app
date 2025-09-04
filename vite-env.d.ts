interface ImportMetaEnv {
  readonly VITE_STORAGE_ACCT: string;
  readonly VITE_BLOB_CONTAINER: string
  readonly VITE_BLOB_SAS_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}