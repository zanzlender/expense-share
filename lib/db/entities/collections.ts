import { eq } from "drizzle-orm";
import db from "../database";
import * as schema from "../drizzle/schema";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";

// Gets local collections
export async function GetCollections() {
  const collections = await db.query.collections.findMany({
    with: {
      expenses: true,
    },
  });
  return collections;
}

export function GetCollectionsLive() {
  const { data, error, updatedAt } = useLiveQuery(
    db.query.collections.findMany({
      with: {
        expenses: true,
      },
    })
  );
  return { data, error, updatedAt };
}

export async function CreateCollection({ name }: { name: string }) {
  const result = await db
    .insert(schema.collections)
    .values({
      name: name,
    })
    .returning();

  const singleResult = result[0];
  if (!singleResult) return undefined;
  return singleResult;
}

export async function DeleteCollection({ id }: { id: number }) {
  const result = await db
    .delete(schema.collections)
    .where(eq(schema.collections.id, id))
    .returning();

  if (result.length > 0) return true;
  return false;
}

export async function UpdateCollection({ name, id }: { name: string; id: number }) {
  const result = await db
    .update(schema.collections)
    .set({ name })
    .where(eq(schema.collections.id, id))
    .returning();

  const singleResult = result[0];
  if (!singleResult) return false;
  return singleResult;
}

export async function GetExpensesForCollection({ collectionId }: { collectionId: number }) {
  const expenses = await db.query.expenses.findMany({
    where: eq(schema.expenses.collectionId, collectionId),
  });
  return expenses;
}

export async function GetExpensesLive() {
  const { data, error, updatedAt } = useLiveQuery(
    db.query.collections.findMany({
      with: {
        expenses: true,
      },
    })
  );
  return { data, error, updatedAt };
}

export async function CreateExpense({
  amount,
  description,
  date,
  category,
  collectionId,
}: {
  amount: string;
  description: string;
  date: string;
  category: string;
  collectionId: number;
}) {
  const result = await db
    .insert(schema.expenses)
    .values({
      amount,
      description,
      date,
      category,
      collectionId,
    })
    .returning();

  const singleResult = result[0];
  if (!singleResult) return undefined;
  return singleResult;
}

export async function DeleteExpense({ id }: { id: number }) {
  const result = await db.delete(schema.expenses).where(eq(schema.expenses.id, id)).returning();

  if (result.length > 0) return true;
  return false;
}

export async function UpdateExpense({
  amount,
  description,
  date,
  category,
  id,
}: {
  amount: string;
  description: string;
  date: string;
  category: string;
  id: number;
}) {
  const result = await db
    .update(schema.expenses)
    .set({ amount, description, date, category })
    .where(eq(schema.expenses.id, id))
    .returning();

  const singleResult = result[0];
  if (!singleResult) return false;
  return singleResult;
}
