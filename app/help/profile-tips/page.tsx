"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ProfileTipsPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 max-w-3xl mx-auto">
      <div className="mb-8">
        <Link href="/help" className="text-rose-600 underline text-sm">
          ← Back to Help Centre
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-4">How to Write an Attractive Profile</h1>
      <p className="text-gray-600 text-lg mb-8">
        Tips for creating a profile that gets responses
      </p>

      <article className="prose prose-sm sm:prose lg:prose-lg text-gray-800">
        <p>
          Your profile is the first thing people see — it’s your chance to stand out and make a great first impression. Whether you’re looking for a housemate, a room to rent, or someone to share a space with, here are some key tips for writing a profile that gets noticed.
        </p>

        <h2 className="mt-8">1. Be clear and honest</h2>
        <p>
          Be upfront about who you are, what you're looking for, and your lifestyle habits. If you're a morning person who loves quiet evenings, say so. The right match starts with honesty.
        </p>

        <h2 className="mt-8">2. Use a friendly tone</h2>
        <p>
          Write like you’re introducing yourself to someone new at a BBQ. Keep it warm and welcoming, and avoid sounding like a job advert. A little personality goes a long way.
        </p>

        <h2 className="mt-8">3. Add a photo</h2>
        <p>
          Profiles with photos are more likely to get replies. Choose a clear, recent picture where you’re smiling or relaxed — it helps others feel like they’re getting to know you.
        </p>

        <h2 className="mt-8">4. Highlight your values</h2>
        <p>
          Mention things like cleanliness, respect for privacy, social habits, or your favourite way to spend a Sunday. These clues help others work out if you’d be a good fit.
        </p>

        <h2 className="mt-8">5. Avoid clichés</h2>
        <p>
          "Easy-going" and "tidy" are good traits, but they’re on almost every profile. Be specific — say how often you clean, how you like to relax, or what makes you a great flatmate.
        </p>

        <h2 className="mt-8">6. Update it if things change</h2>
        <p>
          Found a place or no longer looking? Update your profile or hide it temporarily. It helps keep the platform active and respectful for others.
        </p>
      </article>

      <div className="mt-12 text-center">
        <Button variant="outline" asChild>
          <Link href="/profile/create">Create Your Profile</Link>
        </Button>
      </div>
    </div>
  )
}
