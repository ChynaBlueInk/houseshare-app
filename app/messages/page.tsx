// app/messages/page.tsx
"use client";

export const dynamic = "force-dynamic";

import {Suspense, useEffect, useState} from "react";
import Link from "next/link";
import {useSearchParams} from "next/navigation";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Home, Send} from "lucide-react";
import {getIdToken} from "@/lib/auth";

interface Message {
  messageID: string;
  sender: string;
  senderId?: string;
  recipient: string;
  recipientName?: string;
  content: string;
  timestamp: string;
}

interface MeUser {
  userID?: string;
  fullName?: string;
  email?: string;
}

interface MeResponse {
  user?: MeUser;
}

export default function MessagesPage() {
  return (
    <Suspense fallback={<div className="p-4 text-gray-600">Loading messages...</div>}>
      <MessagesWrapper />
    </Suspense>
  );
}

function MessagesWrapper() {
  const searchParams = useSearchParams();
  const recipientId = searchParams?.get("recipient") || "";
  const recipientName = searchParams?.get("recipientName") || "";

  return <MessagesContent recipientId={recipientId} recipientName={recipientName} />;
}

function MessagesContent({recipientId, recipientName}: {recipientId: string; recipientName: string}) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [me, setMe] = useState<MeUser | null>(null);
  const [initialising, setInitialising] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load current user + conversation
  useEffect(() => {
    async function init() {
      try {
        setInitialising(true);
        setError(null);
        setMessages([]);

        if (!recipientId) {
          return;
        }

        const token = getIdToken();
        if (!token) {
          setError("Please sign in to view messages.");
          return;
        }

        // 1) Load current user
        const meRes = await fetch("/api/users/me", {
          headers: {Authorization: `Bearer ${token}`},
          cache: "no-store",
        });
        const meJson: MeResponse = await meRes.json();

        if (!meRes.ok || !meJson.user?.userID) {
          throw new Error((meJson as any)?.error || "Could not load your profile.");
        }

        const currentUser = meJson.user;
        setMe(currentUser);

        // 2) Load full conversation (sent + received)
        const convRes = await fetch(
          `/api/messages?participantA=${encodeURIComponent(
            currentUser.userID as string,
          )}&participantB=${encodeURIComponent(recipientId)}`,
        );
        const convJson = await convRes.json();

        if (!convRes.ok) {
          throw new Error(convJson?.error || "Failed to load messages.");
        }

        if (Array.isArray(convJson)) {
          setMessages(convJson);
        } else {
          setMessages([]);
        }
      } catch (e:any) {
        console.error("Messages init error:", e);
        setError(e?.message || "Something went wrong loading messages.");
      } finally {
        setInitialising(false);
      }
    }

    init();
  }, [recipientId]);

  const handleSend = async () => {
    if (!recipientId || message.trim() === "" || !me?.userID) return;
    setLoading(true);

    try {
      const senderName = me.fullName || me.email || "You";

      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          senderName,
          senderId: me.userID,
          recipient: recipientId,
          recipientName,
          content: message,
        }),
      });

      const newMsg = await res.json();

      if (newMsg && newMsg.messageID) {
        setMessages((prev) => [...prev, newMsg]);
      } else {
        console.error("Invalid new message response:", newMsg);
      }
    } catch (err) {
      console.error("Failed to send message:", err);
    }

    setMessage("");
    setLoading(false);
  };

  const displayName =
    recipientName || (recipientId ? `User ${recipientId.slice(0, 8)}…` : "Unknown recipient");

  if (initialising) {
    return <div className="p-4 text-gray-700">Loading conversation...</div>;
  }

  if (error) {
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
            <CardTitle>Unable to load messages</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 mb-4">{error}</p>
            <Button asChild variant="outline">
              <Link href="/browse">Back to Browse</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
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
          <CardTitle>Chat with {displayName}</CardTitle>
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
              placeholder={recipientId ? "Type a message..." : "Select someone to message first"}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={handleSend}
              disabled={loading || !recipientId || !me?.userID}
            >
              <Send className="w-4 h-4 mr-1" />
              {loading ? "Sending..." : "Send"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
