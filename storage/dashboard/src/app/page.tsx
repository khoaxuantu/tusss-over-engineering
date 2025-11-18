import { ServerAuthenticated } from "@lib/shared/components/server-authenticated";
import { Snackbar } from "@mui/material";
import { Suspense } from "react";

export default function IndexPage() {
  return (
    <Suspense>
      <ServerAuthenticated>
        Welcome to Tusss Admin!
        <Snackbar open message="Test" />
      </ServerAuthenticated>
    </Suspense>
  );
}
