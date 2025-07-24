import { defineConfig } from 'drizzle-kit';

const drizzleConfig = defineConfig({
  schema: './server/db/schema.ts',
  out: './server/db/migrations',
  dialect: 'sqlite',
  breakpoints: true,
});

export default drizzleConfig;
