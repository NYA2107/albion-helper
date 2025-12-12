import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { FC } from "react";
import { PartySessionFormSchema, type PartySessionType } from "../../../schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type CreatePartySessionModalProps = {
  loading?: boolean;
  onClose?: () => void;
  onSubmit?: (data: PartySessionType) => void;
};

const CreatePartySessionModal: FC<CreatePartySessionModalProps> = (props) => {
  const { onClose, loading, onSubmit } = props;

  const form = useForm<PartySessionType>({
    resolver: zodResolver(PartySessionFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const { control } = form;

  const handleClose = () => {
    if (!onClose) return;
    form.reset();
    onClose();
  };

  const handleSubmit = (values: PartySessionType) => {
    onSubmit?.(values);
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
        <Form {...form}>
          <form
            id="form-create-party-session"
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid grid-cols-1 gap-3"
          >
            <FormField
              name="name"
              control={control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="input session party name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              name="description"
              control={control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={4}
                        placeholder="input session description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </form>
        </Form>
        <DialogFooter>
          <div>
            <Button disabled={loading} onClick={handleClose} variant="ghost">
              Cencel
            </Button>
            <Button
              loading={loading}
              disabled={loading}
              form="form-create-party-session"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePartySessionModal;
