"use client"

import Link from "next/link"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

const topics = [
  {
    title: "Sending great first messages",
    content: `Your first message sets the tone. Be friendly, introduce yourself briefly, and mention something from their profile to show you've read it. Avoid copy-paste intros. Ask a simple question to start a real conversation.`,
  },
  {
    title: "Video chat best practices",
    content: `Before agreeing to live together, it's a good idea to video chat. Choose a quiet, well-lit space. Dress appropriately and be yourself. Use the opportunity to ask about lifestyle habits, routines, and expectations.`,
  },
  {
    title: "Setting up meetings",
    content: `If things go well online, arrange to meet in person — always in a public place. Let a friend know where you're going. Bring any questions you didn’t get to ask earlier and trust your instincts.`,
  },
  {
    title: "Communication etiquette",
    content: `Be respectful. Respond in a timely manner, and if you're no longer interested, it's okay to say so politely. Ghosting is discouraged — just let people know you’re moving on. Kindness goes a long way.`,
  },
]

export default function CommunicationHelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const togglePanel = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 max-w-3xl mx-auto">
      <div className="mb-8">
        <Link href="/help" className="text-rose-600 underline text-sm">
          ← Back to Help Centre
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-6">Communication</h1>
      <p className="text-gray-600 mb-8">
        Tips for messaging and connecting with potential matches
      </p>

      <div className="space-y-4">
        {topics.map((topic, index) => (
          <div key={index} className="border rounded-lg shadow-sm">
            <button
              onClick={() => togglePanel(index)}
              className="w-full text-left px-4 py-3 flex justify-between items-center font-bold text-gray-800 hover:bg-gray-50"
            >
              {topic.title}
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 text-gray-700">
                <p className="text-sm">{topic.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button variant="outline" asChild>
          <Link href="/browse">Browse Profiles</Link>
        </Button>
      </div>
    </div>
  )
}
