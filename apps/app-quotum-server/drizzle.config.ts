import { config } from '@dotenvx/dotenvx';
import { defineConfig } from 'drizzle-kit';

const NODE_ENV = process.env.NODE_ENV;

config({
  path: ['.env', '.env.local', `.env.${NODE_ENV}`, `.env.${NODE_ENV}.local`],
  ignore: ['MISSING_ENV_FILE'],
});

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'sqlite',
  driver: 'd1-http',
  dbCredentials: {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
    databaseId: process.env.CLOUDFLARE_DATABASE_ID,
    token: process.env.CLOUDFLARE_D1_TOKEN,
  },
});
