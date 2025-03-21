ALTER TYPE "public"."quiz_status" ADD VALUE 'QUEUED' BEFORE 'PROCESSING';--> statement-breakpoint
ALTER TABLE "quiz" ADD COLUMN "error" text;