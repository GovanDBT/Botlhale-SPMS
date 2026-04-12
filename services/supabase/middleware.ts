/**
 * @file services/supabase/middleware.ts
 * @description
 *  1. Refresh the Supabase auth token on every request so the session
 *     cookie stays alive (handles token rotation automatically).
 *  2. Protect routes — redirect unauthenticated users to /auth/login
 *     and redirect authenticated users away from /auth pages.
 */
import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export default async function updateSession(request: NextRequest) {
  // Create an unmodified response
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // pre-request supabase client - cookie handler
  const supabase = createServerClient(supabaseUrl!, supabaseKey!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // call supabase to confirm is token is valid
  const { data } = await supabase.auth.getClaims();

  // attach user to every API error in Sentry
  if (data) {
    Sentry.setUser({
      id: data.claims.sub,
      email: data.claims.email,
      role: data.claims.user_role,
    });
  } else {
    Sentry.setUser(null);
  }

  const isAuthenticated = !!data;
  const pathname = request.nextUrl.pathname;

  // Unauthenticated users trying to access protected routes -> /auth/login
  if (!isAuthenticated && request.nextUrl.pathname.startsWith("/dashboard")) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // Authenticated users trying to access auth pages -> /dashboard
  if (isAuthenticated && pathname.startsWith("/auth")) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
