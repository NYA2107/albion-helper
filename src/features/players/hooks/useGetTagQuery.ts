import { useQuery } from "@tanstack/react-query";
import { getTagOptions } from "../query/getTagOptions";

const useGetTagQuery = () => {
  return useQuery(getTagOptions());
};

export default useGetTagQuery;
