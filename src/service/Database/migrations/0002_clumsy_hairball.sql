CREATE TABLE "transction" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar,
	"tokenupdated" integer NOT NULL,
	"created_at" varchar NOT NULL,
	"order_id" varchar NOT NULL,
	"payment_id" varchar NOT NULL,
	"signature" varchar NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "tokens" SET DEFAULT 10;--> statement-breakpoint
ALTER TABLE "transction" ADD CONSTRAINT "transction_user_id_users_userid_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("userid") ON DELETE no action ON UPDATE no action;