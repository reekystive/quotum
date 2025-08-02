import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { quotesTable } from './db/schema.js';
import { getD1Database } from './services/d1.js';

export const quoteSchema = z.object({
  id: z.string(),
  content: z.string(),
  title: z.string(),
  url: z.string(),
  createdAt: z.number(),
});

export type Quote = z.infer<typeof quoteSchema>;

export const db = {
  quote: {
    findById: async (id: string) => {
      const d1Database = await getD1Database();
      const result = await d1Database.select().from(quotesTable).where(eq(quotesTable.id, id)).limit(1);
      if (result.length > 0) {
        const row = result[0];
        if (!row) return null;
        return quoteSchema.parse({
          ...row,
          createdAt:
            typeof row.createdAt === 'number' ? row.createdAt : new Date(row.createdAt as string | Date).getTime(),
        });
      }
      return null;
    },

    create: async (data: { content: string; title: string; url: string }) => {
      const d1Database = await getD1Database();
      const result = await d1Database.insert(quotesTable).values(data).returning();
      if (result.length > 0) {
        const row = result[0];
        if (!row) return null;
        return quoteSchema.parse({
          ...row,
          createdAt:
            typeof row.createdAt === 'number' ? row.createdAt : new Date(row.createdAt as string | Date).getTime(),
        });
      }
      return null;
    },
  },
};
