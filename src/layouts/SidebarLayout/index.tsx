import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import AppSidebar from "./app-sidebar";
import { useAuthStore } from "@/store";
import { ScrollArea } from "@/components/ui/scroll-area";

const SidebarLayout: FC = () => {
  const email = useAuthStore((state) => state.email);
  const location = useLocation();
  if (!email) {
    return (
      <Navigate to={`/auth/login?redirect=${location.pathname}`} replace />
    );
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <ScrollArea className="h-dvh p-4 w-[calc(100dvw-var(--sidebar-width-icon))] sm:w-[calc(100dvw-var(--sidebar-width))]">
          <div className="flex justify-center py-5">
            <div className="w-full md:w-[500px] lg:w-[700px] xl:w-[1000px]">
              <Outlet />
            </div>
          </div>
        </ScrollArea>
      </main>
    </SidebarProvider>
  );
};

export default SidebarLayout;
