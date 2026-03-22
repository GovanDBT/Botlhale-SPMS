/**
 * @file app/(landing)/layout.tsx
 * @description layout for the unauthenticated users
 */

import { ReactNode } from "react";
import Navbar from "./components/Navbar";

interface Props {
  children: ReactNode;
}

const LandingLayout = ({ children }: Props) => {
  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />
      <main className="flex-1">{children}</main>

      {/* Footer */}
    </div>
  );
};

export default LandingLayout;
