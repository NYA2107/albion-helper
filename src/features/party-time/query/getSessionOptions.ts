import { supabase } from "@/api/supabase";
import type { PostgrestError, Session } from "@supabase/supabase-js";
import { queryOptions, type UseQueryOptions } from "@tanstack/react-query";
import type { PartySessionType } from "../schema";
import { DEFAULT_QUERY_OPTIONS } from "@/constants/query";

export interface GetPartySession {
  search?: string;
  session: Session;
}

export type GetPartySessionProps = UseQueryOptions<
  PartySessionType[],
  PostgrestError,
  PartySessionType[]
>;

export const getPartySessionOptions = (
  { search, session }: GetPartySession,
  props?: GetPartySessionProps
) => {
  return queryOptions({
    ...DEFAULT_QUERY_OPTIONS,
    ...props,
    queryKey: ["party-sessions", session?.user?.id, search],
    queryFn: async ({ queryKey }) => {
      const userId = queryKey[1];
      let query = supabase
        .from("Party_Session")
        .select("id, name, description, created_at, state")
        .eq("user_id", userId);
      if (search) {
        query = query.ilike("name", `%${search}%`);
      }
      const response = await query;
      if (response.error) {
        throw response.error;
      }
      return response.data;
    },
  });
};
