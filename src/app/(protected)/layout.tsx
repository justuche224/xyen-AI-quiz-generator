import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import NavBar from "@/components/ui/nav-bar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <NavBar />
        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
