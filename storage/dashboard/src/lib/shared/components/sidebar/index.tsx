import { LocationCity, LocationPin } from "@mui/icons-material";
import { Box, BoxProps, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import ListItemGroupTrigger from "../lists/group/trigger";
import SidebarGroup from "./group";
import SidebarLink from "./link";
import SidebarRoot from "./root";

interface SidebarProps {
  activePath?: string;
  boxProps?: BoxProps;
}

export default function Sidebar(props: SidebarProps) {
  return (
    <Box component="nav" p={1} {...props.boxProps}>
      <List>
        <SidebarRoot>
          <SidebarGroup
            activePaths={["/cities"]}
            trigger={
              <ListItemGroupTrigger>
                <ListItemIcon>
                  <LocationPin />
                </ListItemIcon>
                <ListItemText>Locations</ListItemText>
              </ListItemGroupTrigger>
            }
          >
            <ListItem sx={{ py: 0 }}>
              <SidebarLink href="/cities">
                <ListItemIcon>
                  <LocationCity />
                </ListItemIcon>
                <ListItemText>Cities</ListItemText>
              </SidebarLink>
            </ListItem>
          </SidebarGroup>
        </SidebarRoot>
      </List>
    </Box>
  );
}
