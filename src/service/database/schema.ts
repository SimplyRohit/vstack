import { pgTable, text, serial, pgEnum, integer } from "drizzle-orm/pg-core";
export const userRole = pgEnum("user_role", ["user", "admin"]);
export const Users = pgTable("users", {
  id: serial("id").primaryKey(),
  userRole: userRole("user_role").notNull().default("user"),
  userid: text("userid").notNull().unique(),
  email: text("email").notNull(),
  name: text("name"),
  image: text("image"),
  tokens: integer("tokens").notNull().default(1000),
});
