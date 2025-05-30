import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, UserPlus, Search, MessageCircle, HandHeart, Shield, CheckCircle } from "lucide-react"

export default function HowItWorks() {
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

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">How ShareSpace Works</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Finding your perfect houseshare match is simple with our step-by-step process designed specifically for
            women 50+
          </p>
        </div>

        {/* Main Steps */}
        <div className="space-y-12 mb-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 bg-rose-600 text-white rounded-full flex items-center justify-center text-3xl font-bold flex-shrink-0">
              1
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <UserPlus className="h-6 w-6 text-rose-600" />
                Create Your Detailed Profile
              </h3>
              <p className="text-gray-600 mb-4">
                Tell us about yourself, your living situation, and what you're looking for. Our comprehensive
                questionnaire covers:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Basic information and lifestyle preferences</li>
                <li>Housing status (have space to share or looking for space)</li>
                <li>Budget range and preferred move-in timeline</li>
                <li>Compatibility factors like cleanliness, social level, and daily routines</li>
                <li>Pet preferences, smoking/drinking habits, and guest policies</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 bg-rose-600 text-white rounded-full flex items-center justify-center text-3xl font-bold flex-shrink-0">
              2
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Search className="h-6 w-6 text-rose-600" />
                Browse Compatible Matches
              </h3>
              <p className="text-gray-600 mb-4">
                Our smart matching system shows you profiles that align with your preferences:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Filter by location, budget, and housing status</li>
                <li>See compatibility scores based on lifestyle factors</li>
                <li>Read detailed profiles to understand potential matches</li>
                <li>Save favorites and take notes on interesting profiles</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 bg-rose-600 text-white rounded-full flex items-center justify-center text-3xl font-bold flex-shrink-0">
              3
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <MessageCircle className="h-6 w-6 text-rose-600" />
                Connect & Communicate
              </h3>
              <p className="text-gray-600 mb-4">
                Start conversations with potential matches through our secure messaging system:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Send introductory messages to express interest</li>
                <li>Ask questions about living arrangements and expectations</li>
                <li>Share photos of your space or discuss your needs</li>
                <li>Exchange contact information when you're both comfortable</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 bg-rose-600 text-white rounded-full flex items-center justify-center text-3xl font-bold flex-shrink-0">
              4
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <HandHeart className="h-6 w-6 text-rose-600" />
                Meet & Decide
              </h3>
              <p className="text-gray-600 mb-4">Take the next step with in-person or virtual meetings:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Arrange safe meetups in public places or video calls</li>
                <li>Tour the home and discuss living arrangements</li>
                <li>Talk about household rules, responsibilities, and expectations</li>
                <li>Take time to make an informed decision that feels right</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Safety & Support */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-rose-600" />
              Safety & Support Throughout
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Safety Features</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Profile verification process
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Secure messaging system
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Safety guidelines and tips
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Report and block features
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Ongoing Support</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    24/7 customer support
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Mediation services if needed
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Legal resource guidance
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Community forums and advice
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
          <p className="text-gray-600 mb-6">
            Join hundreds of women who have found their perfect houseshare arrangements
          </p>
          <Button size="lg" className="text-lg px-8 py-6" asChild>
            <Link href="/profile/create">Create Your Profile Today</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
