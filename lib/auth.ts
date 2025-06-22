export function getCurrentUser() {
  const token = localStorage.getItem("id_token");
  return token ? true : false;
}

export function signOut() {
  localStorage.removeItem("id_token");
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");

  window.location.href = "/";
}
