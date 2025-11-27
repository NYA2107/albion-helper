import { useMutation } from "@tanstack/react-query";
import loginOptions, { type LoginOptionsProps } from "../query/loginOptions";
import { useNavigate, useSearchParams } from "react-router";

const useLoginMutation = (options?: LoginOptionsProps) => {
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");
  const navigate = useNavigate();
  return useMutation(
    loginOptions({
      onSuccess: () => {
        navigate(redirect || "/");
      },
      ...options,
    })
  );
};

export default useLoginMutation;
