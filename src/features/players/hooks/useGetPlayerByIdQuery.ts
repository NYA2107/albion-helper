import { useQuery } from "@tanstack/react-query";
import { getPlayerByIdOptions } from "../query/getPlayerByIdOptions";

const useGetPlayerByIdQuery = (id: number) => {
  return useQuery(getPlayerByIdOptions({ id }));
};

export default useGetPlayerByIdQuery;
