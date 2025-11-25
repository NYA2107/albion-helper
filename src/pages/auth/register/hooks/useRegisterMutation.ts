import { useMutation } from "@tanstack/react-query";
import registerOptions, {
  type RegisterOptionsProps,
} from "../query/registerOptions";

const useRegisterMutation = (options?: RegisterOptionsProps) => {
  return useMutation(registerOptions({ ...options }));
};

export default useRegisterMutation;
