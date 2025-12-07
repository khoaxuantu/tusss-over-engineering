import ResourceHeader from "@lib/resource/components/header";
import DistrictDatagridList from "@lib/resource/locations/districts/components/datagrid/list";

export default function Page() {
  return (
    <>
      <ResourceHeader
        title="Districts"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Districts", isCurrent: true },
        ]}
      />
      <DistrictDatagridList />
    </>
  );
}
