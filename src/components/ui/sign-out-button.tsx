"use client";

import React, { useTransition } from "react";
import { Button } from "./button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const SignOutButton = ({
  redirectTo = "/sign-in",
  className,
}: {
  redirectTo?: string;
  className?: string;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <Button
      disabled={isPending}
      className={cn(className, "min-w-24")}
      onClick={async () => {
        startTransition(async () => {
          await authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push(redirectTo);
              },
            },
          });
        });
      }}
    >
      {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Sign Out</>}
    </Button>
  );
};

export default SignOutButton;
