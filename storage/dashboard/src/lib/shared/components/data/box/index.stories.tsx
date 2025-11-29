import type { Meta, StoryObj } from "@storybook/nextjs";

import { Box, Stack, Table, TableBody, TableContainer } from "@mui/material";
import DataBox from "./index";

/**
 * A custom component to display a value with label.
 */
const meta = {
  title: "Shared/Data/Data Box",
  component: DataBox,
  tags: ["autodocs"],
} satisfies Meta<typeof DataBox>;

export default meta;

type Story = StoryObj<typeof DataBox>;

export const Default: Story = {
  render: function DefaultDemo() {
    return (
      <Stack spacing={2}>
        <DataBox label="Text Label" variant="text" value="Lmao" />
        <DataBox label="Email Label" variant="email" value="example@email.com" />
        <DataBox label="Number Label" variant="number" value={200000333} />
        <DataBox label="Date Label" variant="date" value={new Date().toString()} />
        <DataBox label="Tag Label" variant="tag" value="A category" />
        <DataBox label="Boolean Label" variant="boolean" value={true} />
        <DataBox label="Url Label" variant="url" value="https://google.com" />
        <DataBox label="Custom Children" value="true">
          <span>Here is the custom children node</span>
        </DataBox>
      </Stack>
    );
  },
};

export const Inline: Story = {
  render: function InlineDemo() {
    return (
      <Stack spacing={1}>
        <DataBox layout="inline" label="Text Label" variant="text" value="Lmao" />
        <DataBox layout="inline" label="Email Label" variant="email" value="example@email.com" />
        <DataBox layout="inline" label="Number Label" variant="number" value={200000333} />
        <DataBox layout="inline" label="Date Label" variant="date" value={new Date().toString()} />
        <DataBox layout="inline" label="Tag Label" variant="tag" value="A category" />
        <DataBox layout="inline" label="Boolean Label" variant="boolean" value={true} />
        <DataBox layout="inline" label="Url Label" variant="url" value="https://google.com" />
        <DataBox layout="inline" label="Custom Children" value="true">
          <span>Here is the custom children node</span>
        </DataBox>
      </Stack>
    );
  },
};

export const Flat: Story = {
  render: function FlatDemo() {
    return (
      <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" rowGap={1}>
        <DataBox layout="flat" label="Text Label" variant="text" value="Lmao" />
        <DataBox layout="flat" label="Email Label" variant="email" value="example@email.com" />
        <DataBox layout="flat" label="Number Label" variant="number" value={200000333} />
        <DataBox layout="flat" label="Date Label" variant="date" value={new Date().toString()} />
        <DataBox layout="flat" label="Tag Label" variant="tag" value="A category" />
        <DataBox layout="flat" label="Boolean Label" variant="boolean" value={true} />
        <DataBox layout="flat" label="Url Label" variant="url" value="https://google.com" />
        <DataBox layout="flat" label="Custom Children" value="true">
          <span>Here is the custom children node</span>
        </DataBox>
      </Box>
    );
  },
};

export const TableRow: Story = {
  render: function TableRowDemo() {
    return (
      <TableContainer component={Box}>
        <Table
          sx={{
            th: { fontWeight: "bold" },
          }}
        >
          <TableBody>
            <DataBox layout="tr" label="Text Label" variant="text" value="Lmao" />
            <DataBox layout="tr" label="Email Label" variant="email" value="example@email.com" />
            <DataBox layout="tr" label="Number Label" variant="number" value={200000333} />
            <DataBox layout="tr" label="Date Label" variant="date" value={new Date().toString()} />
            <DataBox layout="tr" label="Tag Label" variant="tag" value="A category" />
            <DataBox layout="tr" label="Boolean Label" variant="boolean" value={true} />
            <DataBox layout="tr" label="Url Label" variant="url" value="https://google.com" />
            <DataBox layout="tr" label="Custom Children" value="true">
              <span>Here is the custom children node</span>
            </DataBox>
          </TableBody>
        </Table>
      </TableContainer>
    );
  },
};
