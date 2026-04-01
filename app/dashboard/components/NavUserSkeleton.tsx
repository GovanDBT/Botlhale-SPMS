/**
 * @file app/dashboard/components/NavUserSkeleton.tsx
 * @description shows loading skeleton
 */
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronsUpDown } from "lucide-react";

interface Props {
  isSidebarOpen: boolean;
}

const NavUserSkeleton = ({ isSidebarOpen }: Props) => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
        >
          <Avatar
            className={`h-8 w-8 rounded-lg ${
              isSidebarOpen ? "hidden!" : "flex"
            }`}
          >
            <AvatarFallback className="rounded-lg">
              <Skeleton className="h-8 w-8 rounded-lg bg-primary/15" />
            </AvatarFallback>
          </Avatar>
          <Skeleton className="h-8 w-8 rounded-lg bg-primary/15" />
          <div className="grid flex-1 text-left text-sm leading-tight">
            <Skeleton className="h-4 w-3/4 bg-primary/20 mb-1" />
            <Skeleton className="h-3 w-full bg-primary/20" />
          </div>
          <ChevronsUpDown className="ml-auto size-4" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavUserSkeleton;
