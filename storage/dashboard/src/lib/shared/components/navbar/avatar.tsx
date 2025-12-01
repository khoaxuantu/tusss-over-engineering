"use client";

import { logout } from "@lib/auth/actions/logout";
import { AccountCircle, Logout } from "@mui/icons-material";
import { ListItemIcon, MenuItem } from "@mui/material";
import { redirect } from "next/navigation";
import MenuContent from "../menu/content";
import { MenuRoot } from "../menu/provider";
import MenuTrigger from "../menu/trigger";

export default function NavbarAvatar() {
  const handleLogout = async () => {
    await logout();
    redirect("/login");
  };

  return (
    <MenuRoot>
      <MenuTrigger component="icon">
        <AccountCircle />
      </MenuTrigger>
      <MenuContent>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
}
