import { ScrollArea } from "@/components/ui/scroll-area";
import GlobalModal from "@/components/global/GlobalModal";
import { Navigate, Outlet, useLocation } from "react-router";
import Sidebar from "./components/Sidebar";
import { useAuthStore } from "@/store";

const AppLayout = () => {
  const email = useAuthStore((state) => state.email);
  const location = useLocation();
  if (!email) {
    return (
      <Navigate to={`/auth/login?redirect=${location.pathname}`} replace />
    );
  }

  return (
    <div className="h-dvh w-dvw flex [--w-sidebar:200px] [--w-sm-sidebar:55px]">
      <GlobalModal />
      <Sidebar />
      <ScrollArea className="h-dvh p-4 w-[calc(100dvw-var(--w-sm-sidebar))] sm:w-[calc(100dvw-var(--w-sidebar))]">
        <div className="flex justify-center py-5">
          <div className="w-full md:w-[500px] lg:w-[700px] xl:w-[1000px]">
            <Outlet />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AppLayout;
