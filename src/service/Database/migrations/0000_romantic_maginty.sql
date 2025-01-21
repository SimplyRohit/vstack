CREATE TYPE "public"."user_role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TABLE "chats" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar,
	"chat_id" varchar(30) NOT NULL,
	"files" jsonb NOT NULL,
	"messages" jsonb[] NOT NULL,
	CONSTRAINT "chats_chat_id_unique" UNIQUE("chat_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_role" "user_role" DEFAULT 'user' NOT NULL,
	"userid" varchar(30) NOT NULL,
	"email" varchar(30) NOT NULL,
	"name" varchar(30),
	"image" varchar(150),
	"tokens" integer DEFAULT 1000 NOT NULL,
	CONSTRAINT "users_userid_unique" UNIQUE("userid")
);
--> statement-breakpoint
ALTER TABLE "chats" ADD CONSTRAINT "chats_user_id_users_userid_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("userid") ON DELETE no action ON UPDATE no action;