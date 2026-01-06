import ResourceHeader from "@lib/resource/components/header";
import { filterCities } from "@lib/resource/locations/cities/actions/filter";
import { filterDistricts } from "@lib/resource/locations/districts/actions/filter";
import StoreNewForm from "@lib/resource/stores/components/forms/new";
import { StoreNewProvider } from "@lib/resource/stores/providers/new.provider";

export default async function Page() {
  const districts = await filterDistricts({
    paginate: { page: 1, pageSize: 100 },
    sort: [
      {
        field: "name",
        direction: "asc",
      },
    ],
  });
  const cities = await filterCities({
    paginate: { page: 1, pageSize: 100 },
    sort: [
      {
        field: "name",
        direction: "asc",
      },
    ],
  });

  return (
    <>
      <ResourceHeader
        title="Stores - New"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Stores", href: "/stores" },
          { label: "New", isCurrent: true },
        ]}
      />
      <StoreNewProvider>
        <StoreNewForm districtOpts={districts.data.rows} cityOpts={cities.data.rows} />
      </StoreNewProvider>
    </>
  );
}
