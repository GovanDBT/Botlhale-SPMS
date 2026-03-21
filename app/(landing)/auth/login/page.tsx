/**
 * @file app/(landing)/auth/signIn/page.tsx
 * @description sign in page
 */

import { Metadata } from "next";
import LoginForm from "../../components/LoginForm";

export const metadata: Metadata = {
  title: "Sign In | Botlhale EMS",
  description:
    "Sign in to your account to access school material, results, and academic performance",
};

const LoginPage = () => {
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
