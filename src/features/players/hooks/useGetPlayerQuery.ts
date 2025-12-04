import { useQuery } from "@tanstack/react-query";
import {
  getPlayerOptions,
  type GetPlayerOptionsProps,
} from "../query/getPlayerOptions";
import { useAuthStore } from "@/store";

const useGetPlayerQuery = (search: string, props?: GetPlayerOptionsProps) => {
  const session = useAuthStore((state) => state.session);
  return useQuery(getPlayerOptions({ search, session: session! }, props));
};

export default useGetPlayerQuery;
