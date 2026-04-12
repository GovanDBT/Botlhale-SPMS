/**
 * @file app/dashboard/components/Dashboard.tsx
 * @description dashboard component
 */
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import SidebarTriggerWithTooltip from "./SidebarTriggerWithTooltip";

interface Props {
  children: ReactNode;
}

const Dashboard = ({ children }: Props) => {
  return (
    <SidebarProvider>
      {/* dashboard aside */}
      <AppSidebar />
      {/* dashboard content */}
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            {/* Sidebar trigger */}
            <SidebarTriggerWithTooltip />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            {/* Breadcrumbs */}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <Separator />
        {/* Content */}
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Dashboard;
