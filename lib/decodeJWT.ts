// lib/decodeJWT.ts
export function decodeJWT(token: string) {
  if (!token) return null
  try {
    const payload = token.split(".")[1]
    const decoded = JSON.parse(atob(payload))
    return decoded
  } catch (err) {
    console.error("Failed to decode JWT", err)
    return null
  }
}
