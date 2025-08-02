import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { usersTable } from './db/schema.js';
import { getD1Database } from './services/d1.js';

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type User = z.infer<typeof userSchema>;

export const db = {
  user: {
    findMany: async () => {
      const d1Database = await getD1Database();
      const result = await d1Database.select().from(usersTable).limit(1000);
      return result.map((row) => userSchema.parse(row));
    },

    findById: async (id: string) => {
      const d1Database = await getD1Database();
      const result = await d1Database.select().from(usersTable).where(eq(usersTable.id, id)).limit(1);
      return result.length > 0 ? userSchema.parse(result[0]) : null;
    },

    create: async (data: { name: string }) => {
      const d1Database = await getD1Database();
      const result = await d1Database
        .insert(usersTable)
        .values({ name: data.name, email: 'hello@example.com' })
        .returning();
      return result.length > 0 ? userSchema.parse(result[0]) : null;
    },

    delete: async (id: string) => {
      const d1Database = await getD1Database();
      await d1Database.delete(usersTable).where(eq(usersTable.id, id));
      return Promise.resolve();
    },
  },
};
