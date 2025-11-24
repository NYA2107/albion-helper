import { supabase } from "@/api/supabase";
import type { AuthError } from "@supabase/supabase-js";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

type SignOutMutationOptions = UseMutationOptions<
  unknown,
  AuthError,
  void,
  unknown
>;

const useSignOutMutation = (options?: SignOutMutationOptions) => {
  return useMutation({
    mutationFn: () => {
      return supabase.auth.signOut();
    },
    ...options,
  });
};

export default useSignOutMutation;
