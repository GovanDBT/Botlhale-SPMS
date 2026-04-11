/**
 * @file app/api/auth/me/route.ts
 * @description me API - gets the currently authenticated user's profile
 */

import prisma from "@/lib/prisma";
import { ROLE_PERMISSIONS } from "@/lib/rbac/defaultPermissions";
import { createClient } from "@/services/supabase/server";
import handleUnexpectedError from "@/util/handleUnexpectedError";
import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

export async function GET() {
  try {
    // initialize Supabase client
    const supabase = await createClient();

    // verify the session via Supabase Auth
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    // if session fails
    if (authError || !user) {
      // log to Sentry
      Sentry.logger.warn("Unauthenticated request attempt", {
        userId: user?.id,
        email: user?.email,
        userRole: user?.user_metadata?.user_role,
        endpoint: "/api/auth/me",
        method: "Get",
      });
      // log breadcrumb to Sentry if error occurs
      Sentry.addBreadcrumb({
        category: "auth",
        message: "Unauthenticated request to /api/auth/me",
        level: "warning",
        timestamp: Date.now(),
        data: {
          supabaseCode: authError?.code,
          supabaseMessage: authError?.message,
        },
      });
      // return error to client
      return NextResponse.json(
        { success: false, error: "Unauthorized Access!" },
        { status: 401 }
      );
    }

    // fetch the users profile from DB
    const userProfile = await prisma.profile.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        phone: true,
        role: true,
        permissionOverrides: {
          select: {
            permission: true,
            granted: true,
          },
        },
      },
    });

    // if server fails to fetch profile
    if (!userProfile) {
      Sentry.captureException(
        new Error("Authenticated user has no profile record"),
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
      return NextResponse.json(
        { success: false, error: "User profile not found!" },
        { status: 404 }
      );
    }

    // resolve effective permissions: role defaults + individual overrides
    const defaultPermissions = new Set(ROLE_PERMISSIONS[userProfile.role]);

    for (const override of userProfile.permissionOverrides) {
      if (override.granted) {
        defaultPermissions.add(override.permission);
      } else {
        defaultPermissions.delete(override.permission);
      }
    }

    // Strip permissionOverrides from the response — client only needs the resolved list
    const { permissionOverrides, ...profile } = userProfile;

    // log breadcrumb to Sentry if exception occurs
    Sentry.addBreadcrumb({
      category: "auth",
      message: "User profile fetched successfully",
      level: "info",
      data: {
        email: user.email,
        id: user.id,
        role: userProfile.role,
      },
    });

    // success response
    return NextResponse.json({
      success: true,
      data: { ...profile, permissions: Array.from(defaultPermissions) },
    });
  } catch (error) {
    return handleUnexpectedError(error, { operation: "get-user-profile" });
  }
}
