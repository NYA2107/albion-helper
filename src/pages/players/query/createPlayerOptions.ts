import { supabase } from "@/api/supabase";
import type { PostgrestError, Session } from "@supabase/supabase-js";
import { mutationOptions } from "@tanstack/react-query";
import type { PlayerType } from "../schema";
import { queryClient } from "@/main";

export interface CreatePlayerProps {
  session?: Session;
  onSuccessCallback?: (data: number) => void;
  onErrorCallback?: (error: PostgrestError) => void;
}

export const createPlayerOptions = ({
  session,
  onSuccessCallback,
  onErrorCallback,
}: CreatePlayerProps) => {
  return mutationOptions<number, PostgrestError, PlayerType>({
    mutationFn: async (payload) => {
      const responsePlayer = await supabase
        .from("Player")
        .insert({
          user_id: session?.user.id,
          name: payload.name,
          description: payload.description,
        })
        .select("id")
        .single();
      if (responsePlayer.error || !responsePlayer.data.id) {
        throw responsePlayer.error || new Error("Failed to create player");
      }

      if (payload.tags === undefined || payload.tags.length === 0) {
        return responsePlayer.data.id;
      }

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
