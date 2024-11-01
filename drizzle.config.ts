import type { Config } from "drizzle-kit";
export default {
  schema: "./lib/db/drizzle/schema.ts",
  out: "./lib/db/drizzle/out",
  dialect: "sqlite",
  driver: "expo", // <--- very important
} satisfies Config;
