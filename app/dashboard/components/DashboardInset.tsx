/**
 * @file app/dashboard/components/DashboardInset.tsx
 * @description
 */
import { Role } from "@/generated/prisma/enums";
import { createClient } from "@/services/supabase/server";
import { ReactNode } from "react";
import SuperAdminDashboardInset from "./SuperAdminDashboardInset";
import { redirect } from "next/navigation";
import * as Sentry from "@sentry/nextjs";
import { toast } from "sonner";

const DashboardInset = async () => {
  // init Supabase client
  const supabase = await createClient();

  // read the current users JWT
  const { data, error } = await supabase.auth.getClaims();

  // JWT verification failed
  if (error || !data) {
    Sentry.captureException(
      error ?? new Error("getClaims() returned no data"),
      {
        extra: { context: "Dashboard JWT verification failed" },
      }
    );
    await supabase.auth.signOut();
    redirect("/auth/login?error=session_error");
  }

  const userId = data.claims.sub; // get user id
  const email = data.claims.email; // get user email
  const role: Role | null = (data?.claims.user_role as Role) ?? null; // get user role

  // role missing from JWT
  if (!role) {
    Sentry.logger.error("JWT is valid but contains no user_role claim", {
      error: "User Role Error",
      userId: userId,
      email: email,
      availableClaims: Object.keys(data.claims),
    });
    await supabase.auth.signOut();
    redirect("/auth/login?error=role_error");
  }

  // renders dashboard landing page depending on users role
  const dashboards: Record<Role, ReactNode> = {
    SUPERADMIN: <SuperAdminDashboardInset />,
    ADMIN: "admin",
    STAFF: "staff",
    SCHOOLADMIN: "school admin",
    FACULTY: "faculty",
    STUDENT: "student",
  };

  if (!dashboards[role]) {
    Sentry.logger.warn(
      "Authenticated user has a role with no dashboard inset mapping",
      {
        component: "Dashboard",
        userId: userId,
        email: email,
        role: role,
      }
    );
    await supabase.auth.signOut();
    redirect("/auth/login");
  }

  return dashboards[role];
};

export default DashboardInset;
