import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const DEFAULT_QUERY_OPTIONS = {
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 30 * 60 * 1000, // 30 minutes
};
