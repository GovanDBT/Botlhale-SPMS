/**
 * @file lib/rbac/apiGuard.ts
 * @description sets permissions on api routes
 */
import { Permission, Role } from "@/generated/prisma/enums";
import { createClient } from "@/services/supabase/server";
import { NextResponse } from "next/server";
import prisma from "../prisma";
import { hasPermission } from "./permissionResolver";

export async function requirePermission(permission: Permission) {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
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
    return {
      error: NextResponse.json(
        { success: false, error: "Forbidden" },
        { status: 403 }
      ),
    };
  }

  return { user, profile };
}
