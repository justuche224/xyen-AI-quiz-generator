"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";

import { signUpSchema } from "@/lib/schema";
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
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof signUpSchema>) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      const { data, error } = await authClient.signUp.email(
        {
          email: values.email,
          name: values.name,
          password: values.password,
          callbackURL: "/dashboard",
        },
        {
          onSuccess: (context) => {
            console.log(context);
            router.push("/dashboard");
          },
          onError(context) {
            setError(context.error.message);
          },
        }
      );
      console.log(data);
      console.log(error);
    });
  };

  return (
    <div className="container mx-auto py-10 px-4 md:py-16 lg:py-24">
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 max-w-md mx-auto lg:mx-0">
          <AccentCard
            title="Create your account"
            description="Join us today and start your journey"
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          placeholder="John Doe"
                          {...field}
                          className="h-11"
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          placeholder="john@example.com"
                          {...field}
                          className="h-11"
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Your email will be used to login to your account.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            disabled={isPending}
                            type={showPassword ? "text" : "password"}
                            placeholder="********"
                            {...field}
                            className="h-11 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
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
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            disabled={isPending}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="********"
                            {...field}
                            className="h-11 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormDescription className="text-xs">
                        Confirm your password to ensure it matches.
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
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Sign Up <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </AccentButton>

                <p className="text-center text-sm text-muted-foreground mt-4">
                  Already have an account?{" "}
                  <a
                    href="/sign-in"
                    className="font-medium underline underline-offset-4 hover:text-primary"
                  >
                    Sign in
                  </a>
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
                alt="Sign Up"
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

export default SignUp;
