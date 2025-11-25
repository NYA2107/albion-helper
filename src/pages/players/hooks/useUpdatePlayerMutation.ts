import { useMutation } from "@tanstack/react-query";
import {
  updatePlayerOptions,
  type UpdatePlayerProps,
} from "../query/updatePlayerOptions";

const useUpdatePlayerMutation = (props?: UpdatePlayerProps) => {
  return useMutation(updatePlayerOptions({ ...props }));
};

export default useUpdatePlayerMutation;
