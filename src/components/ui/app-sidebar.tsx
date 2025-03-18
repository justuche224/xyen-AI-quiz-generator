"use client";
import { BookOpen, Home, PlusCircle } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { getQuizes } from "@/actions/get-quizes";
import { Skeleton } from "./skeleton";
import { NavUser } from "./app-sidebar-user";

const favorites = [
  { name: "Dashboard", icon: <Home className="h-4 w-4" />, link: "/dashboard" },
  {
    name: "Create Quize",
    icon: <PlusCircle className="h-4 w-4" />,
    link: "/dashboard/create-quize",
  },
  {
    name: "Quizes",
    icon: <BookOpen className="h-4 w-4" />,
    link: "/dashboard/quizes",
  },
];

interface Quizes {
  id: string;
  status: "PROCESSING" | "COMPLETED" | "FAILED";
  title: string;
}

type QuizArray = Quizes[];

export function AppSidebar() {
  const [quizes, setQuizes] = useState<QuizArray | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;
    if (!user) router.push("/sign-in");

    const fetchQuizes = async () => {
      try {
        const quizes = await getQuizes(7);
        setQuizes(quizes);
      } catch (error) {
        console.error("Failed to fetch quizes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizes();
  }, [isLoading, user, router]);

  return (
    <Sidebar className="border-r pt-14">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Favorites</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {favorites.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    onClick={() => router.push(item.link)}
                    variant={pathname === item.link ? "outline" : "default"}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Recent Quizes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {loading ? (
                Array.from({ length: 7 }).map((_, index) => (
                  <SidebarMenuItem key={`skeleton-${index}`}>
                    <SidebarMenuSkeleton />
                  </SidebarMenuItem>
                ))
              ) : quizes && quizes.length > 0 ? (
                quizes.map((quiz) => (
                  <SidebarMenuItem key={quiz.id}>
                    <SidebarMenuButton
                      onClick={() =>
                        router.push(`/dashboard/quizes/${quiz.id}`)
                      }
                      variant={pathname === quiz.title ? "outline" : "default"}
                    >
                      <span>{quiz.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              ) : (
                <SidebarMenuItem>
                  <SidebarMenuButton disabled>
                    <span>No quizzes found</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-2">
        {isLoading ? (
          <Skeleton className="h-10 w-full" />
        ) : (
          <NavUser
            user={{
              name: user?.name || "",
              email: user?.email || "",
              avatar: user?.image || "",
            }}
          />
        )}
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
