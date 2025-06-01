// pages/api/messages/index.ts
import type { NextApiRequest, NextApiResponse } from "next"

interface Message {
  id: number
  senderName: string
  recipient: string
  content: string
  timestamp: string
}

// In-memory message store (for mock)
let mockMessages: Message[] = []

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const recipient = req.query.recipient as string
    const messages = recipient
      ? mockMessages.filter(
          (msg) => msg.recipient === recipient || msg.senderName === recipient
        )
      : mockMessages
    return res.status(200).json(messages)
  }

  if (req.method === "POST") {
    const { senderName, content, recipient } = req.body

    const newMessage: Message = {
      id: Date.now(),
      senderName,
      recipient,
      content,
      timestamp: new Date().toISOString(),
    }

    mockMessages.push(newMessage)
    return res.status(201).json(newMessage)
  }

  return res.status(405).json({ message: "Method Not Allowed" })
}
