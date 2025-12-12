import { supabase } from "@/api/supabase";
import { DEFAULT_QUERY_OPTIONS } from "@/constants/query";
import type { PostgrestError } from "@supabase/supabase-js";
import { queryOptions, type UseQueryOptions } from "@tanstack/react-query";
import type { PlayerSessionType } from "../schema";

export interface GetPlayerSession {
  party_session_id: number;
}

export type GetPlayerSessionOptionsProps = UseQueryOptions<
  PlayerSessionType[],
  PostgrestError,
  PlayerSessionType[]
>;

export const getPlayerSessionOptions = (
  { party_session_id }: GetPlayerSession,
  props?: GetPlayerSessionOptionsProps
) => {
  return queryOptions({
    ...DEFAULT_QUERY_OPTIONS,
    ...props,
    queryKey: ["player-sessions", party_session_id],
    queryFn: async ({ queryKey }) => {
      const sessionId = queryKey[1];
      const response = await supabase
        .from("Party_Session_Player")
        .select(
          "player_id:Player(*), party_session_id, logs, created_at, state"
        )
        .eq("party_session_id", sessionId);

      if (response.error) {
        throw response.error;
      }
      return response.data as unknown as PlayerSessionType[];
    },
    enabled: !!party_session_id,
  });
};
