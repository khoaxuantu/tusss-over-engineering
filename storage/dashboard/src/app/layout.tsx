import { ThemeProvider } from "@lib/mui/theme";
import { SnackbarProvider } from "@lib/shared/components/snackbar/provider";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Tusss Admin",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <SnackbarProvider>{children}</SnackbarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
