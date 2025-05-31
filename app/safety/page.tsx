import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Home, Shield, Eye, Lock, AlertTriangle, Phone, CheckCircle } from "lucide-react"

export default function Safety() {
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
          <Shield className="h-16 w-16 text-rose-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Your Safety is Our Priority</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            We've built comprehensive safety measures and guidelines to ensure secure houseshare connections for women
            50+
          </p>
        </div>

        {/* Emergency Alert */}
        <Alert className="mb-8 border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Emergency:</strong> If you ever feel unsafe or threatened, contact local emergency services
            immediately at 111. For non-emergency safety concerns, contact our support team during business hours.
          </AlertDescription>
        </Alert>

        {/* Platform Safety Features */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Lock className="h-6 w-6 text-rose-600" />
              Platform Safety Features
            </CardTitle>
            <CardDescription>
              Built-in protections to keep you safe while connecting with potential housemates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Profile Verification</h4>
                    <p className="text-sm text-gray-600">
                      All profiles undergo verification including email confirmation and optional ID verification
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Secure Messaging</h4>
                    <p className="text-sm text-gray-600">
                      All communications happen through our secure platform - no need to share personal contact info
                      initially
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Privacy Controls</h4>
                    <p className="text-sm text-gray-600">
                      Control who can see your profile and contact you with granular privacy settings
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Report & Block</h4>
                    <p className="text-sm text-gray-600">
                      Easily report suspicious behavior or block users who make you uncomfortable
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">24/7 Monitoring</h4>
                    <p className="text-sm text-gray-600">
                      Our team monitors for suspicious activity and responds quickly to safety concerns
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Background Check Options</h4>
                    <p className="text-sm text-gray-600">
                      Optional background check services available for additional peace of mind
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Meeting Safety Guidelines */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Eye className="h-6 w-6 text-rose-600" />
              Safe Meeting Guidelines
            </CardTitle>
            <CardDescription>Essential safety tips for your first meetings with potential housemates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Before Meeting</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Communicate through the platform messaging system first</li>
                  <li>• Ask for references from previous roommates or landlords</li>
                  <li>• Verify their identity through video calls before meeting in person</li>
                  <li>• Research the neighborhood and property if visiting their home</li>
                  <li>• Trust your instincts - if something feels off, don't proceed</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3">First Meeting</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Meet in a public place like a coffee shop or restaurant</li>
                  <li>• Tell a trusted friend or family member where you're going</li>
                  <li>• Bring a friend if you feel more comfortable</li>
                  <li>• Meet during daylight hours when possible</li>
                  <li>• Drive yourself or use your own transportation</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Home Visits</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Only visit after establishing trust through multiple conversations</li>
                  <li>• Bring a friend or family member with you</li>
                  <li>• Share the address and your expected return time with someone</li>
                  <li>• Check that doors and windows have proper locks</li>
                  <li>• Ask about neighborhood safety and emergency procedures</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Red Flags */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              Red Flags to Watch For
            </CardTitle>
            <CardDescription>
              Warning signs that should make you reconsider a potential houseshare arrangement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-red-600">Communication Red Flags</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Pressures you to meet immediately</li>
                  <li>• Asks for money upfront before meeting</li>
                  <li>• Refuses to video chat or talk on the phone</li>
                  <li>• Provides vague or inconsistent information</li>
                  <li>• Asks for personal financial information</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-red-600">Behavioral Red Flags</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Makes you feel uncomfortable or pressured</li>
                  <li>• Shows signs of substance abuse</li>
                  <li>• Has no references or verifiable history</li>
                  <li>• Seems evasive about their background</li>
                  <li>• Property seems unsafe or poorly maintained</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legal Considerations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Legal Considerations</CardTitle>
            <CardDescription>
              Important legal aspects to consider when entering a houseshare arrangement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Written Agreements</h4>
                <p className="text-gray-600">
                  Always have a written agreement that covers rent, utilities, house rules, and termination conditions.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Tenant Rights</h4>
                <p className="text-gray-600">
                  Understand your rights as a tenant or subtenant in your state and local jurisdiction.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Insurance</h4>
                <p className="text-gray-600">
                  Consider renter's insurance to protect your personal belongings and liability.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Legal Resources</h4>
                <p className="text-gray-600">
                  We provide access to legal resources and templates to help protect your interests.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support Contact */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Phone className="h-6 w-6 text-rose-600" />
              Get Help & Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">24/7 Safety Support</h4>
                <p className="text-gray-600 mb-3">Our safety team is available around the clock for urgent concerns.</p>
                <Button variant="outline" className="w-full">
                  Contact Safety Team
                </Button>
              </div>
              <div>
                <h4 className="font-semibold mb-3">General Support</h4>
                <p className="text-gray-600 mb-3">For questions about the platform, profiles, or general guidance.</p>
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Feel Safe & Confident</h3>
          <p className="text-gray-600 mb-6">
            With our comprehensive safety measures, you can focus on finding the perfect houseshare match
          </p>
          <Button size="lg" className="text-lg px-8 py-6" asChild>
            <Link href="/profile/create">Start Your Safe Journey</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
