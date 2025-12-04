import { supabase } from "@/api/supabase";
import type { PostgrestError, Session } from "@supabase/supabase-js";
import {
  mutationOptions,
  type UseMutationOptions,
} from "@tanstack/react-query";
import type { PlayerType } from "../schema";
import { queryClient } from "@/constants/query";
import { toast } from "sonner";

export type CreatePlayerOptionsProps = UseMutationOptions<
  number,
  PostgrestError,
  PlayerType
>;

export const createPlayerOptions = (
  session: Session,
  props: CreatePlayerOptionsProps
) => {
  const { onSuccess: onSuccessCallback, onError: onErrorCallback } = props;
  return mutationOptions<number, PostgrestError, PlayerType>({
    ...props,
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
    onSuccess: async (id, ...rest) => {
      await queryClient.invalidateQueries({ queryKey: ["players"] });
      toast("Player Created Successfully");
      onSuccessCallback?.(id, ...rest);
    },
    onError: (error, ...rest) => {
      toast(error.message);
      onErrorCallback?.(error, ...rest);
    },
  });
};
