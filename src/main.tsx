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
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthCheck>
          <App />
          <Loading />
          <Toaster />
        </AuthCheck>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
