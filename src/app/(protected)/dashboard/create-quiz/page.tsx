"use client";

import type React from "react";

import { useState, useEffect } from "react";
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

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "text/plain",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/csv",
  "application/rtf",
];

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

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <p className="text-sm font-medium text-center text-primary animate-pulse">
      {messages[messageIndex]}
    </p>
  );
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MBSS

export default function DocumentUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [questionType, setQuestionType] = useState<"MULTICHOICE" | "YESNO">(
    "MULTICHOICE"
  );
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const uploadFile = async () => {
    if (!file) return;

    if (!title.trim()) {
      setError("Please enter a title for your quiz");
      return;
    }

    try {
      setUploading(true);

      // Create a unique file name
      const fileExt = file.name.split(".").pop();
      console.log(fileExt);
      const fileName = `${Math.random()
        .toString(36)
        .substring(2, 15)}.${fileExt}`;
      console.log(fileName);
      const filePath = `documents/${fileName}`;
      console.log(filePath);
      const storage = getStorage();

      const { data, error } = await storage
        .from("xyen")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      console.log("done");

      if (error) throw error;

      console.log(data);

      // Get public URL for the file
      const {
        data: { publicUrl },
      } = storage.from("xyen").getPublicUrl(filePath);

      // console.log("Document uploaded successfully. URL:", publicUrl);

      const processRes = await fetch("/api/v1/process-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pdfLink: publicUrl,
          type: questionType,
          title: title,
        }),
      });
      const { quizId } = await processRes.json();

      let quizData;
      let failedStatus = false;

      while (!quizData && !failedStatus) {
        const statusRes = await fetch(`/api/v1/quiz-status/${quizId}`);
        const data = await statusRes.json();
        if (data.status.toLocaleLowerCase() === "failed") {
          failedStatus = true;
          // console.log("Quiz generation failed");
          setError("Quiz generation failed. Please try again.");
          break;
        } else if (data.status.toLocaleLowerCase() === "completed") {
          quizData = data;
          // console.log("Data", data);
          router.push(`/dashboard/quizes/${quizData.quizId}`);
          break;
        } else {
          // console.log(data);
          await new Promise((resolve) => setTimeout(resolve, 10000));
        }
      }

      setFile(null);
      setTitle("");
      if (!failedStatus) {
        setError(null);
      }
    } catch (error: any) {
      console.log(error);
      setError(error.message || "Error uploading file");
    } finally {
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
                  onValueChange={(value) =>
                    setQuestionType(value as "MULTICHOICE" | "YESNO")
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

              {uploading && (
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
