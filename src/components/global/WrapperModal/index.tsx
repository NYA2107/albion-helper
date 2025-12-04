import { useModalStore } from "@/store";
import type { ModalTypeMap } from "../GlobalModal/schema";

type WrapperModalProps<Tid extends keyof ModalTypeMap> = {
  children: (props: {
    modalData?: ModalTypeMap[Tid]["data"];
    loading?: boolean;
    onSubmit?: (payload: ModalTypeMap[Tid]["submitPayload"]) => void;
    onClose?: () => void;
  }) => React.ReactNode;
};

const WrapperModal = <Tid extends keyof ModalTypeMap>(
  props: WrapperModalProps<Tid>
) => {
  const {
    onSubmit: submitCallback,
    closeModal,
    modalData,
    loading = false,
  } = useModalStore();
  return (
    <>
      {props.children({
        modalData,
        loading,
        onSubmit: submitCallback as (
          payload: ModalTypeMap[Tid]["submitPayload"]
        ) => void,
        onClose: closeModal,
      })}
    </>
  );
};

export default WrapperModal;
