import { useMutation } from "@tanstack/react-query";
import {
  deletePlayerOptions,
  type DeletePlayerOptionProps,
} from "../query/deletePlayerOptions";

const useDeletePlayerMutation = (props?: DeletePlayerOptionProps) => {
  return useMutation(deletePlayerOptions({ ...props }));
};

export default useDeletePlayerMutation;
