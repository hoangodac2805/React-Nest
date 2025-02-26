import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { store } from "./app/store.ts";
import { Provider } from "react-redux";
import { AuthProvider } from "./contexts/auth.tsx";
import { BrowserRouter } from "react-router-dom";
import Loading from "./components/ui/loading.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <App />
          <Loading />
          <Toaster/>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
