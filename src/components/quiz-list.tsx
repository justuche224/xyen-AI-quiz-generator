import Link from "next/link";
import { FileText, Plus } from "lucide-react";
import { AccentButton } from "@/components/ui/accent-button";
import { QuizListItem } from "@/components/quiz-list-item";
import { AccentCard } from "@/components/ui/accent-card";

interface Quiz {
  id: string;
  title: string;
  status: string;
  createdAt: Date;
}

interface QuizListProps {
  quizzes: Quiz[];
}

export function QuizList({ quizzes }: QuizListProps) {
  if (quizzes.length === 0) {
    return (
      <div className="max-w-md mx-auto pt-24">
        <AccentCard
          title="No quizzes found"
          description="You haven't created any quizzes yet. Create your first quiz to get started."
          className="text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-primary/10 rounded-full p-6">
              <FileText className="h-12 w-12 text-primary" />
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <Link href="/dashboard/create-quiz">
              <AccentButton>
                <Plus className="mr-2 h-4 w-4" /> Create Your First Quiz
              </AccentButton>
            </Link>
          </div>
        </AccentCard>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 pt-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Quizzes</h1>
        <Link href="/dashboard/create-quiz">
          <AccentButton>
            <Plus className="mr-2 h-4 w-4" /> Create New Quiz
          </AccentButton>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {quizzes.map((quiz) => (
          <QuizListItem
            key={quiz.id}
            id={quiz.id}
            title={quiz.title}
            status={quiz.status}
            createdAt={quiz.createdAt}
          />
        ))}
      </div>
    </div>
  );
}
