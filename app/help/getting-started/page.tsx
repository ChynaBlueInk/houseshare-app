"use client"

import Link from "next/link"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

const topics = [
  {
    title: "Creating your profile",
    content: `Start by visiting the Get Started page. You’ll be asked to enter basic information such as your name, region, and preferences. Make sure your profile is clear and honest, and upload a photo if possible – profiles with photos receive more attention.`,
  },
  {
    title: "Profile verification",
    content: `To keep the community safe and authentic, you may be asked to verify your email address. In future, we may also enable ID verification for added trust. We will never share your ID – it’s only to confirm your legitimacy.`,
  },
  {
    title: "Understanding matching",
    content: `Matching is based on region, preferences, and lifestyle tags. You’ll be able to browse profiles, but we recommend reaching out only if you share similar expectations – like smoking rules, pets, or working hours.`,
  },
  {
    title: "First steps guide",
    content: `Once your profile is live, start browsing and shortlisting people you’d like to contact. Use the messaging system to introduce yourself and suggest a video call or meeting in a public place before deciding on a match.`,
  },
]

export default function GettingStartedPage() {
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

      <h1 className="text-3xl font-bold text-gray-900 mb-6">Getting Started</h1>
      <p className="text-gray-600 mb-8">
        Learn how to create your profile and start connecting with potential housemates.
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
          <Link href="/profile/create">Create Your Profile</Link>
        </Button>
      </div>
    </div>
  )
}
