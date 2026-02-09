"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Notfound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-14 h-14 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m0 3.75h.008M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>

      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        404 - Page Not Found
      </h1>

      <p className="text-gray-500 max-w-md">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>

      <Link href="/">
        <Button className="mt-6">Back to Home</Button>
      </Link>
    </div>
  );
}
