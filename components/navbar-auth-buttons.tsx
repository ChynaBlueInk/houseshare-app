"use client";

import {useEffect, useState} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {Button} from "@/components/ui/button";
import {getIdToken, signOut} from "@/lib/auth";

export function NavbarAuthButtons() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoggedIn(!!getIdToken());
  }, [pathname]);

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
