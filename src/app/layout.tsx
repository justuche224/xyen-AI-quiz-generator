import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import NextTopLoader from "nextjs-toploader";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface ExtendedMetadata extends Metadata {
  canonical: string;
  author: string;
  structuredData?: Record<string, any>;
}

export const metadata: ExtendedMetadata = {
  title: "Xyen AI Quizzer - Generate & Practice Exam Questions with AI",
  description:
    "Xyen AI Quizzer helps you generate and practice exam questions from PDF, TXT, DOC, DOCX, CSV, and RTF files or AI-powered prompts. Perfect for students, teachers, and professionals preparing for exams.",
  keywords: [
    "AI Exam Generator",
    "AI Quiz Generator",
    "Exam AI",
    "Practice Tests",
    "Exam Questions AI",
    "Quiz AI",
    "Test Preparation",
    "Study AI",
    "Mock Tests",
    "Online Quiz Generator",
    "AI-powered Study Tool",
    "Exam Revision",
    "Self Assessment AI",
    "Practice Exams",
    "Education AI",
  ],
  canonical: "https://xyen-ai.vercel.app",
  robots: "index, follow",
  themeColor: "#ddffb3",
  author: "Xyen AI Team",
  openGraph: {
    title: "Xyen AI Quizzer - Generate & Practice Exam Questions with AI",
    description:
      "Generate and practice exam questions from PDF, TXT, DOC, DOCX, CSV, RTF files, or AI-generated prompts. Perfect for students, educators, and professionals.",
    url: "https://xyen-ai.vercel.app",
    siteName: "Xyen AI Quizzer",
    type: "website",
    images: [
      {
        url: "https://xyen-ai.vercel.app/images/preview.png",
        width: 1200,
        height: 630,
        alt: "Xyen AI Quizzer - AI-powered Exam and Quiz Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Xyen AI Quizzer - Generate & Practice Exam Questions with AI",
    description:
      "Generate and practice exam questions from PDF, TXT, DOC, DOCX, CSV, and RTF files or AI-powered prompts. Perfect for students, teachers, and professionals.",
    site: "https://xyen-ai.vercel.app",
    creator: "@xyen_ai",
    images: ["https://xyen-ai.vercel.app/images/preview.png"],
  },
  structuredData: {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Xyen AI Quizzer",
    url: "https://xyen-ai.vercel.app",
    image: "https://xyen-ai.vercel.app/images/preview.png",
    description:
      "An AI-powered quiz and exam generator that allows users to create and practice tests from documents and prompts.",
    applicationCategory: "Education",
    operatingSystem: "Web",
    author: {
      "@type": "Organization",
      name: "Xyen AI",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(metadata.structuredData),
          }}
        />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader color="#DDFFB3" showSpinner />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
