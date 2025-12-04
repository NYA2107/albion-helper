import { useMutation } from "@tanstack/react-query";
import {
  updatePlayerOptions,
  type UpdatePlayerOptionProps,
} from "../query/updatePlayerOptions";

const useUpdatePlayerMutation = (props?: UpdatePlayerOptionProps) => {
  return useMutation(updatePlayerOptions({ ...props }));
};

export default useUpdatePlayerMutation;
