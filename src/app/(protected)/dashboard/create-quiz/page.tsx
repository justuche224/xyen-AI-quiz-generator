import { checkAuthSession } from "@/lib/server-auth-helper";
import { redirect } from "next/navigation";
import React from "react";
import CreateQuiz from "./CreateQuiz";
const page = async () => {
  const session = await checkAuthSession();

  if (!session || !session.user.id) {
    return redirect("/sign-in");
  }

  return <CreateQuiz />;
};

export default page;
