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
import { useEffect, useMemo, type FC } from "react";
import { useForm } from "react-hook-form";
import useGetPlayerByIdQuery from "../../hooks/useGetPlayerByIdQuery";
import useGetTagQuery from "../../hooks/useGetTagQuery";
import { PlayerFormSchema, type PlayerType } from "../../schema";

type WritePlayerDialogProps = {
  id?: number;
  open?: boolean;
  isEdit?: boolean;
  loading?: boolean;
  onClose?: () => void;
  onSubmit?: (data: PlayerType) => void;
}

const WritePlayerDialog: FC<WritePlayerDialogProps> = (props) => {
  const { open, onClose, isEdit, onSubmit, id, loading } = props;
  const { data: tags } = useGetTagQuery();
  const { data: player } = useGetPlayerByIdQuery(id ?? 0);

  const optsTag = useMemo(() => {
    return tags?.map((tag) => ({ value: `${tag.id}`, label: tag.name })) || [];
  }, [tags]);

  const form = useForm<PlayerType>({
    resolver: zodResolver(PlayerFormSchema),
    defaultValues: {
      name: "",
    },
  });
  const { control } = form;

  useEffect(() => {
    if (isEdit && player) {
      form.reset({
        ...player,
        ...{ tags: player.tags.map((tag) => `${tag.id}`) },
      });
    } else {
      form.reset();
    }
  }, [isEdit, form, player]);

  const handleClose = (open: boolean) => {
    if (open || !onClose) return;
    form.reset();
    onClose();
  };

  const handleSubmit = (values: PlayerType) => {
    onSubmit?.(values);
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
                          defaultValue={
                            field.value?.map((tag) => `${tag}`) || []
                          }
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
            <Button
              disabled={loading}
              onClick={() => handleClose(false)}
              variant="ghost"
            >
              Cencel
            </Button>
            <Button
              loading={loading}
              disabled={loading}
              form="form-create-player"
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

export default WritePlayerDialog;
