import { supabase } from "@/api/supabase";
import type { AuthError, AuthResponse } from "@supabase/supabase-js";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { RegisterType } from "../schema";

type RegisterMutationOptions = UseMutationOptions<
  AuthResponse,
  AuthError,
  RegisterType
>;

const useRegisterMutation = (options?: RegisterMutationOptions) => {
  return useMutation({
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
    ...options,
  });
};

export default useRegisterMutation;
