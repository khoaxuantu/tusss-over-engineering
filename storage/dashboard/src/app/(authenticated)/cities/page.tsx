import ResourceHeader from "@lib/resource/components/header";
import CityDatagrid from "@lib/resource/locations/cities/components/datagrid/list";
import Link from "@lib/shared/components/links";
import { Add } from "@mui/icons-material";
import { Box, Button } from "@mui/material";

export default function Page() {
  return (
    <>
      <ResourceHeader
        title="Cities"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cities", isCurrent: true },
        ]}
        actions={
          <Link href="/cities/new">
            <Button variant="contained" startIcon={<Add />}>
              New
            </Button>
          </Link>
        }
      />
      <Box>
        <CityDatagrid />
      </Box>
    </>
  );
}
