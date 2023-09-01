interface ImportMetaEnv {
  readonly VITE_APIKEY: string;
  readonly VITE_AUTHDOMAIN: string;
  readonly VITE_DATABASEURL: string;
  readonly VITE_PROJECTID: string;
  readonly VITE_STORAGEBUCKET: string;
  readonly VITE_MESSAGINGSENDERID: string;
  readonly VITE_APPID: string;
  readonly VITE_MEASUREMENTID: string;
  readonly VITE_USE_EMULATORS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
