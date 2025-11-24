import WritePlayerDialog from "@/pages/players/components/WritePlayerDialog";
import type { PlayerType } from "@/pages/players/schema";
import ConfirmationDeleteDialog from "../../ui/confirmation-delete-dialog";
import { useModalStore } from "@/store";

const GlobalModal = () => {
  const { modalData, modalType, closeModal, onSubmit } = useModalStore();

  switch (modalType) {
    case "create.player": {
      const submit = onSubmit as (data: PlayerType) => void;
      return <WritePlayerDialog open onClose={closeModal} onSubmit={submit} />;
    }
    case "edit.player": {
      const submit = onSubmit as (data: PlayerType) => void;
      return (
        <WritePlayerDialog
          open
          isEdit
          id={modalData?.id}
          onClose={closeModal}
          onSubmit={submit}
        />
      );
    }
    case "delete.confirmation": {
      const submit = onSubmit as () => void;
      return <ConfirmationDeleteDialog open onNo={closeModal} onYes={submit} />;
    }
    default:
      return null;
  }
};

export default GlobalModal;
