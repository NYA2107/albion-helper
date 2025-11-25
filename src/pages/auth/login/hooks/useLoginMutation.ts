import { supabase } from "@/api/supabase";
import {
  AuthError,
  type AuthTokenResponsePassword,
} from "@supabase/supabase-js";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { LoginType } from "../schema";

type LoginMutationOptions = UseMutationOptions<
  AuthTokenResponsePassword,
  AuthError,
  LoginType
>;

const useLoginMutation = (options?: LoginMutationOptions) => {
  return useMutation({
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
    ...options,
  });
};

export default useLoginMutation;
