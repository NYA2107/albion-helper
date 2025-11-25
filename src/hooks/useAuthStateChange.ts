import { supabase } from "@/api/supabase";
import { useAuthStore } from "@/store";
import { useEffect } from "react";

const useAuthStateChange = () => {
  const setSession = useAuthStore((state) => state.setSession);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
};

export default useAuthStateChange;
