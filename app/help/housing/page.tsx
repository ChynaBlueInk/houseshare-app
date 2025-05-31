"use client"

import Link from "next/link"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

const topics = [
  {
    title: "Boarders & NZ Benefit Rules",
    content: `
**Boarders, Benefits, and the Law (NZ)**

If you're renting out a room in your home, it's important to know the difference between a boarder and a tenant — and how it affects your legal obligations and government benefits.

See the link below for more information on boarders and NZ law, including how it affects your benefits and legal rights.

This page is for general guidance only. For personal legal or financial advice, contact Work and Income, IRD, or a community law centre.
`,
  },
  {
    title: "Setting house rules",
    content: `Clear house rules help avoid conflict. Discuss shared chores, bill payments, guest policies, quiet hours, and shared item usage upfront. It's a good idea to write down your agreement, even informally.`,
  },
  {
    title: "Conflict resolution",
    content: `If tensions arise, try to talk things through calmly. Use “I” statements, stay respectful, and aim for solutions. If you're in a flat where multiple people are named on the lease, the Tenancy Tribunal may be able to assist with unresolved issues.`,
  },
]

export default function HousingHelpPage() {
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

      <h1 className="text-3xl font-bold text-gray-900 mb-6">Housing Arrangements</h1>
      <p className="text-gray-600 mb-8">
        Everything about types of housesharing and legal considerations
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
              <div className="prose px-4 pb-4 text-gray-700 max-w-none">
                <p className="text-sm whitespace-pre-line">{topic.content}</p>
                {index === 0 && (
                  <p className="mt-4 text-sm">
                    For more on boarders and NZ law, visit{" "}
                    <Link
                      href="/legal/boarders"
                      className="text-rose-600 underline"
                    >
                      our full Boarders & NZ Law page
                    </Link>
                    .
                  </p>
                )}
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
