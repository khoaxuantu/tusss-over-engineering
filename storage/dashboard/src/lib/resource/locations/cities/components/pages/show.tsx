import TemplateShow from "@lib/resource/components/templates/show";
import DataBox from "@lib/shared/components/data/box";
import { CityShowData } from "../../schemas";

interface Props {
  data: CityShowData;
}

export default function CityShowPage({ data }: Props) {
  return (
    <TemplateShow component="dl" my={2} gap={4}>
      <DataBox label="Id" variant="text" value={data.id} />
      <DataBox label="Name" variant="text" value={data.name} />
    </TemplateShow>
  );
}
