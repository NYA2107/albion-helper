import WritePlayerDialog from "@/pages/players/components/WritePlayerDialog";
import { useModalStore } from "@/store";
import ConfirmationDeleteDialog from "../../ui/confirmation-delete-dialog";
import WrapperModal from "../WrapperModal";

const GlobalModal = () => {
  const { modalType } = useModalStore();

  switch (modalType) {
    case "create.player": {
      return (
        <WrapperModal<"create.player">>
          {({ loading, onSubmit, onClose }) => (
            <WritePlayerDialog
              loading={loading}
              open
              onClose={onClose}
              onSubmit={onSubmit}
            />
          )}
        </WrapperModal>
      );
    }
    case "edit.player": {
      return (
        <WrapperModal<"edit.player">>
          {({ loading, modalData, onSubmit, onClose }) => (
            <WritePlayerDialog
              open
              isEdit
              loading={loading}
              id={modalData?.id}
              onClose={onClose}
              onSubmit={onSubmit}
            />
          )}
        </WrapperModal>
      );
    }
    case "delete.confirmation": {
      return (
        <WrapperModal<"delete.confirmation">>
          {({ onClose, onSubmit }) => (
            <ConfirmationDeleteDialog open onNo={onClose} onYes={onSubmit} />
          )}
        </WrapperModal>
      );
    }
    default:
      return null;
  }
};

export default GlobalModal;
