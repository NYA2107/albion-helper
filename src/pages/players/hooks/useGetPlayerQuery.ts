import { useQuery } from "@tanstack/react-query";
import {
  getPlayerOptions,
  type GetPlayerProps,
} from "../query/getPlayerOptions";
import { useAuthStore } from "@/store";

const useGetPlayerQuery = (props?: GetPlayerProps) => {
  const session = useAuthStore((state) => state.session);
  return useQuery(getPlayerOptions({ ...props, session: session! }));
};

export default useGetPlayerQuery;
