import { getSession } from "@lib/auth/actions/check";
import Navbar from "@lib/shared/components/navbar";
import Sidebar from "@lib/shared/components/sidebar";
import { Grid, Paper } from "@mui/material";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session.data) return redirect("/login");

  return (
    <Suspense>
      <Navbar />
      <Grid
        container
        spacing={2}
        component="div"
        sx={{
          "& > section, & main": {
            minHeight: "90dvh",
          },
        }}
      >
        <Grid
          display={{ xs: "none", md: "block" }}
          size={{ md: 4, lg: 2 }}
          component="section"
          sx={{
            bgcolor: "var(--mui-palette-surface-medium)",
            borderTopRightRadius: "var(--mui-shape-radius-5)",
            borderBottomRightRadius: "var(--mui-shape-radius-5)",
            overflow: "auto",
          }}
        >
          <Sidebar />
        </Grid>
        <Grid size="grow" component="section">
          <Paper
            component="main"
            variant="lowest"
            sx={{
              p: { xs: 2, md: 4 },
              marginRight: { md: 3 },
              borderRadius: { md: "var(--mui-shape-radius-5)" },
            }}
          >
            {children}
          </Paper>
        </Grid>
      </Grid>
    </Suspense>
  );
}
