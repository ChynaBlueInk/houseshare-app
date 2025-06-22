"use client";

import { useEffect, useState } from "react";
import { getCurrentUser, signOut } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function NavbarAuthButtons() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(getCurrentUser());
  }, []);

  return (
    <div className="flex items-center gap-3">
      {isLoggedIn ? (
        <Button variant="outline" onClick={signOut}>
          Sign Out
        </Button>
      ) : (
        <Button variant="outline" asChild>
          <Link href="/signin">Sign In</Link>
        </Button>
      )}
    </div>
  );
}
