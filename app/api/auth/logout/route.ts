/**
 * @file app/api/auth/logout/route.ts
 * @description user logout API
 */
import { createClient } from "@/services/supabase/server";
import handleUnexpectedError from "@/util/handleUnexpectedError";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    // initiate supabase client
    const supabase = await createClient();

    // logout user
    const { error } = await supabase.auth.signOut();

    // if logout fails
    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: "Unable to sign out. Please try again later.",
        },
        { status: error.status || 500 }
      );
    }

    // if logout succeeds
    return NextResponse.json({
      success: true,
      redirectPath: "/",
      message: "User Logout Successful",
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
