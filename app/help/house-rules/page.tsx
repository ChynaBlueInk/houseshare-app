"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HouseRulesPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 max-w-3xl mx-auto">
      <div className="mb-8">
        <Link href="/help" className="text-rose-600 underline text-sm">
          ← Back to Help Centre
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-4">Setting Up House Rules</h1>
      <p className="text-gray-600 text-lg mb-8">
        Creating a harmonious living environment
      </p>

      <article className="prose prose-sm sm:prose lg:prose-lg text-gray-800">
        <p>
          Living with others works best when everyone understands what’s expected — and what’s off-limits. House rules aren’t about being controlling, they’re about keeping things fair and respectful for everyone.
        </p>

        <h2 className="mt-8">1. Talk early and agree together</h2>
        <p>
          Ideally, house rules should be discussed before someone moves in. Sit down and talk about the key topics — and make sure everyone gets a say.
        </p>

        <h2 className="mt-8">2. What to include</h2>
        <ul>
          <li>Shared chores (cleaning, rubbish, dishes)</li>
          <li>Noise expectations (quiet hours, parties)</li>
          <li>Visitors and overnight guests</li>
          <li>Food sharing or separate shelves</li>
          <li>Bill splitting and payment deadlines</li>
          <li>Pets or animal care</li>
        </ul>

        <h2 className="mt-8">3. Keep it flexible but fair</h2>
        <p>
          Life happens — plans change. It’s okay to adjust house rules over time, but make sure changes are discussed as a group. Everyone deserves to feel heard.
        </p>

        <h2 className="mt-8">4. Put it in writing</h2>
        <p>
          Even a short note or shared Google Doc can prevent future confusion. It’s not about being formal — it’s about avoiding awkward misunderstandings later.
        </p>

        <p className="mt-6 italic">
          A little structure goes a long way in keeping your houseshare peaceful and drama-free.
        </p>
      </article>

      <div className="mt-12 text-center">
        <Button variant="outline" asChild>
          <Link href="/help/resources">See Sample Agreements</Link>
        </Button>
      </div>
    </div>
  )
}
