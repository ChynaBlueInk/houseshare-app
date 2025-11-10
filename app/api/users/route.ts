// app/api/users/route.ts
import { NextResponse } from "next/server";
import { PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "@/lib/aws";

export const dynamic = "force-dynamic";

const USERS_TABLE = process.env.DYNAMODB_TABLE_USERS || "ShareSpaceUsers";

// Minimal decoder (no signature verification)
function decodeJWT(idToken: string): any {
  try {
    const [, payloadB64] = idToken.split(".");
    if (!payloadB64) return null;
    const b64 = payloadB64.replace(/-/g, "+").replace(/_/g, "/");
    const json = Buffer.from(b64, "base64").toString("utf-8");
    return JSON.parse(json);
  } catch {
    return null;
  }
}

// ✅ POST: Create/Update User Profile (upsert) — derive userID/email from token when provided
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // If caller provided an idToken, prefer its identity info
    const authHeader = (req.headers as any).get?.("authorization") || (req.headers as any).get?.("Authorization");
    const bearer = typeof authHeader === "string" ? authHeader : undefined;
    const token = bearer?.toLowerCase().startsWith("bearer ")
      ? bearer.slice("bearer ".length).trim()
      : null;
    const claims = token ? decodeJWT(token) : null;

    const tokenUserID = claims?.sub ? String(claims.sub) : undefined;
    const tokenEmail = (claims?.email || claims?.["cognito:email"]) as string | undefined;

    const {
      userID: bodyUserID,
      fullName,
      email: bodyEmail,
      region,
      bio,
      profileImage,
      createdAt = new Date().toISOString(),
      ...rest
    } = body;

    const finalUserID = tokenUserID || bodyUserID;
    const finalEmail = (tokenEmail || bodyEmail || "").toString();

    if (!finalUserID || !finalEmail || !fullName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const command = new PutCommand({
      TableName: USERS_TABLE,
      Item: {
        userID: finalUserID,
        fullName,
        email: finalEmail,
        region,
        bio,
        profileImage,
        createdAt,
        ...rest,
      },
    });

    await ddbDocClient.send(command);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("❌ DynamoDB Write Error:", err);
    return NextResponse.json({ error: "Failed to save user" }, { status: 500 });
  }
}

// ✅ GET: Fetch All User Profiles (strongly consistent to avoid stale reads)
export async function GET() {
  try {
    const command = new ScanCommand({
      TableName: USERS_TABLE,
      ConsistentRead: true,
    });

    const response = await ddbDocClient.send(command);
    return NextResponse.json({ profiles: response.Items }, { status: 200 });
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
