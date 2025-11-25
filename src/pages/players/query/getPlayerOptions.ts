import { DEFAULT_QUERY_OPTIONS } from "../../../constants/defaultQueryOptions";
import { supabase } from "@/api/supabase";
import type { PostgrestError, Session } from "@supabase/supabase-js";
import { queryOptions, type UseQueryOptions } from "@tanstack/react-query";
import type { PlayerResponseItemType } from "../schema";

export interface GetPlayerProps {
  session?: Session;
  search?: string;
}

export type GetPlayerOptionsProps = UseQueryOptions<
  PlayerResponseItemType[],
  PostgrestError,
  PlayerResponseItemType[]
>;

export const getPlayerOptions = (
  { session, search }: GetPlayerProps,
  props?: GetPlayerOptionsProps
) => {
  return queryOptions({
    ...DEFAULT_QUERY_OPTIONS,
    ...props,
    queryKey: ["players", session?.user?.id, search],
    queryFn: async ({ queryKey }) => {
      const userId = queryKey[1];
      let query = supabase
        .from("Player")
        .select("id, name, description, created_at, tags: Tag (id, name)")
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
