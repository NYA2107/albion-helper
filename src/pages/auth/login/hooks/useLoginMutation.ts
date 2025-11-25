import { useMutation } from "@tanstack/react-query";
import loginOptions, { type LoginOptionsProps } from "../query/loginOptions";
import { useNavigate } from "react-router";

const useLoginMutation = (options?: LoginOptionsProps) => {
  const navigate = useNavigate();
  return useMutation(
    loginOptions({
      onSuccess: () => {
        navigate("/app/player");
      },
      ...options,
    })
  );
};

export default useLoginMutation;
