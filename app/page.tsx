import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Users, Shield, Heart } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Home className="h-8 w-8 text-rose-600" />
            <h1 className="text-2xl font-bold text-gray-900">ShareSpace</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/browse" className="text-gray-600 hover:text-rose-600">
              Browse Profiles
            </Link>
            <Link href="/how-it-works" className="text-gray-600 hover:text-rose-600">
              How It Works
            </Link>
            <Link href="/safety" className="text-gray-600 hover:text-rose-600">
              Safety
            </Link>
          </nav>
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

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Find Your Perfect <span className="text-rose-600">Houseshare Match</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Connect with like-minded women 50+ for comfortable, compatible housesharing arrangements. Whether you have a
            home to share or are looking for one, find your ideal living situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link href="/profile/create">Create Your Profile</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
              <Link href="/browse">Browse Profiles</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose ShareSpace?</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center border-2 hover:border-rose-200 transition-colors">
              <CardHeader>
                <Users className="h-12 w-12 text-rose-600 mx-auto mb-4" />
                <CardTitle>Compatibility Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Our detailed questionnaire helps match you with compatible housemates based on lifestyle, habits, and
                  preferences.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-rose-200 transition-colors">
              <CardHeader>
                <Shield className="h-12 w-12 text-rose-600 mx-auto mb-4" />
                <CardTitle>Safe & Secure</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Verified profiles and secure messaging ensure your safety while connecting with potential housemates.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-rose-200 transition-colors">
              <CardHeader>
                <Heart className="h-12 w-12 text-rose-600 mx-auto mb-4" />
                <CardTitle>Community Focused</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Built specifically for women 50+ who value companionship, shared experiences, and mutual support.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-rose-50">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-rose-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h4 className="text-xl font-semibold mb-3">Create Your Profile</h4>
              <p className="text-gray-600">
                Share your housing situation, lifestyle preferences, and what you're looking for in a housemate.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-rose-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h4 className="text-xl font-semibold mb-3">Browse & Connect</h4>
              <p className="text-gray-600">
                Explore compatible profiles and send messages to potential matches that interest you.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-rose-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h4 className="text-xl font-semibold mb-3">Meet & Move In</h4>
              <p className="text-gray-600">
                Arrange meetings, discuss arrangements, and find your perfect housesharing situation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto text-center max-w-3xl">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Ready to Find Your Ideal Houseshare?</h3>
          <p className="text-lg text-gray-600 mb-8">
            Join hundreds of women who have found their perfect living arrangements through ShareSpace.
          </p>
          <Button size="lg" className="text-lg px-8 py-6" asChild>
            <Link href="/profile/create">Start Your Journey Today</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Home className="h-6 w-6 text-rose-400" />
                <span className="text-xl font-bold">ShareSpace</span>
              </div>
              <p className="text-gray-400">Connecting women 50+ for meaningful housesharing experiences.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/browse" className="hover:text-white">
                    Browse Profiles
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="hover:text-white">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/safety" className="hover:text-white">
                    Safety
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-white">
                    Community Guidelines
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ShareSpace. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
