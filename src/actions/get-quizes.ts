"use server";

import { db } from "@/db";
import { quiz } from "@/db/schema";
import { checkAuthSession } from "@/lib/server-auth-helper";
import { desc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export const getQuizes = async (limit: number = 10, offset: number = 0) => {
  try {
    const session = await checkAuthSession();

    if (!session || !session.user.id) {
      return redirect("/sign-in");
    }

    const quizList = await db.query.quiz.findMany({
      where: eq(quiz.userId, session.user.id),
      columns: {
        id: true,
        title: true,
        status: true,
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
