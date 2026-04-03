// hooks/usePermissions.ts
"use client";
import { Permission } from "@/generated/prisma/client";
import { useGetProfile } from "./useProfile";

export function usePermissions() {
  const { data: profile, isLoading } = useGetProfile();

  // Check if the current user has a specific permission.
  const can = (permission: Permission): boolean => {
    if (!profile) return false;
    return profile.permissions?.includes(permission) ?? false;
  };

  // Check if the user has ALL of the given permissions.
  const canAll = (...permissions: Permission[]): boolean => {
    return permissions.every(can);
  };

  // Check if the user has ANY of the given permissions.
  const canAny = (...permissions: Permission[]): boolean => {
    return permissions.some(can);
  };

  return { can, canAll, canAny, role: profile?.role, isLoading };
}
