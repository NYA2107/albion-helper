import type { Session } from "@supabase/supabase-js";
import { create } from "zustand";

export interface AuthState {
  // Define your auth state properties here
  session: Session | null;
  email: string | null;
  // Define your auth state actions here
  setSession: (session: Session | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  email: null,
  setSession: (session) =>
    set({ session, email: session?.user?.email || null }),
}));
