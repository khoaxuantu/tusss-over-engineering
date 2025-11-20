import { ThemeProvider } from "@lib/mui/theme";
import { SnackbarProvider } from "@lib/shared/components/snackbar/provider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Metadata } from "next";
import React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tusss Admin",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider>
            <SnackbarProvider>{children}</SnackbarProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
