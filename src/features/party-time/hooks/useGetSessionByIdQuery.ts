import { useQuery } from "@tanstack/react-query";
import { getSessionByIdOptions } from "../query/getSessionByIdOptions";

const useGetSessionByIdQuery = (id: number) => {
  return useQuery(getSessionByIdOptions({ id }));
};

export default useGetSessionByIdQuery;
