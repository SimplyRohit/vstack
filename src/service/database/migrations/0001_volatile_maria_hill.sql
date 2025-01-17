ALTER TABLE "chats" ALTER COLUMN "messages" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "chats" ALTER COLUMN "messages" DROP NOT NULL;