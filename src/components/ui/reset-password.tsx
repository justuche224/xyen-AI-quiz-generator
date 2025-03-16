"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { KeyRound } from "lucide-react";
import Link from "next/link";
import { z as zod } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/ui/form-error";
import { FormSuccess } from "@/components/ui/form-success";
import { AccentCard } from "@/components/ui/accent-card";
import { AccentButton } from "@/components/ui/accent-button";
import { resetPasswordSchema } from "@/lib/schema";

const ResetPassword = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof resetPasswordSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      console.log(values);
      // Simulate success message
      setSuccess("Your password has been reset successfully.");
    });
  };

  return (
    <div className="container mx-auto py-10 px-4 md:py-16 lg:py-24">
      <div className="flex flex-col lg:flex-row gap-8 items-center min-h-[600px]">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 max-w-md mx-auto lg:mx-0">
          <AccentCard
            title="Reset your password"
            description="Create a new password for your account."
            className="min-h-[400px]"
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="********"
                          {...field}
                          className="h-11"
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Minimum 8 characters, at least one uppercase, one
                        lowercase, one number and one special character.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="********"
                          {...field}
                          className="h-11"
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Re-enter your new password to confirm.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormError message={error} />
                <FormSuccess message={success} />
                <AccentButton
                  type="submit"
                  disabled={isPending}
                  className="mt-6"
                >
                  {isPending ? (
                    "Resetting password..."
                  ) : (
                    <>
                      Reset Password <KeyRound className="ml-2 h-4 w-4" />
                    </>
                  )}
                </AccentButton>

                <p className="text-center text-sm text-muted-foreground mt-4">
                  Remember your password?{" "}
                  <Link
                    href="/sign-in"
                    className="font-medium underline underline-offset-4 hover:text-primary"
                  >
                    Back to sign in
                  </Link>
                </p>
              </form>
            </Form>
          </AccentCard>
        </div>

        {/* Image Section - Hidden on mobile */}
        <div className="hidden lg:block w-full lg:w-1/2">
          <div className="relative h-[600px] w-full max-w-xl mx-auto">
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-primary/30"></div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-primary/20"></div>
            <div className="relative z-10 h-full w-full">
              <Image
                src="/illustrations/Innovation-pana.png"
                alt="Reset Password"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
