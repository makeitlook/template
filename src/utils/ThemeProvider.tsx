"use client";

import { ThemeProvider as Provider } from "next-themes";
import { ReactNode } from "react";

// Define a custom ThemeProvider component.
export function ThemeProvider({
  children,
  defaultTheme = "system",
}: {
  children: ReactNode;
  defaultTheme?: string;
}) {
  return (
    <Provider
      defaultTheme={defaultTheme} // Set the default theme to 'system', which follows the user's system theme.
      attribute="class" // Specify that the theme should be applied using CSS classes.
      enableSystem={true} // Enable system theme detection.
    >
      {children}{" "}
      {/* Render the children components wrapped within the ThemeProvider. */}
    </Provider>
  );
}
