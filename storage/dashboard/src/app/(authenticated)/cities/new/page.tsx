import ResourceHeader from "@lib/resource/components/header";
import CityNewForm from "@lib/resource/locations/cities/components/forms/new";
import { CityNewProvider } from "@lib/resource/locations/cities/providers/new.provider";

export default function Page() {
  return (
    <>
      <ResourceHeader
        title="Cities - New"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cities", href: "/cities" },
          { label: "New", isCurrent: true },
        ]}
      />
      <CityNewProvider>
        <CityNewForm />
      </CityNewProvider>
    </>
  );
}
