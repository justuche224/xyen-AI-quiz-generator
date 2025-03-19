"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { SidebarTrigger } from "./sidebar";
import { Separator } from "./separator";

const NavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [routname, setRoutname] = useState("");

  useEffect(() => {
    const segments = pathname.split("/");

    const lastSegment = segments.filter((segment) => segment).pop() || "";

    const isUUID =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        lastSegment
      );

    let routname;

    if (isUUID) {
      // If it's a UUID, get the previous segment (which should be 'quizzes')
      const previousSegment =
        segments.filter((segment) => segment).slice(-2)[0] || "";
      // Make it singular (remove trailing 'zes')
      const singularForm = previousSegment.endsWith("zes")
        ? previousSegment.slice(0, -3)
        : previousSegment;
      // Replace hyphens with spaces
      const segmentWithSpaces = singularForm.replace(/-/g, " ");
      // Show the first 5 characters of the UUID
      routname =
        segmentWithSpaces.charAt(0).toUpperCase() +
        segmentWithSpaces.slice(1) +
        ` (${lastSegment.substring(0, 5)}...)`;
    } else {
      // Normal case - just the last segment with spaces
      const segmentWithSpaces = lastSegment.replace(/-/g, " ");
      routname =
        segmentWithSpaces.charAt(0).toUpperCase() + segmentWithSpaces.slice(1);
    }

    setRoutname(routname);
  }, [pathname]);
  return (
    <nav className="flex h-14 items-center gap-4 border-b px-4 fixed top-0 left-0 right-0 z-50 bg-sidebar">
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-6" />
      <Image
        onClick={() => router.push("/")}
        src={"/icons/web/icon-192.png"}
        alt="Xyen"
        width={32}
        height={32}
      />
      <h1 className="text-lg font-semibold flex-1">{routname}</h1>
      <Separator orientation="vertical" className="h-6" />
      <ModeToggle />
    </nav>
  );
};

export default NavBar;
