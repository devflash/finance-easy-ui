import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { makeServer } from "./mocks/server.ts";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { GlobalClientStateProvider } from "./context/GlobalClientStateProvider";
if (import.meta.env.DEV) {
  makeServer();
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalClientStateProvider>
        <App>
          <RouterProvider router={router} />
        </App>
      </GlobalClientStateProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
