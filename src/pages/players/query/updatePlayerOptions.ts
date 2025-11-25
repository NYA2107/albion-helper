import { supabase } from "@/api/supabase";
import { queryClient } from "@/main";
import type { PostgrestError } from "@supabase/supabase-js";
import { mutationOptions } from "@tanstack/react-query";
import type { PlayerType } from "../schema";

export interface UpdatePlayerProps {
  onSuccessCallback?: (data: number) => void;
  onErrorCallback?: (error: PostgrestError) => void;
}

export const updatePlayerOptions = ({
  onSuccessCallback,
  onErrorCallback,
}: UpdatePlayerProps) => {
  return mutationOptions<number, PostgrestError, PlayerType>({
    mutationFn: async (payload) => {
      //UPDATE PLAYER
      const responsePlayer = await supabase
        .from("Player")
        .update({
          name: payload.name,
          description: payload.description,
        })
        .eq("id", payload.id)
        .select("id")
        .single();
      if (responsePlayer.error || !responsePlayer.data.id) {
        throw responsePlayer.error || new Error("Failed to create player");
      }

      //DELETE TAG FROM TABLE PLAYER_TAG
      const respDeleteTag = await supabase
        .from("Player_Tag")
        .delete()
        .eq("player_id", payload.id);

      if (respDeleteTag.error) {
        throw respDeleteTag.error;
      }

      //INSERT PLAYER_TAG
      if (!payload.tags || payload.tags.length <= 0)
        return responsePlayer.data.id;

      const responseTag = await supabase.from("Player_Tag").insert(
        payload.tags.map((tag) => ({
          player_id: responsePlayer?.data.id,
          tag_id: parseInt(tag),
        }))
      );
      if (responseTag.error) {
        throw responseTag.error;
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
