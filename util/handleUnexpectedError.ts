/**
 * @file: utils/handleUnexpectedError.ts
 * @description: function for handling unexpected error messages for api routes
 */

import { NextResponse } from "next/server";

export default function handleUnexpectedError(error: unknown): NextResponse {
  // convert error to string
  const error_message =
    error instanceof Error
      ? error.message
      : "Unexpected server error occurred!";
  // log error to server & client
  return NextResponse.json(
    { success: false, error: error_message },
    { status: 500 }
  );
}

/**
 * The reason for this file is because when building the app for production, Next does not allow
 * error messages typed as "any". Those error messages have to be typed as "unknown" and be instances of
 * Error or a string.
 */
