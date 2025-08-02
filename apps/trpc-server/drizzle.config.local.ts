import { config } from '@dotenvx/dotenvx';
import { defineConfig } from 'drizzle-kit';

const NODE_ENV = process.env.NODE_ENV;

config({
  path: ['.env', '.env.local', `.env.${NODE_ENV}`, `.env.${NODE_ENV}.local`],
  ignore: ['MISSING_ENV_FILE'],
});

export default defineConfig({
  out: './drizzle/local',
  schema: './src/db/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.MINIFLARE_LOCAL_DB_URL,
  },
});
