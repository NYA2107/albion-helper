/* eslint-disable react-refresh/only-export-components */
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { useGlobalState } from "@/store";
import { BadgeCent, Cat, Component, LogOutIcon } from "lucide-react";
import { toast } from "sonner";
import SidebarItem, { type SidebarItemProps } from "../SidebarItem";
import useSignOutMutation from "./hooks/useSignOutMutation";
import { cn } from "@/lib/utils";

export enum MenuIdEnum {
  "home" = "home",
  "menu-player" = "menu-player",
  "menu-party-time" = "menu-party-time",
  "menu-loot-split" = "menu-loot-split",
}

const menuList: SidebarItemProps[] = [
  {
    id: MenuIdEnum["menu-player"],
    icon: <Cat size={15} />,
    label: "Players",
    linkTo: "/app/player",
  },
  {
    id: MenuIdEnum["menu-party-time"],
    icon: <Component size={15} />,
    label: "Party Time",
    linkTo: "/app/party-time",
  },
  {
    id: MenuIdEnum["menu-loot-split"],
    icon: <BadgeCent size={15} />,
    label: "Loot Split",
    linkTo: "/app/loot-split",
  },
];

const Sidebar = () => {
  const mutation = useSignOutMutation({
    onError: (error) => {
      toast.error("Error signing out: " + error.message);
    },
  });
  const menuId = useGlobalState((s) => s.menuId);

  const handleLogout = async () => {
    // Implement logout logic here
    mutation.mutate();
  };

  return (
    <div className="h-dvh w-(--w-sm-sidebar) sm:w-(--w-sidebar) p-3 border-r-[0.5px] border-accent-foreground flex flex-col justify-between">
      <div className="flex flex-col gap-2">
        {menuList.map((v) => {
          return (
            <SidebarItem
              key={v.id}
              id={v.id}
              icon={v.icon}
              label={v.label}
              linkTo={v.linkTo}
              active={v.id === menuId}
            />
          );
        })}
      </div>
      <Button
        disabled={mutation.isPending}
        onClick={handleLogout}
        variant="destructive-ghost"
      >
        <div
          className={cn(
            "flex items-center p-2 cursor-pointer rounded-lg gap-3"
          )}
        >
          {mutation.isPending ? <Spinner /> : <LogOutIcon size={15} />}
          <span className="hidden sm:inline">Logout</span>
        </div>
      </Button>
    </div>
  );
};

export default Sidebar;
