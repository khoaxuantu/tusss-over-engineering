"use client";

import Container from "@mui/material/Container";
import { Suspense } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
}

export default function Error({ error }: ErrorProps) {
  return (
    <Suspense>
      <Container style={{ textAlign: "center" }}>
        <h2>{error.name}</h2>
        <p>{error.message}</p>
        {!!error.cause && <div>Cause: {String(error.cause)}</div>}
      </Container>
    </Suspense>
  );
}
