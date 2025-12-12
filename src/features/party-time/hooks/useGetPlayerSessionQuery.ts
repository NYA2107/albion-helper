import { useQuery } from "@tanstack/react-query";
import { getPlayerSessionOptions } from "../query/getPlayerSessionOptions";

const useGetPlayerSessionQuery = (id: number) => {
  return useQuery(getPlayerSessionOptions({ party_session_id: id }));
};

export default useGetPlayerSessionQuery;
