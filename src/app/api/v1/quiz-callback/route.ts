import { db } from "@/db";
import { quiz } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { quizId, data, success, error } = await req.json();

    if (!quizId) {
      return new Response(JSON.stringify({ error: "Quiz ID is required" }), {
        status: 400,
      });
    }

    // Verify the request using a shared secret
    const authHeader = req.headers.get("Authorization");
    if (
      !authHeader ||
      authHeader !== `Bearer ${process.env.CALLBACK_SECRET_KEY}`
    ) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    if (success && data) {
      // Update the quiz with the data
      await db
        .update(quiz)
        .set({
          data: JSON.stringify(data),
          status: "COMPLETED",
          updatedAt: new Date(),
        })
        .where(eq(quiz.id, quizId));

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
      });
    } else {
      // Update the quiz with the error
      await db
        .update(quiz)
        .set({
          status: "FAILED",
          error: error || "Unknown error",
          updatedAt: new Date(),
        })
        .where(eq(quiz.id, quizId));

      return new Response(JSON.stringify({ success: false }), {
        status: 200, // 200 to acknowledge receipt
      });
    }
  } catch (error) {
    console.error("Error processing quiz callback:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
