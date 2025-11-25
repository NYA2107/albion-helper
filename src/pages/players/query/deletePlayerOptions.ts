import { supabase } from "@/api/supabase";
import { queryClient } from "@/main";
import type { PostgrestError } from "@supabase/supabase-js";
import {
  mutationOptions,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { toast } from "sonner";

export type DeletePlayerOptionProps = UseMutationOptions<
  number,
  PostgrestError,
  number
>;

export const deletePlayerOptions = (props: DeletePlayerOptionProps) => {
  const { onSuccess: onSuccessCallback, onError: onErrorCallback } = props;
  return mutationOptions<number, PostgrestError, number>({
    ...props,
    mutationFn: async (id) => {
      //DELETE ALL TAG
      const respDeleteTag = await supabase
        .from("Player_Tag")
        .delete()
        .eq("player_id", id);

      if (respDeleteTag.error) {
        throw respDeleteTag.error;
      }

      //DELETE PLAYER
      const responsePlayer = await supabase
        .from("Player")
        .delete()
        .eq("id", id)
        .select("id")
        .single();

      if (responsePlayer.error || !responsePlayer.data.id) {
        throw responsePlayer.error || new Error("Failed to delete player");
      }

      return responsePlayer.data.id;
    },
    onSuccess: async (id, ...rest) => {
      await queryClient.invalidateQueries({ queryKey: ["players"] });
      toast("Player Deleted Successfully");
      onSuccessCallback?.(id, ...rest);
    },
    onError: (error, ...rest) => {
      toast(error.message);
      onErrorCallback?.(error, ...rest);
    },
  });
};
