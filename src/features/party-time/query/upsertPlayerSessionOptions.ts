import { supabase } from "@/api/supabase";
import { queryClient } from "@/constants/query";
import type { PostgrestError } from "@supabase/supabase-js";
import {
  mutationOptions,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { toast } from "sonner";
import type { PlayerSessionFormType } from "../schema";

export type UpsertPlayerSessionOptionsProps = UseMutationOptions<
  number[],
  PostgrestError,
  Partial<PlayerSessionFormType[]>
>;

export const upsertPlayerSessionOptions = (
  props: UpsertPlayerSessionOptionsProps
) => {
  const { onSuccess: onSuccessCallback, onError: onErrorCallback } = props;
  return mutationOptions<
    number[],
    PostgrestError,
    Partial<PlayerSessionFormType[]>
  >({
    ...props,
    mutationFn: async (payload) => {
      const response = await supabase
        .from("Party_Session_Player")
        .upsert(payload)
        .select();
      if (response.error || !response.data) {
        throw response.error || new Error("Failed to update party player");
      }

      return response.data.map((item) => item.id);
    },
    onSuccess: async (id, ...rest) => {
      await queryClient.invalidateQueries({ queryKey: ["player-sessions"] });
      toast("Party Player Updated Successfully");
      onSuccessCallback?.(id, ...rest);
    },
    onError: (error, ...rest) => {
      toast(error.message);
      onErrorCallback?.(error, ...rest);
    },
  });
};
