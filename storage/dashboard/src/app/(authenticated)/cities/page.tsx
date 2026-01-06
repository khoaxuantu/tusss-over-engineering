import { ToNewButton } from "@lib/resource/components/buttons/to-new";
import ResourceHeader from "@lib/resource/components/header";
import CityDatagrid from "@lib/resource/locations/cities/components/datagrid/list";
import { Box } from "@mui/material";

export default function Page() {
  return (
    <>
      <ResourceHeader
        title="Cities"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cities", isCurrent: true },
        ]}
        actions={<ToNewButton href="/cities/new" />}
      />
      <Box>
        <CityDatagrid />
      </Box>
    </>
  );
}
