// Self-hosted Figma fonts (include Vietnamese glyphs)
import "@fontsource/barlow-condensed/latin-800.css";
import "@fontsource/barlow-condensed/latin-ext-800.css";
import "@fontsource/barlow-condensed/vietnamese-800.css";
import "@fontsource/barlow-condensed/latin-900-italic.css";
import "@fontsource/barlow-condensed/latin-ext-900-italic.css";
import "@fontsource/barlow-condensed/vietnamese-900-italic.css";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-ext-400.css";
import "@fontsource/manrope/vietnamese-400.css";
import "@fontsource/manrope/latin-600.css";
import "@fontsource/manrope/latin-ext-600.css";
import "@fontsource/manrope/vietnamese-600.css";
import "@fontsource/manrope/latin-700.css";
import "@fontsource/manrope/latin-ext-700.css";
import "@fontsource/manrope/vietnamese-700.css";
import "@fontsource/barlow-condensed/latin-900.css";
import "@fontsource/barlow-condensed/latin-ext-900.css";
import "@fontsource/barlow-condensed/vietnamese-900.css";
import "@fontsource/barlow-condensed/latin-700.css";
import "@fontsource/barlow-condensed/latin-ext-700.css";
import "@fontsource/barlow-condensed/vietnamese-700.css";
import "@fontsource/manrope/latin-800.css";
import "@fontsource/manrope/latin-ext-800.css";
import "@fontsource/manrope/vietnamese-800.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./auth/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";
createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </ErrorBoundary>,
);
