import { drizzle } from "drizzle-orm/neon-http";
const sql = process.env.DATABASE_URL!;
export const db = drizzle(sql);
