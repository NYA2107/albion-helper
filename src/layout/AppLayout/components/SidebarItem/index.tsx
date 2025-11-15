import { cn } from "@/lib/utils";
import type { FC, ReactElement } from "react";
import { Link } from "react-router";
import type { MenuIdEnum } from "../Sidebar";

export interface SidebarItemProps {
  id: MenuIdEnum;
  label: string;
  icon: ReactElement;
  linkTo: string;
  active?: boolean;
}

const SidebarItem: FC<SidebarItemProps> = (props) => {
  const { icon, label, linkTo, active } = props;
  return (
    <div
      className={cn(
        "flex items-center p-2 hover:bg-accent cursor-pointer rounded-lg gap-3 hover:text-accent-foreground",
        active && "text-accent-foreground bg-accent"
      )}
    >
      {icon}
      <Link className="hidden sm:inline" to={linkTo}>
        {label}
      </Link>
    </div>
  );
};
export default SidebarItem;
