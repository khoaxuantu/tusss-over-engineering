import TemplateShow from "@lib/resource/components/templates/show";
import { ResourceId } from "@lib/resource/constants";
import DataBox from "@lib/shared/components/data/box";
import DataGroup from "@lib/shared/components/data/group";
import { Table, TableBody } from "@mui/material";
import { StoreShowData } from "../../schemas";

interface Props {
  data: StoreShowData;
}

export default function StoreShowPage({ data }: Props) {
  return (
    <TemplateShow component="dl" gap={4}>
      <DataGroup label="Identifier">
        <Table>
          <TableBody>
            <DataBox variant="text" layout="tr" label="Id" value={data.id} />
            <DataBox variant="text" layout="tr" label="Name" value={data.name} />
            <DataBox variant="tag" layout="tr" label="Type" value={data.type} />
          </TableBody>
        </Table>
      </DataGroup>
      <DataGroup label="Location">
        <Table>
          <TableBody>
            <DataBox
              variant="url"
              layout="tr"
              label="City"
              value={data.city.id}
              pathPrefix={`/${ResourceId.city}`}
              text={data.city.name}
            />
            <DataBox
              variant="url"
              layout="tr"
              label="District"
              value={data.district.id}
              pathPrefix={`/${ResourceId.district}`}
              text={data.district.name}
            />
          </TableBody>
        </Table>
      </DataGroup>
      <DataBox
        variant="url"
        layout="inline"
        label="Url"
        value={data.href}
        linkProps={{
          target: "_blank",
          rel: "noopener noreferrer",
        }}
      />
    </TemplateShow>
  );
}
