import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider, createTheme, rem } from "@mantine/core";
import "@mantine/core/styles.css";

import { StoreProvider } from "./store";
import App from "./App";

const theme = createTheme({
  fontSizes: {
    xxs: rem(10),
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <StoreProvider>
        <App />
      </StoreProvider>
    </MantineProvider>
  </React.StrictMode>,
);
