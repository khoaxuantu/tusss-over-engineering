import { ToNewButton } from "@lib/resource/components/buttons/to-new";
import ResourceHeader from "@lib/resource/components/header";
import StoreDatagrid from "@lib/resource/stores/components/datagrid/list";
import { Box } from "@mui/material";

export default function Page() {
  return (
    <>
      <ResourceHeader
        title="Stores"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Stores", isCurrent: true },
        ]}
        actions={<ToNewButton href="/stores/new" />}
      />
      <Box>
        <StoreDatagrid />
      </Box>
    </>
  );
}
