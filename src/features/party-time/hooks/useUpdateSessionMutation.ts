import { useMutation } from "@tanstack/react-query";
import {
  updateSessionOptions,
  type UpdateSessionOptionProps,
} from "../query/updateSessionOptions";

const useUpdateSessionMutation = (props?: UpdateSessionOptionProps) => {
  return useMutation(updateSessionOptions({ ...props }));
};

export default useUpdateSessionMutation;
