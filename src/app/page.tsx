import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center">
      <div className="container mx-auto pt-24 lg:pt-32 px-6 lg:px-10">
        <div className="flex flex-col gap-8 lg:gap-16 lg:flex-row lg:items-center">
          <div className="flex flex-col gap-6 lg:gap-8 lg:w-1/2 animate-in slide-in-from-left duration-700">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                Instantly Generate{" "}
                <span className="bg-gradient-to-br from-primary to-primary/50 bg-clip-text text-transparent">
                  Exam Questions
                </span>{" "}
                with AI
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-[600px]">
                Say goodbye to manual quiz creation! With our AI-powered Quiz
                Generator, you can effortlessly turn any document into a
                comprehensive quiz in just minutes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8 h-12">
                Get Started <ArrowRight className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 h-12">
                View Demo
              </Button>
            </div>
          </div>

          <div className="lg:w-1/2 animate-in slide-in-from-right duration-700">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/50 rounded-lg blur opacity-30"></div>
              <div className="relative bg-background rounded-lg p-4">
                <Image
                  src="/illustrations/Innovation-pana.png"
                  alt="AI Quiz Generation Illustration"
                  width={1000}
                  height={1000}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// <a href="https://storyset.com/technology">Technology illustrations by Storyset</a>
// <a href="https://storyset.com/technology">Technology illustrations by Storyset</a>
