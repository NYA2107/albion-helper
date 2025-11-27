import type { ModalTypeMap } from "@/components/utils/GlobalModal/schema";
import { create } from "zustand";

export type ModalType = keyof ModalTypeMap | null;

interface ModalState<T extends ModalType = ModalType> {
  modalType: T;
  loading?: boolean;
  modalData?: T extends keyof ModalTypeMap
    ? ModalTypeMap[T]["data"]
    : undefined;
  onSubmit?: T extends keyof ModalTypeMap
    ? (payload: ModalTypeMap[T]["submitPayload"]) => void
    : undefined;
  openModal: <K extends keyof ModalTypeMap>(
    type: ModalType,
    modalData?: ModalTypeMap[K]["data"],
    onSubmit?: (payload: ModalTypeMap[K]["submitPayload"]) => void
  ) => void;
  closeModal: () => void;
  setLoadingModal: (loading: boolean) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  loading: false,
  modalType: null,
  payload: undefined,
  onSubmit: undefined,
  openModal: (modalType, modalData, onSubmit) =>
    set({ modalType, modalData, onSubmit }),
  closeModal: () =>
    set({ modalType: null, modalData: undefined, onSubmit: undefined }),
  setLoadingModal: (loading) => set({ loading }),
}));
