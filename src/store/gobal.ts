import type { MenuIdEnum } from "@/layouts/AppLayout/components/Sidebar";
import { create } from "zustand";

export interface GlobalState {
  menuId?: MenuIdEnum;
  onChangeMenuId: (menuId: MenuIdEnum) => void;
}

export const useGlobalState = create<GlobalState>()((set) => ({
  onChangeMenuId: (menuId: MenuIdEnum) => {
    return set(() => ({ menuId }));
  },
}));
