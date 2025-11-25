import { useMutation } from "@tanstack/react-query";
import {
  deletePlayerOptions,
  type DeletePlayerProps,
} from "../query/deletePlayerOptions";

const useDeletePlayerMutation = (props?: DeletePlayerProps) => {
  return useMutation(deletePlayerOptions({ ...props }));
};

export default useDeletePlayerMutation;
