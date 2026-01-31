import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function useTheme() {
  let contexts = useContext(ThemeContext);
  if (contexts === undefined) {
    throw new Error("useTheme must be used within a ThemeContextProvider");
  }
  return contexts;
}
