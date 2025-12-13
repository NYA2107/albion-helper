import { QueryClientProvider } from "@tanstack/react-query";
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { ModeToggle } from "./components/global/mode-toggle.tsx";
import { ThemeProvider } from "./components/global/theme-provider.tsx";
import { queryClient } from "./constants/query.ts";
import useAuthStateChange from "./hooks/useAuthStateChange.ts";
import "./index.css";
import router from "./routes/index.tsx";

export const App = () => {
  useAuthStateChange();

  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-right" />
        <RouterProvider router={router} />
        <ModeToggle />
      </QueryClientProvider>
    </React.Fragment>
  );
};

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  </StrictMode>
);
