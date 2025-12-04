import { supabase } from "@/api/supabase";
import { DEFAULT_QUERY_OPTIONS } from "@/constants/query";
import type { PostgrestError } from "@supabase/supabase-js";
import { queryOptions, type UseQueryOptions } from "@tanstack/react-query";
import type { TagResponseItemType } from "../schema";

export type GetTagOptionsProps = UseQueryOptions<
  TagResponseItemType[],
  PostgrestError,
  TagResponseItemType[]
>;
export const getTagOptions = (props?: GetTagOptionsProps) => {
  return queryOptions({
    ...DEFAULT_QUERY_OPTIONS,
    ...props,
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
