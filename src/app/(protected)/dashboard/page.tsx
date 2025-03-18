import React from "react";
import { checkAuthSession } from "@/lib/server-auth-helper";
import SignOutButton from "@/components/ui/sign-out-button";
const page = async () => {
  const session = await checkAuthSession();
  // console.log(session);

  return (
    <div className="pt-24">
      <SignOutButton className="rounded-sm" redirectTo="/sign-in" />
    </div>
  );
};

export default page;
