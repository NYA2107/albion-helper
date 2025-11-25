import { supabase } from "@/api/supabase";
import { DEFAULT_QUERY_OPTIONS } from "@/constants/defaultQueryOptions";
import type { PostgrestError } from "@supabase/supabase-js";
import { queryOptions } from "@tanstack/react-query";

export interface TagResponseItemType {
  id: number;
  name: string;
}
export const getTagOptions = () => {
  return queryOptions<
    TagResponseItemType[],
    PostgrestError,
    TagResponseItemType[]
  >({
    ...DEFAULT_QUERY_OPTIONS,
    queryKey: ["tags"],
    queryFn: async () => {
      const response = await supabase.from("Tag").select("*");
      if (response.error) {
        throw response.error;
      }
      return response.data;
    },
  });
};
