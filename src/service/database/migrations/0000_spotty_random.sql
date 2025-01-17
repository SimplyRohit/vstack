CREATE TYPE "public"."user_role" AS ENUM('user', 'admin');--> statement-breakpoint
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
