import "@mantine/core/styles.css";
import "@mantine/spotlight/styles.css";
import "@mantine/notifications/styles.css";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { mantineCssResolver, theme } from "@/theme";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import i18n from "./i18n";
import { isRtl } from "@/lib/rtl-langs";
import { useEffect, useState } from "react";

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
  const [dir, setDir] = useState(isRtl(i18n.language) ? "rtl" : "ltr");

  useEffect(() => {
    const handler = (lng: string) => {
      const newDir = isRtl(lng) ? "rtl" : "ltr";
      document.documentElement.dir = newDir;
      setDir(newDir);
    };
    i18n.on("languageChanged", handler);
    handler(i18n.language);
    return () => {
      i18n.off("languageChanged", handler);
    };
  }, []);

  return (
    <BrowserRouter>
      <MantineProvider
        theme={{ ...theme, dir }}
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
  document.getElementById("root") as HTMLElement,
);

root.render(<Root />);
