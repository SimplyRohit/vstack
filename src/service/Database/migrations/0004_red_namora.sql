ALTER TABLE "chats" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "chats" CASCADE;--> statement-breakpoint
ALTER TABLE "transction" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "transction" ALTER COLUMN "created_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "transction" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "transction" ALTER COLUMN "order_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "transction" ALTER COLUMN "payment_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "transction" ALTER COLUMN "signature" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "user_role" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "user_role" SET DEFAULT 'user';--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "user_role" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "tokens" DROP NOT NULL;--> statement-breakpoint
DROP TYPE "public"."user_role";