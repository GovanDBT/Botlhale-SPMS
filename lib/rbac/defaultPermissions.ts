/**
 * @file lib/rbac/defaultPermissions.ts
 * @description default permission for each user role
 */

import { Permission, Role } from "@/generated/prisma/enums";

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  SUPERADMIN: Object.values(Permission), // all permissions

  ADMIN: [Permission.USER_VIEW, Permission.SCHOOL_CREATE],

  STAFF: [],

  SCHOOLADMIN: [],

  FACULTY: [],

  STUDENT: [],
};
