import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const quotesTable = sqliteTable('quotes', {
  id: text('id')
    .primaryKey()
    .default(sql`('quote-' || lower(hex(randomblob(16))))`),
  content: text('content').notNull(),
  title: text('title').notNull(),
  url: text('url').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp_ms' })
    .default(sql`(unixepoch() * 1000)`)
    .notNull(),
});
