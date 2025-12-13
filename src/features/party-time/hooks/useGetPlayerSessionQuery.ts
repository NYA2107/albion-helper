import { useQuery } from "@tanstack/react-query";
import { getPlayerSessionOptions } from "../query/getPlayerSessionOptions";

const useGetPlayerSessionQuery = (id: number, search?: string) => {
  return useQuery(getPlayerSessionOptions({ party_session_id: id, search }));
};

export default useGetPlayerSessionQuery;
