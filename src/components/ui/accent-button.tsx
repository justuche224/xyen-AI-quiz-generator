"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

interface AccentButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  shimmer?: boolean;
}

export const AccentButton = forwardRef<HTMLButtonElement, AccentButtonProps>(
  ({ className, asChild = false, shimmer = true, children, ...props }, ref) => {
    const Comp = asChild ? Slot : Button;

    return (
      <Comp
        className={cn(
          "w-full h-11 bg-primary hover:bg-primary/80 text-primary-foreground font-medium relative overflow-hidden group",
          className
        )}
        ref={ref}
        {...props}
      >
        {shimmer && (
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_forwards]"></span>
        )}
        <span className="relative z-10 flex items-center justify-center">
          {children}
        </span>
      </Comp>
    );
  }
);

AccentButton.displayName = "AccentButton";
