import ResourceHeader from "@lib/resource/components/header";
import { fetchOneCity } from "@lib/resource/locations/cities/apis/fetch-one";
import CityShowPage from "@lib/resource/locations/cities/components/pages/show";
import { ResourceParams } from "@lib/resource/types/params.type";
import { notFound } from "next/navigation";

export default async function Page({ params }: ResourceParams) {
  const { id } = await params;
  const city = await fetchOneCity(id);

  if (city.error) return notFound();

  return (
    <>
      <ResourceHeader
        title="Cities - Show"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cities", href: "/cities" },
          { label: "Show", isCurrent: true },
        ]}
      />
      <CityShowPage data={city.data} />
    </>
  );
}
