import {
  pgTable,
  serial,
  pgEnum,
  integer,
  jsonb,
  varchar,
} from "drizzle-orm/pg-core";
export const userRole = pgEnum("user_role", ["user", "admin"]);
export const Users = pgTable("users", {
  id: serial("id").primaryKey(),
  userRole: userRole("user_role").notNull().default("user"),
  userid: varchar("userid", { length: 30 }).notNull().unique(),
  email: varchar("email", { length: 30 }).notNull(),
  name: varchar("name", { length: 30 }),
  image: varchar("image", { length: 150 }),
  tokens: integer("tokens").notNull().default(20),
});

export const Chats = pgTable("chats", {
  id: serial("id").primaryKey(),
  userid: varchar("user_id").references(() => Users.userid),
  chatid: varchar("chat_id", { length: 30 }).notNull().unique(),
  files: jsonb("files"),
  messages: jsonb("messages").array(),
  template: varchar("template", { length: 15 }).notNull().default("react"),
});

export const Transaction = pgTable("transction", {
  id: serial("id").primaryKey(),
  userid: varchar("user_id").references(() => Users.userid),
  tokenupdated: integer("tokenupdated").notNull(),
  createdAt: varchar("created_at")
    .notNull()
    .$default(() => new Date().toISOString()),
  orderid: varchar("order_id").notNull(),
  paymentid: varchar("payment_id").notNull(),
  payerid: varchar("signature").notNull(),
});
