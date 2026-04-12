/**
 * @file app/dashboard/layout.tsx
 * @description dashboard layout
 */

import Dashboard from "./components/Dashboard";

interface Props {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: Props) {
  return <Dashboard>{children}</Dashboard>;
}
