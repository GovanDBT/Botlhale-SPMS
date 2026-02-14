/**
 * @file app/not-found.tsx
 * @description not found page for unauthenticated users
 */
import { Metadata } from "next";
import Navbar from "./(landing)/components/Navbar";
import NotFoundPage from "./components/NotFoundPage";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Botlhale",
  description:
    "The page you are looking for could not be found. Navigate back or return to the homepage.",
};

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <NotFoundPage />
    </div>
  );
}
