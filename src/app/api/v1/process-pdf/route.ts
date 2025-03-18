import { db } from "@/db";
import { generateQuiz } from "@/lib/ai-service";
import { checkAuthSession } from "@/lib/server-auth-helper";
import { pdf, quiz } from "@/db/schema";
import { eq } from "drizzle-orm";

const PDF_SERVICE_URL =
  process.env.PDF_SERVICE_URL ||
  "https://xyen-pdf-service.onrender.com/api/v1/extract";
// https://xyen-pdf-service.onrender.com/api/v1/extract

async function getTextFromPDFService(url: string): Promise<string | null> {
  try {
    console.log("Calling PDF service for:", url);
    const response = await fetch(PDF_SERVICE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `PDF service error: ${response.status} - ${JSON.stringify(errorData)}`
      );
    }

    const data = await response.json();

    if (!data.success || !data.text) {
      throw new Error("PDF service returned an error");
    }

    console.log(`Successfully extracted ${data.textLength} characters of text`);
    return data.text;
  } catch (error) {
    console.error("PDF extraction service error:", error);
    return null;
  }
}

export async function POST(req: Request) {
  const { pdfLink, type, title } = await req.json();

  if (!pdfLink || !type || !title) {
    return new Response(
      JSON.stringify({ error: "PDF, Quiz Type and Title are required" }),
      {
        status: 400,
      }
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

  console.log("pdfData", pdfData);

  const quizData = await db
    .insert(quiz)
    .values({
      pdfId: pdfData[0].id,
      status: "PROCESSING",
      type: type,
      userId: session.user.id,
      title,
    })
    .returning();

  console.log("quizData", quizData);

  if (!quizData || !quizData[0]?.id) {
    return new Response(JSON.stringify({ error: "Failed to create quiz" }), {
      status: 500,
    });
  }

  const quizId = quizData[0].id;

  (async () => {
    try {
      console.log("start bg process");

      const text = await getTextFromPDFService(pdfLink);

      if (!text) throw new Error("failed to extract text from pdf");
      console.log("text gotten", text.substring(0, 100) + "...");

      const generatedQuiz = await generateQuiz(text, type);
      console.log(Array.isArray(generatedQuiz));

      if (!Array.isArray(generatedQuiz)) {
        throw new Error("Failed to generate quiz");
      }

      await db
        .update(quiz)
        .set({
          data: JSON.stringify(generatedQuiz),
          status: "COMPLETED",
        })
        .where(eq(quiz.id, quizId));

      console.log("quiz updated");
    } catch (error) {
      await db
        .update(quiz)
        .set({
          status: "FAILED",
        })
        .where(eq(quiz.id, quizId));
      console.error("Processing failed:", error);
    }
  })();

  return new Response(JSON.stringify({ quizId: quizId }), {
    status: 200,
  });
}
