"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

export default function Providers({ children }) {
  return (
    <ThemeProvider attribute={["class", "data-theme"]} defaultTheme="system" enableSystem>
      {children}
      <Toaster richColors position="top-center" />
    </ThemeProvider>
  );
}
