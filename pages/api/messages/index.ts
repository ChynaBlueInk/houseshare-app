// pages/api/messages/index.ts
import type { NextApiRequest, NextApiResponse } from "next"
import { dynamoDBClient } from "../../../lib/aws"
import { PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb"
import { v4 as uuidv4 } from "uuid"

export const dynamic = "force-dynamic"

interface Message {
  messageId: string
  sender: string
  recipient: string
  content: string
  timestamp: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const recipient = req.query.recipient as string

    if (!recipient) {
      return res.status(400).json({ error: "Recipient query param required" })
    }

    try {
      const command = new ScanCommand({
        TableName: "Messages",
      })

      const result = await dynamoDBClient.send(command)

      const messages = result.Items?.filter((item: any) =>
        item.recipient?.S === recipient || item.sender?.S === recipient
      ).map((item: any) => ({
        messageId: item.messageID.S!,  // match DynamoDB key name
        sender: item.sender.S!,
        recipient: item.recipient.S!,
        content: item.content.S!,
        timestamp: item.timestamp.S!,
      })) || []

      return res.status(200).json(messages)
    } catch (err: any) {
      console.error("GET /api/messages error:", err)
      return res.status(500).json({ error: "Failed to fetch messages", details: err.message })
    }
  }

  if (req.method === "POST") {
    const { sender, recipient, content } = req.body

    if (!sender || !recipient || !content) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    const newMessage: Message = {
      messageId: uuidv4(),
      sender,
      recipient,
      content,
      timestamp: new Date().toISOString(),
    }

    console.log("Saving message:", newMessage)

    try {
      const command = new PutItemCommand({
        TableName: "Messages",
        Item: {
          messageID: { S: newMessage.messageId }, // FIXED here
          sender: { S: newMessage.sender },
          recipient: { S: newMessage.recipient },
          content: { S: newMessage.content },
          timestamp: { S: newMessage.timestamp },
        },
      })

      const result = await dynamoDBClient.send(command)

      console.log("PutItem result:", result)

      return res.status(201).json(newMessage)
    } catch (err: any) {
      console.error("POST /api/messages error:", err)
      return res.status(500).json({ error: "Failed to send message", details: err.message })
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" })
}
