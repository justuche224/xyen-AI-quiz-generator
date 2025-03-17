import { db } from "@/db";
import { quiz } from "@/db/schema";
import { checkAuthSession } from "@/lib/server-auth-helper";
import { eq, desc } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";
import { QuizList } from "@/components/quiz-list";

const page = async () => {
  const session = await checkAuthSession();

  if (!session || !session.user.id) {
    return redirect("/sign-in");
  }

  const quizList = await db.query.quiz.findMany({
    where: eq(quiz.userId, session.user.id),
    columns: {
      id: true,
      title: true,
      createdAt: true,
    },
    orderBy: [desc(quiz.createdAt)],
  });

  if (!quizList) {
    return <div>you havent created a quiz</div>;
  }

  return <QuizList quizzes={quizList} />;
};

export default page;
