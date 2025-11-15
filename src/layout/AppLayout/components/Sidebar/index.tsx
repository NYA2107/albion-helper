/* eslint-disable react-refresh/only-export-components */
import { Cat, Component, BadgeCent } from "lucide-react";
import SidebarItem, { type SidebarItemProps } from "../SidebarItem";
import { useGlobalState } from "@/store";

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
  const menuId = useGlobalState((s) => s.menuId);

  return (
    <div className="h-dvh w-(--w-sm-sidebar) sm:w-(--w-sidebar) p-3 border-r-[0.5px] border-accent flex flex-col gap-2">
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
  );
};

export default Sidebar;
