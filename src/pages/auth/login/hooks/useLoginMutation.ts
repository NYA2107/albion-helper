import { useMutation } from "@tanstack/react-query";
import loginOptions, { type LoginOptionsProps } from "../query/loginOptions";

const useLoginMutation = (options?: LoginOptionsProps) => {
  return useMutation(loginOptions({ ...options }));
};

export default useLoginMutation;
