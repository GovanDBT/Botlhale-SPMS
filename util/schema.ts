/**
 * @file util/schema.ts
 * @description Zod input schemas
 */
import z from "zod";

// login schema
export const loginSchema = z.object({
  email: z.email("Invalid email address").min(1, "Email address is required!"),
  password: z.string().min(1, "Password is required!"),
});
