import { ThemedLayout } from "@refinedev/mui";

export default function RefineLayout({ children }: { children: React.ReactNode }) {
  return <ThemedLayout>{children}</ThemedLayout>;
}
