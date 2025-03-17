CREATE TYPE "public"."quiz_status" AS ENUM('PROCESSING', 'COMPLETED', 'FAILED');--> statement-breakpoint
CREATE TYPE "public"."quiz_type" AS ENUM('MULTICHOICE', 'YESANDNO');--> statement-breakpoint
CREATE TABLE "pdf" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"pdf_link" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quiz" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text,
	"data" json,
	"type" "quiz_type" NOT NULL,
	"status" "quiz_status" DEFAULT 'PROCESSING' NOT NULL,
	"pdf_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "pdf" ADD CONSTRAINT "pdf_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz" ADD CONSTRAINT "quiz_pdf_id_pdf_id_fk" FOREIGN KEY ("pdf_id") REFERENCES "public"."pdf"("id") ON DELETE cascade ON UPDATE no action;