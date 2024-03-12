import { type Config } from "drizzle-kit";

import { env } from "@/env";

export default {
  schema: "./src/server/db/schema.ts",
  driver: "pg",
  out: "./src/lib/db/migrations",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
  tablesFilter: ["t3-lucia_*"],
} satisfies Config;
