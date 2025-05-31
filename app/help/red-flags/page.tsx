"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function RedFlagsPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 max-w-3xl mx-auto">
      <div className="mb-8">
        <Link href="/help" className="text-rose-600 underline text-sm">
          ← Back to Help Centre
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-4">Recognising Red Flags</h1>
      <p className="text-gray-600 text-lg mb-8">
        Warning signs to watch out for
      </p>

      <article className="prose prose-sm sm:prose lg:prose-lg text-gray-800">
        <p>
          Trust is important in any house sharing situation — and it starts before you even move in. Most people are genuine and respectful, but it’s smart to watch for signs that something might not be right.
        </p>

        <h2 className="mt-8">1. Pushy or rushed behaviour</h2>
        <p>
          If someone pressures you to decide quickly, pay money upfront, or move in without meeting, take a step back. A genuine match will respect your pace.
        </p>

        <h2 className="mt-8">2. Inconsistent or vague information</h2>
        <p>
          If their story changes, or they avoid answering basic questions about rent, rules, or who else lives in the house, trust your instincts and dig deeper.
        </p>

        <h2 className="mt-8">3. Unwillingness to meet or video chat</h2>
        <p>
          Refusing to meet in person or even jump on a video call could be a red flag. You need to feel safe and comfortable before agreeing to anything.
        </p>

        <h2 className="mt-8">4. Overly personal or inappropriate messages</h2>
        <p>
          If someone makes you feel uncomfortable, crosses boundaries, or gets too personal too fast — that’s not okay. You don’t owe anyone a response.
        </p>

        <h2 className="mt-8">5. Something feels off</h2>
        <p>
          Sometimes your gut knows before your brain does. If something doesn’t feel right, listen to that feeling and take a break before continuing.
        </p>

        <p>
          You can always report concerns or block someone if needed. We’re here to support you.
        </p>
      </article>

      <div className="mt-12 text-center">
        <Button variant="outline" asChild>
          <Link href="/contact">Report a Concern</Link>
        </Button>
      </div>
    </div>
  )
}
