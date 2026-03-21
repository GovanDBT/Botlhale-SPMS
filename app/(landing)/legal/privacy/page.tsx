/**
 * @file app/(landing)/legal/privacy/page.tsx
 * @description privacy and cookies policy page
 */

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy & Cookies | Botlhale EMS",
  description:
    "Learn how Botlhale collects, uses, and protects student and teacher data. Our Privacy & Cookies Policy explains data security, school-managed access, and how cookies are used to improve platform performance and user experience.",
};

const PrivacyPolicy = () => {
  return (
    <div className="container flex items-center place-content-center h-full">
      Privacy & Cookies Policy
    </div>
  );
};

export default PrivacyPolicy;
