import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { FileText, Clock, ArrowRight, BarChart } from "lucide-react";
import { AccentCard } from "@/components/ui/accent-card";
import { AccentButton } from "@/components/ui/accent-button";

interface QuizListItemProps {
  id: string;
  title: string;
  createdAt: Date;
}

export function QuizListItem({ id, title, createdAt }: QuizListItemProps) {
  return (
    <AccentCard
      title={title}
      description={
        <div className="flex items-center text-sm">
          <Clock className="mr-1 h-3 w-3" />
          Created{" "}
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </div>
      }
      className="h-full"
      contentClassName="flex-grow"
      footerClassName="pt-2"
      footer={
        <Link href={`/dashboard/quizes/${id}`} className="w-full">
          <AccentButton className="w-full group">
            View Quiz
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </AccentButton>
        </Link>
      }
    >
      <div className="space-y-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <FileText className="mr-2 h-4 w-4" />
          Quiz ID: {id.substring(0, 8)}...
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <BarChart className="mr-2 h-4 w-4" />
          View detailed results and analytics
        </div>
      </div>
    </AccentCard>
  );
}
