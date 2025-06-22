"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded shadow max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Sign In Required</h1>
        <p className="text-gray-600 mb-6">
          You must sign in to view this information.
        </p>

        <div className="flex flex-col gap-4">
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href="/signin">Go to Sign In / Sign Up</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
