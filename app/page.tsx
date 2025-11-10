import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Shield, Heart } from "lucide-react";

export default function HomePage() {
  return (
    <div className="bg-gradient-to-b from-rose-50 to-white">
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

      {/* Home Image Section */}
      <section className="px-4">
        <div className="container mx-auto max-w-5xl">
          <img
            src="/HomeImage.png"
            alt="Women laughing and enjoying wine together"
            className="rounded-xl shadow-lg w-full object-cover"
          />
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
                Share your housing situation, lifestyle preferences, location and what you're looking for in a housemate.
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
            Join other women who hope to find their perfect living arrangements through ShareSpace.
          </p>
          <Button size="lg" className="text-lg px-8 py-6" asChild>
            <Link href="/profile/create">Start Your Journey Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
