"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Home, Search, Book, MessageCircle, Shield, Users, FileText, Phone } from "lucide-react"
import { useState } from "react"

export default function HelpCenter() {
  
// const [searchTerm, setSearchTerm] = useState("")
/*
const articles = [
  {
    title: "How to write an attractive profile",
    description: "Tips for creating a profile that gets responses",
    href: "/help/profile-tips",
  },
  // ... more articles
]

const filteredArticles = articles.filter(
  (article) =>
    article.title.toLowerCase().includes(searchTerm) ||
    article.description.toLowerCase().includes(searchTerm)
)
*/



  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Home className="h-8 w-8 text-rose-600" />
            <h1 className="text-2xl font-bold text-gray-900">ShareSpace</h1>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/profile/create">Get Started</Link>
            </Button>
          </div>
        </div>
       
      </header>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Help Center</h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Find answers, get support, and learn everything you need to know about ShareSpace
          </p>
        </div> {/* closes .text-center mb-16 */}
      </div>   {/* closes .container mx-auto */}

          {/* Search Bar */}
 {/* Search Bar — temporarily removed */}
{/* 
<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
<Input
  placeholder="Search for help articles, guides, and FAQs..."
  className="pl-10 py-6 text-lg"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
/>
*/}

      {/* Help Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <Users className="h-8 w-8 text-rose-600 mb-2" />
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>Learn how to create your profile and start connecting</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Creating your profile</li>
                <li>• Profile verification</li>
                <li>• Understanding matching</li>
                <li>• First steps guide</li>
              </ul>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link href="/help/getting-started">Learn More</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <MessageCircle className="h-8 w-8 text-rose-600 mb-2" />
              <CardTitle>Communication</CardTitle>
              <CardDescription>Tips for messaging and connecting with potential matches</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Sending great first messages</li>
                <li>• Video chat best practices</li>
                <li>• Setting up meetings</li>
                <li>• Communication etiquette</li>
              </ul>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link href="/help/communication">Learn More</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <Shield className="h-8 w-8 text-rose-600 mb-2" />
              <CardTitle>Safety & Security</CardTitle>
              <CardDescription>Stay safe while finding your perfect houseshare match</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Meeting safety guidelines</li>
                <li>• Recognizing red flags</li>
                <li>• Reporting concerns</li>
                <li>• Privacy protection</li>
              </ul>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link href="/safety">Learn More</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <Home className="h-8 w-8 text-rose-600 mb-2" />
              <CardTitle>Housing Arrangements</CardTitle>
              <CardDescription>Everything about types of housesharing and legal considerations</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  • <Link href="/legal/boarders" className="underline text-blue-600">Boarders & NZ Benefit Rules</Link>
                </li>
                <li>• Setting house rules</li>
                <li>• Conflict resolution</li>
              </ul>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link href="/help/housing">Learn More</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Removed Account & Billing */}

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <Book className="h-8 w-8 text-rose-600 mb-2" />
              <CardTitle>Resources & Guides</CardTitle>
              <CardDescription>Helpful resources for successful housesharing</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Houseshare agreements</li>
                <li>• Financial planning</li>
                <li>• Legal templates</li>
                <li>• Success stories</li>
              </ul>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link href="/help/resources">Learn More</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
{/* Home Image Section */}
<section className="px-4">
  <div className="container mx-auto max-w-5xl">
    <img
      src="/Help.png"
      alt="Women laughing and enjoying wine together"
      className="rounded-xl shadow-lg w-full object-cover"
    />
  </div>
</section>
        {/* Popular Articles */}
  <Card className="mb-12">
  <CardHeader>
    <CardTitle>Popular Help Articles</CardTitle>
    <CardDescription>Most frequently accessed help topics</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="grid md:grid-cols-2 gap-4">
      <Link href="/help/profile-tips" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
        <h4 className="font-semibold text-gray-900">How to write an attractive profile</h4>
        <p className="text-sm text-gray-600">Tips for creating a profile that gets responses</p>
      </Link>
      <Link href="/help/first-meeting" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
        <h4 className="font-semibold text-gray-900">Preparing for your first meeting</h4>
        <p className="text-sm text-gray-600">What to expect and how to prepare</p>
      </Link>
      <Link href="/help/red-flags" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
        <h4 className="font-semibold text-gray-900">Recognizing red flags</h4>
        <p className="text-sm text-gray-600">Warning signs to watch out for</p>
      </Link>
      <Link href="/help/house-rules" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
        <h4 className="font-semibold text-gray-900">Setting up house rules</h4>
        <p className="text-sm text-gray-600">Creating a harmonious living environment</p>
      </Link>
      <Link href="/help/legal-agreements" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
        <h4 className="font-semibold text-gray-900">Legal agreements and contracts</h4>
        <p className="text-sm text-gray-600">Protecting yourself legally</p>
      </Link>
      <Link href="/help/troubleshooting" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
        <h4 className="font-semibold text-gray-900">Technical troubleshooting</h4>
        <p className="text-sm text-gray-600">Solving common website issues</p>
      </Link>
    </div>
  </CardContent>
</Card>



        {/* Contact Support Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <MessageCircle className="h-6 w-6 text-rose-600" />
                Contact Support
              </CardTitle>
              <CardDescription>Get personalized help from our support team</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Can't find what you're looking for? Our friendly support team is here to help with any questions or
                concerns.
              </p>
              <div className="space-y-3">
                <Button className="w-full" asChild>
                  <Link href="/contact">Send a Message</Link>
                </Button>
                <p className="text-sm text-gray-500 text-center">Typical response time: 2–4 hours</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Phone className="h-6 w-6 text-rose-600" />
                Emergency Support
              </CardTitle>
              <CardDescription>24/7 support for urgent safety concerns</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                For immediate safety concerns or urgent issues that can't wait, our emergency support line is available
                24/7.
              </p>
              <div className="space-y-3">
                <Button variant="outline" className="w-full">
                  Call Emergency Support
                </Button>
                <p className="text-sm text-gray-500 text-center">Available 24/7 for urgent matters</p>
              </div>
            </CardContent>
          </Card>
        </div>

         {/* Quick Links */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/faq">FAQ</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/how-it-works">How It Works</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/community">Community Guidelines</Link>
            </Button>
           </div> {/* closes quick links container */}
        </div> {/* closes mt-12 text-center */}
      </div>
  ); // ✅ closes return
} // ✅ closes function
