import { Menu } from "@mui/icons-material";
import DrawerContent from "../drawer/content";
import DrawerRoot from "../drawer/root";
import DrawerTrigger from "../drawer/trigger";
import Sidebar from "../sidebar";

export default function DrawerSidebar() {
  return (
    <DrawerRoot>
      <DrawerTrigger
        component="icon"
        slotProps={{
          sx: {
            display: { md: "none" },
          },
        }}
      >
        <Menu />
      </DrawerTrigger>
      <DrawerContent>
        <Sidebar
          boxProps={{
            width: "100dvw",
            maxWidth: 400,
          }}
        />
      </DrawerContent>
    </DrawerRoot>
  );
}
