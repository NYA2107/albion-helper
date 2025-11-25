import { supabase } from "@/api/supabase";
import type { PostgrestError } from "@supabase/supabase-js";
import { queryOptions } from "@tanstack/react-query";
import { DEFAULT_QUERY_OPTIONS } from "../../../constants/defaultQueryOptions";
import type { PlayerResponseItemType } from "../schema";

export const getPlayerByIdOptions = (id: number) => {
  return queryOptions<
    PlayerResponseItemType,
    PostgrestError,
    PlayerResponseItemType
  >({
    ...DEFAULT_QUERY_OPTIONS,
    queryKey: ["players", id],
    queryFn: async ({ queryKey }) => {
      const playerId = queryKey[1];
      const response = await supabase
        .from("Player")
        .select("id, name, description, created_at, tags: Tag (id, name)")
        .eq("id", playerId)
        .single();

      if (response.error) {
        throw response.error;
      }
      return response.data;
    },
    enabled: !!id,
  });
};
