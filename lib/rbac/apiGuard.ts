/**
 * @file lib/rbac/apiGuard.ts
 * @description sets permissions on api routes
 */
import { Permission, Role } from "@/generated/prisma/enums";
import { createClient } from "@/services/supabase/server";
import { NextResponse } from "next/server";
import prisma from "../prisma";
import { hasPermission } from "./permissionResolver";
import * as Sentry from "@sentry/nextjs";

export async function requirePermission(
  permission: Permission,
  endpoint?: string,
  endpointMethod?: string
) {
  // init Supabase client
  const supabase = await createClient();

  // verify user session via Supabase Auth
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // if sessions fails
  if (error || !user) {
    // log warning to Sentry
    Sentry.logger.warn("Unauthenticated request attempt", {
      userId: user?.id,
      email: user?.email,
      userRole: user?.user_metadata?.user_role,
      endpoint: endpoint,
      method: endpointMethod,
      permission: permission,
    });
    // log breadcrumb to Sentry if error occurs
    Sentry.addBreadcrumb({
      category: "auth",
      message: "Unauthenticated request attempt to " + endpoint,
      level: "warning",
      timestamp: Date.now(),
      data: {
        supabaseCode: error?.code,
        supabaseMessage: error?.message,
        supabaseStatus: error?.status,
      },
    });
    // log to client
    return {
      error: NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      ),
    };
  }

  const profile = await prisma.profile.findUnique({
    where: { id: user.id },
    select: { id: true, role: true, isActive: true },
  });

  if (!profile || !profile.isActive) {
    // log error to Sentry
    Sentry.captureException(
      new Error("Authenticated user has no profile record or is Inactive"),
      {
        tags: { section: "Authentication" },
        level: "fatal",
        extra: {
          userId: user.id,
          email: user.email,
          userCreatedAt: user.created_at,
          userRole: user.user_metadata.user_role,
        },
      }
    );
    // log to client
    return {
      error: NextResponse.json(
        { success: false, error: "Account not found or disabled" },
        { status: 403 }
      ),
    };
  }

  const allowed = await hasPermission(
    profile.id,
    profile.role as Role,
    permission
  );

  if (!allowed) {
    // log warning to Sentry
    Sentry.logger.warn("Unsatisfied permission attempt", {
      userId: user?.id,
      email: user?.email,
      userRole: user?.user_metadata?.user_role,
      endpoint: endpoint,
      method: endpointMethod,
      permission: permission,
    });
    // log breadcrumb to Sentry if error occurs
    Sentry.addBreadcrumb({
      category: "Permissions",
      message: "Unsatisfied permission attempt",
      level: "warning",
      timestamp: Date.now(),
      data: {
        userId: profile.id,
        userRole: profile.role,
        permission: permission,
      },
    });
    return {
      error: NextResponse.json(
        { success: false, error: "Forbidden" },
        { status: 403 }
      ),
    };
  }

  Sentry.addBreadcrumb({
    category: "Permission",
    message: "Permission satisfied",
    level: "info",
    timestamp: Date.now(),
    data: {
      userId: profile.id,
      userRole: profile.role,
      permission: permission,
    },
  });

  return { user, profile };
}
