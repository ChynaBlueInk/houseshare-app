"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Home, Send } from "lucide-react"

interface Message {
  id: number
  senderName: string
  content: string
  timestamp: string
}

export default function MessagesPage() {
  const searchParams = useSearchParams()
  const recipient = searchParams?.get("user") || "Unknown User"

  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Simulate fetching messages for this user (from localStorage or mock API)
    fetchMessages(recipient)
  }, [recipient])

  const fetchMessages = async (recipient: string) => {
const res = await fetch(`/api/messages?recipient=${encodeURIComponent(recipient)}`)
    const data = await res.json()

    // Filter messages by who you're talking to
    const conversation = data.filter(
      (msg: Message) => msg.senderName === recipient || msg.senderName === "You"
    )
    setMessages(conversation)
  }

  const handleSend = async () => {
    if (message.trim() === "") return
    setLoading(true)

    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        senderName: "You",
        content: message,
        recipient: recipient,
      }),
    })

    const newMsg = await res.json()
    setMessages((prev) => [...prev, newMsg])
    setMessage("")
    setLoading(false)
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
          <CardTitle>Chat with {recipient}</CardTitle>
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
            <Button onClick={handleSend} disabled={loading}>
              <Send className="w-4 h-4 mr-1" />
              {loading ? "Sending..." : "Send"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
