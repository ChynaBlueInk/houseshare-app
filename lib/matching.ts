// Matching algorithm for ShareSpace

export interface UserProfile {
  // ✅ DynamoDB fields
  userID: string
  fullName: string
  email: string
  region: string
  monthlyBudget: string
  bio?: string
  profileImage?: string

  // ✅ Keep legacy fields to avoid breaking filters
  name?: string
  location?: string

  // ✅ Housing and lifestyle
  housingStatus: "has-space" | "looking-for-space"
  propertyType?: string

  pets: string
  petOwner: boolean
  smoking: string
  drinking: string
  socialLevel: string
  workStatus: string

  morningPerson: string
  cookingStyle: string
  tvWatching: string
  cleanlinessLevel: string
  guestPolicy: string

  age?: string
  agePreference?: string
  budgetFlexibility?: number
  lifestyle?: string[]
  verified?: boolean
}

export interface MatchScore {
  overallScore: number
  breakdown: {
    location: number
    budget: number
    lifestyle: number
    compatibility: number
    housing: number
  }
  dealBreakers: string[]
  strengths: string[]
}

const WEIGHTS = {
  location: 0.25,
  budget: 0.2,
  housing: 0.15,
  lifestyle: 0.2,
  compatibility: 0.2,
}

export function calculateMatchScore(user1: UserProfile, user2: UserProfile): MatchScore {
  const breakdown = {
    location: calculateLocationScore(user1, user2),
    budget: calculateBudgetScore(user1, user2),
    housing: calculateHousingScore(user1, user2),
    lifestyle: calculateLifestyleScore(user1, user2),
    compatibility: calculateCompatibilityScore(user1, user2),
  }

  const overallScore = Math.round(
    breakdown.location * WEIGHTS.location +
    breakdown.budget * WEIGHTS.budget +
    breakdown.housing * WEIGHTS.housing +
    breakdown.lifestyle * WEIGHTS.lifestyle +
    breakdown.compatibility * WEIGHTS.compatibility
  )

  const dealBreakers = findDealBreakers(user1, user2, breakdown)
  const strengths = findStrengths(user1, user2, breakdown)

  return { overallScore, breakdown, dealBreakers, strengths }
}

function calculateLocationScore(user1: UserProfile, user2: UserProfile): number {
  const loc1 = (user1.region || user1.location || "").toLowerCase()
  const loc2 = (user2.region || user2.location || "").toLowerCase()

  if (loc1 === loc2) return 100
  if (loc1 && loc2 && loc1.split(",")[1]?.trim() === loc2.split(",")[1]?.trim()) return 70
  return 30
}

function calculateBudgetScore(user1: UserProfile, user2: UserProfile): number {
  const budgetRanges = {
    "under-500": [0, 500],
    "500-800": [500, 800],
    "800-1200": [800, 1200],
    "1200-1600": [1200, 1600],
    "1600-2000": [1600, 2000],
    "over-2000": [2000, 3000],
  }

  const range1 = budgetRanges[user1.monthlyBudget as keyof typeof budgetRanges]
  const range2 = budgetRanges[user2.monthlyBudget as keyof typeof budgetRanges]

  if (!range1 || !range2) return 50

  const overlap = Math.max(0, Math.min(range1[1], range2[1]) - Math.max(range1[0], range2[0]))
  const maxRange = Math.max(range1[1] - range1[0], range2[1] - range2[0])

  if (overlap === 0) return 20
  return Math.round(20 + (overlap / maxRange) * 80)
}

function calculateHousingScore(user1: UserProfile, user2: UserProfile): number {
  return user1.housingStatus === user2.housingStatus ? 0 : 100
}

function calculateLifestyleScore(user1: UserProfile, user2: UserProfile): number {
  let score = 0, factors = 0

  factors++
  if (user1.pets === user2.pets) score += 100
  else if (user1.pets === "ok-with-pets" || user2.pets === "ok-with-pets") score += 70
  else score += 50

  if (user1.petOwner || user2.petOwner) {
    if (user1.pets === "no-pets" || user2.pets === "no-pets") score -= 30
  }

  factors++
  score += user1.smoking === user2.smoking ? 100 : 60

  factors++
  score += user1.drinking === user2.drinking ? 100 : 70

  factors++
  score += user1.socialLevel === user2.socialLevel ? 100 : 60

  return Math.round(score / factors)
}

function calculateCompatibilityScore(user1: UserProfile, user2: UserProfile): number {
  let score = 0, factors = 0

  factors++
  score += user1.morningPerson === user2.morningPerson ? 100 : 70

  factors++
  score += user1.cookingStyle === user2.cookingStyle ? 100 : 80

  factors++
  score += user1.tvWatching === user2.tvWatching ? 100 : 70

  factors++
  score += user1.cleanlinessLevel === user2.cleanlinessLevel ? 100 : 60

  factors++
  score += user1.guestPolicy === user2.guestPolicy ? 100 : 70

  return Math.round(score / factors)
}

function findDealBreakers(user1: UserProfile, user2: UserProfile, breakdown: any): string[] {
  const dealBreakers: string[] = []

  if (breakdown.location < 50) dealBreakers.push("Different locations may make arrangement difficult")
  if (breakdown.budget < 30) dealBreakers.push("Budget ranges don't align well")
  if (breakdown.housing === 0) dealBreakers.push("Both have same housing status")

  if (user1.pets === "no-pets" && user2.petOwner) dealBreakers.push("Pet ownership conflict")
  if (user2.pets === "no-pets" && user1.petOwner) dealBreakers.push("Pet ownership conflict")

  return dealBreakers
}

function findStrengths(user1: UserProfile, user2: UserProfile, breakdown: any): string[] {
  const strengths: string[] = []

  if (breakdown.location >= 85) strengths.push("Same city/nearby location")
  if (breakdown.budget >= 80) strengths.push("Very compatible budget ranges")
  if (user1.pets === "love-pets" && user2.pets === "love-pets") strengths.push("Both love pets")
  if (user1.smoking === "non-smoker" && user2.smoking === "non-smoker") strengths.push("Both non-smokers")
  if (user1.cookingStyle === "love-cooking" && user2.cookingStyle === "love-cooking") strengths.push("Both enjoy cooking")
  if (user1.socialLevel === user2.socialLevel) strengths.push("Similar social preferences")
  if (user1.cleanlinessLevel === user2.cleanlinessLevel) strengths.push("Same cleanliness standards")
  if (user1.morningPerson === user2.morningPerson) strengths.push("Same daily schedule preferences")

  return strengths
}

export function getMatchColor(score: number): string {
  if (score >= 80) return "text-green-600"
  if (score >= 60) return "text-yellow-600"
  return "text-red-600"
}

export function getMatchLabel(score: number): string {
  if (score >= 80) return "Excellent Match"
  if (score >= 60) return "Good Match"
  if (score >= 40) return "Fair Match"
  return "Poor Match"
}
