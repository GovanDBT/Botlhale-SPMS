/**
 * @file app/dashboard/components/SchoolSwitcher.tsx
 * @description sidebar header for switching schools
 * TODO: implement a dynamic dropdown depending on users role and school
 */
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const SchoolSwitcher = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" className="cursor-pointer">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-sidebar-primary"></div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-bold text-[16px]">
              Botlhale E.M.S
            </span>
            <span className="truncate text-[11px]">Earn Your Stripes</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default SchoolSwitcher;
