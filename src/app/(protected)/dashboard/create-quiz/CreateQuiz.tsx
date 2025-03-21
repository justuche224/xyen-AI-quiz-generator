"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { Upload, FileText, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { getStorage } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type QuestionType = "MULTICHOICE" | "YESNO";
type QuizStatus = "QUEUED" | "PROCESSING" | "COMPLETED" | "FAILED";

interface QuizStatusResponse {
  status: QuizStatus;
  quizId: string;
}

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "text/plain",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/csv",
  "application/rtf",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const POLL_INTERVAL = 5000; // 5 seconds
const MAX_POLL_TIME = 10 * 60 * 1000; // 10 minutes

function UploadingMessage() {
  const messages = [
    "Uploading your document...",
    "Preparing to create quiz questions...",
    "Getting ready for knowledge extraction...",
    "Analyzing document content...",
    "Quiz generation in progress...",
    "Transforming document into quiz format...",
    "Almost there...",
  ];

  const [messageIndex, setMessageIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <p className="text-sm font-medium text-center text-primary animate-pulse">
      {messages[messageIndex]}
    </p>
  );
}

export default function CreateQuiz() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [questionType, setQuestionType] = useState<QuestionType>("MULTICHOICE");
  const [quizId, setQuizId] = useState<string | null>(null);
  const [pollCount, setPollCount] = useState<number>(0);
  const router = useRouter();

  // Handle file validation
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files || e.target.files.length === 0) {
      setFile(null);
      return;
    }

    const selectedFile = e.target.files[0];

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(selectedFile.type)) {
      setError(
        "Only text documents (PDF, TXT, DOC, DOCX, CSV, RTF) are allowed"
      );
      setFile(null);
      return;
    }

    // Validate file size
    if (selectedFile.size > MAX_FILE_SIZE) {
      setError(
        `File size exceeds the 10MB limit (${(
          selectedFile.size /
          (1024 * 1024)
        ).toFixed(2)}MB)`
      );
      setFile(null);
      return;
    }

    setError(null);
    setFile(selectedFile);
  };

  // Poll for quiz status
  useEffect(() => {
    let pollTimer: NodeJS.Timeout;

    const checkQuizStatus = async (): Promise<void> => {
      if (!quizId) return;

      try {
        const res = await fetch(`/api/v1/quiz-status/${quizId}`);

        if (!res.ok) {
          console.error("Failed to check quiz status:", res.status);
          return;
        }

        const data = (await res.json()) as QuizStatusResponse;
        const status = data.status.toLowerCase();

        if (status === "failed") {
          setError("Quiz generation failed. Please try again.");
          setUploading(false);
          setQuizId(null);
          return;
        }

        if (status === "completed") {
          router.push(`/dashboard/quizzes/${quizId}`);
          return;
        }

        // Continue polling if still processing
        if (status === "processing" || status === "queued") {
          setPollCount((prev) => prev + 1);

          // Stop polling if it's taking too long
          if (pollCount * POLL_INTERVAL >= MAX_POLL_TIME) {
            setError(
              "Quiz generation is taking longer than expected. You'll be notified when it's ready."
            );
            setUploading(false);
            return;
          }
        }
      } catch (err) {
        console.error("Error checking quiz status:", err);
      }
    };

    if (quizId && uploading) {
      pollTimer = setTimeout(checkQuizStatus, POLL_INTERVAL);
    }

    return () => clearTimeout(pollTimer);
  }, [quizId, uploading, pollCount, router]);

  // Upload file and start quiz generation
  const uploadFile = async (): Promise<void> => {
    if (!file) return;

    if (!title.trim()) {
      setError("Please enter a title for your quiz");
      return;
    }

    try {
      setError(null);
      setUploading(true);
      setPollCount(0);

      // Create a unique file name
      const fileExt = file.name.split(".").pop() || "";
      const fileName = `${Math.random()
        .toString(36)
        .substring(2, 15)}.${fileExt}`;
      const filePath = `documents/${fileName}`;
      const storage = getStorage();

      // Upload the file
      const { data, error: uploadError } = await storage
        .from("xyen")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get public URL for the file
      const {
        data: { publicUrl },
      } = storage.from("xyen").getPublicUrl(filePath);

      // Start quiz generation process
      const processRes = await fetch("/api/v1/process-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pdfLink: publicUrl,
          type: questionType,
          title: title,
        }),
      });

      if (!processRes.ok) {
        const errorData = await processRes.json();
        throw new Error(errorData.error || "Failed to start quiz generation");
      }

      const { quizId: newQuizId } = (await processRes.json()) as {
        quizId: string;
      };
      setQuizId(newQuizId);
    } catch (err) {
      console.error("Error during upload or processing:", err);
      setError(
        err instanceof Error ? err.message : "Error processing document"
      );
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 pt-24">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Xyen AI Quiz Generator
      </h1>

      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Upload Text Documents</CardTitle>
            <CardDescription>
              Upload PDF, TXT, DOC, DOCX, CSV, and RTF files to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="title" className="font-medium">
                  Quiz Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="Enter quiz title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  disabled={uploading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="questionType" className="font-medium">
                  Question Type
                </Label>
                <Select
                  value={questionType}
                  onValueChange={(value: QuestionType) =>
                    setQuestionType(value)
                  }
                  disabled={uploading}
                >
                  <SelectTrigger id="questionType">
                    <SelectValue placeholder="Select question type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MULTICHOICE">Multiple Choice</SelectItem>
                    <SelectItem value="YESNO">Yes/No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {uploading ? (
                <div className="flex flex-col items-center justify-center py-4 space-y-4">
                  <div className="relative">
                    <div className="animate-bounce">
                      <FileText className="h-12 w-12 text-primary" />
                    </div>
                    <div className="absolute -top-1 -right-1">
                      <div className="animate-ping h-3 w-3 rounded-full bg-primary opacity-75"></div>
                    </div>
                  </div>
                  <UploadingMessage />
                </div>
              ) : (
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer relative">
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                    disabled={uploading}
                  />
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Upload className="h-10 w-10 text-muted-foreground" />
                    <p className="font-medium">
                      {file ? file.name : "Click or drag and drop to upload"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Only text documents (PDF, TXT, DOC, DOCX, CSV, RTF)
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={uploadFile}
              disabled={!file || uploading || !title.trim()}
              className="w-full"
            >
              {uploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Generate Quiz"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
