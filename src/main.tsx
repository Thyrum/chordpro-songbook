import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Eruda } from "./components/scripts/Eruda.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Eruda />
    <App />
  </StrictMode>,
);
