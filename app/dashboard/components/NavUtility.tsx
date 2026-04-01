/**
 * @file app/dashboard/components/NavUtility.tsx
 * @description sidebar utility menus
 */
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Inbox, Search } from "lucide-react";

const NavUtility = () => {
  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Inbox" className="cursor-pointer">
            <Inbox />
            <span>Inbox</span>
            <KbdGroup className="ml-auto">
              <Kbd>Ctrl</Kbd>
              <Kbd>B</Kbd>
            </KbdGroup>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Search" className="cursor-pointer">
            <Search />
            <span>Search</span>
            <KbdGroup className="ml-auto">
              <Kbd>Ctrl</Kbd>
              <Kbd>S</Kbd>
            </KbdGroup>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default NavUtility;
