import { Outlet } from "react-router";
import Sidebar from "./components/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import GlobalModal from "@/components/GlobalModal";

const AppLayout = () => {
  return (
    <div className="h-dvh w-dvw flex [--w-sidebar:200px] [--w-sm-sidebar:55px]">
      <GlobalModal />
      <Sidebar />
      <ScrollArea className="h-dvh p-4 w-[calc(100dvw-var(--w-sm-sidebar))] sm:w-[calc(100dvw-var(--w-sidebar))]">
        <Outlet />
      </ScrollArea>
    </div>
  );
};

export default AppLayout;
