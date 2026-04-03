/**
 * @file lib/rbac/permissionResolver.ts
 * @description merges the default roles with per-user overrides
 */

import { Permission, Role } from "@/generated/prisma/enums";
import { ROLE_PERMISSIONS } from "./defaultPermissions";
import prisma from "../prisma";

// returns the overwritten permissions for a specific user
export async function resolvePermissions(
  userId: string,
  role: Role
): Promise<Set<Permission>> {
  // retrieves the default permissions of a specific users role
  const defaults = new Set(ROLE_PERMISSIONS[role]);

  // retrieves the overwritten permissions set in the userPermission table for a specific user
  const overrides = await prisma.userPermission.findMany({
    where: { userId },
  });

  // adds or removes permission from the default permissions depending on the grant
  for (const override of overrides) {
    if (override.granted) {
      defaults.add(override.permission);
    } else {
      defaults.delete(override.permission);
    }
  }

  // returns new permissions or the same if nothing changed
  return defaults;
}

// checks if a user has a specific permission
export async function hasPermission(
  userId: string,
  role: Role,
  permission: Permission
): Promise<boolean> {
  // SUPERADMIN always passes - no need to query DB
  if (role === Role.SUPERADMIN) return true;

  const permissions = await resolvePermissions(userId, role);
  return permissions.has(permission);
}
