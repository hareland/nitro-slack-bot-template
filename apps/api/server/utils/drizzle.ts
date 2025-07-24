import { drizzle as d1Drizzle } from 'drizzle-orm/d1';
import * as schema from '~/db/schema';

export const tables = schema;

export const useDrizzle = () => {
  return d1Drizzle(useEvent().context.cloudflare.env.DB, { schema });
};
