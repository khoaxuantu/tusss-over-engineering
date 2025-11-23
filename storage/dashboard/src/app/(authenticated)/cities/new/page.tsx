import ResourceHeader from "@lib/resource/components/header";
import { Box } from "@mui/material";

export default function Page() {
  return (
    <>
      <ResourceHeader
        title="Cities"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cities", href: "/cities" },
          { label: "New", isCurrent: true },
        ]}
      />
      <Box>This is new city page</Box>
    </>
  );
}
