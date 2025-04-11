import "./assets/main.css";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Button } from "@/components/ui/button";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
    <Button variant="default">Default</Button>
  </React.StrictMode>,
);
