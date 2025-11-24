import React, { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";
import router from "./routes/index.tsx";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { supabase } from "./api/supabase.ts";
import { useAuthStore } from "./store/auth.ts";

const queryClient = new QueryClient();
export const App = () => {
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
  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-center" />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </React.Fragment>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
