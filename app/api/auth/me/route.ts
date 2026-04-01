/**
 * @file app/api/auth/me/route.ts
 * @description me API - gets the currently authenticated user's profile
 */

import prisma from "@/lib/prisma";
import { createClient } from "@/services/supabase/server";
import handleUnexpectedError from "@/util/handleUnexpectedError";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // initialize Supabase client
    const supabase = await createClient();

    // verify the session via Supabase Auth
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    // if session fails
    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized Access!" },
        { status: 401 }
      );
    }

    // fetch the users profile from DB
    const userProfile = await prisma.profile.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        phone: true,
        role: true,
      },
    });

    // if server fails to fetch profile
    if (!userProfile) {
      return NextResponse.json(
        { success: false, error: "User profile not found!" },
        { status: 404 }
      );
    }

    // success response
    return NextResponse.json({
      success: true,
      data: userProfile,
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
