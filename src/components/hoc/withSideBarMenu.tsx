import useUpdateMenuId from "@/hooks/useUpdateMenuId";
import { MenuIdEnum } from "@/layouts/AppLayout/components/Sidebar";
import type { ComponentType, FC } from "react";

const withSidebarMenu = <T extends object>(
  Component: ComponentType<T>,
  menu: MenuIdEnum
) => {
  const WithMenuIdComponent: FC<T> = (props: T) => {
    useUpdateMenuId(MenuIdEnum[menu]);
    return <Component {...props} />;
  };
  return WithMenuIdComponent;
};

export default withSidebarMenu;
