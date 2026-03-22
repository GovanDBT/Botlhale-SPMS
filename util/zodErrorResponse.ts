/**
 * @file: utils/zodErrorResponse.ts
 * @description: reusable zod error message formatter
 */
import { z } from "zod";

export default function zodErrorResponse(error: z.ZodError) {
  const firstError = error.issues[0];

  return {
    message: firstError?.message ?? "Invalid input",
    field: firstError?.path.join("."),
  };
}
