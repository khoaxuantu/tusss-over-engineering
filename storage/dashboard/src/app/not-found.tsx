import Container from "@mui/material/Container";
import { Suspense } from "react";

export default function NotFound() {
  return (
    <Suspense>
      <Container style={{ textAlign: "center" }}>
        <h2>Not found</h2>
      </Container>
    </Suspense>
  );
}
