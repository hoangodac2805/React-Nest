import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { store } from "./app/store.ts";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Loading from "./components/ui/loading.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import AuthCheck from "./contexts/authCheck.tsx";
import { ThemeProvider } from "./contexts/theme-provider.tsx";
import { ModeToggle } from "./components/mode-toggle.tsx";
import CommonAlertDialog from "./components/common-alert-dialog.tsx";
createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <BrowserRouter>
          <AuthCheck>
            <App />
            <Loading />
            <Toaster />
            <ModeToggle />
            <CommonAlertDialog />
          </AuthCheck>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  // </StrictMode>`
);
