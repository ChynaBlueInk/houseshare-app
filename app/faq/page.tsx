import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Home, HelpCircle } from "lucide-react"

export default function FAQ() {
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
          <HelpCircle className="h-16 w-16 text-rose-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Find answers to common questions about ShareSpace and housesharing for women 50+
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-8">
          {/* Getting Started */}
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>Questions about creating your profile and using ShareSpace</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I create a profile on ShareSpace?</AccordionTrigger>
                  <AccordionContent>
                    Creating a profile is simple! Click "Get Started" and follow our 4-step process. You'll provide
                    basic information, housing details, lifestyle preferences, and compatibility questions. The entire
                    process takes about 10-15 minutes and helps us match you with compatible housemates.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is ShareSpace really only for women 50 and older?</AccordionTrigger>
                  <AccordionContent>
                    Yes, ShareSpace is exclusively designed for women aged 50 and above. We believe this focused
                    approach creates a more comfortable and relevant experience, addressing the unique needs and
                    preferences of women in this life stage.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>How much does it cost to use ShareSpace?</AccordionTrigger>
                  <AccordionContent>
                    Creating a profile and browsing other profiles is completely free. We offer premium features for
                    enhanced matching and communication tools. Our goal is to make housesharing accessible to everyone,
                    regardless of budget.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>How do I verify my profile?</AccordionTrigger>
                  <AccordionContent>
                    Profile verification includes email confirmation and optional ID verification. Verified profiles get
                    a special badge and are more likely to receive responses. We also offer optional background checks
                    for additional peace of mind.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Matching & Communication */}
          <Card>
            <CardHeader>
              <CardTitle>Matching & Communication</CardTitle>
              <CardDescription>How our matching system works and connecting with others</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-5">
                  <AccordionTrigger>How does the matching system work?</AccordionTrigger>
                  <AccordionContent>
                    Our matching system considers multiple factors including location, budget, housing status, lifestyle
                    preferences, and compatibility answers. You can browse all profiles or use filters to find the most
                    compatible matches based on your specific criteria.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>How do I contact someone I'm interested in?</AccordionTrigger>
                  <AccordionContent>
                    Use our secure messaging system to send an introductory message. We recommend being genuine,
                    mentioning specific things from their profile that interest you, and asking thoughtful questions
                    about their living situation or preferences.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-7">
                  <AccordionTrigger>What if someone doesn't respond to my message?</AccordionTrigger>
                  <AccordionContent>
                    Not everyone will be a match, and that's okay! People may not respond for various reasons - they
                    might have found a match, be taking a break, or simply not feel it's a good fit. Don't take it
                    personally and continue reaching out to other compatible profiles.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-8">
                  <AccordionTrigger>Can I save profiles I'm interested in?</AccordionTrigger>
                  <AccordionContent>
                    Yes! You can save profiles to your favorites list and add private notes to help you remember
                    important details about each person. This makes it easier to keep track of potential matches as you
                    browse.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Safety & Security */}
          <Card>
            <CardHeader>
              <CardTitle>Safety & Security</CardTitle>
              <CardDescription>Staying safe while using ShareSpace and meeting potential housemates</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-9">
                  <AccordionTrigger>How do you ensure user safety?</AccordionTrigger>
                  <AccordionContent>
                    We have multiple safety measures including profile verification, secure messaging, 24/7 monitoring,
                    and easy reporting tools. We also provide comprehensive safety guidelines and support. However, we
                    always recommend using your best judgment and following our safety tips when meeting new people.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-10">
                  <AccordionTrigger>What should I do if someone makes me uncomfortable?</AccordionTrigger>
                  <AccordionContent>
                    Trust your instincts! You can block users, report inappropriate behavior, or contact our safety team
                    24/7. We take all reports seriously and will investigate promptly. Your safety and comfort are our
                    top priorities.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-11">
                  <AccordionTrigger>Is my personal information secure?</AccordionTrigger>
                  <AccordionContent>
                    Yes, we use industry-standard encryption and security measures to protect your data. We never share
                    your personal information with third parties without your consent, and you control what information
                    is visible on your profile.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Housing Arrangements */}
          <Card>
            <CardHeader>
              <CardTitle>Housing Arrangements</CardTitle>
              <CardDescription>Questions about different types of housesharing arrangements</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-12">
                  <AccordionTrigger>What types of housing arrangements are available?</AccordionTrigger>
                  <AccordionContent>
                    ShareSpace supports various arrangements: homeowners with extra space, renters looking for
                    roommates, people seeking rooms to rent, and those interested in co-housing or shared living
                    communities. You can specify your situation and preferences in your profile.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-13">
                  <AccordionTrigger>Do I need a lease or written agreement?</AccordionTrigger>
                  <AccordionContent>
                    We strongly recommend having a written agreement that covers rent, utilities, house rules, guest
                    policies, and termination conditions. This protects both parties and helps prevent
                    misunderstandings. We provide templates and legal resources to help you create appropriate
                    agreements.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-14">
                  <AccordionTrigger>What if the living arrangement doesn't work out?</AccordionTrigger>
                  <AccordionContent>
                    Sometimes arrangements don't work despite best intentions. Having clear termination clauses in your
                    agreement helps. We also offer mediation services and can help you find alternative arrangements.
                    Remember, it's better to address issues early rather than let them escalate.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-15">
                  <AccordionTrigger>Can I have pets in a houseshare?</AccordionTrigger>
                  <AccordionContent>
                    Pet policies vary by arrangement and homeowner preferences. Many of our members are pet-friendly! Be
                    upfront about your pets in your profile, and look for others who specifically welcome pets. Always
                    discuss pet rules, responsibilities, and any additional costs upfront.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Technical Support */}
          <Card>
            <CardHeader>
              <CardTitle>Technical Support</CardTitle>
              <CardDescription>Help with using the ShareSpace platform</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-16">
                  <AccordionTrigger>I'm having trouble with the website. Who can help?</AccordionTrigger>
                  <AccordionContent>
                    Our technical support team is here to help! Contact us through the support page, and we'll assist
                    you with any website issues, account problems, or questions about using the platform features.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-17">
                  <AccordionTrigger>How do I update or delete my profile?</AccordionTrigger>
                  <AccordionContent>
                    You can edit your profile anytime by logging in and going to your profile settings. To delete your
                    account, contact our support team. We'll be sad to see you go but will process your request promptly
                    and securely delete your information.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-18">
                  <AccordionTrigger>Can I use ShareSpace on my mobile phone?</AccordionTrigger>
                  <AccordionContent>
                    Yes! ShareSpace is fully optimized for mobile devices. You can browse profiles, send messages, and
                    manage your account from your smartphone or tablet. We're also working on a dedicated mobile app for
                    an even better experience.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Still Have Questions */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Still Have Questions?</CardTitle>
            <CardDescription>We're here to help you every step of the way</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-6">
              Can't find the answer you're looking for? Our friendly support team is ready to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/help">Visit Help Center</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
