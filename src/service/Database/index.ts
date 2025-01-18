import * as schema from "./schema";

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "user",
  password: "pass",
  database: "mydb",
});
export const db = drizzle({ client: pool, schema });
