import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: "./.env" });
export default defineConfig({
  schema: "./src/service/Database/schema.ts",
  out: "./src/service/Database/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: String(process.env.DATABASE_URL),
  },
});
