import "@mantine/core/styles.css";
import "@mantine/spotlight/styles.css";
import "@mantine/notifications/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { mantineCssResolver, theme } from '@/theme';
import { MantineProvider } from "@mantine/core";
import { useAtomValue } from "jotai";
import { directionAtom } from "@/features/user/atoms/direction-atom";
import { BrowserRouter } from "react-router-dom";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import "./i18n";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});


function Root() {
  const dir = useAtomValue(directionAtom);
  React.useEffect(() => {
    document.documentElement.setAttribute("dir", dir);
  }, [dir]);

  return (
    <BrowserRouter>
      <MantineProvider
        dir={dir}
        theme={theme}
        cssVariablesResolver={mantineCssResolver}
      >
        <ModalsProvider>
          <QueryClientProvider client={queryClient}>
            <Notifications position="bottom-center" limit={3} />
            <HelmetProvider>
              <App />
            </HelmetProvider>
          </QueryClientProvider>
        </ModalsProvider>
      </MantineProvider>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<Root />);
