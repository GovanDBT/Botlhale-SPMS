/**
 * @file app/(landing)/components/LoginForm.tsx
 * @description: sign in form component
 */
"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false); // show or hide password
  return (
    <motion.div
      initial={{ x: "var(--x-from, 0)" }}
      animate={{ x: "var(--x-to, 0)" }}
      transition={{ type: "spring" }}
      className="max-w-md lg:[--x-from:50] lg:[--x-to:0]"
    >
      {/* TODO: add animation to title */}
      {/* header */}
      <div className="text-center lg:text-left">
        <h2>
          Welcome back <span className="text-primary">Student</span>
        </h2>
        <p>Enter your details below to sign in and access your dashboard.</p>
      </div>
      <form className="my-6">
        <FieldSet>
          <FieldGroup>
            {/* Email */}
            <Field>
              <FieldLabel htmlFor="email">
                Email <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                type="email"
                id="email"
                autoComplete="on"
                className="input"
              />
            </Field>

            {/* Password */}
            <Field>
              <FieldLabel htmlFor="password">
                Password <span className="text-red-500">*</span>
              </FieldLabel>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="input"
                />
                {/* Eye icon button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff size={17} className="text-primary/60" />
                  ) : (
                    <Eye size={17} className="text-primary/60" />
                  )}
                </button>
              </div>
            </Field>

            {/* Remember me + forgot password */}
            <div className="flex items-center justify-between">
              <Field orientation="horizontal" className="gap-2">
                <Checkbox
                  id="remember-me"
                  name="remember-me"
                  className="input"
                />
                <FieldLabel htmlFor="remember-me">Remember me</FieldLabel>
              </Field>
              <Link
                className="link text-[15px] lg:text-sm text-nowrap"
                href="../auth/reset"
              >
                Forgot Password
              </Link>
            </div>

            {/* Sign in button */}
            <Button className="button">Sign In</Button>
          </FieldGroup>
        </FieldSet>
      </form>
      {/* Legals */}
      <div className="text-center lg:text-left">
        <p className="text-sm mb-3 lg:mb-0">
          Don&apos;t have an account?{" "}
          <Link href="../register" className="link">
            How to create an account
          </Link>
        </p>
        <p className="text-sm">
          By signing in, you agree to our{" "}
          <Link href="../legal/terms" className="link">
            Terms & Conditions
          </Link>{" "}
          and our{" "}
          <Link href="../legal/privacy" className="link">
            Privacy Policies
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default LoginForm;
