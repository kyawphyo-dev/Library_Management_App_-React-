import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./router";

import { RouterProvider } from "react-router/dom";
import { ThemeContextProvider } from "./contexts/ThemeContext";

createRoot(document.getElementById("root")).render(
  <ThemeContextProvider>
    <RouterProvider router={router} />
  </ThemeContextProvider>
);
