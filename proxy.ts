/**
 * proxy.ts
 * middleware for handling sessions updates
 */
import { NextRequest } from "next/server";
import updateSession from "./services/supabase/middleware";

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

/**
 * The regex below uses a negative lookahead (?!...) to SKIP:
 *  - _next/static  → bundled JS, CSS, and other static assets
 *  - _next/image   → Next.js image optimization endpoint
 *  - favicon.ico   → browser tab icon request
 *  - Image files   → .svg .png .jpg .jpeg .gif .webp
 *
 * Everything else (pages, API routes, dynamic segments) IS matched,
 * so the session is always checked and refreshed on real requests.
 */

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
