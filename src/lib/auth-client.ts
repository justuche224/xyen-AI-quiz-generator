import { config } from "dotenv";
import { createAuthClient } from "better-auth/react";

config({ path: ".env" });

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
});
