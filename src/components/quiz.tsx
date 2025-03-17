"use client";

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

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";
import { AccentButton } from "@/components/ui/accent-button";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export function Quiz({ allQuestions }: { allQuestions: Question[] }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const quizData = allQuestions;
  const currentQuestion = quizData[currentQuestionIndex];
  const totalQuestions = quizData.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleAnswerChange = (value: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value,
    });
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    setShowSubmitDialog(true);
  };

  const confirmSubmit = () => {
    // Calculate score
    let correctAnswers = 0;

    quizData.forEach((question) => {
      const userAnswer = answers[question.id];
      if (userAnswer) {
        const correctChoice = question.choices.find(
          (choice) => choice.isCorrect
        );
        if (correctChoice && userAnswer === correctChoice.id) {
          correctAnswers++;
        }
      }
    });

    setScore(correctAnswers);
    setShowResults(true);
    setShowSubmitDialog(false);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    setScore(0);
    setShowReview(false);
  };

  // Check if the current question has been answered
  const isCurrentQuestionAnswered = answers[currentQuestion?.id] !== undefined;

  // Count how many questions have been answered
  const answeredQuestionsCount = Object.keys(answers).length;

  if (showResults) {
    if (showReview) {
      return (
        <div className="space-y-6 py-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-4">Quiz Review</h2>
            <p className="text-muted-foreground">
              Review all questions and your answers below.
            </p>
          </div>

          <div className="space-y-8">
            {quizData.map((question, index) => {
              const userAnswerId = answers[question.id];
              const userAnswer = question.choices.find(
                (choice) => choice.id === userAnswerId
              );
              const correctAnswer = question.choices.find(
                (choice) => choice.isCorrect
              );
              const isCorrect = userAnswer?.isCorrect;

              return (
                <div key={question.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-medium">
                      Question {index + 1}
                    </h3>
                    {isCorrect ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Correct
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500">
                        <AlertCircle className="mr-1 h-3 w-3" />
                        Incorrect
                      </span>
                    )}
                  </div>

                  <p className="mb-3">{question.text}</p>

                  <div className="space-y-2">
                    {question.choices.map((choice) => {
                      const isUserChoice = choice.id === userAnswerId;
                      const isCorrectChoice = choice.isCorrect;

                      let className = "flex items-center p-2 rounded-md";

                      if (isUserChoice && isCorrectChoice) {
                        className +=
                          " bg-green-100 dark:bg-green-900/20 border border-green-500";
                      } else if (isUserChoice && !isCorrectChoice) {
                        className +=
                          " bg-red-100 dark:bg-red-900/20 border border-red-500";
                      } else if (isCorrectChoice) {
                        className += " bg-primary/10 border border-primary";
                      } else {
                        className += " bg-muted/20";
                      }

                      return (
                        <div key={choice.id} className={className}>
                          <div className="flex-1">{choice.text}</div>
                          {isUserChoice && (
                            <div className="text-sm text-muted-foreground">
                              Your answer
                            </div>
                          )}
                          {isCorrectChoice && !isUserChoice && (
                            <div className="text-sm text-primary">
                              Correct answer
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col max-md:gap-2 md:flex-row justify-center space-x-4 mt-8">
            <AccentButton
              className="w-full md:w-1/2"
              onClick={() => setShowReview(false)}
            >
              Back to Results
            </AccentButton>
            <AccentButton className="w-full md:w-1/2" onClick={resetQuiz}>
              Try Again
            </AccentButton>
          </div>
        </div>
      );
    }
    return (
      <div className="space-y-6 py-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
          <div className="text-4xl font-bold mb-2">
            {score} / {totalQuestions}
          </div>
          <p className="text-muted-foreground mb-6">
            You answered {score} out of {totalQuestions} questions correctly.
          </p>

          <div className="w-full max-w-md mx-auto mb-8">
            <Progress value={(score / totalQuestions) * 100} className="h-3" />
          </div>

          {score === totalQuestions ? (
            <div className="flex items-center justify-center text-green-500 mb-6">
              <CheckCircle className="mr-2 h-6 w-6" />
              <span>Perfect score! Excellent work!</span>
            </div>
          ) : score >= totalQuestions / 2 ? (
            <div className="flex items-center justify-center text-amber-500 mb-6">
              <CheckCircle className="mr-2 h-6 w-6" />
              <span>Good job! You passed the quiz.</span>
            </div>
          ) : (
            <div className="flex items-center justify-center text-red-500 mb-6">
              <AlertCircle className="mr-2 h-6 w-6" />
              <span>You might need to study more.</span>
            </div>
          )}
          <div className="flex flex-col max-md:gap-2 md:flex-row justify-center space-x-4 mt-8">
            <AccentButton
              className="w-full md:w-1/2"
              onClick={() => setShowReview(true)}
            >
              Review Answers
            </AccentButton>
            <AccentButton className="w-full md:w-1/2" onClick={resetQuiz}>
              Try Again
            </AccentButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-4">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-medium">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </div>
        <div className="text-sm text-muted-foreground">
          {answeredQuestionsCount} answered
        </div>
      </div>

      <Progress value={progress} className="h-2 mb-6" />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{currentQuestion.text}</h2>

        <RadioGroup
          value={answers[currentQuestion.id] || ""}
          onValueChange={handleAnswerChange}
          className="space-y-3 mt-4"
        >
          {currentQuestion.choices.map((choice) => {
            const isSelected = answers[currentQuestion.id] === choice.id;
            return (
              <div
                key={choice.id}
                className={`flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/50 cursor-pointer transition-colors ${
                  isSelected ? "bg-primary/10 border-primary" : ""
                }`}
                onClick={() => handleAnswerChange(choice.id)}
              >
                <RadioGroupItem
                  value={choice.id}
                  id={`${currentQuestion.id}-${choice.id}`}
                />
                <Label
                  htmlFor={`${currentQuestion.id}-${choice.id}`}
                  className="flex-grow cursor-pointer"
                >
                  {choice.text}
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </div>

      <div className="flex justify-between mt-8">
        <Button
          onClick={goToPreviousQuestion}
          disabled={currentQuestionIndex === 0}
          variant="outline"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>

        {currentQuestionIndex < totalQuestions - 1 ? (
          <Button onClick={goToNextQuestion}>
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <AccentButton onClick={handleSubmit}>Submit Quiz</AccentButton>
        )}
      </div>

      <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Quiz?</AlertDialogTitle>
            <AlertDialogDescription>
              You have answered {answeredQuestionsCount} out of {totalQuestions}{" "}
              questions.
              {answeredQuestionsCount < totalQuestions && (
                <span className="block mt-2 text-amber-500">
                  Warning: You have {totalQuestions - answeredQuestionsCount}{" "}
                  unanswered questions.
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmSubmit}>
              Submit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
