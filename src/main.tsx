import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import useAuthStateChange from "./hooks/useAuthStateChange.ts";
import "./index.css";
import router from "./routes/index.tsx";
import { ThemeProvider } from "./components/global/theme-provider.tsx";
import { ModeToggle } from "./components/global/mode-toggle.tsx";

export const queryClient = new QueryClient();

export const App = () => {
  useAuthStateChange();

  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-center" />
        <RouterProvider router={router} />
        <ModeToggle />
      </QueryClientProvider>
    </React.Fragment>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  </StrictMode>
);
