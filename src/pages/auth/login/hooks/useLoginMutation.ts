import type { AuthApiError, AuthResponse } from "@supabase/supabase-js";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { LoginType } from "../schema";
import { supabase } from "@/api/supabase";

type LoginMutationOptions = UseMutationOptions<
  AuthResponse,
  AuthApiError,
  LoginType,
  unknown
>;

const useLoginMutation = (options?: LoginMutationOptions) => {
  return useMutation<AuthResponse, AuthApiError, LoginType>({
    mutationFn: (loginData) => {
      return supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });
    },
    ...options,
  });
};

export default useLoginMutation;
