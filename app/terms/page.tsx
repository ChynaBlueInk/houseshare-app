import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, FileText, Scale, AlertTriangle } from "lucide-react"

export default function Terms() {
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
          <FileText className="h-16 w-16 text-rose-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Terms of Service</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Please read these terms carefully before using ShareSpace
          </p>
          <p className="text-sm text-gray-500 mt-4">Last updated: December 2024</p>
        </div>

        <div className="space-y-8">
          {/* Acceptance */}
          <Card>
            <CardHeader>
              <CardTitle>Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                By accessing or using ShareSpace, you agree to be bound by these Terms of Service and our Privacy
                Policy. If you do not agree to these terms, please do not use our platform.
              </p>
              <p className="text-gray-600">
                These terms constitute a legally binding agreement between you and ShareSpace Inc. We may modify these
                terms at any time, and your continued use of the platform constitutes acceptance of any changes.
              </p>
            </CardContent>
          </Card>

          {/* Eligibility */}
          <Card>
            <CardHeader>
              <CardTitle>Eligibility</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                ShareSpace is exclusively designed for women aged 50 and older. To use our platform, you must:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Be a woman aged 50 or older</li>
                <li>Provide accurate and truthful information</li>
                <li>Have the legal capacity to enter into this agreement</li>
                <li>Not be prohibited from using our services under applicable law</li>
                <li>Comply with all local, state, and federal laws</li>
              </ul>
            </CardContent>
          </Card>

          {/* Account Responsibilities */}
          <Card>
            <CardHeader>
              <CardTitle>Account Responsibilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Account Security</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                    <li>You must notify us immediately of any unauthorized use of your account</li>
                    <li>You are liable for all activities that occur under your account</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Profile Information</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>All information in your profile must be accurate and current</li>
                    <li>You must update your profile when information changes</li>
                    <li>You may not impersonate another person or create false identities</li>
                    <li>Profile photos must be recent and clearly show your face</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Acceptable Use */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Scale className="h-6 w-6 text-rose-600" />
                Acceptable Use Policy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Permitted Uses</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Creating an authentic profile to find housing arrangements</li>
                    <li>Communicating respectfully with other users</li>
                    <li>Sharing accurate information about housing opportunities</li>
                    <li>Using the platform for its intended purpose of housesharing</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Prohibited Activities</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Harassment, discrimination, or abusive behavior toward other users</li>
                    <li>Posting false, misleading, or fraudulent information</li>
                    <li>Using the platform for commercial purposes without authorization</li>
                    <li>Attempting to circumvent security measures or access restrictions</li>
                    <li>Sharing contact information of other users without permission</li>
                    <li>Soliciting money or financial information from other users</li>
                    <li>Posting content that violates intellectual property rights</li>
                    <li>Using automated systems or bots to access the platform</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Safety and Conduct */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-rose-600" />
                Safety and Conduct
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Your safety is our priority. All users must adhere to our community guidelines:
                </p>

                <div>
                  <h4 className="font-semibold mb-2">Communication Standards</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Treat all users with respect and courtesy</li>
                    <li>Use appropriate language in all communications</li>
                    <li>Respect others' boundaries and preferences</li>
                    <li>Report inappropriate behavior immediately</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Meeting Safety</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Always meet in public places for initial meetings</li>
                    <li>Inform trusted contacts about your meetings</li>
                    <li>Trust your instincts and prioritize your safety</li>
                    <li>Follow our safety guidelines at all times</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Platform Services */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  ShareSpace provides a platform to connect women 50+ for housesharing arrangements. Our services
                  include:
                </p>

                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Profile creation and matching services</li>
                  <li>Secure messaging system</li>
                  <li>Safety features and user verification</li>
                  <li>Customer support and assistance</li>
                  <li>Educational resources and safety guidelines</li>
                </ul>

                <p className="text-gray-600 font-semibold">
                  Important: ShareSpace is a platform service only. We do not:
                </p>

                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Guarantee the accuracy of user-provided information</li>
                  <li>Conduct background checks unless specifically requested</li>
                  <li>Act as a landlord, tenant, or housing provider</li>
                  <li>Mediate disputes between users (though we offer resources)</li>
                  <li>Provide legal, financial, or housing advice</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card>
            <CardHeader>
              <CardTitle>Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">ShareSpace Content</h4>
                  <p className="text-gray-600">
                    All content on the ShareSpace platform, including text, graphics, logos, software, and design
                    elements, is owned by ShareSpace Inc. and protected by intellectual property laws.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">User Content</h4>
                  <p className="text-gray-600 mb-2">
                    You retain ownership of content you post, but grant ShareSpace a license to use it for platform
                    operations:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Display your profile to other users</li>
                    <li>Improve our matching algorithms</li>
                    <li>Provide customer support</li>
                    <li>Ensure platform safety and security</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimers */}
          <Card>
            <CardHeader>
              <CardTitle>Disclaimers and Limitations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Service Availability</h4>
                  <p className="text-gray-600">
                    We strive to maintain platform availability but cannot guarantee uninterrupted service. We may
                    suspend or modify services for maintenance, updates, or other operational reasons.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">User Interactions</h4>
                  <p className="text-gray-600">
                    ShareSpace is not responsible for the actions, conduct, or content of users. You interact with other
                    users at your own risk and should exercise appropriate caution.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Third-Party Services</h4>
                  <p className="text-gray-600">
                    Our platform may integrate with third-party services. We are not responsible for the availability,
                    accuracy, or content of these external services.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card>
            <CardHeader>
              <CardTitle>Account Termination</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Your Right to Terminate</h4>
                  <p className="text-gray-600">
                    You may delete your account at any time through your account settings or by contacting our support
                    team.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Our Right to Terminate</h4>
                  <p className="text-gray-600 mb-2">We may suspend or terminate your account if you:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Violate these Terms of Service</li>
                    <li>Engage in prohibited activities</li>
                    <li>Provide false or misleading information</li>
                    <li>Pose a safety risk to other users</li>
                    <li>Fail to pay for premium services</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Effect of Termination</h4>
                  <p className="text-gray-600">
                    Upon termination, your access to the platform will cease, and your profile will be removed. Some
                    information may be retained as required by law or for legitimate business purposes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Governing Law */}
          <Card>
            <CardHeader>
              <CardTitle>Governing Law and Disputes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  These Terms of Service are governed by the laws of the State of California, without regard to conflict
                  of law principles.
                </p>

                <div>
                  <h4 className="font-semibold mb-2">Dispute Resolution</h4>
                  <p className="text-gray-600 mb-2">
                    We encourage resolving disputes through direct communication. If that's not possible:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Contact our support team for mediation assistance</li>
                    <li>Consider alternative dispute resolution methods</li>
                    <li>Legal disputes will be resolved in California state or federal courts</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-gray-600">
                <p>
                  <strong>Email:</strong> legal@sharespace.com
                </p>
                <p>
                  <strong>Mail:</strong> ShareSpace Legal Team
                  <br />
                  123 Community Lane
                  <br />
                  San Francisco, CA 94102
                </p>
                <p>
                  <strong>Phone:</strong> 1-800-SHARE-50
                </p>
              </div>
              <div className="mt-6">
                <Button asChild>
                  <Link href="/contact">Contact Legal Team</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
