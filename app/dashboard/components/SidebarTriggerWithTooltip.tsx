/**
 * @file app/dashboard/components/SidebarTriggerWithTooltip.tsx
 * @description sidebar trigger with tooltip
 */
"use client";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";

const SidebarTriggerWithTooltip = () => {
  const { open } = useSidebar();
  const [isMac, setIsMac] = useState(false);

  // detects OS on mount
  useEffect(() => {
    setIsMac(navigator.userAgent.includes("Mac"));
  }, []);

  return (
    <Tooltip delayDuration={800}>
      <TooltipTrigger asChild>
        <SidebarTrigger className="-ml-1 cursor-pointer" />
      </TooltipTrigger>
      <TooltipContent>
        {open ? "Close Sidebar" : "Open Sidebar"}{" "}
        <KbdGroup>
          <Kbd>{isMac ? "⌘" : "Ctrl"}</Kbd>
          <Kbd>B</Kbd>
        </KbdGroup>
      </TooltipContent>
    </Tooltip>
  );
};

export default SidebarTriggerWithTooltip;
