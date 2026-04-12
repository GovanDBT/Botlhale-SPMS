/**
 * @file app/(landing)/auth/signIn/page.tsx
 * @description sign in page
 */
"use client";
import { Metadata } from "next";
import LoginForm from "../../components/LoginForm";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

//TODO: show metadata some how
// export const metadata: Metadata = {
//   title: "Sign In | Botlhale EMS",
//   description:
//     "Sign in to your account to access school material, results, and academic performance",
// };

const ERROR_MESSAGES: Record<string, string> = {
  session_error: "Failed to retrieve your session. Please contact support",
  role_error:
    "Failed to retrieve your role. Please contact your admin or support",
  session_expired: "Your session expired. Please log in again.",
  unauthorized: "You are not authorized to access that page.",
};

const LoginPage = () => {
  const params = useSearchParams();
  const errorKey = params.get("error");

  useEffect(() => {
    if (errorKey && ERROR_MESSAGES[errorKey]) {
      toast.error(ERROR_MESSAGES[errorKey]);
    }
  }, [errorKey]);

  return (
    <div className="container flex items-center place-content-center h-full">
      <div className="grid grid-col-1 lg:grid-cols-2 justify-items-center gap-10 w-full items-center">
        <div className="hidden lg:flex flex-col justify-center items-center gap-10 h-110 w-full bg-primary rounded-2xl p-7">
          <div className="h-50 w-50 bg-white rounded-full"></div>
          <h2 className="text-white text-center text-balance place-self-end text-4xl">
            Access to 300+ learning materials and papers
          </h2>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
