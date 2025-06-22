// app/api/messages/route.ts
import { NextResponse } from "next/server"
import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient, QueryCommand, PutCommand } from "@aws-sdk/lib-dynamodb"
import { v4 as uuidv4 } from "uuid"

export const dynamic = "force-dynamic"

const client = new DynamoDBClient({ region: "ap-southeast-2" })
const docClient = DynamoDBDocumentClient.from(client)

const MESSAGES_TABLE = "Messages"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const recipient = searchParams.get("recipient")

    if (!recipient) {
      return NextResponse.json({ error: "Recipient query param required" }, { status: 400 })
    }

    const command = new QueryCommand({
      TableName: MESSAGES_TABLE,
      IndexName: "recipient-index",
      KeyConditionExpression: "recipient = :recipient",
      ExpressionAttributeValues: {
        ":recipient": recipient,
      },
      ScanIndexForward: false, // latest messages first
    })

    const result = await docClient.send(command)

const messages = result.Items?.map((item: any) => ({
      messageId: item.messageID,
      sender: item.sender,
      recipient: item.recipient,
      content: item.content,
      timestamp: item.timestamp,
    })) || []

    return NextResponse.json(messages)
  } catch (err: any) {
    console.error("GET /api/messages error:", err)
    return NextResponse.json({ error: "Failed to fetch messages", details: err.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { sender, recipient, content } = await request.json()

    if (!sender || !recipient || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newMessage = {
      messageID: uuidv4(),
      sender,
      recipient,
      content,
      timestamp: new Date().toISOString(),
    }

    console.log("Saving message:", newMessage)

    const command = new PutCommand({
      TableName: MESSAGES_TABLE,
      Item: newMessage,
    })

    const result = await docClient.send(command)

    console.log("PutCommand result:", result)

    return NextResponse.json(newMessage, { status: 201 })
  } catch (err: any) {
    console.error("POST /api/messages error:", err)
    return NextResponse.json({ error: "Failed to send message", details: err.message }, { status: 500 })
  }
}
