import { relations, sql } from "drizzle-orm";
import { index, integer, sqliteTable, text, primaryKey } from "drizzle-orm/sqlite-core";

const USER_ID = "8e42b7ba-f7bd-4551-aa17-4bd87c51f235";

export const collections = sqliteTable(
  "collections",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name", { length: 100, mode: "text" }).notNull(),
    createdAt: text("createdAt").default(sql`CURRENT_TIMESTAMP`),
  },
  (t) => ({
    idIdx: index("collectionsIdIdx").on(t.id),
  })
);

export const collectionsRelations = relations(collections, ({ many, one }) => ({
  expenses: many(expenses),
}));

export const expenses = sqliteTable(
  "expenses",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    amount: text("amount", { length: 100, mode: "text" }).notNull(),
    description: text("description", { length: 100, mode: "text" }).notNull(),
    date: text("date", { length: 100, mode: "text" }).notNull(),
    category: text("category", { length: 100, mode: "text" }).notNull(),
    collectionId: integer("collectionId").notNull(),
  },
  (t) => ({
    idIdx: index("expensesIdIdx").on(t.id),
  })
);

export const expensesRelations = relations(expenses, ({ many, one }) => ({
  belongsToCollection: one(collections, {
    fields: [expenses.collectionId],
    references: [collections.id],
  }),
}));
