import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: "./.env" });
export default defineConfig({
  schema: "./src/service/database/schema.ts",
  out: "./src/service/database/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: String(process.env.DATABASE_URL),
  },
});
