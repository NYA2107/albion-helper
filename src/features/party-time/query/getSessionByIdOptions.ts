import { supabase } from "@/api/supabase";
import { DEFAULT_QUERY_OPTIONS } from "@/constants/query";
import type { PostgrestError } from "@supabase/supabase-js";
import { queryOptions, type UseQueryOptions } from "@tanstack/react-query";
import type { PartySessionType } from "../list/schema";

export interface GetSessionByIdProps {
  id: number;
}

export type GetSessionOptionsProps = UseQueryOptions<
  PartySessionType,
  PostgrestError,
  PartySessionType
>;

export const getSessionByIdOptions = (
  { id }: GetSessionByIdProps,
  props?: GetSessionOptionsProps
) => {
  return queryOptions({
    ...DEFAULT_QUERY_OPTIONS,
    ...props,
    queryKey: ["party-sessions", id],
    queryFn: async ({ queryKey }) => {
      const sessionId = queryKey[1];
      const response = await supabase
        .from("Party_Session")
        .select("id, name, description, created_at, state, logs")
        .eq("id", sessionId)
        .single();

      if (response.error) {
        throw response.error;
      }
      return response.data;
    },
    enabled: !!id,
  });
};
