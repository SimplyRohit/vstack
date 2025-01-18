CREATE TYPE "public"."user_role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TABLE "chats" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text,
	"chat_id" text NOT NULL,
	"messages" jsonb DEFAULT '[]'::jsonb,
	CONSTRAINT "chats_chat_id_unique" UNIQUE("chat_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_role" "user_role" DEFAULT 'user' NOT NULL,
	"userid" text NOT NULL,
	"email" text NOT NULL,
	"name" text,
	"image" text,
	"tokens" integer DEFAULT 1000 NOT NULL,
	CONSTRAINT "users_userid_unique" UNIQUE("userid")
);
--> statement-breakpoint
ALTER TABLE "chats" ADD CONSTRAINT "chats_user_id_users_userid_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("userid") ON DELETE no action ON UPDATE no action;