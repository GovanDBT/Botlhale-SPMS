/**
 * @file util/interfaces.ts
 */

import { Permission, Role } from "@/generated/prisma/enums";

// profile interface
export interface Profile {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  role: Role;
  permissions: Permission[];
}
