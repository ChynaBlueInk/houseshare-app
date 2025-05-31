"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TroubleshootingPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 max-w-3xl mx-auto">
      <div className="mb-8">
        <Link href="/help" className="text-rose-600 underline text-sm">
          ← Back to Help Centre
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-4">Technical Troubleshooting</h1>
      <p className="text-gray-600 text-lg mb-8">
        Solving common website issues
      </p>

      <article className="prose prose-sm sm:prose lg:prose-lg text-gray-800">
        <p>
          Having trouble with the ShareSpace site? Below are some common issues and easy ways to fix them. If you’re still stuck, don’t worry — help is available.
        </p>

        <h2 className="mt-8">1. Trouble logging in</h2>
        <p>
          Double-check that your email and password are correct. If you’ve forgotten your password, use the “Forgot password” link on the login page. Still stuck? Try clearing your browser cache and refreshing the page.
        </p>

        <h2 className="mt-8">2. Page not loading or giving 404 error</h2>
        <p>
          Sometimes we update pages and links move. Try navigating from the homepage again or checking the Help Centre for an updated link. If you get repeated 404 errors, please report it to us.
        </p>

        <h2 className="mt-8">3. Profile not saving properly</h2>
        <p>
          Make sure all required fields are filled in (especially region and contact details). If the form still won’t save, try using a different browser or device to see if the issue persists.
        </p>

        <h2 className="mt-8">4. Buttons not responding</h2>
        <p>
          This is often a browser issue. Refresh the page or try using Chrome or Firefox. Avoid using browser plugins that block scripts or tracking unless necessary, as they can affect site performance.
        </p>

        <p className="mt-6">
          Still not working? Our support team can help.
        </p>
      </article>

      <div className="mt-12 text-center">
        <Button variant="outline" asChild>
          <Link href="/contact">Contact Support</Link>
        </Button>
      </div>
    </div>
  )
}
