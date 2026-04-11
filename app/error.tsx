/**
 * @file app/error.tsx
 * @description handles unexpected runtime errors and displays fallback UI
 */
"use client"; // error boundary must be client
import { Button } from "@/components/ui/button";
import { Headset, RotateCcw } from "lucide-react";
import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error = ({ error, reset }: Props) => {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    // TODO: add logo
    <div className="container h-screen flex flex-col items-center place-content-center space-y-7">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-primary">Oops!</h2>
        <h2 className="text-8xl font-extrabold bg-linear-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
          500
        </h2>
        <h2 className="text-3xl font-bold text-primary">
          Unexpected Error Occurred!
        </h2>
      </div>

      {/* Description */}
      <p className="text-[16px] lg:max-w-5/10 text-center text-zinc-500 font-medium">
        An unexpected internal server error has occurred. Please try again later
        or contact support for help.
      </p>

      {/* Error digest — useful for cross-referencing with Sentry */}
      {error.digest && (
        <p className="text-xs text-zinc-400 font-mono">
          Error ID: {error.digest}
        </p>
      )}

      {/* Buttons */}
      <div className="flex items-center gap-8">
        {/* TODO: limit number of retries */}
        <Button
          className="hover:bg-[#6471ad] py-5! cursor-pointer"
          onClick={() => reset()}
        >
          Try Again
          <RotateCcw />
        </Button>
        <Button className="hover:bg-[#6471ad] py-5! cursor-pointer">
          Support <Headset />
        </Button>
      </div>
    </div>
  );
};

export default Error;
