// Matching algorithm for ShareSpace

export interface UserProfile {
  id: number
  name: string
  age: string
  location: string
  housingStatus: "has-space" | "looking-for-space"
  propertyType?: string
  monthlyBudget: string

  // Lifestyle preferences
  pets: string
  petOwner: boolean
  smoking: string
  drinking: string
  socialLevel: string
  workStatus: string

  // Compatibility factors
  morningPerson: string
  cookingStyle: string
  tvWatching: string
  cleanlinessLevel: string
  guestPolicy: string

  // Preferences for matches
  agePreference?: string
  budgetFlexibility?: number // 0-100
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

// Weight factors for different aspects of matching
const WEIGHTS = {
  location: 0.25, // 25% - Very important for practical reasons
  budget: 0.2, // 20% - Financial compatibility is crucial
  housing: 0.15, // 15% - Housing arrangement compatibility
  lifestyle: 0.2, // 20% - Day-to-day living compatibility
  compatibility: 0.2, // 20% - Personal compatibility factors
}

export function calculateMatchScore(user1: UserProfile, user2: UserProfile): MatchScore {
  const breakdown = {
    location: calculateLocationScore(user1, user2),
    budget: calculateBudgetScore(user1, user2),
    housing: calculateHousingScore(user1, user2),
    lifestyle: calculateLifestyleScore(user1, user2),
    compatibility: calculateCompatibilityScore(user1, user2),
  }

  // Calculate weighted overall score
  const overallScore = Math.round(
    breakdown.location * WEIGHTS.location +
      breakdown.budget * WEIGHTS.budget +
      breakdown.housing * WEIGHTS.housing +
      breakdown.lifestyle * WEIGHTS.lifestyle +
      breakdown.compatibility * WEIGHTS.compatibility,
  )

  const dealBreakers = findDealBreakers(user1, user2, breakdown)
  const strengths = findStrengths(user1, user2, breakdown)

  return {
    overallScore,
    breakdown,
    dealBreakers,
    strengths,
  }
}

function calculateLocationScore(user1: UserProfile, user2: UserProfile): number {
  const location1 = user1.location.toLowerCase()
  const location2 = user2.location.toLowerCase()

  // Extract city and state
  const [city1, state1] = location1.split(",").map((s) => s.trim())
  const [city2, state2] = location2.split(",").map((s) => s.trim())

  if (city1 === city2 && state1 === state2) return 100 // Same city
  if (state1 === state2) return 70 // Same state

  // Check for nearby major cities (simplified)
  const nearbyPairs = [
    ["san francisco", "oakland"],
    ["san francisco", "berkeley"],
    ["los angeles", "santa monica"],
    ["seattle", "bellevue"],
    ["portland", "beaverton"],
  ]

  for (const [cityA, cityB] of nearbyPairs) {
    if ((city1.includes(cityA) && city2.includes(cityB)) || (city1.includes(cityB) && city2.includes(cityA))) {
      return 85
    }
  }

  return 30 // Different regions
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

  // Calculate overlap between budget ranges
  const overlap = Math.max(0, Math.min(range1[1], range2[1]) - Math.max(range1[0], range2[0]))
  const maxRange = Math.max(range1[1] - range1[0], range2[1] - range2[0])

  if (overlap === 0) return 20 // No overlap

  const overlapPercentage = overlap / maxRange
  return Math.round(20 + overlapPercentage * 80) // 20-100 based on overlap
}

function calculateHousingScore(user1: UserProfile, user2: UserProfile): number {
  // Must have complementary housing status
  if (user1.housingStatus === user2.housingStatus) return 0

  const score = 100

  // Property type preferences (if applicable)
  if (user1.housingStatus === "has-space" && user1.propertyType) {
    // Could add property type preferences for the person looking for space
    // For now, all property types are equally compatible
  }

  return score
}

function calculateLifestyleScore(user1: UserProfile, user2: UserProfile): number {
  let score = 0
  let factors = 0

  // Pet compatibility
  factors++
  if (user1.pets === "love-pets" && user2.pets === "love-pets") score += 100
  else if (user1.pets === "no-pets" && user2.pets === "no-pets") score += 100
  else if (user1.pets === "ok-with-pets" || user2.pets === "ok-with-pets") score += 70
  else if (
    (user1.pets === "love-pets" && user2.pets === "no-pets") ||
    (user1.pets === "no-pets" && user2.pets === "love-pets")
  )
    score += 10
  else score += 50

  // Pet ownership consideration
  if (user1.petOwner || user2.petOwner) {
    if (user1.pets === "no-pets" || user2.pets === "no-pets") score -= 30
  }

  // Smoking compatibility
  factors++
  if (user1.smoking === user2.smoking) score += 100
  else if (user1.smoking === "non-smoker" && user2.smoking === "occasional-smoker") score += 60
  else if (user1.smoking === "occasional-smoker" && user2.smoking === "non-smoker") score += 60
  else score += 30

  // Drinking compatibility
  factors++
  if (user1.drinking === user2.drinking) score += 100
  else if (
    (user1.drinking === "social-drinker" && user2.drinking === "non-drinker") ||
    (user1.drinking === "non-drinker" && user2.drinking === "social-drinker")
  )
    score += 70
  else score += 40

  // Social level compatibility
  factors++
  if (user1.socialLevel === user2.socialLevel) score += 100
  else if (
    (user1.socialLevel === "very-social" && user2.socialLevel === "moderately-social") ||
    (user1.socialLevel === "moderately-social" && user2.socialLevel === "very-social") ||
    (user1.socialLevel === "moderately-social" && user2.socialLevel === "quiet-homebody") ||
    (user1.socialLevel === "quiet-homebody" && user2.socialLevel === "moderately-social")
  )
    score += 60
  else score += 20

  return Math.round(score / factors)
}

function calculateCompatibilityScore(user1: UserProfile, user2: UserProfile): number {
  let score = 0
  let factors = 0

  // Morning person compatibility
  factors++
  if (user1.morningPerson === user2.morningPerson) score += 100
  else if (user1.morningPerson === "moderate-schedule" || user2.morningPerson === "moderate-schedule") score += 70
  else score += 30

  // Cooking style compatibility
  factors++
  if (user1.cookingStyle === user2.cookingStyle) score += 100
  else if (
    (user1.cookingStyle === "love-cooking" && user2.cookingStyle === "basic-cooking") ||
    (user1.cookingStyle === "basic-cooking" && user2.cookingStyle === "love-cooking")
  )
    score += 80
  else score += 50

  // TV watching compatibility
  factors++
  if (user1.tvWatching === user2.tvWatching) score += 100
  else if (user1.tvWatching === "occasional-viewer" || user2.tvWatching === "occasional-viewer") score += 70
  else score += 40

  // Cleanliness compatibility
  factors++
  if (user1.cleanlinessLevel === user2.cleanlinessLevel) score += 100
  else if (
    (user1.cleanlinessLevel === "very-tidy" && user2.cleanlinessLevel === "moderately-clean") ||
    (user1.cleanlinessLevel === "moderately-clean" && user2.cleanlinessLevel === "very-tidy") ||
    (user1.cleanlinessLevel === "moderately-clean" && user2.cleanlinessLevel === "relaxed-about-mess") ||
    (user1.cleanlinessLevel === "relaxed-about-mess" && user2.cleanlinessLevel === "moderately-clean")
  )
    score += 60
  else score += 20

  // Guest policy compatibility
  factors++
  if (user1.guestPolicy === user2.guestPolicy) score += 100
  else if (user1.guestPolicy === "occasional-guests" || user2.guestPolicy === "occasional-guests") score += 70
  else score += 30

  return Math.round(score / factors)
}

function findDealBreakers(user1: UserProfile, user2: UserProfile, breakdown: any): string[] {
  const dealBreakers: string[] = []

  if (breakdown.location < 50) dealBreakers.push("Different locations may make arrangement difficult")
  if (breakdown.budget < 30) dealBreakers.push("Budget ranges don't align well")
  if (breakdown.housing === 0) dealBreakers.push("Both have same housing status - need complementary arrangement")

  // Lifestyle deal breakers
  if (user1.pets === "no-pets" && user2.petOwner) dealBreakers.push("Pet ownership conflict")
  if (user2.pets === "no-pets" && user1.petOwner) dealBreakers.push("Pet ownership conflict")

  if (
    (user1.smoking === "non-smoker" && user2.smoking === "regular-smoker") ||
    (user2.smoking === "non-smoker" && user1.smoking === "regular-smoker")
  ) {
    dealBreakers.push("Smoking preferences incompatible")
  }

  if (
    (user1.cleanlinessLevel === "very-tidy" && user2.cleanlinessLevel === "relaxed-about-mess") ||
    (user2.cleanlinessLevel === "very-tidy" && user1.cleanlinessLevel === "relaxed-about-mess")
  ) {
    dealBreakers.push("Very different cleanliness standards")
  }

  return dealBreakers
}

function findStrengths(user1: UserProfile, user2: UserProfile, breakdown: any): string[] {
  const strengths: string[] = []

  if (breakdown.location >= 85) strengths.push("Same city/nearby location")
  if (breakdown.budget >= 80) strengths.push("Very compatible budget ranges")

  // Lifestyle strengths
  if (user1.pets === "love-pets" && user2.pets === "love-pets") strengths.push("Both love pets")
  if (user1.smoking === "non-smoker" && user2.smoking === "non-smoker") strengths.push("Both non-smokers")
  if (user1.cookingStyle === "love-cooking" && user2.cookingStyle === "love-cooking")
    strengths.push("Both enjoy cooking")
  if (user1.socialLevel === user2.socialLevel) strengths.push("Similar social preferences")
  if (user1.cleanlinessLevel === user2.cleanlinessLevel) strengths.push("Same cleanliness standards")
  if (user1.morningPerson === user2.morningPerson) strengths.push("Same daily schedule preferences")

  return strengths
}

// Helper function to get match color based on score
export function getMatchColor(score: number): string {
  if (score >= 80) return "text-green-600"
  if (score >= 60) return "text-yellow-600"
  return "text-red-600"
}

// Helper function to get match label
export function getMatchLabel(score: number): string {
  if (score >= 80) return "Excellent Match"
  if (score >= 60) return "Good Match"
  if (score >= 40) return "Fair Match"
  return "Poor Match"
}
