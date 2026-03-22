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
import z from "zod";
import { loginSchema } from "@/util/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Spinner } from "@/components/ui/spinner";
import InputError from "@/app/components/InputError";

// infer zod login schema
type loginData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null); // when error message occurs
  const [isRedirecting, setIsRedirecting] = useState(false); // when user is redirected
  const [showPassword, setShowPassword] = useState(false); // show or hide password
  const router = useRouter(); // programmatic navigation

  // initialize react forms with zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // handle submit login
  const onSubmit = async (data: loginData) => {
    try {
      setError(null);
      setIsRedirecting(true);

      const res = await axios.post("/api/auth/login", data);

      router.push(res.data.redirectPath);
      setIsRedirecting(false);
    } catch (err) {
      setIsRedirecting(false);

      // User is offline / no internet
      if (!navigator.onLine) {
        setError("You are offline. Please check your internet connection.");
        return;
      }

      // Axios error (API responded)
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.error ||
          err.response?.data?.message ||
          "Invalid email or password";

        setError(message);
        return;
      }

      // Unknown error
      setError("An unexpected error occurred. Please try again later.");
    }
  };

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
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="my-6">
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
                {...register("email")}
              />
              <InputError error={errors.email} />
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
                  {...register("password")}
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
              <InputError error={errors.password} />
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
            <Button type="submit" className="button" disabled={isRedirecting}>
              {isRedirecting ? (
                <div className="flex items-center gap-2">
                  <Spinner className="size-4" />
                  Redirecting...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
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
