"use client";

import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AccentCardProps {
  className?: string;
  title?: string | ReactNode;
  description?: string | ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
}

export function AccentCard({
  className,
  title,
  description,
  children,
  footer,
  headerClassName,
  contentClassName,
  footerClassName,
}: AccentCardProps) {
  return (
    <div className="relative">
      {/* Glow effects */}
      <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-primary/5 blur-xl"></div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-primary/5 blur-xl"></div>

      <Card
        className={cn(
          "border-none shadow-lg relative overflow-hidden",
          className
        )}
      >
        {/* Accent elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
        <div className="absolute top-0 right-0 w-24 h-24 -translate-y-1/2 translate-x-1/2 rounded-full bg-primary/10"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 translate-y-1/3 -translate-x-1/3 rounded-full bg-primary/10"></div>

        {/* Card content */}
        {(title || description) && (
          <CardHeader className={cn("pb-6 relative z-10", headerClassName)}>
            {title &&
              (typeof title === "string" ? (
                <CardTitle className="text-2xl md:text-3xl font-bold text-center">
                  {title}
                </CardTitle>
              ) : (
                title
              ))}
            {description &&
              (typeof description === "string" ? (
                <CardDescription className="text-muted-foreground text-center mt-2">
                  {description}
                </CardDescription>
              ) : (
                description
              ))}
          </CardHeader>
        )}

        <CardContent className={cn("relative z-10", contentClassName)}>
          {children}
        </CardContent>

        {footer && (
          <CardFooter className={cn("relative z-10", footerClassName)}>
            {footer}
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
