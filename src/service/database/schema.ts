import {
  pgTable,
  text,
  timestamp,
  serial,
  pgEnum,
  integer,
} from "drizzle-orm/pg-core";
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

export const Transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  transactionId: text("transaction_id").notNull().unique(),
  amount: integer("amount").notNull(),
  tokensPurchased: integer("tokens_purchased").notNull(),
  dateOfPurchase: timestamp("date_of_purchase").defaultNow().notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => Users.userid),
});

export const Chats = pgTable("chats", {
  id: serial("id").primaryKey(),
  chatId: text("chat_id").notNull().unique(),
  userId: text("user_id")
    .notNull()
    .references(() => Users.userid),
  date: timestamp("date").defaultNow().notNull(),
  message: text("message").notNull(),
});
