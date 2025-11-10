export function getCurrentUser() {
  // Accept either key and normalize behavior
  const token =
    (typeof window !== "undefined" && (localStorage.getItem("id_token") || localStorage.getItem("idToken"))) ||
    null;
  return !!token;
}

export function signOut() {
  try {
    localStorage.removeItem("id_token");
    localStorage.removeItem("idToken");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  } catch {}
  // Hard redirect so all client state resets
  if (typeof window !== "undefined") {
    window.location.href = "/";
  }
}
