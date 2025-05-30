import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Users, Heart, Shield, MessageCircle, AlertTriangle } from "lucide-react"

export default function CommunityGuidelines() {
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
          <Users className="h-16 w-16 text-rose-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Community Guidelines</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Creating a safe, respectful, and supportive community for women 50+ seeking houseshare arrangements
          </p>
        </div>

        <div className="space-y-8">
          {/* Our Values */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Heart className="h-6 w-6 text-rose-600" />
                Our Community Values
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                ShareSpace is built on the foundation of mutual respect, safety, and genuine connection. Our community
                values guide every interaction on our platform:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Respect & Dignity</h4>
                  <p className="text-gray-600 text-sm">
                    Every member deserves to be treated with kindness, respect, and dignity, regardless of background,
                    lifestyle, or housing situation.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Authenticity</h4>
                  <p className="text-gray-600 text-sm">
                    We value honest, genuine connections built on truthful representation and open communication.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Safety First</h4>
                  <p className="text-gray-600 text-sm">
                    The safety and security of our community members is our highest priority in all interactions.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Supportive Community</h4>
                  <p className="text-gray-600 text-sm">
                    We foster an environment where women can support each other through life transitions and housing
                    changes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Communication Guidelines */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <MessageCircle className="h-6 w-6 text-rose-600" />
                Communication Guidelines
              </CardTitle>
              <CardDescription>
                How to communicate respectfully and effectively with other community members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Positive Communication</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Use kind, respectful language in all interactions</li>
                    <li>Be patient and understanding with different communication styles</li>
                    <li>Ask thoughtful questions to get to know potential housemates</li>
                    <li>Share information openly and honestly about your situation</li>
                    <li>Respond to messages in a timely manner when possible</li>
                    <li>Express gratitude for others' time and consideration</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Professional Boundaries</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Keep conversations focused on housing and compatibility</li>
                    <li>Respect others' privacy and personal boundaries</li>
                    <li>Avoid overly personal questions in initial conversations</li>
                    <li>Don't pressure others for immediate responses or decisions</li>
                    <li>Maintain appropriate topics of conversation</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Handling Disagreements</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Approach conflicts with empathy and understanding</li>
                    <li>Focus on finding solutions rather than assigning blame</li>
                    <li>Use "I" statements to express your feelings and needs</li>
                    <li>Know when to agree to disagree and move on respectfully</li>
                    <li>Contact support if you need help resolving issues</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Standards */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Standards</CardTitle>
              <CardDescription>Guidelines for creating authentic and appropriate profiles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Profile Information</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Provide accurate and current information about yourself</li>
                    <li>Use recent photos that clearly show your face</li>
                    <li>Be honest about your housing situation and needs</li>
                    <li>Include relevant lifestyle information for compatibility</li>
                    <li>Update your profile when circumstances change</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Photo Guidelines</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Use clear, well-lit photos of yourself</li>
                    <li>Include at least one photo that shows your face clearly</li>
                    <li>Avoid heavily filtered or edited photos</li>
                    <li>Don't include photos of other people without their consent</li>
                    <li>Keep photos appropriate and family-friendly</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Description Best Practices</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Write in a friendly, approachable tone</li>
                    <li>Share your interests and what makes you a good housemate</li>
                    <li>Be specific about your housing preferences and requirements</li>
                    <li>Mention your lifestyle habits that affect shared living</li>
                    <li>Include what you're looking for in a living arrangement</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Safety Guidelines */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-rose-600" />
                Community Safety
              </CardTitle>
              <CardDescription>Keeping our community safe for everyone</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Personal Safety</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Trust your instincts - if something feels wrong, it probably is</li>
                    <li>Meet in public places for initial meetings</li>
                    <li>Tell trusted friends or family about your meetings</li>
                    <li>Take time to get to know someone before making commitments</li>
                    <li>Verify information and ask for references when appropriate</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Information Security</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Don't share personal contact information too quickly</li>
                    <li>Use the platform's messaging system for initial communications</li>
                    <li>Be cautious about sharing financial information</li>
                    <li>Protect your home address until you're comfortable</li>
                    <li>Report suspicious behavior immediately</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Financial Safety</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Never send money to someone you haven't met in person</li>
                    <li>Be wary of requests for upfront payments or deposits</li>
                    <li>Use secure payment methods for legitimate transactions</li>
                    <li>Get written agreements for all financial arrangements</li>
                    <li>Research fair market rates for your area</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prohibited Behavior */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                Prohibited Behavior
              </CardTitle>
              <CardDescription>Behaviors that are not tolerated in our community</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 text-red-600">Harassment & Discrimination</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Harassment, bullying, or intimidation of any kind</li>
                    <li>
                      Discrimination based on race, religion, sexual orientation, or other protected characteristics
                    </li>
                    <li>Unwanted romantic or sexual advances</li>
                    <li>Persistent contact after someone has asked you to stop</li>
                    <li>Threatening or abusive language</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-red-600">Fraudulent Activity</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Creating fake profiles or impersonating others</li>
                    <li>Providing false information about housing or personal details</li>
                    <li>Scamming or attempting to defraud other users</li>
                    <li>Using the platform for commercial purposes without authorization</li>
                    <li>Posting fake housing opportunities</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-red-600">Inappropriate Content</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Sexually explicit or inappropriate content</li>
                    <li>Hate speech or offensive language</li>
                    <li>Spam or repetitive messaging</li>
                    <li>Content that promotes illegal activities</li>
                    <li>Sharing personal information of others without consent</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reporting and Enforcement */}
          <Card>
            <CardHeader>
              <CardTitle>Reporting and Enforcement</CardTitle>
              <CardDescription>How we handle violations and maintain community standards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">How to Report</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Use the "Report" button on profiles or messages</li>
                    <li>Contact our support team directly for serious concerns</li>
                    <li>Provide specific details about the incident</li>
                    <li>Include screenshots or evidence when possible</li>
                    <li>Report immediately for safety concerns</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Our Response Process</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>All reports are reviewed promptly by our safety team</li>
                    <li>We investigate thoroughly and fairly</li>
                    <li>Appropriate action is taken based on severity</li>
                    <li>We may contact you for additional information</li>
                    <li>Serious violations may result in immediate account suspension</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Consequences</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Warning for minor violations</li>
                    <li>Temporary suspension for repeated violations</li>
                    <li>Permanent ban for serious violations</li>
                    <li>Legal action for criminal behavior</li>
                    <li>Cooperation with law enforcement when necessary</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Building Positive Community */}
          <Card>
            <CardHeader>
              <CardTitle>Building a Positive Community</CardTitle>
              <CardDescription>
                How you can contribute to making ShareSpace a welcoming place for everyone
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3">Be a Good Community Member</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Welcome new members and help them feel included</li>
                    <li>Share your positive experiences and success stories</li>
                    <li>Offer support and encouragement to others</li>
                    <li>Provide helpful feedback and suggestions</li>
                    <li>Lead by example in all your interactions</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Help Us Improve</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Provide feedback on platform features and functionality</li>
                    <li>Suggest improvements to community guidelines</li>
                    <li>Report bugs or technical issues</li>
                    <li>Share ideas for new features or services</li>
                    <li>Participate in community surveys and research</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact and Support */}
          <Card>
            <CardHeader>
              <CardTitle>Questions or Concerns?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                If you have questions about these community guidelines or need to report a concern, we're here to help.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <Button className="w-full" asChild>
                  <Link href="/contact">Contact Support</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/safety">Safety Resources</Link>
                </Button>
              </div>

              <p className="text-sm text-gray-500 text-center mt-4">
                For urgent safety concerns, contact our 24/7 emergency support line
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
