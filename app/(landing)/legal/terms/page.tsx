/**
 * @file app/(landing)/legal/terms/page.tsx
 * @description terms and conditions page
 */

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Botlhale EMS",
  description:
    "Read the Terms and Conditions governing the use of Botlhale. Learn about user responsibilities, school-managed access, acceptable use policies, and platform guidelines for students, teachers, and administrators.",
};

const TermsConditionsPage = () => {
  return (
    <div className="container flex items-center place-content-center h-full">
      Terms And Conditions Page
    </div>
  );
};

export default TermsConditionsPage;
