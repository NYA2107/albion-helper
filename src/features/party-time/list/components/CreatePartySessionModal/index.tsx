import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { FC } from "react";

type CreatePartySessionModalProps = {
  loading?: boolean;
  onClose?: () => void;
  onSubmit?: (data: undefined) => void;
};

const CreatePartySessionModal: FC<CreatePartySessionModalProps> = (props) => {
  const { onClose } = props;
  const handleClose = () => {
    onClose?.();
  };

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Party Session</DialogTitle>
          <DialogDescription>
            Create party session to start monitoring player timer
          </DialogDescription>
        </DialogHeader>

        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePartySessionModal;
