import type { FC } from "react";
import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";

type ConfirmationDeleteDialogProps = {
  open?: boolean;
  onYes?: (data: undefined) => void;
  onNo?: () => void;
};

const ConfirmationDeleteDialog: FC<ConfirmationDeleteDialogProps> = (props) => {
  const { onNo, onYes, open } = props;
  const handleClose = (open: boolean) => {
    if (open || !onNo) return;
    onNo();
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Confirmation</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this item ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="default" onClick={() => handleClose(false)}>
            No
          </Button>
          <Button variant="ghost" onClick={() => onYes?.(undefined)}>
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDeleteDialog;
