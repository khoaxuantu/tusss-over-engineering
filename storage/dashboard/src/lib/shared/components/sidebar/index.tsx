import { LocationCity, LocationOn } from "@mui/icons-material";
import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { ListItemGroup } from "../lists/group/provider";
import ListItemGroupTrigger from "../lists/group/trigger";
import ListItemLink from "../lists/link";

export default function Sidebar() {
  return (
    <Box component="nav" p={1}>
      <List>
        <ListItemGroup
          trigger={
            <ListItemGroupTrigger>
              <ListItemIcon>
                <LocationOn />
              </ListItemIcon>
              <ListItemText>Locations</ListItemText>
            </ListItemGroupTrigger>
          }
        >
          <ListItem>
            <ListItemLink href="/cities">
              <ListItemIcon>
                <LocationCity />
              </ListItemIcon>
              <ListItemText>City</ListItemText>
            </ListItemLink>
          </ListItem>
        </ListItemGroup>
      </List>
    </Box>
  );
}
