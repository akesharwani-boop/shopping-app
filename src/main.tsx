import React from "react";
import ReactDom from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AppProviders } from "@/context/AppProviders";
import "./index.css";
import App from "./App.tsx";
const queryClient = new QueryClient();
ReactDom.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
       <AppProviders>
          <App />
          <Toaster richColors position="top-right" />
        </AppProviders>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
