import { cookies } from "next/headers";
import { SidebarInset, SidebarProvider } from "@/components/ui";
import { AppSidebar, AppHeader } from "@/app/(app)/_components";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset className="h-screen overflow-auto">
        <AppHeader />
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
