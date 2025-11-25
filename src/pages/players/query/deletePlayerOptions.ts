import { supabase } from "@/api/supabase";
import { queryClient } from "@/main";
import type { PostgrestError } from "@supabase/supabase-js";
import { mutationOptions } from "@tanstack/react-query";

export interface DeletePlayerProps {
  onSuccessCallback?: (data: number) => void;
  onErrorCallback?: (error: PostgrestError) => void;
}

export const deletePlayerOptions = ({
  onSuccessCallback,
  onErrorCallback,
}: DeletePlayerProps) => {
  return mutationOptions<number, PostgrestError, number>({
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
    onSuccess: async (id) => {
      await queryClient.invalidateQueries({ queryKey: ["players"] });
      onSuccessCallback?.(id);
    },
    onError: (error) => {
      onErrorCallback?.(error);
    },
  });
};
