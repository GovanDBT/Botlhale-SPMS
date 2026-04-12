/**
 * @file util/checkAccountStatus.ts
 * @description login middleware used to check user account status
 */
import * as Sentry from "@sentry/nextjs";
import { AccountStatus, Profile } from "@/generated/prisma/client";

type StatusFields = Pick<
  Profile,
  "accountStatus" | "statusReason" | "suspendedUntil" | "isActive"
>;

type AccountStatusResult =
  | { allowed: true }
  | { allowed: false; reason: "SUSPENDED"; message: string; until: Date | null }
  | { allowed: false; reason: "BANNED"; message: string };

export function checkAccountStatus(profile: StatusFields): AccountStatusResult {
  // banned permanently, no expiry date
  if (profile.accountStatus === AccountStatus.BANNED) {
    return {
      allowed: false,
      reason: "BANNED",
      message:
        "Your account has been permanently banned, Please contact support.",
    };
  }

  // if account suspended
  if (profile.accountStatus === AccountStatus.SUSPENDED) {
    // timed suspension
    if (profile.suspendedUntil && profile.suspendedUntil <= new Date()) {
      return { allowed: true };
    }

    // still suspended
    const until = profile.suspendedUntil;
    const untilMessage = until
      ? `until ${until.toLocaleDateString("en-UK", { dateStyle: "long" })}`
      : "indefinitely";

    return {
      allowed: false,
      reason: "SUSPENDED",
      message: `Your account has been temporarily suspended ${untilMessage}. Reason: ${
        profile.statusReason ?? "No reason provided"
      }.`,
      until,
    };
  }

  // account active
  Sentry.addBreadcrumb({
    category: "auth",
    message: "User account active",
    level: "info",
    data: { isActive: profile.isActive },
  });

  return { allowed: true };
}
