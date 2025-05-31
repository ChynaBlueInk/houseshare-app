"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function FirstMeetingPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 max-w-3xl mx-auto">
      <div className="mb-8">
        <Link href="/help" className="text-rose-600 underline text-sm">
          ← Back to Help Centre
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-4">Preparing for Your First Meeting</h1>
      <p className="text-gray-600 text-lg mb-8">
        What to expect and how to prepare
      </p>

      <article className="prose prose-sm sm:prose lg:prose-lg text-gray-800">
        <p>
          Meeting a potential flatmate or boarder for the first time can feel a bit awkward — but it’s an important step in making sure you're a good match. Here's how to prepare and stay safe while getting the most out of your first catch-up.
        </p>

        <h2 className="mt-8">1. Choose a public place</h2>
        <p>
          If you're meeting in person, pick a well-lit public spot like a café or park. Let someone you trust know where you're going and who you're meeting.
        </p>

        <h2 className="mt-8">2. Video chat first</h2>
        <p>
          Not ready to meet in person? Set up a video call. It’s a great way to get a feel for the other person and ask key questions before investing more time.
        </p>

        <h2 className="mt-8">3. Prepare some questions</h2>
        <p>
          Ask about routines, cleanliness, work schedules, shared bills, and guest policies. You’ll learn a lot from how openly and respectfully someone answers.
        </p>

        <h2 className="mt-8">4. Watch for red flags</h2>
        <p>
          Be wary of anyone who avoids your questions, rushes the process, or acts in a way that makes you feel uneasy. You’re under no obligation to move forward.
        </p>

        <h2 className="mt-8">5. Trust your gut</h2>
        <p>
          This is your home — and your wellbeing. If something doesn’t feel quite right, it’s okay to politely decline and keep looking.
        </p>

        <p className="mt-6">
          After the meeting, take some time to reflect. You don’t need to decide on the spot. A good houseshare is built on mutual respect and open communication.
        </p>
      </article>

      <div className="mt-12 text-center">
        <Button variant="outline" asChild>
          <Link href="/help/red-flags">Check Red Flag Warnings</Link>
        </Button>
      </div>
    </div>
  )
}
