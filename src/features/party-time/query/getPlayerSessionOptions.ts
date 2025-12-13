import { supabase } from "@/api/supabase";
import { DEFAULT_QUERY_OPTIONS } from "@/constants/query";
import type { PostgrestError } from "@supabase/supabase-js";
import { queryOptions, type UseQueryOptions } from "@tanstack/react-query";
import type { PlayerSessionType } from "../schema";

export interface GetPlayerSession {
  party_session_id: number;
  search?: string;
}

export type GetPlayerSessionOptionsProps = UseQueryOptions<
  PlayerSessionType[],
  PostgrestError,
  PlayerSessionType[]
>;

export const getPlayerSessionOptions = (
  { party_session_id, search }: GetPlayerSession,
  props?: GetPlayerSessionOptionsProps
) => {
  return queryOptions({
    ...DEFAULT_QUERY_OPTIONS,
    ...props,
    queryKey: ["player-sessions", party_session_id, search],
    queryFn: async ({ queryKey }) => {
      const sessionId = queryKey[1];
      let query = supabase
        .from("Party_Session_Player")
        .select(
          "player_id:Player(*), party_session_id, logs, created_at, state"
        )
        .eq("party_session_id", sessionId);
      if (search) {
        query = query.ilike("player_id.name", `%${search}%`);
      }
      const response = await query;
      if (response.error) {
        throw response.error;
      }
      return response.data as unknown as PlayerSessionType[];
    },
    enabled: !!party_session_id,
  });
};
