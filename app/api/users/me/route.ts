// app/api/users/me/route.ts
import { NextRequest, NextResponse } from "next/server";
import { GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "@/lib/aws";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

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

export async function GET(req: NextRequest) {
  try {
    // Expect Authorization: Bearer <idToken>
    const auth =
      req.headers.get("authorization") || req.headers.get("Authorization");
    if (!auth || !auth.toLowerCase().startsWith("bearer ")) {
      return NextResponse.json(
        { error: "Missing Authorization bearer token" },
        { status: 401 }
      );
    }

    const token = auth.slice("bearer ".length).trim();
    if (!token || token === "undefined" || token === "null") {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const claims = decodeJWT(token);
    if (!claims || !claims.sub) {
      return NextResponse.json(
        { error: "Unable to decode JWT or missing sub" },
        { status: 400 }
      );
    }

    const userID = String(claims.sub);
    const email = (claims.email || claims["cognito:email"] || "").toLowerCase();

    // 1) Strongly consistent GET by userID (partition key)
    const getRes = await ddbDocClient.send(
      new GetCommand({
        TableName: USERS_TABLE,
        Key: { userID },
        ConsistentRead: true,
      })
    );

    if (getRes.Item) {
      return NextResponse.json(
        { user: getRes.Item, _source: "byUserID" },
        { status: 200 }
      );
    }

    // 2) Fallback: strongly consistent Scan by email (small dataset OK)
    if (email) {
      const scanRes = await ddbDocClient.send(
        new ScanCommand({
          TableName: USERS_TABLE,
          ConsistentRead: true,
          FilterExpression: "#em = :em",
          ExpressionAttributeNames: { "#em": "email" },
          ExpressionAttributeValues: { ":em": email },
        })
      );

      if (scanRes.Items && scanRes.Items.length > 0) {
        // If multiple, pick the first (or you could pick the most recent)
        return NextResponse.json(
          { user: scanRes.Items[0], _source: "byEmailScan" },
          { status: 200 }
        );
      }
    }

    return NextResponse.json(
      { error: "User profile not found" },
      { status: 404 }
    );
  } catch (err: any) {
    console.error("GET /api/users/me error:", err);
    return NextResponse.json(
      { error: "Internal server error", detail: err?.message ?? String(err) },
      { status: 500 }
    );
  }
}
