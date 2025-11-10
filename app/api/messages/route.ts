// app/api/messages/route.ts
import {NextResponse} from "next/server";
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {DynamoDBDocumentClient, QueryCommand, PutCommand, ScanCommand, DeleteCommand} from "@aws-sdk/lib-dynamodb";
import {v4 as uuidv4} from "uuid";

export const dynamic = "force-dynamic";

const client = new DynamoDBClient({region: "ap-southeast-2"});
const docClient = DynamoDBDocumentClient.from(client);

const MESSAGES_TABLE = "Messages";

export async function GET(request: Request) {
  try {
    const {searchParams} = new URL(request.url);

    const participantA = searchParams.get("participantA");
    const participantB = searchParams.get("participantB");
    const forUser = searchParams.get("forUser");
    const recipient = searchParams.get("recipient");

    // ✅ Conversation between two users (both sent + received)
    if (participantA && participantB) {
      const command = new ScanCommand({
        TableName: MESSAGES_TABLE,
        FilterExpression:
          "(senderId = :a AND recipient = :b) OR (senderId = :b AND recipient = :a)",
        ExpressionAttributeValues: {
          ":a": participantA,
          ":b": participantB,
        },
      });

      const result = await docClient.send(command);

      const messages =
        result.Items?.map((item:any) => ({
          messageID: item.messageID,
          sender: item.sender,
          senderId: item.senderId,
          recipient: item.recipient,
          recipientName: item.recipientName,
          content: item.content,
          timestamp: item.timestamp,
        })) || [];

      // sort oldest → newest for chat view
      messages.sort((a,b) => (a.timestamp || "").localeCompare(b.timestamp || ""));

      return NextResponse.json(messages);
    }

    // ✅ All messages for a user (sent + received) – for inbox
    if (forUser) {
      const command = new ScanCommand({
        TableName: MESSAGES_TABLE,
        FilterExpression: "senderId = :u OR recipient = :u",
        ExpressionAttributeValues: {
          ":u": forUser,
        },
      });

      const result = await docClient.send(command);

      const messages =
        result.Items?.map((item:any) => ({
          messageID: item.messageID,
          sender: item.sender,
          senderId: item.senderId,
          recipient: item.recipient,
          recipientName: item.recipientName,
          content: item.content,
          timestamp: item.timestamp,
        })) || [];

      // sort newest → oldest for inbox
      messages.sort((a,b) => (b.timestamp || "").localeCompare(a.timestamp || ""));

      return NextResponse.json(messages);
    }

    // ✅ Legacy: messages by recipient only (kept for backwards compatibility)
    if (recipient) {
      const command = new QueryCommand({
        TableName: MESSAGES_TABLE,
        IndexName: "recipient-index",
        KeyConditionExpression: "recipient = :recipient",
        ExpressionAttributeValues: {
          ":recipient": recipient,
        },
        ScanIndexForward: false,
      });

      const result = await docClient.send(command);

      const messages =
        result.Items?.map((item:any) => ({
          messageID: item.messageID,
          sender: item.sender,
          senderId: item.senderId,
          recipient: item.recipient,
          recipientName: item.recipientName,
          content: item.content,
          timestamp: item.timestamp,
        })) || [];

      return NextResponse.json(messages);
    }

    return NextResponse.json({error: "Missing query parameters"}, {status: 400});
  } catch (err:any) {
    console.error("GET /api/messages error:", err);
    return NextResponse.json(
      {error: "Failed to fetch messages", details: err.message},
      {status: 500},
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Accept both old and new shapes
    const senderName = body.senderName || body.sender || "Unknown sender";
    const senderId = body.senderId || null;
    const recipientId = body.recipientId || body.recipient;
    const recipientName = body.recipientName || null;
    const content = body.content;

    if (!recipientId || !content) {
      return NextResponse.json({error: "Missing required fields"}, {status: 400});
    }

    const newMessage = {
      messageID: uuidv4(),
      sender: senderName,
      senderId: senderId,
      recipient: recipientId,      // keep this for existing recipient-index
      recipientName: recipientName,
      content,
      timestamp: new Date().toISOString(),
    };

    console.log("Saving message:", newMessage);

    const command = new PutCommand({
      TableName: MESSAGES_TABLE,
      Item: newMessage,
    });

    const result = await docClient.send(command);

    console.log("PutCommand result:", result);

    return NextResponse.json(newMessage, {status: 201});
  } catch (err:any) {
    console.error("POST /api/messages error:", err);
    return NextResponse.json(
      {error: "Failed to send message", details: err.message},
      {status: 500},
    );
  }
}

// 🔥 Delete a single message by ID (for inbox delete)
export async function DELETE(request: Request) {
  try {
    const {searchParams} = new URL(request.url);
    const messageID = searchParams.get("messageID");

    if (!messageID) {
      return NextResponse.json({error: "messageID query param required"}, {status: 400});
    }

    const command = new DeleteCommand({
      TableName: MESSAGES_TABLE,
      Key: {messageID},
    });

    const result = await docClient.send(command);
    console.log("DeleteCommand result:", result);

    return NextResponse.json({ok: true});
  } catch (err:any) {
    console.error("DELETE /api/messages error:", err);
    return NextResponse.json(
      {error: "Failed to delete message", details: err.message},
      {status: 500},
    );
  }
}
