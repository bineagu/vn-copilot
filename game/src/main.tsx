import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { initializeAppStorage } from "./platform/storage";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

const root = createRoot(rootElement);

function renderApp() {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

async function bootstrap() {
  try {
    await initializeAppStorage();
  } catch (error) {
    console.error("Failed to initialize app storage", error);
  }

  renderApp();
}

void bootstrap();
