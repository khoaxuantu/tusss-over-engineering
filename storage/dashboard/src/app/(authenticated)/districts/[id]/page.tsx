import ResourceHeader from "@lib/resource/components/header";
import CityShowPage from "@lib/resource/locations/cities/components/pages/show";
import { fetchOneDistrict } from "@lib/resource/locations/districts/apis/fetch-one";
import { ResourceParams } from "@lib/resource/types/params.type";
import { notFound } from "next/navigation";

export default async function Page({ params }: ResourceParams) {
  const { id } = await params;
  const res = await fetchOneDistrict(id);

  if (res.error) return notFound();

  return (
    <>
      <ResourceHeader
        title="Districts - Show"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Districts", href: "/districts" },
          { label: "Show", isCurrent: true },
        ]}
      />
      <CityShowPage data={res.data} />
    </>
  );
}
