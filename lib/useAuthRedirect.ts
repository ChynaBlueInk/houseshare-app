"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuthRedirect() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("id_token");

    if (!token) {
      router.push("/signin");
    } else {
      setLoading(false);
    }
  }, [router]);

  return loading;
}
