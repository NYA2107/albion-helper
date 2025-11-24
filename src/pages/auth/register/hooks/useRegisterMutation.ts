import type { AuthApiError, AuthResponse } from "@supabase/supabase-js";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { RegisterType } from "../schema";
import { supabase } from "@/api/supabase";

type RegisterMutationOptions = UseMutationOptions<
  AuthResponse,
  AuthApiError,
  RegisterType,
  unknown
>;

const useRegisterMutation = (options?: RegisterMutationOptions) => {
  return useMutation<AuthResponse, AuthApiError, RegisterType>({
    mutationFn: (loginData) => {
      return supabase.auth.signUp({
        email: loginData.email,
        password: loginData.password,
        options: {
          emailRedirectTo: window.location.origin + "/login",
        },
      });
    },
    ...options,
  });
};

export default useRegisterMutation;
