/**
 * @file app/dashboard/page.tsx
 * @description dashboard inset area
 */
import type { Metadata } from "next";
import DashboardInset from "./components/DashboardInset";

export const metadata: Metadata = {
  title: "Dashboard | Botlhale EMS",
  description: "",
};

const DashboardLandingPage = () => {
  return (
    <main className="p-5">
      <DashboardInset />
    </main>
  );
};

export default DashboardLandingPage;
