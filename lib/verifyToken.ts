// lib/auth.ts
import { CognitoJwtVerifier } from "aws-jwt-verify";

const USER_POOL_ID = "your_cognito_user_pool_id";
const CLIENT_ID = "your_cognito_app_client_id";

export const verifier = CognitoJwtVerifier.create({
  userPoolId: USER_POOL_ID,
  tokenUse: "id",
  clientId: CLIENT_ID,
});

export async function verifyToken(token: string) {
  try {
    const payload = await verifier.verify(token);
    return payload; // token is valid
  } catch (err) {
    console.error("Invalid token", err);
    return null; // invalid token
  }
}
