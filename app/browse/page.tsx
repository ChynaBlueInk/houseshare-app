// app/browse/page.tsx
"use client";

export const dynamic = "force-dynamic";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useAuthRedirect } from "@/lib/useAuthRedirect";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  calculateMatchScore,
  getMatchLabel,
  type UserProfile,
  type MatchScore,
} from "@/lib/matching";

import { MatchDetailsModal } from "@/components/match-details-modal";

type ApiMe = { user: UserProfile };
type ApiUsers = { profiles: UserProfile[] };

const NZ_REGIONS = [
  "Northland","Auckland","Waikato","Bay of Plenty","Gisborne","Hawke's Bay","Taranaki",
  "Manawatū-Whanganui","Wellington","Tasman","Nelson","Marlborough","West Coast",
  "Canterbury","Otago","Southland","Chatham Islands",
];

// ⚠️ Canonical token getter: prefer id_token, then idToken. If both exist and differ,
// normalize them to the chosen one so future reads are consistent.
function getIdToken(): string | null {
  if (typeof window === "undefined") return null;
  const underscore = localStorage.getItem("id_token");
  const camel = localStorage.getItem("idToken");

  // Prefer underscore key
  const chosen = underscore || camel || null;

  // If both exist and differ, normalize both to the chosen value
  if (chosen && underscore !== camel) {
    try {
      localStorage.setItem("id_token", chosen);
      localStorage.setItem("idToken", chosen);
      // Optional: you can also normalize access/refresh here if needed
      // console.log("[token] normalized id_token and idToken to same value");
    } catch {}
  }

  return chosen;
}

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

const BUILD_STAMP = "browse:debug:2025-08-24T18:25Z";

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
  }>({});

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setProfilesLoading(true);
        setError(null);

        console.log("[BUILD]", BUILD_STAMP, "location:", window.location.pathname);

        const token = getIdToken();
        if (!token) {
          setError("Please log in first (idToken not found).");
          setProfiles([]);
          setMe(null);
          return;
        }

        // 1) Fetch *my* profile (source of truth for the card)
        const meRes = await fetch("/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        });
        const meJson: ApiMe = await meRes.json();
        if (!meRes.ok) throw new Error((meJson as any)?.error || "Failed to fetch current user.");
        const myProfile = meJson.user; // strongly consistent

        console.log("[/api/users/me] userID:", myProfile.userID, "fullName:", myProfile.fullName, "email:", myProfile.email);

        // 2) Fetch all profiles (used *only* for matches)
        const allRes = await fetch("/api/users", { cache: "no-store" });
        const allJson: ApiUsers = await allRes.json();
        if (!allRes.ok) throw new Error((allJson as any)?.error || "Failed to fetch profiles.");

        const mineInAll = (allJson.profiles ?? []).find((p) => p.userID === myProfile.userID) || null;
        console.log("[/api/users] total:", (allJson.profiles ?? []).length, "mineInAll:", mineInAll?.fullName);

        // 3) Exclude myself by userID (avoid relying on email)
        const others = (allJson.profiles ?? []).filter((p) => p.userID !== myProfile.userID);

        if (!cancelled) {
          setMe(myProfile);
          setProfiles(others);
          setDebugInfo({ me: myProfile, mineInAll, count: (allJson.profiles ?? []).length });
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

        {/* --- DEBUG PANEL (temporary) --- */}
        <details className="mb-4 rounded-md border p-3 bg-white/70">
          <summary className="cursor-pointer text-sm font-medium">Debug (build {BUILD_STAMP})</summary>
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
  },
  null,
  2
)}
          </pre>
        </details>
        {/* --- END DEBUG PANEL --- */}

        {/* Current user summary (from /api/users/me only) */}
        {me && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>
                Region: {me.region || "—"} · Budget: {me.monthlyBudget || "—"}
              </CardDescription>
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
              </div>
              <Button asChild variant="outline">
                <Link href="/profile/create">{me.fullName ? "Edit Profile" : "Create Profile"}</Link>
              </Button>
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

        {/* Matches */}
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

                  {/* Link uses ?recipient= to match your messages page */}
                  <Link href={`/messages?recipient=${encodeURIComponent(profile.userID)}`} className="shrink-0">
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
