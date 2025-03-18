"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  FileText,
  Brain,
  Zap,
  Users,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "next/navigation";
export default function Home() {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.8 } },
  };

  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/10 to-transparent" />
          <div className="absolute -top-[30%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute top-[20%] right-[5%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="container mx-auto pt-24 lg:pt-32 px-6 lg:px-10">
          <div className="flex flex-col gap-8 lg:gap-16 lg:flex-row lg:items-center">
            <motion.div
              className="flex flex-col gap-6 lg:gap-8 lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-primary/20 text-primary">
                    AI-Powered Learning
                  </span>
                </motion.div>

                <motion.h1
                  className="text-4xl lg:text-6xl font-bold tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  Transform Documents into{" "}
                  <span className="bg-gradient-to-br from-primary to-primary/50 bg-clip-text text-transparent">
                    Intelligent Quizzes
                  </span>
                </motion.h1>

                <motion.p
                  className="text-md lg:text-xl text-muted-foreground leading-relaxed max-w-[600px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  Xyen AI Quizzer helps students, educators, and professionals
                  generate comprehensive exam questions from any document.
                  Upload files or use AI prompts to create customized quizzes in
                  seconds.
                </motion.p>
              </div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Button
                  aria-label="Get Started"
                  onClick={() => router.push("/sign-up")}
                  size="lg"
                  className="text-lg px-8 h-12 bg-primary hover:bg-primary/90"
                >
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  aria-label="View Demo"
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 h-12"
                >
                  View Demo
                </Button>
              </motion.div>

              <motion.div
                className="flex items-center gap-2 text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>No credit card required</span>
              </motion.div>
            </motion.div>

            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/50 rounded-lg blur opacity-30"></div>
                <div className="relative bg-background/80 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <div className="absolute top-3 left-3 flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="pt-6">
                    <Image
                      src="/illustrations/Innovation-pana.png"
                      alt="AI Quiz Generation Illustration"
                      width={300}
                      height={300}
                      className="w-full h-auto"
                      priority
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-10">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to create effective study materials and
              practice tests
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={item}>
              <Card className="h-full border-primary/20 hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    Multiple File Formats
                  </h3>
                  <p className="text-muted-foreground">
                    Upload PDF, TXT, DOC, DOCX, CSV, and RTF files to generate
                    quizzes from your existing materials.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="h-full border-primary/20 hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    AI-Powered Generation
                  </h3>
                  <p className="text-muted-foreground">
                    Advanced AI algorithms create relevant, challenging
                    questions that test understanding, not just memorization.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="h-full border-primary/20 hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Instant Results</h3>
                  <p className="text-muted-foreground">
                    Generate comprehensive quizzes in seconds, saving hours of
                    manual question creation.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="h-full border-primary/20 hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    Perfect for Everyone
                  </h3>
                  <p className="text-muted-foreground">
                    Ideal for students studying for exams, teachers creating
                    assessments, and professionals preparing for certifications.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="h-full border-primary/20 hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-primary"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    Customizable Quizzes
                  </h3>
                  <p className="text-muted-foreground">
                    Adjust difficulty levels, question types, and focus areas to
                    create perfectly tailored assessments.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="h-full border-primary/20 hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-primary"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
                  <p className="text-muted-foreground">
                    Your documents and generated quizzes remain private and
                    secure with our advanced encryption.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-6 lg:px-10">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Generate comprehensive quizzes in three simple steps
            </p>
          </motion.div>

          <Tabs defaultValue="upload" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-12">
              <TabsTrigger value="upload">1. Upload</TabsTrigger>
              <TabsTrigger value="generate">2. Generate</TabsTrigger>
              <TabsTrigger value="practice">3. Practice</TabsTrigger>
            </TabsList>
            <TabsContent value="upload">
              <motion.div
                className="flex flex-col lg:flex-row items-center gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="lg:w-1/2">
                  <h3 className="text-2xl font-bold mb-4">
                    Upload Your Documents
                  </h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    Simply drag and drop your study materials in PDF, TXT, DOC,
                    DOCX, CSV, or RTF format. Alternatively, you can use our AI
                    prompt feature to generate questions from scratch.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Supports multiple file formats</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Secure file handling</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>No file size limitations</span>
                    </li>
                  </ul>
                </div>
                <div className="lg:w-1/2">
                  <div className="relative rounded-lg overflow-hidden border border-primary/20">
                    <div className="absolute top-0 left-0 right-0 h-10 bg-muted flex items-center px-4">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                    </div>
                    <div className="pt-10 p-6 bg-card">
                      <div className="border-2 border-dashed border-primary/20 rounded-lg p-8 flex flex-col items-center justify-center">
                        <FileText className="h-12 w-12 text-primary/50 mb-4" />
                        <p className="text-center text-muted-foreground mb-4">
                          Drag and drop your files here, or click to browse
                        </p>
                        <Button aria-label="Browse Files" size="sm">
                          Browse Files
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
            <TabsContent value="generate">
              <motion.div
                className="flex flex-col lg:flex-row items-center gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="lg:w-1/2">
                  <h3 className="text-2xl font-bold mb-4">
                    Generate Questions
                  </h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    Our advanced AI analyzes your content and generates relevant
                    questions across different formats including multiple
                    choice, true/false, and short answer questions.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Customizable question types</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Adjustable difficulty levels</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Focus on specific topics</span>
                    </li>
                  </ul>
                </div>
                <div className="lg:w-1/2">
                  <div className="relative rounded-lg overflow-hidden border border-primary/20">
                    <div className="absolute top-0 left-0 right-0 h-10 bg-muted flex items-center px-4">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                    </div>
                    <div className="pt-10 p-6 bg-card">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Question Type</span>
                          <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                            Multiple Choice
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Difficulty</span>
                          <div className="flex">
                            <span className="h-2 w-8 bg-primary rounded-l-full"></span>
                            <span className="h-2 w-8 bg-primary/60 rounded-r-full"></span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">
                            Number of Questions
                          </span>
                          <span>10</span>
                        </div>
                        <Button
                          aria-label="Generate Quiz"
                          className="w-full mt-4"
                        >
                          Generate Quiz
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
            <TabsContent value="practice">
              <motion.div
                className="flex flex-col lg:flex-row items-center gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="lg:w-1/2">
                  <h3 className="text-2xl font-bold mb-4">Practice & Learn</h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    Take the generated quiz, review your answers, and get
                    instant feedback. Save quizzes for later or share them with
                    others for collaborative learning.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Instant feedback and explanations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Track your progress over time</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Share quizzes with classmates or students</span>
                    </li>
                  </ul>
                </div>
                <div className="lg:w-1/2">
                  <div className="relative rounded-lg overflow-hidden border border-primary/20">
                    <div className="absolute top-0 left-0 right-0 h-10 bg-muted flex items-center px-4">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                    </div>
                    <div className="pt-10 p-6 bg-card">
                      <div className="space-y-6">
                        <div>
                          <span className="text-sm text-muted-foreground">
                            Question 3 of 10
                          </span>
                          <h4 className="font-medium mt-1">
                            What is the primary function of mitochondria in a
                            cell?
                          </h4>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 p-2 rounded border border-primary/20 bg-primary/5">
                            <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-primary"></div>
                            </div>
                            <span>Energy production</span>
                          </div>
                          <div className="flex items-center gap-2 p-2 rounded border border-muted">
                            <div className="w-4 h-4 rounded-full border-2 border-muted"></div>
                            <span>Protein synthesis</span>
                          </div>
                          <div className="flex items-center gap-2 p-2 rounded border border-muted">
                            <div className="w-4 h-4 rounded-full border-2 border-muted"></div>
                            <span>Cell division</span>
                          </div>
                          <div className="flex items-center gap-2 p-2 rounded border border-muted">
                            <div className="w-4 h-4 rounded-full border-2 border-muted"></div>
                            <span>Waste removal</span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <Button aria-label="Previous" variant="outline">
                            Previous
                          </Button>
                          <Button aria-label="Next">Next</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-10">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands of students and educators who are transforming how
              they study and teach
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={item}>
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-5 h-5 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "As a medical student, I've saved countless hours using Xyen
                    AI Quizzer. It generates high-quality questions from my
                    lecture notes that really test my understanding."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold mr-3">
                      JS
                    </div>
                    <div>
                      <p className="font-medium">James S.</p>
                      <p className="text-sm text-muted-foreground">
                        Medical Student
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-5 h-5 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "I use Xyen AI Quizzer to create assessments for my high
                    school science classes. It saves me time and creates varied
                    questions that challenge my students at different levels."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold mr-3">
                      MT
                    </div>
                    <div>
                      <p className="font-medium">Maria T.</p>
                      <p className="text-sm text-muted-foreground">
                        High School Teacher
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-5 h-5 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "Preparing for my certification exam was so much easier with
                    Xyen AI Quizzer. I uploaded the study guide and instantly
                    had practice questions that helped me pass on my first try."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold mr-3">
                      RK
                    </div>
                    <div>
                      <p className="font-medium">Raj K.</p>
                      <p className="text-sm text-muted-foreground">
                        IT Professional
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-6 lg:px-10">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get answers to common questions about Xyen AI Quizzer
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-medium">
                  What file formats does Xyen AI Quizzer support?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Xyen AI Quizzer supports a wide range of file formats
                  including PDF, TXT, DOC, DOCX, CSV, and RTF files. This allows
                  you to generate quizzes from virtually any text-based
                  document.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-medium">
                  How accurate are the generated questions?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Our AI is trained to generate highly relevant and accurate
                  questions based on the content provided. The system
                  continuously improves through machine learning to ensure the
                  highest quality of questions that test true understanding of
                  the material.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-medium">
                  Can I customize the types of questions generated?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes! You can customize the question types (multiple choice,
                  true/false, short answer), difficulty levels, and even focus
                  on specific topics or sections of your document to create
                  perfectly tailored quizzes.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-medium">
                  Is there a limit to how many quizzes I can generate?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Free accounts can generate a limited number of quizzes per
                  month. Premium subscribers enjoy unlimited quiz generation
                  along with additional features like advanced customization
                  options and priority support.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-lg font-medium">
                  How secure is my uploaded content?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We take security seriously. All uploaded documents are
                  encrypted and processed securely. We do not store your
                  documents longer than necessary for processing, and they are
                  never shared with third parties.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Ready to Transform Your Study Experience?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of students, educators, and professionals who are
              using AI to create better learning materials and achieve better
              results.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                aria-label="Get Started"
                size="lg"
                className="text-lg px-8 h-12 bg-primary hover:bg-primary/90"
              >
                Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                aria-label="View Pricing"
                size="lg"
                variant="outline"
                className="text-lg px-8 h-12"
              >
                View Pricing
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12 lg:py-16 border-t">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <span className="text-xl font-bold">Xyen AI Quizzer</span>
              </div>
              <p className="text-muted-foreground mb-4">
                AI-powered quiz generation for students, educators, and
                professionals. Transform any document into comprehensive
                practice tests.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Roadmap
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Guides
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    API
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Community
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Xyen AI. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                <a
                  href="https://storyset.com/technology"
                  className="hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Technology illustrations by Storyset
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
