import RefineLayout from "@lib/shared/components/refine/layout";
import { ServerAuthenticated } from "@lib/shared/components/server-authenticated";
import React, { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <ServerAuthenticated>
        <RefineLayout>{children}</RefineLayout>
      </ServerAuthenticated>
    </Suspense>
  );
}
