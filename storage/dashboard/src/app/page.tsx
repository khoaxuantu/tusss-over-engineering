import RefineLayout from "@lib/shared/components/refine/layout";
import { ServerAuthenticated } from "@lib/shared/components/ServerAuthenticated";
import { Suspense } from "react";

export default function IndexPage() {
  return (
    <Suspense>
      <ServerAuthenticated>
        <RefineLayout>Welcome to Tusss Admin!</RefineLayout>
      </ServerAuthenticated>
    </Suspense>
  );
}
