import { supabase } from "@/api/supabase";
import type {
  AuthError,
  AuthTokenResponsePassword,
} from "@supabase/supabase-js";
import {
  mutationOptions,
  type UseMutationOptions,
} from "@tanstack/react-query";
import type { LoginType } from "../schema";
import { toast } from "sonner";

export type LoginOptionsProps = UseMutationOptions<
  AuthTokenResponsePassword,
  AuthError,
  LoginType
>;

const registerOptions = (props: LoginOptionsProps) => {
  return mutationOptions({
    ...props,
    mutationFn: async (loginData) => {
      const response = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });
      if (response.error) {
        throw response.error;
      }
      return response;
    },
    onSuccess: (...rest) => {
      toast.success("Logged in successfully!");
      props.onSuccess?.(...rest);
    },
    onError: (error, ...rest) => {
      toast.error(
        error.message ||
          "Something went wrong while logging in. Please try again."
      );
      props.onError?.(error, ...rest);
    },
  });
};

export default registerOptions;
