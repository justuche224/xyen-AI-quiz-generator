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
import { Skeleton } from "./skeleton";
import { NavUser } from "./app-sidebar-user";
import { getquizzes } from "@/actions/get-quizzes";

const favorites = [
  { name: "Dashboard", icon: <Home className="h-4 w-4" />, link: "/dashboard" },
  {
    name: "Create Quiz",
    icon: <PlusCircle className="h-4 w-4" />,
    link: "/dashboard/create-quiz",
  },
  {
    name: "quizzes",
    icon: <BookOpen className="h-4 w-4" />,
    link: "/dashboard/quizzes",
  },
];

interface quizzes {
  id: string;
  title: string;
}

type QuizArray = quizzes[];

export function AppSidebar() {
  const [quizzes, setquizzes] = useState<QuizArray | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;
    if (!user) router.push("/sign-in");

    const fetchquizzes = async () => {
      try {
        const quizzes = await getquizzes(7);
        setquizzes(quizzes);
      } catch (error) {
        console.error("Failed to fetch quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchquizzes();
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
          <SidebarGroupLabel>Recent quizzes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {loading ? (
                Array.from({ length: 7 }).map((_, index) => (
                  <SidebarMenuItem key={`skeleton-${index}`}>
                    <SidebarMenuSkeleton />
                  </SidebarMenuItem>
                ))
              ) : quizzes && quizzes.length > 0 ? (
                quizzes.map((quiz) => (
                  <SidebarMenuItem key={quiz.id}>
                    <SidebarMenuButton
                      onClick={() =>
                        router.push(`/dashboard/quizzes/${quiz.id}`)
                      }
                      variant={
                        pathname === `/dashboard/quizzes/${quiz.id}`
                          ? "outline"
                          : "default"
                      }
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
