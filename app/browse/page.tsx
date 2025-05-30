"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, MapPin, Home, Filter, Search } from "lucide-react"
import Link from "next/link"
import { calculateMatchScore, getMatchColor, getMatchLabel, type UserProfile, type MatchScore } from "@/lib/matching"
import { MatchDetailsModal } from "@/components/match-details-modal"

// Mock data for profiles (NZ-specific placeholders)
// ⚠️ This is fake filler data. It will be replaced by live AWS database entries in Phase One.

const profiles: UserProfile[] = [
  {
    id: 1,
    name: "Margaret Thompson",
    age: "62",
    location: "Napier, Hawke's Bay",
    housingStatus: "has-space",
    propertyType: "House",
    monthlyBudget: "$250-350",
    bio: "Retired teacher looking for a friendly companion to share my cozy 3-bedroom home in Napier. I love gardening, reading, and cooking. Non-smoker, social drinker, and very pet-friendly!",
    lifestyle: ["Non-smoker", "Pet-friendly", "Social drinker", "Early bird", "Love cooking"],
    image: "/placeholder.svg?height=200&width=200",
    verified: true,
    pets: "love-pets",
    petOwner: true,
    smoking: "non-smoker",
    drinking: "social-drinker",
    socialLevel: "moderately-social",
    workStatus: "retired",
    morningPerson: "early-bird",
    cookingStyle: "love-cooking",
    tvWatching: "occasional-viewer",
    cleanlinessLevel: "moderately-clean",
    guestPolicy: "occasional-guests",
  },
  {
    id: 2,
    name: "Susan Chen",
    age: "58",
    location: "Tauranga, Bay of Plenty",
    housingStatus: "looking-for-space",
    monthlyBudget: "$300-450",
    bio: "Recently divorced and looking for a fresh start in Tauranga. I'm a part-time consultant who enjoys yoga, hiking, and quiet evenings. Looking for a peaceful home environment.",
    lifestyle: ["Non-smoker", "Non-drinker", "Quiet", "Moderate schedule", "Tidy"],
    image: "/placeholder.svg?height=200&width=200",
    verified: true,
    pets: "ok-with-pets",
    petOwner: false,
    smoking: "non-smoker",
    drinking: "non-drinker",
    socialLevel: "quiet-homebody",
    workStatus: "working-part-time",
    morningPerson: "moderate-schedule",
    cookingStyle: "basic-cooking",
    tvWatching: "rarely-watch",
    cleanlinessLevel: "very-tidy",
    guestPolicy: "rare-guests",
  },
  {
    id: 3,
    name: "Linda Rodriguez",
    age: "55",
    location: "Wellington Central",
    housingStatus: "has-space",
    propertyType: "Condo",
    monthlyBudget: "$450-600",
    bio: "Working professional with a beautiful condo in Wellington. I travel frequently for work, so looking for someone responsible to share the space. Love entertaining friends!",
    lifestyle: ["Non-smoker", "Social drinker", "Very social", "Night owl", "Guests welcome"],
    image: "/placeholder.svg?height=200&width=200",
    verified: true,
    pets: "ok-with-pets",
    petOwner: false,
    smoking: "non-smoker",
    drinking: "social-drinker",
    socialLevel: "very-social",
    workStatus: "working-full-time",
    morningPerson: "night-owl",
    cookingStyle: "minimal-cooking",
    tvWatching: "tv-lover",
    cleanlinessLevel: "moderately-clean",
    guestPolicy: "guests-welcome",
  },
  {
    id: 4,
    name: "Carol Williams",
    age: "67",
    location: "Timaru, Canterbury",
    housingStatus: "looking-for-space",
    monthlyBudget: "$200-300",
    bio: "Retired nurse seeking a quiet, comfortable place in Timaru. I'm very clean, respectful, and enjoy reading, crafts, and volunteering at the local animal shelter.",
    lifestyle: ["Non-smoker", "Non-drinker", "Pet-friendly", "Early bird", "Very tidy"],
    image: "/placeholder.svg?height=200&width=200",
    verified: true,
    pets: "love-pets",
    petOwner: false,
    smoking: "non-smoker",
    drinking: "non-drinker",
    socialLevel: "quiet-homebody",
    workStatus: "retired",
    morningPerson: "early-bird",
    cookingStyle: "basic-cooking",
    tvWatching: "occasional-viewer",
    cleanlinessLevel: "very-tidy",
    guestPolicy: "rare-guests",
  },
  {
    id: 5,
    name: "Patricia Davis",
    age: "61",
    location: "Auckland, North Shore",
    housingStatus: "has-space",
    propertyType: "Townhouse",
    monthlyBudget: "$350-500",
    bio: "Empty nester with extra space in my North Shore townhouse. I enjoy cooking, wine tasting, and hosting book club meetings. Looking for someone who appreciates good conversation!",
    lifestyle: ["Non-smoker", "Social drinker", "Love cooking", "Moderately social", "Guests welcome"],
    image: "/placeholder.svg?height=200&width=200",
    verified: true,
    pets: "ok-with-pets",
    petOwner: false,
    smoking: "non-smoker",
    drinking: "social-drinker",
    socialLevel: "moderately-social",
    workStatus: "retired",
    morningPerson: "moderate-schedule",
    cookingStyle: "love-cooking",
    tvWatching: "occasional-viewer",
    cleanlinessLevel: "moderately-clean",
    guestPolicy: "guests-welcome",
  },
  {
    id: 6,
    name: "Barbara Johnson",
    age: "54",
    location: "Nelson, Tasman",
    housingStatus: "looking-for-space",
    monthlyBudget: "$300-400",
    bio: "Freelance writer looking for a creative, inspiring environment in Nelson. I work from home and appreciate quiet spaces. Love cats, yoga, and organic gardening.",
    lifestyle: ["Non-smoker", "Occasional drinker", "Pet owner", "Moderate schedule", "Quiet"],
    image: "/placeholder.svg?height=200&width=200",
    verified: true,
    pets: "love-pets",
    petOwner: true,
    smoking: "non-smoker",
    drinking: "occasional-drinker",
    socialLevel: "quiet-homebody",
    workStatus: "freelance",
    morningPerson: "moderate-schedule",
    cookingStyle: "basic-cooking",
    tvWatching: "rarely-watch",
    cleanlinessLevel: "moderately-clean",
    guestPolicy: "rare-guests",
  },
]


// Mock current user for matching calculations
const currentUser: UserProfile = {
  id: 0,
  name: "Current User",
  age: "58",
  location: "Napier , Hawke's Bay",
  housingStatus: "looking-for-space",
  monthlyBudget: "800-1200",
  pets: "love-pets",
  petOwner: true,
  smoking: "non-smoker",
  drinking: "social-drinker",
  socialLevel: "moderately-social",
  workStatus: "retired",
  morningPerson: "early-bird",
  cookingStyle: "love-cooking",
  tvWatching: "occasional-viewer",
  cleanlinessLevel: "moderately-clean",
  guestPolicy: "occasional-guests",
}
function parseBudgetRange(range: string): [number, number] {
  const match = range.match(/\$?(\d+)[^\d]+(\d+)/)
  if (!match) return [0, Infinity]
  return [parseInt(match[1]), parseInt(match[2])]
}

export default function BrowseProfiles() {
const [searchTerm, setSearchTerm] = useState("")
const [locationFilter, setLocationFilter] = useState("")
const [housingFilter, setHousingFilter] = useState("")
const [minBudget, setMinBudget] = useState("")
const [maxBudget, setMaxBudget] = useState("")
const [selectedMatch, setSelectedMatch] = useState<{ profile: UserProfile; matchScore: MatchScore } | null>(null)

  const profilesWithMatches = profiles.map((profile) => {
    const matchScore = calculateMatchScore(currentUser, profile)
    return { ...profile, matchScore }
  })

  const filteredProfiles = profilesWithMatches
    .filter((profile) => {
      const matchesSearch =
        profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
(profile.bio?.toLowerCase() ?? "").includes(searchTerm.toLowerCase())
const matchesLocation = locationFilter === "all" || profile.location.includes(locationFilter)
      const matchesHousing = !housingFilter || profile.housingStatus === housingFilter
const profileBudgetRange = parseBudgetRange(profile.monthlyBudget)
const min = minBudget ? parseInt(minBudget) : 0
const max = maxBudget ? parseInt(maxBudget) : Infinity
const matchesBudget = profileBudgetRange[1] >= min && profileBudgetRange[0] <= max

      return matchesSearch && matchesLocation && matchesHousing && matchesBudget
    })
    .sort((a, b) => b.matchScore.overallScore - a.matchScore.overallScore) // Sort by match score

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Home className="h-8 w-8 text-rose-600" />
            <h1 className="text-2xl font-bold text-gray-900">ShareSpace</h1>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link href="/profile/create">Create Profile</Link>
            </Button>
            <Button asChild>
              <Link href="/messages">Messages</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Find Your Perfect Match
            </CardTitle>
            <CardDescription>Browse profiles of women looking for houseshare arrangements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <Input
                  placeholder="Search by name or interests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
<Select value={locationFilter} onValueChange={setLocationFilter}>
  <SelectTrigger>
    <SelectValue placeholder="Location" />
  </SelectTrigger>
  <SelectContent>
<SelectItem value="all">All Locations</SelectItem>
    <SelectItem value="Napier">Napier, Hawke's Bay</SelectItem>
    <SelectItem value="Tauranga">Tauranga, Bay of Plenty</SelectItem>
    <SelectItem value="Wellington">Wellington Central</SelectItem>
    <SelectItem value="Timaru">Timaru, Canterbury</SelectItem>
    <SelectItem value="Auckland">Auckland, North Shore</SelectItem>
    <SelectItem value="Nelson">Nelson, Tasman</SelectItem>
  </SelectContent>
</Select>
<Select value={minBudget} onValueChange={setMinBudget}>
  <SelectTrigger>
    <SelectValue placeholder="Min Budget" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="All">Any</SelectItem>
    <SelectItem value="200">200</SelectItem>
    <SelectItem value="250">250</SelectItem>
    <SelectItem value="300">300</SelectItem>
    <SelectItem value="350">350</SelectItem>
    <SelectItem value="400">400</SelectItem>
  </SelectContent>
</Select>

<Select value={maxBudget} onValueChange={setMaxBudget}>
  <SelectTrigger>
    <SelectValue placeholder="Max Budget" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="All">Any</SelectItem>
    <SelectItem value="300">300</SelectItem>
    <SelectItem value="350">350</SelectItem>
    <SelectItem value="400">400</SelectItem>
    <SelectItem value="450">450</SelectItem>
    <SelectItem value="500">500</SelectItem>
    <SelectItem value="600">600</SelectItem>
    <SelectItem value="700">700</SelectItem>
  </SelectContent>
</Select>              
              <Select value={housingFilter} onValueChange={setHousingFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Housing Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="has-space">Has Space</SelectItem>
                  <SelectItem value="looking-for-space">Looking for Space</SelectItem>
                </SelectContent>
              </Select>
              
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProfiles.length} of {profiles.length} profiles
          </p>
        </div>

        {/* Profile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.map((profile) => (
            <Card key={profile.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={profile.image || "/placeholder.svg"} alt={profile.name} />
                    <AvatarFallback>
                      {profile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{profile.name}</CardTitle>
                      {profile.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">Age {profile.age}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                      <MapPin className="h-3 w-3" />
                      {profile.location}
                    </div>
                    {/* Match Score */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className={`text-sm font-semibold ${getMatchColor(profile.matchScore.overallScore)}`}>
                        {profile.matchScore.overallScore}% Match
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {getMatchLabel(profile.matchScore.overallScore)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant={profile.housingStatus === "has-space" ? "default" : "outline"}>
                    {profile.housingStatus === "has-space" ? "Has Space" : "Looking for Space"}
                  </Badge>
                  {profile.propertyType && <Badge variant="outline">{profile.propertyType}</Badge>}
                  <Badge variant="outline">{profile.monthlyBudget}</Badge>
                </div>

                <p className="text-sm text-gray-700 line-clamp-3">{profile.bio}</p>

                {/* Match Strengths */}
                {profile.matchScore.strengths.length > 0 && (
                  <div className="text-xs">
                    <span className="text-green-600 font-medium">Strengths: </span>
                    <span className="text-gray-600">{profile.matchScore.strengths.slice(0, 2).join(", ")}</span>
                    {profile.matchScore.strengths.length > 2 && (
                      <span className="text-gray-500"> +{profile.matchScore.strengths.length - 2} more</span>
                    )}
                  </div>
                )}

                {/* Deal Breakers Warning */}
                {profile.matchScore.dealBreakers.length > 0 && (
                  <div className="text-xs">
                    <span className="text-red-600 font-medium">Considerations: </span>
                    <span className="text-gray-600">{profile.matchScore.dealBreakers[0]}</span>
                    {profile.matchScore.dealBreakers.length > 1 && (
                      <span className="text-gray-500"> +{profile.matchScore.dealBreakers.length - 1} more</span>
                    )}
                  </div>
                )}

                <div className="flex flex-wrap gap-1">
                  {profile.lifestyle?.slice(0, 3).map((trait, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {trait}
                    </Badge>
                  ))}
{Array.isArray(profile.lifestyle) && profile.lifestyle.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
+{(profile.lifestyle?.length ?? 0) - 3} more
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                  <Button size="sm" variant="outline">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs"
                    onClick={() => setSelectedMatch({ profile, matchScore: profile.matchScore })}
                  >
                    View Match Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProfiles.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No profiles found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters to find more matches.</p>
              <Button
            onClick={() => {
  setSearchTerm("")
  setLocationFilter("")
  setHousingFilter("")
  setMinBudget("")
  setMaxBudget("")
}}

              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Match Details Modal */}
        {selectedMatch && (
          <MatchDetailsModal
            isOpen={!!selectedMatch}
            onClose={() => setSelectedMatch(null)}
            matchScore={selectedMatch.matchScore}
            profileName={selectedMatch.profile.name}
          />
        )}
      </div>
    </div>
  )
}
