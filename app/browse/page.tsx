// app/browse/page.tsx
"use client";

export const dynamic = "force-dynamic";

import Link from "next/link";
import {useEffect, useMemo, useState} from "react";
import {useAuthRedirect} from "@/lib/useAuthRedirect";
import {getIdToken} from "@/lib/auth";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Badge} from "@/components/ui/badge";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

import {
  calculateMatchScore,
  getMatchLabel,
  type UserProfile,
  type MatchScore,
} from "@/lib/matching";

import {MatchDetailsModal} from "@/components/match-details-modal";

type ApiMe = {user: UserProfile};
type ApiUsers = {profiles: UserProfile[]};

const NZ_REGIONS = [
  "Northland","Auckland","Waikato","Bay of Plenty","Gisborne","Hawke's Bay","Taranaki",
  "Manawatū-Whanganui","Wellington","Tasman","Nelson","Marlborough","West Coast",
  "Canterbury","Otago","Southland","Chatham Islands",
];

// e.g. "Napier, Hawke's Bay" -> "hawke's bay"
function extractRegion(value?: string): string {
  if (!value) return "";
  const parts = value.split(",").map((s) => s.trim());
  return (parts[parts.length - 1] || "").toLowerCase();
}

function parseBudgetRange(range: string): [number, number] {
  const match = range?.match(/\$?(\d+)[^\d]+(\d+)/);
  if (!match) return [0, Number.POSITIVE_INFINITY];
  return [parseInt(match[1]), parseInt(match[2])];
}

// Robust "same user" check (handles thin/messy data)
function isSameUser(a?: UserProfile | null, b?: UserProfile | null): boolean {
  if (!a || !b) return false;

  const aId = (a.userID || "").trim();
  const bId = (b.userID || "").trim();
  if (aId && bId && aId === bId) return true;

  const aEmail = (a.email || "").trim().toLowerCase();
  const bEmail = (b.email || "").trim().toLowerCase();
  if (aEmail && bEmail && aEmail === bEmail) return true;

  return false;
}

const BUILD_STAMP = "browse:fix-self-card:2026-02-20";
const SHOW_DEBUG = false;

export default function BrowsePage() {
  const authLoading = useAuthRedirect();

  const [me, setMe] = useState<UserProfile | null>(null);
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [profilesLoading, setProfilesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedMatch, setSelectedMatch] = useState<{
    profile: UserProfile;
    matchScore: MatchScore;
  } | null>(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [housingFilter, setHousingFilter] = useState("all");
  const [minBudget, setMinBudget] = useState("any");
  const [maxBudget, setMaxBudget] = useState("any");

  // Debug state
  const [debugInfo, setDebugInfo] = useState<{
    me?: UserProfile | null;
    mineInAll?: UserProfile | null;
    count?: number;
    excludedCount?: number;
  }>({});

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setProfilesLoading(true);
        setError(null);

        const token = getIdToken();
        if (!token) {
          setError("Please log in first (idToken not found).");
          setProfiles([]);
          setMe(null);
          return;
        }

        // 1) Fetch *my* profile (source of truth for the top card)
        const meRes = await fetch("/api/users/me", {
          headers: {Authorization: `Bearer ${token}`},
          cache: "no-store",
        });
        const meJson: ApiMe = await meRes.json();
        if (!meRes.ok) throw new Error((meJson as any)?.error || "Failed to fetch current user.");
        const myProfile = meJson.user;

        // 2) Fetch all profiles (matches list)
        const allRes = await fetch("/api/users", {cache: "no-store"});
        const allJson: ApiUsers = await allRes.json();
        if (!allRes.ok) throw new Error((allJson as any)?.error || "Failed to fetch profiles.");

        const allProfiles = allJson.profiles ?? [];

        // 3) Find my record inside /api/users (for debugging + sanity checks)
        const mineInAll =
          allProfiles.find((p) => isSameUser(p, myProfile)) ||
          allProfiles.find((p) => (p.userID || "").trim() === (myProfile.userID || "").trim()) ||
          allProfiles.find((p) => (p.email || "").trim().toLowerCase() === (myProfile.email || "").trim().toLowerCase()) ||
          null;

        // 4) Exclude myself (robustly) so I never appear in matches
        const othersRaw = allProfiles.filter((p) => !isSameUser(p, myProfile));

        // Extra safety: also exclude by direct userID match if present
        const myId = (myProfile.userID || "").trim();
        const others = myId
          ? othersRaw.filter((p) => ((p.userID || "").trim() !== myId))
          : othersRaw;

        const excludedCount = allProfiles.length - others.length;

        if (!cancelled) {
          setMe(myProfile);
          setProfiles(others);
          setDebugInfo({me: myProfile, mineInAll, count: allProfiles.length, excludedCount});
        }
      } catch (e: any) {
        if (!cancelled) {
          console.error("[/browse] load error:", e);
          setError(e?.message || "Something went wrong.");
          setMe(null);
          setProfiles([]);
          setDebugInfo({});
        }
      } finally {
        if (!cancelled) setProfilesLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const profilesWithMatches = useMemo(() => {
    if (!me) return [];
    return profiles
      .filter((p) => !isSameUser(p, me)) // belt + braces
      .map((profile) => ({
        ...profile,
        matchScore: calculateMatchScore(me, profile),
      }))
      .sort((a, b) => b.matchScore.overallScore - a.matchScore.overallScore);
  }, [me, profiles]);

  const filteredProfiles = useMemo(() => {
    const selectedRegion = locationFilter.toLowerCase();

    return profilesWithMatches.filter((profile) => {
      const matchesSearch =
        profile.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (profile.bio?.toLowerCase() ?? "").includes(searchTerm.toLowerCase());

      const profRegion = extractRegion(profile.region);
      const matchesLocation =
        locationFilter === "all" ||
        profRegion === selectedRegion ||
        (profile.region || "").toLowerCase().includes(selectedRegion);

      const matchesHousing =
        housingFilter === "all" || profile.housingStatus === housingFilter;

      const [minRange, maxRange] = parseBudgetRange(profile.monthlyBudget || "");
      const min = minBudget !== "any" ? parseInt(minBudget) : 0;
      const max = maxBudget !== "any" ? parseInt(maxBudget) : Number.POSITIVE_INFINITY;
      const matchesBudget = maxRange >= min && minRange <= max;

      return matchesSearch && matchesLocation && matchesHousing && matchesBudget;
    });
  }, [profilesWithMatches, searchTerm, locationFilter, housingFilter, minBudget, maxBudget]);

  if (authLoading || profilesLoading) return <div>Loading profiles...</div>;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <Card className="border-destructive/40">
            <CardHeader>
              <CardTitle className="text-destructive">Unable to load matches</CardTitle>
              <CardDescription>{error}</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {SHOW_DEBUG && (
          <details className="mb-4 rounded-md border p-3 bg-white/70">
            <summary className="cursor-pointer text-sm font-medium">
              Debug (build {BUILD_STAMP})
            </summary>
            <pre className="text-xs overflow-auto mt-2">
{JSON.stringify(
  {
    me: debugInfo.me && {
      userID: debugInfo.me.userID,
      fullName: debugInfo.me.fullName,
      email: debugInfo.me.email,
    },
    mineInAll: debugInfo.mineInAll && {
      userID: debugInfo.mineInAll.userID,
      fullName: debugInfo.mineInAll.fullName,
      email: debugInfo.mineInAll.email,
    },
    totalProfilesFromAll: debugInfo.count,
    excludedCount: debugInfo.excludedCount,
  },
  null,
  2
)}
            </pre>
          </details>
        )}

        {/* Your profile pinned at the top */}
        {me && (
          <Card className="mb-6 border-blue-200 bg-blue-50/40">
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle>Your Profile</CardTitle>
                  <Badge variant="secondary" className="text-xs">You</Badge>
                </div>
                <CardDescription>
                  Region: {me.region || "—"} · Budget: {me.monthlyBudget || "—"}
                </CardDescription>
              </div>
              <Button asChild variant="outline">
                <Link href="/profile/create">
                  {me.fullName ? "Edit Profile" : "Create Profile"}
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={me.profileImage || "/placeholder.svg"} />
                <AvatarFallback>{me.fullName?.charAt(0) || "?"}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-medium">{me.fullName || "No name yet"}</div>
                <div className="text-sm text-muted-foreground line-clamp-2">
                  {me.bio || "No bio yet."}
                </div>
                <div className="mt-2">
                  <Link href={`/profile/${encodeURIComponent(me.userID || "")}`} className="text-sm underline">
                    View your public profile
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Find Your Match</CardTitle>
            <CardDescription>Browse house share profiles with live matching</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Input
              placeholder="Search by name or bio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger><SelectValue placeholder="Region" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                {NZ_REGIONS.map((r) => (
                  <SelectItem key={r} value={r}>{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={minBudget} onValueChange={setMinBudget}>
              <SelectTrigger><SelectValue placeholder="Min Budget" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="200">200</SelectItem>
                <SelectItem value="400">400</SelectItem>
                <SelectItem value="800">800</SelectItem>
              </SelectContent>
            </Select>
            <Select value={maxBudget} onValueChange={setMaxBudget}>
              <SelectTrigger><SelectValue placeholder="Max Budget" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="800">800</SelectItem>
                <SelectItem value="1200">1200</SelectItem>
                <SelectItem value="1600">1600</SelectItem>
              </SelectContent>
            </Select>
            <Select value={housingFilter} onValueChange={setHousingFilter}>
              <SelectTrigger><SelectValue placeholder="Housing Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Housing</SelectItem>
                <SelectItem value="has-space">Has Space</SelectItem>
                <SelectItem value="looking-for-space">Looking for Space</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Matches heading */}
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">Matches</h2>
            <p className="text-sm text-muted-foreground">
              Showing {filteredProfiles.length} profile{filteredProfiles.length === 1 ? "" : "s"} (excluding you)
            </p>
          </div>
        </div>

        {/* Matches grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.map((profile) => (
            <Card key={profile.userID} className="hover:shadow-lg">
              <CardHeader>
                <div className="flex gap-4 items-center">
                  <Avatar>
                    <AvatarImage src={profile.profileImage || "/placeholder.svg"} />
                    <AvatarFallback>{profile.fullName?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{profile.fullName}</CardTitle>
                    <p className="text-sm text-gray-600">{profile.region}</p>
                    <p className="text-sm">{profile.monthlyBudget}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-2 line-clamp-3">{profile.bio}</p>

                <p className="text-xs mb-2">
                  {profile.matchScore.overallScore}% Match — {getMatchLabel(profile.matchScore.overallScore)}
                </p>

                <div className="flex gap-2 mb-3">
                  {profile.matchScore.strengths.slice(0, 2).map((s, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">{s}</Badge>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() =>
                      setSelectedMatch({
                        profile,
                        matchScore: profile.matchScore,
                      })
                    }
                  >
                    View Match Details
                  </Button>

                  <Link
                    href={`/messages?recipient=${encodeURIComponent(profile.userID)}&recipientName=${encodeURIComponent(profile.fullName || "")}`}
                    className="shrink-0"
                  >
                    <Button size="sm" variant="outline">
                      Message
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modal */}
        {selectedMatch && (
          <MatchDetailsModal
            isOpen={!!selectedMatch}
            onClose={() => setSelectedMatch(null)}
            matchScore={selectedMatch.matchScore}
            profileName={selectedMatch.profile.fullName}
            bio={selectedMatch.profile.bio}
            region={selectedMatch.profile.region}
            monthlyBudget={selectedMatch.profile.monthlyBudget}
            housingStatus={selectedMatch.profile.housingStatus as any}
            userID={selectedMatch.profile.userID}
          />
        )}
      </div>
    </div>
  );
}
