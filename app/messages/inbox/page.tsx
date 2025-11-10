// app/messages/inbox/page.tsx
"use client";

export const dynamic = "force-dynamic";

import {useEffect, useState} from "react";
import Link from "next/link";
import {useAuthRedirect} from "@/lib/useAuthRedirect";
import {getIdToken} from "@/lib/auth";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

type MeUser = {
  userID?: string;
  fullName?: string;
  email?: string;
};

type MeResponse = {
  user?: MeUser;
};

type Message = {
  messageID: string;
  sender: string;
  senderId?: string;
  recipient: string;
  recipientName?: string;
  content: string;
  timestamp: string;
};

export default function MessagesInboxPage() {
  const authLoading = useAuthRedirect();

  const [me, setMe] = useState<MeUser | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const token = getIdToken();
        if (!token) {
          setError("Please sign in to view your messages.");
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

        // 2) Load all messages involving this user (sent + received)
        const msgsRes = await fetch(
          `/api/messages?forUser=${encodeURIComponent(currentUser.userID as string)}`,
        );
        const msgsJson = await msgsRes.json();

        if (!msgsRes.ok) {
          throw new Error(msgsJson?.error || "Failed to load messages.");
        }

        if (Array.isArray(msgsJson)) {
          setMessages(msgsJson);
        } else {
          setMessages([]);
        }
      } catch (e:any) {
        console.error("Inbox load error:", e);
        setError(e?.message || "Something went wrong loading your messages.");
        setMessages([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [authLoading]);

  const handleDelete = async (messageID: string) => {
    try {
      setDeletingId(messageID);
      const res = await fetch(`/api/messages?messageID=${encodeURIComponent(messageID)}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok || !data?.ok) {
        console.error("Failed to delete message:", data);
        return;
      }

      setMessages((prev) => prev.filter((m) => m.messageID !== messageID));
    } catch (err) {
      console.error("Failed to delete message:", err);
    } finally {
      setDeletingId(null);
    }
  };

  if (authLoading || loading) {
    return <div className="p-4 text-gray-700">Loading your messages...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Card className="border-destructive/40">
            <CardHeader>
              <CardTitle className="text-destructive">Unable to load your inbox</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 mb-4">{error}</p>
              <Button asChild variant="outline">
                <Link href="/browse">Back to Browse</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const myId = me?.userID;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Your Messages</h1>
          <Button asChild>
            <Link href="/browse">Back to Browse</Link>
          </Button>
        </div>

        {me && (
          <p className="text-sm text-gray-600">
            Signed in as{" "}
            <span className="font-semibold">
              {me.fullName || me.email || me.userID || "Unknown user"}
            </span>
          </p>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Inbox (sent & received)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {messages.length === 0 ? (
              <p className="text-sm text-gray-500">You don’t have any messages yet.</p>
            ) : (
              messages.map((msg) => {
                const isMine = myId && msg.senderId === myId;
                const directionLabel = isMine
                  ? `To: ${msg.recipientName || msg.recipient || "Unknown"}`
                  : `From: ${msg.sender || "Unknown sender"}`;

                return (
                  <div
                    key={msg.messageID || msg.timestamp}
                    className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0 flex items-start justify-between gap-3"
                  >
                    <div>
                      <p className="text-sm font-semibold">{directionLabel}</p>
                      <p className="text-sm text-gray-800">{msg.content}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(msg.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(msg.messageID)}
                      disabled={deletingId === msg.messageID}
                    >
                      {deletingId === msg.messageID ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
