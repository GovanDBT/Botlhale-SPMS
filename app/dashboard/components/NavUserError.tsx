/**
 * @file app/dashboard/components/NavUserError.tsx
 * @description shows sidebar profile error state
 */
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { AlertCircle } from "lucide-react";

interface Props {
  isSidebarOpen: boolean;
}

const NavUserError = ({ isSidebarOpen }: Props) => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="text-destructive hover:text-destructive cursor-pointer bg-red-500/10 hover:bg-red-500/15 justify-center"
          onClick={() => window.location.reload()}
          title="Failed to load profile. Click to retry."
        >
          {isSidebarOpen ? (
            <span className="flex items-center gap-2">
              <AlertCircle className="size-4 shrink-0" />
              <span className="text-sm">Failed to load profile. Retry?</span>
            </span>
          ) : (
            <AlertCircle className="size-4 shrink-0" />
          )}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavUserError;
