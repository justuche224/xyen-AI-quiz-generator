"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

const PublicNavBar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { href: "/about", label: "About Us" },
    { href: "/demo", label: "Demo" },
    { href: "/pricing", label: "Pricing" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-sm z-50">
      <div className="flex justify-between items-center h-16 px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="text-2xl font-bold flex items-center gap-2">
          <Image
            onClick={() => router.push("/")}
            src={"/icons/web/icon-192.png"}
            alt="Xyen"
            width={32}
            height={32}
          />
          Xyen AI
        </div>
        <div className="md:flex gap-4 items-center hidden">
          {navLinks.map((link) => (
            <NavBarItem key={link.href} href={link.href}>
              {link.label}
            </NavBarItem>
          ))}
        </div>
        <div className="md:flex gap-4 hidden">
          <Button variant="outline" onClick={() => router.push("/sign-in")}>
            Sign In
          </Button>
          <Button
            className="rounded-none"
            onClick={() => router.push("/sign-up")}
          >
            Sign Up
          </Button>
          <ModeToggle />
        </div>
        <div className="inline-block md:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu size={34} />
            </SheetTrigger>
            <SheetContent className="w-[80%] sm:w-[350px] md:hidden flex flex-col p-6">
              <SheetHeader className="mb-6">
                <SheetTitle className="sr-only">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex-1">
                <div className="flex flex-col space-y-1 mb-8">
                  {navLinks.map((link) => (
                    <NavBarItem
                      key={link.href}
                      href={link.href}
                      className={`w-full justify-start text-lg py-2 ${
                        pathname === link.href
                          ? "bg-accent/50 font-medium"
                          : "hover:bg-accent/30"
                      }`}
                    >
                      {link.label}
                    </NavBarItem>
                  ))}
                </div>
                <div className="flex flex-col gap-3 w-full">
                  <Button variant="outline" className="w-full py-6 text-lg">
                    Sign In
                  </Button>
                  <Button className="w-full py-6 text-lg">Sign Up</Button>
                </div>
              </div>
              <SheetFooter>
                <ModeToggle />
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavBar;

const NavBarItem = ({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) => {
  const pathname = usePathname();
  return (
    <Button
      variant="ghost"
      className={`${className} ${pathname === href ? "underline" : ""}`}
    >
      {children}
    </Button>
  );
};
