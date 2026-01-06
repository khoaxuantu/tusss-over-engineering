import ResourceHeader from "@lib/resource/components/header";
import { fetchOneStore } from "@lib/resource/stores/apis/fetch-one";
import StoreShowPage from "@lib/resource/stores/components/pages/show";
import { ResourceParams } from "@lib/resource/types/params.type";

export default async function Page({ params }: ResourceParams) {
  const idParam = (await params).id;
  const id = parseInt(idParam);

  if (isNaN(id)) {
    const err = new Error("Id to page /stores/:id should be a number");
    err.name = "Invalid Id";
    throw err;
  }

  const data = await fetchOneStore(id);

  if (data.error) {
    const err = new Error(`Failed to fetch store id ${id}`);
    err.name = "Fetch Failed";
    throw err;
  }

  return (
    <>
      <ResourceHeader
        title="Stores - Show"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Stores", href: "/stores" },
          { label: "Show", isCurrent: true },
        ]}
      />
      <StoreShowPage data={data.data} />
    </>
  );
}
