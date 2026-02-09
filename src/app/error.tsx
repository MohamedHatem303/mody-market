"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);


  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-2xl font-bold">Something went wrong</h2>

      <p className="text-muted-foreground text-sm mt-2">
        We couldn’t load the data. Please try again.
      </p>

      <button
        onClick={() => reset()}
        className="mt-6 rounded-xl bg-primary px-6 py-2 text-primary-foreground hover:opacity-90 transition"
      >
        Try again
      </button>
    </div>
  );
}
