// hooks/useTheme.js
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

// Custom hook to access the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);

  // Error handling: If the hook is used outside a ThemeProvider, throw an error
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context; // Return the theme context (e.g., toggleTheme)
};
