import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { optsTag } from "../../constants/tagList";
import { PlayerFormSchema, type PlayerType } from "../../schema";

interface WritePlayerDialogProps {
  open?: boolean;
  onClose?: () => void;
  isEdit?: boolean;
  id?: number;
}

const WritePlayerDialog: FC<WritePlayerDialogProps> = (props) => {
  const { open, onClose, isEdit } = props;
  const form = useForm<PlayerType>({
    resolver: zodResolver(PlayerFormSchema),
    defaultValues: {
      name: "",
    },
  });
  const { control } = form;

  const handleClose = (open: boolean) => {
    if (open || !onClose) return;
    form.reset();
    onClose();
  };

  const handleSubmit = (values: PlayerType) => {
    console.log(values, "PAYLOAD");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Player" : "Create a Player"}
          </DialogTitle>
          <DialogDescription>
            Player name should be unique from data players that already exist
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              id="form-create-player"
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
                        <Input placeholder="input player name" {...field} />
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
                          placeholder="input player description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                name="tags"
                control={control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={optsTag}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <div>
            <Button onClick={() => handleClose(false)} variant="ghost">
              Cencel
            </Button>
            <Button form="form-create-player" type="submit">
              Submit
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WritePlayerDialog;
