"use client"

import Link from "next/link"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Home, Send } from "lucide-react"

export default function MessagesPage() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      id: 1,
      senderName: "You",
      content: "Hi Linda, I saw your profile and thought we might be a good match.",
      timestamp: "2025-05-31 15:15",
    },
    {
      id: 2,
      senderName: "Linda Rodriguez",
      content: "Hi! Thanks for reaching out — tell me a bit about yourself.",
      timestamp: "2025-05-31 15:17",
    },
  ])

  const handleSend = () => {
    if (message.trim() === "") return
    const newMessage = {
      id: Date.now(),
      senderName: "You",
      content: message,
      timestamp: new Date().toISOString(),
    }
    setMessages([...messages, newMessage])
    setMessage("")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="flex items-center justify-between border-b pb-4 mb-6">
        <Link href="/" className="flex items-center gap-2">
          <Home className="h-6 w-6 text-rose-600" />
          <span className="text-xl font-bold text-gray-900">ShareSpace</span>
        </Link>
        <h1 className="text-xl font-semibold">Messages</h1>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Chat with Linda Rodriguez</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="max-h-96 overflow-y-auto space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className="text-sm">
                <p className="font-semibold">{msg.senderName}</p>
                <p className="text-gray-700">{msg.content}</p>
                <p className="text-xs text-gray-400">{new Date(msg.timestamp).toLocaleString()}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-4 border-t">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSend}>
              <Send className="w-4 h-4 mr-1" />
              Send
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
