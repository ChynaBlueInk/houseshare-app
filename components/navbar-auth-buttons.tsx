"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth";

/**
 * Canonical token getter:
 * Prefer id_token, then idToken. If both exist and differ, normalize to the same value.
 */
function getIdToken(): string | null {
  if (typeof window === "undefined") return null;
  const underscore = localStorage.getItem("id_token");
  const camel = localStorage.getItem("idToken");
  const chosen = underscore || camel || null;

  if (chosen && underscore !== camel) {
    try {
      localStorage.setItem("id_token", chosen);
      localStorage.setItem("idToken", chosen);
    } catch {}
  }
  return chosen;
}

export function NavbarAuthButtons() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!getIdToken());
  }, []);

  return (
    <div className="flex items-center gap-3">
      {isLoggedIn ? (
        <Button variant="outline" onClick={signOut}>
          Sign Out
        </Button>
      ) : (
        <>
          <Button variant="outline" asChild>
            <Link href="/signin">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </>
      )}
    </div>
  );
}
