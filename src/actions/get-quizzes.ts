"use server";

import { db } from "@/db";
import { quiz } from "@/db/schema";
import { checkAuthSession } from "@/lib/server-auth-helper";
import { and, desc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export const getquizzes = async (limit: number = 10, offset: number = 0) => {
  try {
    const session = await checkAuthSession();

    if (!session || !session.user.id) {
      return redirect("/sign-in");
    }

    const quizList = await db.query.quiz.findMany({
      where: and(
        eq(quiz.userId, session.user.id),
        eq(quiz.status, "COMPLETED")
      ),
      columns: {
        id: true,
        title: true,
        // status: true,
      },
      orderBy: [desc(quiz.createdAt)],
      limit,
      offset,
    });

    return quizList;
  } catch (error) {
    console.log(error);
    return null;
  }
};
