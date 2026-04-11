/**
 * @file app/global-error.tsx
 * @description Last-resort error boundary. Catches errors thrown inside
 * the root layout.tsx itself. Must render its own <html> and <body> tags
 * since the layout is unavailable. Kept intentionally minimal.
 */
"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, sans-serif",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          textAlign: "center",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        <h2 style={{ fontSize: "2rem", fontWeight: 700 }}>
          Something went seriously wrong
        </h2>
        <p style={{ color: "#666", maxWidth: "480px" }}>
          A critical error occurred and the page could not load. Please refresh
          or contact support if the problem persists.
        </p>
        {error.digest && (
          <p
            style={{
              fontSize: "0.75rem",
              color: "#aaa",
              fontFamily: "monospace",
            }}
          >
            Error ID: {error.digest}
          </p>
        )}
        <button
          onClick={() => reset()}
          style={{
            padding: "0.6rem 1.4rem",
            borderRadius: "6px",
            border: "none",
            background: "#4f5da0",
            color: "#fff",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Try Again
        </button>
        {/* TODO: put support email */}
      </body>
    </html>
  );
}
