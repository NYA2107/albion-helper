import { supabase } from "@/api/supabase";
import { queryClient } from "@/constants/query";
import type { PostgrestError } from "@supabase/supabase-js";
import {
  mutationOptions,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { toast } from "sonner";
import type { PartySessionType } from "../schema";

export type UpdateSessionOptionProps = UseMutationOptions<
  number,
  PostgrestError,
  Partial<PartySessionType>
>;

export const updateSessionOptions = (props: UpdateSessionOptionProps) => {
  const { onSuccess: onSuccessCallback, onError: onErrorCallback } = props;
  return mutationOptions<number, PostgrestError, Partial<PartySessionType>>({
    ...props,
    mutationFn: async (payload) => {
      //UPDATE PLAYER
      const response = await supabase
        .from("Party_Session")
        .update(payload)
        .eq("id", payload.id)
        .select("id")
        .single();
      if (response.error || !response.data.id) {
        throw response.error || new Error("Failed to update party session");
      }

      return response.data.id;
    },
    onSuccess: async (id, ...rest) => {
      await queryClient.invalidateQueries({
        queryKey: ["party-sessions"],
      });
      toast("Party Sessiion Updated Successfully");
      onSuccessCallback?.(id, ...rest);
    },
    onError: (error, ...rest) => {
      toast(error.message);
      onErrorCallback?.(error, ...rest);
    },
  });
};
