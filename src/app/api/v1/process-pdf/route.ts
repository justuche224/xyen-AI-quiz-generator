import { db } from "@/db";
import { pdf, quiz } from "@/db/schema";
import { checkAuthSession } from "@/lib/server-auth-helper";
import { eq } from "drizzle-orm";

const AI_SERVICE_URL =
  process.env.AI_SERVICE_URL || "http://localhost:3002/api/v1/generate-quiz";
// "https://xyen-ai-service.onrender.com/api/v1/generate-quiz";

export async function POST(req: Request) {
  try {
    const { pdfLink, type, title } = await req.json();

    if (!pdfLink || !type || !title) {
      return new Response(
        JSON.stringify({ error: "PDF, Quiz Type and Title are required" }),
        { status: 400 }
      );
    }

    const session = await checkAuthSession();
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const pdfData = await db
      .insert(pdf)
      .values({
        userId: session.user.id,
        pdfLink,
      })
      .returning();

    const quizData = await db
      .insert(quiz)
      .values({
        pdfId: pdfData[0].id,
        status: "QUEUED",
        type: type,
        userId: session.user.id,
        title,
      })
      .returning();

    if (!quizData || !quizData[0]?.id) {
      return new Response(JSON.stringify({ error: "Failed to create quiz" }), {
        status: 500,
      });
    }

    const quizId = quizData[0].id;

    // 3. Trigger background job without waiting for it to complete
    try {
      // Update status to PROCESSING to indicate job has started
      await db
        .update(quiz)
        .set({ status: "PROCESSING" })
        .where(eq(quiz.id, quizId));

      // Fire-and-forget approach - won't await this
      fetch(AI_SERVICE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.AI_SERVICE_API_KEY}`,
          "X-Quiz-ID": quizId,
        },
        body: JSON.stringify({
          url: pdfLink,
          type,
          callbackUrl: `https://xyen-ai.vercel.app/api/v1/quiz-callback`,
        }),
      }).catch((error) => {
        console.error("Error invoking AI service:", error);
        // a background task
        db.update(quiz)
          .set({ status: "FAILED", error: "Failed to contact AI service" })
          .where(eq(quiz.id, quizId))
          .then(() => console.log("Quiz status updated to FAILED"))
          .catch((error) =>
            console.error("Failed to update quiz status:", error)
          );
      });

      // 4. Return success response with the quiz ID immediately
      return new Response(JSON.stringify({ quizId }), {
        status: 202, // 202 Accepted - indicating processing started but not completed
      });
    } catch (error) {
      console.error("Error starting quiz generation:", error);
      await db
        .update(quiz)
        .set({
          status: "FAILED",
          error: "Failed to start quiz generation",
        })
        .where(eq(quiz.id, quizId));

      return new Response(JSON.stringify({ error: "Failed to process quiz" }), {
        status: 500,
      });
    }
  } catch (error) {
    console.error("Unhandled exception in quiz processing:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
