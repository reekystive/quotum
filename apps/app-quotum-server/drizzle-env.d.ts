declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly CLOUDFLARE_ACCOUNT_ID: string;
      readonly CLOUDFLARE_DATABASE_ID: string;
      readonly CLOUDFLARE_D1_TOKEN: string;
      readonly MINIFLARE_LOCAL_DB_URL: string;
    }
  }
}

export {};
