import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import {
  FileText,
  Clock,
  ArrowRight,
  BarChart,
  AlertTriangle,
  Ban,
} from "lucide-react";
import { AccentCard } from "@/components/ui/accent-card";
import { AccentButton } from "@/components/ui/accent-button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface QuizListItemProps {
  id: string;
  title: string;
  status: string;
  createdAt: Date;
}

export function QuizListItem({
  id,
  title,
  createdAt,
  status,
}: QuizListItemProps) {
  const isFailed = status.toUpperCase() === "FAILED";

  return (
    <AccentCard
      title={
        <div className="flex items-center justify-between">
          <span className="truncate mr-2">{title}</span>
          {isFailed && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500">
                    <AlertTriangle className="mr-1 h-3 w-3" />
                    Failed
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Quiz generation failed. This quiz is not available.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      }
      description={
        <div className="flex items-center text-sm">
          <Clock className="mr-1 h-3 w-3" />
          Created{" "}
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </div>
      }
      className={`h-full ${isFailed ? "opacity-80" : ""}`}
      contentClassName="flex-grow"
      footerClassName="pt-2"
      footer={
        isFailed ? (
          <AccentButton
            className="w-full opacity-60 cursor-not-allowed"
            disabled
          >
            <Ban className="mr-2 h-4 w-4" />
            Quiz Unavailable
          </AccentButton>
        ) : (
          <Link href={`/dashboard/quizes/${id}`} className="w-full">
            <AccentButton className="w-full group">
              View Quiz
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </AccentButton>
          </Link>
        )
      }
    >
      <div className="space-y-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <FileText className="mr-2 h-4 w-4" />
          Quiz ID: {id.substring(0, 8)}...
        </div>
        {isFailed ? (
          <div className="flex items-center text-sm text-red-500">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Quiz generation failed. Please try again.
          </div>
        ) : (
          <div className="flex items-center text-sm text-muted-foreground">
            <BarChart className="mr-2 h-4 w-4" />
            View detailed results and analytics
          </div>
        )}
      </div>
    </AccentCard>
  );
}
