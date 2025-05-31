"use client"

import Link from "next/link"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

const topics = [
  {
    title: "Houseshare agreements",
    content: `A houseshare agreement helps clarify expectations and protect everyone involved. It should include rent amounts, payment schedules, house rules, how bills are shared, and any notice period for ending the arrangement. You can write your own or use a free sample such as the boarder agreement from Community Law.`,
  },
  {
    title: "Financial planning",
    content: `Before moving in with someone, have an honest conversation about how shared expenses will work. Will you split bills 50/50? Who pays for what? What happens if someone can't pay on time? Budgeting tools and shared expense apps can help avoid future stress.`,
  },
  {
    title: "Legal templates",
    content: `While not all house sharing situations fall under the Residential Tenancies Act, having written agreements is still wise. Free templates for boarder arrangements or flatmate agreements are available from Community Law, Tenancy Services, and other NZ legal sites.`,
  },
  {
    title: "Success stories",
    content: `We’ll soon feature real stories from users who’ve had successful house sharing experiences – what worked, what didn’t, and what they learned. If you'd like to share your own, get in touch via our Contact page.`,
  },
]

export default function ResourcesHelpPage() {
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

      <h1 className="text-3xl font-bold text-gray-900 mb-6">Resources & Guides</h1>
      <p className="text-gray-600 mb-8">
        Helpful resources for successful housesharing
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
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button variant="outline" asChild>
          <Link href="/contact">Share Your Story</Link>
        </Button>
      </div>
    </div>
  )
}
