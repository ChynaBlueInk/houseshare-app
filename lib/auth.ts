// lib/auth.ts
export function getIdToken(): string | null {
  if (typeof window === "undefined") return null;

  const underscore = localStorage.getItem("id_token");
  const camel = localStorage.getItem("idToken");
  const chosen = underscore || camel || null;

  // Normalise so both keys match if they differ
  if (chosen && underscore !== camel) {
    try {
      localStorage.setItem("id_token", chosen);
      localStorage.setItem("idToken", chosen);
    } catch {}
  }

  return chosen;
}

export function getCurrentUser() {
  const token = getIdToken();
  return !!token;
}

export function signOut() {
  try {
    localStorage.removeItem("id_token");
    localStorage.removeItem("idToken");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  } catch {}

  if (typeof window !== "undefined") {
    window.location.href = "/";
  }
}
