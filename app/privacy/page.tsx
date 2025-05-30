import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Shield, Eye, Lock, Database } from "lucide-react"

export default function Privacy() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Your privacy and data security are fundamental to everything we do at ShareSpace
          </p>
          <p className="text-sm text-gray-500 mt-4">Last updated: December 2024</p>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle>Our Commitment to Your Privacy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                At ShareSpace, we understand that privacy is especially important when it comes to finding housing and
                connecting with potential housemates. This Privacy Policy explains how we collect, use, protect, and
                share your personal information when you use our platform designed specifically for women 50 and older.
              </p>
              <p>
                We are committed to transparency and giving you control over your personal information. This policy will
                help you understand your privacy rights and how to exercise them.
              </p>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Database className="h-6 w-6 text-rose-600" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Information You Provide</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>
                      <strong>Profile Information:</strong> Name, age, location, bio, photos, housing preferences,
                      lifestyle information
                    </li>
                    <li>
                      <strong>Account Information:</strong> Email address, password, verification documents (if
                      provided)
                    </li>
                    <li>
                      <strong>Communication Data:</strong> Messages sent through our platform, support inquiries
                    </li>
                    <li>
                      <strong>Payment Information:</strong> Billing details for premium services (processed securely by
                      third-party providers)
                    </li>
                    <li>
                      <strong>Preferences:</strong> Search filters, saved profiles, notification settings
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Information We Collect Automatically</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>
                      <strong>Usage Data:</strong> How you interact with our platform, pages visited, features used
                    </li>
                    <li>
                      <strong>Device Information:</strong> IP address, browser type, operating system, device
                      identifiers
                    </li>
                    <li>
                      <strong>Location Data:</strong> General location based on IP address (not precise location
                      tracking)
                    </li>
                    <li>
                      <strong>Cookies and Tracking:</strong> Essential cookies for functionality, analytics cookies
                      (with your consent)
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Your Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Eye className="h-6 w-6 text-rose-600" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Core Platform Services</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Create and maintain your profile</li>
                    <li>Match you with compatible potential housemates</li>
                    <li>Enable secure messaging between users</li>
                    <li>Verify user identities and maintain platform safety</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Communication & Support</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Send important updates about your account or matches</li>
                    <li>Provide customer support and respond to inquiries</li>
                    <li>Send optional notifications about new matches or messages</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Safety & Security</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Monitor for suspicious or inappropriate behavior</li>
                    <li>Investigate reports and enforce community guidelines</li>
                    <li>Prevent fraud and protect against security threats</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Platform Improvement</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Analyze usage patterns to improve our matching algorithm</li>
                    <li>Develop new features based on user needs</li>
                    <li>Conduct research to better serve women 50+ in housing</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Information Sharing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Lock className="h-6 w-6 text-rose-600" />
                How We Share Your Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">With Other Users</h4>
                  <p className="text-gray-600 mb-2">
                    We only share information you choose to include in your public profile:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Profile information you've marked as public</li>
                    <li>Messages you send through our platform</li>
                    <li>Your general location (city/state, not exact address)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">With Service Providers</h4>
                  <p className="text-gray-600 mb-2">
                    We work with trusted third parties who help us operate our platform:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Cloud hosting and data storage providers</li>
                    <li>Payment processors for premium services</li>
                    <li>Email and communication service providers</li>
                    <li>Analytics providers (with anonymized data only)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Legal Requirements</h4>
                  <p className="text-gray-600">We may share information when required by law or to:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Comply with legal processes or government requests</li>
                    <li>Protect the safety of our users or the public</li>
                    <li>Investigate potential violations of our terms</li>
                    <li>Protect our legal rights and property</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Privacy Rights */}
          <Card>
            <CardHeader>
              <CardTitle>Your Privacy Rights and Choices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Access and Control</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>View and edit your profile information at any time</li>
                    <li>Control who can see your profile and contact you</li>
                    <li>Download a copy of your personal data</li>
                    <li>Delete your account and associated data</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Communication Preferences</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Choose which notifications you receive</li>
                    <li>Opt out of marketing communications</li>
                    <li>Set your messaging preferences</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Data Portability and Deletion</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Request a copy of your data in a portable format</li>
                    <li>Request deletion of your personal information</li>
                    <li>Correct inaccurate information in your profile</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card>
            <CardHeader>
              <CardTitle>Data Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                We implement industry-standard security measures to protect your personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Secure data centers with physical and digital access controls</li>
                <li>Employee training on data protection and privacy</li>
                <li>Incident response procedures for potential data breaches</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Retention */}
          <Card>
            <CardHeader>
              <CardTitle>Data Retention</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  We retain your personal information only as long as necessary to provide our services and comply with
                  legal obligations:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>
                    <strong>Active accounts:</strong> Information is retained while your account is active
                  </li>
                  <li>
                    <strong>Deleted accounts:</strong> Most data is deleted within 30 days, some may be retained for
                    legal compliance
                  </li>
                  <li>
                    <strong>Messages:</strong> Retained for the duration of both users' accounts
                  </li>
                  <li>
                    <strong>Support records:</strong> Retained for up to 3 years for quality assurance
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Children's Privacy */}
          <Card>
            <CardHeader>
              <CardTitle>Age Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                ShareSpace is designed exclusively for women aged 50 and older. We do not knowingly collect personal
                information from anyone under 50. If we become aware that we have collected information from someone
                under 50, we will delete that information immediately.
              </p>
            </CardContent>
          </Card>

          {/* International Users */}
          <Card>
            <CardHeader>
              <CardTitle>International Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                ShareSpace is based in the United States. If you are accessing our services from outside the US, please
                be aware that your information may be transferred to, stored, and processed in the United States. We
                ensure appropriate safeguards are in place for international data transfers.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Privacy Policy */}
          <Card>
            <CardHeader>
              <CardTitle>Changes to This Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal
                requirements. When we make changes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>We will notify you via email and through our platform</li>
                <li>We will update the "Last Updated" date at the top of this policy</li>
                <li>For significant changes, we may require your consent to continue using our services</li>
                <li>Previous versions will be archived and available upon request</li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Us About Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                If you have questions about this Privacy Policy or how we handle your personal information, please
                contact us:
              </p>
              <div className="space-y-2 text-gray-600">
                <p>
                  <strong>Email:</strong> privacy@sharespace.com
                </p>
                <p>
                  <strong>Mail:</strong> ShareSpace Privacy Team
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
                  <Link href="/contact">Contact Privacy Team</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
