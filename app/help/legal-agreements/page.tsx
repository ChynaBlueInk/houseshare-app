"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LegalAgreementsPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 max-w-3xl mx-auto">
      <div className="mb-8">
        <Link href="/help" className="text-rose-600 underline text-sm">
          ← Back to Help Centre
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-4">Legal Agreements and Contracts</h1>
      <p className="text-gray-600 text-lg mb-8">
        Protecting yourself legally
      </p>

      <article className="prose prose-sm sm:prose lg:prose-lg text-gray-800">
        <p>
          Even if you're just renting out a room or sharing a house with friends, having a written agreement is one of the smartest ways to protect everyone involved. It doesn't need to be overly formal, but it should clearly lay out the expectations on both sides.
        </p>

        <h2 className="mt-8">Why written agreements matter</h2>
        <p>
          Verbal agreements often lead to misunderstandings. A simple written contract helps avoid disputes by confirming what was agreed — things like rent amount, payment frequency, bills, chores, and how to end the arrangement.
        </p>

        <h2 className="mt-8">Are flatmates or boarders covered by tenancy law?</h2>
        <p>
          Not always. If the owner also lives on the property and you're just renting a room, you're usually considered a boarder and may not be covered by the Residential Tenancies Act 1986. If you're all on the lease, tenancy law may apply. It depends on the situation.
        </p>

        <h2 className="mt-8">Where to find templates</h2>
        <p>
          Free templates are available from:
        </p>
        <ul>
          <li><a href="https://communitylaw.org.nz" target="_blank" rel="noopener noreferrer">Community Law NZ</a> – Boarder and flatmate agreement templates</li>
          <li><a href="https://www.tenancy.govt.nz" target="_blank" rel="noopener noreferrer">Tenancy Services</a> – Residential tenancy templates</li>
        </ul>

        <h2 className="mt-8">If things go wrong</h2>
        <p>
          If you're in a situation where tenancy law applies, you may be able to apply to the Tenancy Tribunal. If not, mediation or simply having something in writing can help guide resolution.
        </p>

        <p className="mt-6 italic">
          This page is for general guidance. For legal advice, contact a community law centre or tenancy advocacy service.
        </p>
      </article>

      <div className="mt-12 text-center">
        <Button variant="outline" asChild>
          <Link href="https://communitylaw.org.nz" target="_blank" rel="noopener noreferrer">
            Visit Community Law
          </Link>
        </Button>
      </div>
    </div>
  )
}
