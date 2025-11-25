import { supabase } from "@/api/supabase";
import type { AuthError, AuthResponse } from "@supabase/supabase-js";
import {
  mutationOptions,
  type UseMutationOptions,
} from "@tanstack/react-query";
import type { RegisterType } from "../schema";

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
  });
};

export default registerOptions;
