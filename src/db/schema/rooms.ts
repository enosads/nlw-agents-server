import { pgTable as pg, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const rooms = pg('rooms', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
