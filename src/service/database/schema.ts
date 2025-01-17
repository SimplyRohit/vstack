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

export const Chats = pgTable("chats", {
  id: serial("id").primaryKey(),
  userid: text("user_id").references(() => Users.userid),
  chatid: text("chat_id").notNull().unique(),
  message: text("message").notNull(),
  date: text("date").notNull(),
});
