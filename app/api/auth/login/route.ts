/**
 * @file app/api/auth/login/route.ts
 * @description login API
 */
import { createClient } from "@/services/supabase/server";
import handleUnexpectedError from "@/util/handleUnexpectedError";
import { loginSchema } from "@/util/schema";
import zodErrorResponse from "@/util/zodErrorResponse";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // create a new body
    const body = await request.json();
    const { email, password } = body;

    // Validate body
    const validate = loginSchema.safeParse({ email, password });

    // if validation fails
    if (!validate.success) {
      return NextResponse.json(zodErrorResponse(validate.error), {
        status: 400,
      });
    }

    // Initialize Supabase client
    const supabase = await createClient();

    // Attempt login
    const { data: userData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    // if login fails
    if (signInError || !userData) {
      return NextResponse.json(
        {
          success: false,
          error: "Incorrect Email or Password, Please verify your credentials",
        },
        { status: 401 }
      );
    }

    // TODO: remove when in production
    const { data } = await supabase.auth.getSession();
    console.log(`session:` + data.session?.access_token);

    // response
    return NextResponse.json({
      success: true,
      redirectPath: "/dashboard/",
      message: "Login Successful",
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
