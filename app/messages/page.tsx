"use client"

export const dynamic = "force-dynamic"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Home, Send } from "lucide-react"

interface Message {
  messageID: string
  sender: string
  recipient: string
  content: string
  timestamp: string
}

export default function MessagesPage() {
  return (
    <Suspense fallback={<div className="p-4 text-gray-600">Loading messages...</div>}>
      <MessagesWrapper />
    </Suspense>
  )
}

function MessagesWrapper() {
  const searchParams = useSearchParams()
  const recipient = searchParams?.get("recipient") || "Unknown Recipient"
  return <MessagesContent recipient={recipient} />
}

function MessagesContent({ recipient }: { recipient: string }) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (recipient !== "Unknown Recipient") {
      fetchMessages(recipient)
    }
  }, [recipient])

  const fetchMessages = async (recipient: string) => {
    try {
      const res = await fetch(`/api/messages?recipient=${encodeURIComponent(recipient)}`)
      const data = await res.json()

      if (Array.isArray(data)) {
        setMessages(data)
      } else {
        console.error("Invalid messages data:", data)
        setMessages([])
      }
    } catch (err) {
      console.error("Failed to fetch messages:", err)
      setMessages([])
    }
  }

  const handleSend = async () => {
    if (message.trim() === "") return
    setLoading(true)

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: "You",
          recipient: recipient,
          content: message,
        }),
      })

      const newMsg = await res.json()

      if (newMsg && newMsg.messageID) {
        setMessages((prev) => [...prev, newMsg])
      } else {
        console.error("Invalid new message response:", newMsg)
      }
    } catch (err) {
      console.error("Failed to send message:", err)
    }

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
            {Array.isArray(messages) && messages.length > 0 ? (
              messages.map((msg) => (
                <div key={msg.messageID || msg.timestamp} className="text-sm">
                  <p className="font-semibold">{msg.sender}</p>
                  <p className="text-gray-700">{msg.content}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(msg.timestamp).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No messages yet.</p>
            )}
          </div>

          <div className="flex items-center gap-2 pt-4 border-t">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSend} disabled={loading || recipient === "Unknown Recipient"}>
              <Send className="w-4 h-4 mr-1" />
              {loading ? "Sending..." : "Send"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
