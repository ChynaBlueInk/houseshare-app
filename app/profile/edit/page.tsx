// app/profile/edit/page.tsx
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home } from "lucide-react";
import Link from "next/link";
import type { UserProfile } from "@/lib/matching";

type ApiMe = { user: UserProfile };

const NZ_REGIONS = [
  "Northland","Auckland","Waikato","Bay of Plenty","Gisborne","Hawke's Bay","Taranaki",
  "Manawatū-Whanganui","Wellington","Tasman","Nelson","Marlborough","West Coast",
  "Canterbury","Otago","Southland","Chatham Islands",
];

const BUDGETS = ["under-500","500-800","800-1200","1200-1600","1600-2000","over-2000"] as const;
type BudgetKey = typeof BUDGETS[number];

function getIdToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("idToken") || localStorage.getItem("id_token");
}

// minimal jwt decode (no signature verification)
function decodeJWT(token: string | null) {
  if (!token) return null;
  try {
    const p = token.split(".")[1];
    const json = atob(p.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export default function EditProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Form state
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [region, setRegion] = React.useState("");
  const [monthlyBudget, setMonthlyBudget] = React.useState<BudgetKey | "">("");

  const [bio, setBio] = React.useState("");
  const [profileImage, setProfileImage] = React.useState("");

  const [housingStatus, setHousingStatus] = React.useState<"has-space" | "looking-for-space">("looking-for-space");
  const [pets, setPets] = React.useState("ok-with-pets");
  const [petOwner, setPetOwner] = React.useState<"yes" | "no">("no");
  const [smoking, setSmoking] = React.useState("non-smoker");
  const [drinking, setDrinking] = React.useState("social-drinker");
  const [socialLevel, setSocialLevel] = React.useState("moderately-social");
  const [workStatus, setWorkStatus] = React.useState("full-time");
  const [morningPerson, setMorningPerson] = React.useState("early-bird");
  const [cookingStyle, setCookingStyle] = React.useState("sometimes");
  const [tvWatching, setTvWatching] = React.useState("occasional-viewer");
  const [cleanlinessLevel, setCleanlinessLevel] = React.useState("moderately-clean");
  const [guestPolicy, setGuestPolicy] = React.useState("occasional-guests");

  // keep userID handy
  const userIDRef = React.useRef<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    async function loadMe() {
      try {
        setError(null);
        setLoading(true);

        const token = getIdToken();
        if (!token) {
          setError("Please log in first.");
          return;
        }

        // fetch current user
        const meRes = await fetch("/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        });
        const meJson: ApiMe = await meRes.json();
        if (!meRes.ok) throw new Error((meJson as any)?.error || "Failed to load profile.");

        const me = meJson.user;
        userIDRef.current = me.userID;

        // Prefill with current values (fallbacks if empty)
        setFullName(me.fullName || decodeJWT(token)?.name || "");
        setEmail(me.email || decodeJWT(token)?.email || "");
        setRegion(me.region || "");
        setMonthlyBudget(((me.monthlyBudget as BudgetKey) || "") as BudgetKey | "");
        setBio(me.bio || "");
        setProfileImage(me.profileImage || "");

        setHousingStatus((me.housingStatus as any) || "looking-for-space");
        setPets(me.pets || "ok-with-pets");
        setPetOwner(me.petOwner ? "yes" : "no");
        setSmoking(me.smoking || "non-smoker");
        setDrinking(me.drinking || "social-drinker");
        setSocialLevel(me.socialLevel || "moderately-social");
        setWorkStatus(me.workStatus || "full-time");
        setMorningPerson(me.morningPerson || "early-bird");
        setCookingStyle(me.cookingStyle || "sometimes");
        setTvWatching(me.tvWatching || "occasional-viewer");
        setCleanlinessLevel(me.cleanlinessLevel || "moderately-clean");
        setGuestPolicy(me.guestPolicy || "occasional-guests");
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Something went wrong.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadMe();
    return () => {
      cancelled = true;
    };
  }, []);

  async function onSave() {
    try {
      setSaving(true);
      setError(null);

      const token = getIdToken();
      const claims = decodeJWT(token);
      const userID = userIDRef.current || claims?.sub;
      const safeEmail = email || claims?.email || "";
      const safeName = fullName || claims?.name || "";

      if (!userID || !safeEmail || !safeName) {
        throw new Error("Missing required fields (userID, email, fullName).");
      }

      const payload: Partial<UserProfile> & {
        userID: string; email: string; fullName: string; region: string; monthlyBudget: string; housingStatus: "has-space"|"looking-for-space";
        pets: string; petOwner: boolean; smoking: string; drinking: string; socialLevel: string; workStatus: string;
        morningPerson: string; cookingStyle: string; tvWatching: string; cleanlinessLevel: string; guestPolicy: string;
        bio?: string; profileImage?: string;
      } = {
        userID,
        email: safeEmail,
        fullName: safeName,
        region,
        monthlyBudget: monthlyBudget || "",
        housingStatus,
        pets,
        petOwner: petOwner === "yes",
        smoking,
        drinking,
        socialLevel,
        workStatus,
        morningPerson,
        cookingStyle,
        tvWatching,
        cleanlinessLevel,
        guestPolicy,
        bio,
        profileImage,
      };

      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const j = await res.json();
      if (!res.ok) throw new Error((j as any)?.error || "Failed to save profile.");

      // go back to browse after save
      router.push("/browse");
    } catch (e: any) {
      setError(e?.message || "Failed to save.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="p-6">Loading profile…</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Home className="h-8 w-8 text-rose-600" />
            <h1 className="text-2xl font-bold">ShareSpace</h1>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>Update your details and save.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <div className="rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14">
                {profileImage ? <AvatarImage src={profileImage} /> : <AvatarFallback>{fullName?.slice(0,2).toUpperCase() || "?"}</AvatarFallback>}
              </Avatar>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Profile Image URL</label>
                <Input value={profileImage} onChange={(e) => setProfileImage(e.target.value)} placeholder="https://…" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Region</label>
                <Select value={region} onValueChange={(v) => setRegion(v)}>
                  <SelectTrigger><SelectValue placeholder="Select region" /></SelectTrigger>
                  <SelectContent>
                    {NZ_REGIONS.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Monthly Budget</label>
                <Select value={monthlyBudget} onValueChange={(v: BudgetKey) => setMonthlyBudget(v)}>
                  <SelectTrigger><SelectValue placeholder="Select budget range" /></SelectTrigger>
                  <SelectContent>
                    {BUDGETS.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Bio</label>
              <textarea
                className="w-full rounded-md border bg-background p-2 text-sm"
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell potential flatmates a bit about you…"
              />
            </div>

            {/* Lifestyle / preferences */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Housing Status</label>
                <Select value={housingStatus} onValueChange={(v: "has-space" | "looking-for-space") => setHousingStatus(v)}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="has-space">Has Space</SelectItem>
                    <SelectItem value="looking-for-space">Looking for Space</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Pets Preference</label>
                <Select value={pets} onValueChange={setPets}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="love-pets">Love pets</SelectItem>
                    <SelectItem value="ok-with-pets">Ok with pets</SelectItem>
                    <SelectItem value="no-pets">No pets</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Are you a pet owner?</label>
                <Select value={petOwner} onValueChange={(v: "yes" | "no") => setPetOwner(v)}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Smoking</label>
                <Select value={smoking} onValueChange={setSmoking}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="non-smoker">Non-smoker</SelectItem>
                    <SelectItem value="smoker">Smoker</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Drinking</label>
                <Select value={drinking} onValueChange={setDrinking}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="non-drinker">Non-drinker</SelectItem>
                    <SelectItem value="social-drinker">Social drinker</SelectItem>
                    <SelectItem value="frequent-drinker">Frequent drinker</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Social Level</label>
                <Select value={socialLevel} onValueChange={setSocialLevel}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prefers-quiet">Prefers quiet</SelectItem>
                    <SelectItem value="moderately-social">Moderately social</SelectItem>
                    <SelectItem value="very-social">Very social</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Work Status</label>
                <Select value={workStatus} onValueChange={setWorkStatus}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                    <SelectItem value="unemployed">Unemployed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Daily Rhythm</label>
                <Select value={morningPerson} onValueChange={setMorningPerson}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="early-bird">Early bird</SelectItem>
                    <SelectItem value="night-owl">Night owl</SelectItem>
                    <SelectItem value="varies">Varies</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Cooking Style</label>
                <Select value={cookingStyle} onValueChange={setCookingStyle}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="love-cooking">Love cooking</SelectItem>
                    <SelectItem value="sometimes">Sometimes</SelectItem>
                    <SelectItem value="prefer-takeout">Prefer takeout</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">TV Watching</label>
                <Select value={tvWatching} onValueChange={setTvWatching}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="binge-watcher">Binge watcher</SelectItem>
                    <SelectItem value="occasional-viewer">Occasional viewer</SelectItem>
                    <SelectItem value="rarely">Rarely</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Cleanliness</label>
                <Select value={cleanlinessLevel} onValueChange={setCleanlinessLevel}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="very-clean">Very clean</SelectItem>
                    <SelectItem value="moderately-clean">Moderately clean</SelectItem>
                    <SelectItem value="relaxed">Relaxed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Guest Policy</label>
                <Select value={guestPolicy} onValueChange={setGuestPolicy}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no-guests">No guests</SelectItem>
                    <SelectItem value="occasional-guests">Occasional guests</SelectItem>
                    <SelectItem value="frequent-guests">Frequent guests</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => router.push("/browse")}>Cancel</Button>
              <Button onClick={onSave} disabled={saving}>
                {saving ? "Saving…" : "Save Changes"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

