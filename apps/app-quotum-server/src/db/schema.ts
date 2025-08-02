import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890abcdef', 20);

export const quotesTable = sqliteTable('quotes', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid(20)),
  content: text('content').notNull(),
  title: text('title').notNull(),
  url: text('url').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp_ms' })
    .default(sql`(unixepoch() * 1000)`)
    .notNull(),
});
