import WritePlayerDialog from "@/features/players/components/WritePlayerDialog";
import { useModalStore } from "@/store";
import ConfirmationDeleteDialog from "../../ui/confirmation-delete-dialog";
import WrapperModal from "../WrapperModal";
import ModalAddPlayer from "@/features/party-time/detail/components/ModalAddPlayer";
import CreatePartySessionModal from "@/features/party-time/list/components/CreatePartySessionModal";

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
    case "add.player": {
      return (
        <WrapperModal<"add.player">>
          {({ onClose, onSubmit }) => (
            <ModalAddPlayer onClose={onClose} onSubmit={onSubmit} />
          )}
        </WrapperModal>
      );
    }
    case "create.session-party": {
      return (
        <WrapperModal<"create.session-party">>
          {({ onClose, onSubmit }) => (
            <CreatePartySessionModal onClose={onClose} onSubmit={onSubmit} />
          )}
        </WrapperModal>
      );
    }
    default:
      return null;
  }
};

export default GlobalModal;
