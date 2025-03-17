import { Quiz } from "@/components/quiz";
import { AccentCard } from "@/components/ui/accent-card";
import SignOutButton from "@/components/ui/sign-out-button";
import { db } from "@/db";
import { quiz } from "@/db/schema";
import { checkAuthSession } from "@/lib/server-auth-helper";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: Promise<{ quizId: string }> }) => {
  const session = await checkAuthSession();

  if (!session || !session.user.id) {
    return redirect("/sign-in");
  }
  const { quizId } = await params;

  const quizData = await db.query.quiz.findFirst({
    where: and(eq(quiz.id, quizId), eq(quiz.userId, session.user.id)),
    with: {
      pdf: {
        columns: {
          pdfLink: true,
        },
      },
    },
  });

  if (!quizData) {
    return <div>Quiz not found</div>;
  }

  const quizDataCorrect = quizData.data as Question[];

  return (
    <main className="container mx-auto py-10 px-4 md:py-16 lg:py-24">
      <AccentCard
        title="Computing Concepts Quiz"
        description="Test your knowledge of Net-Centric Computing, Cloud Computing, and Mobile Computing"
        className="max-w-3xl mx-auto"
      >
        <Quiz allQuestions={quizDataCorrect} />
      </AccentCard>
    </main>
  );
};

export default page;

export interface Choice {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  text: string;
  type: "multiple-choice" | "yes-no";
  choices: Choice[];
}
