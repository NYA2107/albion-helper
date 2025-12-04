import type { MenuIdEnum } from "@/layouts/AppLayout/components/Sidebar";
import { useGlobalState } from "@/store";
import { useEffect } from "react";

const useUpdateMenuId = (menuId: MenuIdEnum) => {
  const updateMenuId = useGlobalState((s) => s.onChangeMenuId);
  useEffect(() => {
    updateMenuId(menuId);
  }, []);
};

export default useUpdateMenuId;
