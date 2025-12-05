import { supabase } from "@/api/supabase";
import { queryClient } from "@/constants/query";
import type { PostgrestError, Session } from "@supabase/supabase-js";
import {
    mutationOptions,
    type UseMutationOptions,
} from "@tanstack/react-query";
import { toast } from "sonner";
import type { PartySessionType } from "../list/schema";

export type CreateSessionOptionsProps = UseMutationOptions<
  number,
  PostgrestError,
  PartySessionType
>;

export const createSessionOptions = (
    session:Session,
    props: CreateSessionOptionsProps
) => {
  const { onSuccess: onSuccessCallback, onError: onErrorCallback } = props;
  return mutationOptions<number, PostgrestError, PartySessionType>({
    ...props,
    mutationFn: async (payload) => {
      const responseSession = await supabase
        .from("Party_Session")
        .insert({
            user_id:session?.user?.id,
            name:payload.name,
            description:payload.description,
            state:"Paused",
            logs:[]
        })
        .select("id")
        .single();
      if (responseSession.error || !responseSession.data.id) {
        throw responseSession.error || new Error("Failed to create session");
      }
      return responseSession.data.id
    },
    onSuccess: async (id, ...rest) => {
      await queryClient.invalidateQueries({ queryKey: ["party-sessions"] });
      toast("Session Created Successfully");
      onSuccessCallback?.(id, ...rest);
    },
    onError: (error, ...rest) => {
      toast(error.message);
      onErrorCallback?.(error, ...rest);
    },
  });
};
