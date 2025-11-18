"use server";

import { getSession } from "@lib/auth/actions/check";
import { redirect } from "next/navigation";
import React from "react";

export async function ServerAuthenticated({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session.data) redirect("/login");

  return <>{children}</>;
}
