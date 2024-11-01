/**
 * If this shows as an error that it's missing the migration files,
 * comment it out and run the command "pnpm run db:migrate"
 * it will create the missing migration files,
 * after that uncomment and run normally
 */

import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync, deleteDatabaseAsync } from "expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import * as schema from "./drizzle/schema";
import migrations from "./drizzle/out/migrations";

const DATABASE_NAME = "expenseshare_db";

const connection = openDatabaseSync(DATABASE_NAME, {
  enableChangeListener: true,
});
const db = drizzle(connection, { schema: schema });

export default db;

export async function DeleteDatabase() {
  console.log("CLOSING DATABASE...");
  await connection.closeAsync();
  console.log("DATABASE CLOSED!");

  console.log("DELETING DATABASE...");
  await deleteDatabaseAsync(DATABASE_NAME);
  console.log("DATABASE DELETED!");
}

export function InitializeDatabaseHook() {
  const { success, error } = useMigrations(db, migrations);
  return { success, error };
}
