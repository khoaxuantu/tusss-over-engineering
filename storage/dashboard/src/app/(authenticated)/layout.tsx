import { getSession } from "@lib/auth/actions/check";
import Navbar from "@lib/shared/components/navbar";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session.data) return redirect("/login");

  return (
    <Suspense>
      <Navbar />
      {children}
    </Suspense>
  );
}
