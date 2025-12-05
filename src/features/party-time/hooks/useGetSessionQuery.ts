import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store";
import { getPartySessionOptions, type GetPartySessionProps } from "../query/getSessionOptions";

const useGetSessionQuery = (search: string, props?: GetPartySessionProps) => {
  const session = useAuthStore((state) => state.session);
  return useQuery(getPartySessionOptions({ search, session: session! }, props));
};

export default useGetSessionQuery;
