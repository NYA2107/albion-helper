import { supabase } from "@/api/supabase";
import type { AuthError, AuthResponse } from "@supabase/supabase-js";
import {
  mutationOptions,
  type UseMutationOptions,
} from "@tanstack/react-query";
import type { RegisterType } from "../schema";
import { toast } from "sonner";

export type RegisterOptionsProps = UseMutationOptions<
  AuthResponse,
  AuthError,
  RegisterType
>;

const registerOptions = (props: RegisterOptionsProps) => {
  return mutationOptions({
    ...props,
    mutationFn: async (credentials) => {
      const response = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          emailRedirectTo: window.location.origin + "/login",
        },
      });
      if (response.error) {
        throw response.error;
      }
      return response;
    },
    onSuccess: (...rest) => {
      toast.success(
        "Account created! Please check your email to verify your account."
      );
      props.onSuccess?.(...rest);
    },
    onError: (error, ...rest) => {
      toast.error(
        error.message ||
          "Something went wrong while creating your account. Please try again."
      );
      props.onError?.(error, ...rest);
    },
  });
};

export default registerOptions;
