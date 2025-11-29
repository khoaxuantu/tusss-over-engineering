import { Person, PersonOutline } from "@mui/icons-material";
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
            activePaths={["/users", "/photographers"]}
            trigger={
              <ListItemGroupTrigger>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText>NPC</ListItemText>
              </ListItemGroupTrigger>
            }
          >
            <ListItem sx={{ py: 0 }}>
              <SidebarLink href="/users">
                <ListItemIcon>
                  <PersonOutline />
                </ListItemIcon>
                <ListItemText>Users</ListItemText>
              </SidebarLink>
            </ListItem>
            <ListItem sx={{ py: 0 }}>
              <SidebarLink href="/photographers">
                <ListItemIcon>
                  <PersonOutline />
                </ListItemIcon>
                <ListItemText>Photographers</ListItemText>
              </SidebarLink>
            </ListItem>
          </SidebarGroup>
        </SidebarRoot>
      </List>
    </Box>
  );
}
