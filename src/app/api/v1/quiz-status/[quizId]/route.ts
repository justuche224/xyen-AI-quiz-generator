import { db } from "@/db";
import { quiz } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ quizId: string }> }
) {
  const { quizId } = await params;
  const quizData = await db.select().from(quiz).where(eq(quiz.id, quizId));

  return new Response(JSON.stringify({ status: quizData[0].status, quizId }), {
    status: 200,
  });
}
