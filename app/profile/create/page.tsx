"use client";

import { useEffect, useState } from "react";
import { decodeJWT } from "@/lib/decodeJWT";
import { useAuthRedirect } from "@/lib/useAuthRedirect";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";

type DecodedToken = {
  sub?: string;
  email?: string;
  username?: string;
  [key: string]: unknown;
};

type Profile = {
  userID: string;
  email?: string;
  fullName?: string;
  region?: string;

  // Optional extended fields (we’ll map them if present)
  firstName?: string;
  lastName?: string;
  age?: string;
  location?: string;
  bio?: string;
  housingStatus?: string;
  propertyType?: string;
  availableRooms?: string;
  monthlyBudget?: string;
  moveInDate?: string;
  pets?: string;
  petOwner?: boolean;
  smoking?: string;
  drinking?: string;
  socialLevel?: string;
  workStatus?: string;
  agePreference?: string;
  cleanlinessLevel?: string;
  guestPolicy?: string;
  quietHours?: string;
  morningPerson?: string;
  cookingStyle?: string;
  tvWatching?: string;
  exerciseHabits?: string;
  spirituality?: string;

  [key: string]: any;
};

export default function CreateProfile() {
  const authLoading = useAuthRedirect();

  const [userID, setUserID] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [isEditMode, setIsEditMode] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    location: "",
    bio: "",
    housingStatus: "",
    propertyType: "",
    availableRooms: "",
    monthlyBudget: "",
    moveInDate: "",
    pets: "",
    petOwner: false,
    smoking: "",
    drinking: "",
    socialLevel: "",
    workStatus: "",
    agePreference: "",
    cleanlinessLevel: "",
    guestPolicy: "",
    quietHours: "",
    morningPerson: "",
    cookingStyle: "",
    tvWatching: "",
    exerciseHabits: "",
    spirituality: "",
  });

  // --- Token parsing + fallback to /api/users/me (same as before, robust) ---
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("id_token") : null;
    if (!token) return;

    const decoded = decodeJWT(token) as DecodedToken | null;

    const pickUserID = (d?: DecodedToken | null) =>
      d?.sub || (d && (d["cognito:username"] as string)) || d?.username || "";

    const pickEmail = (d?: DecodedToken | null) =>
      d?.email || (d && (d["cognito:email"] as string)) || (d && (d["custom:email"] as string)) || "";

    let uid = pickUserID(decoded);
    let mail = pickEmail(decoded);

    setUserID(uid);
    setEmail(mail);

    if (!uid || !mail) {
      (async () => {
        try {
          const res = await fetch("/api/users/me", {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
          });
          if (!res.ok) return;
          const data = await res.json();
          const user = data?.user || {};
          setUserID((prev) => prev || user.userID || user.sub || user.username || "");
          setEmail((prev) => prev || user.email || "");
        } catch {
          // ignore; submit will validate
        }
      })();
    }
  }, []);

  // --- Load existing profile (if any) and pre-fill the form ---
  useEffect(() => {
    if (!userID) return;

    (async () => {
      try {
        // Fetch all profiles and find mine (API contract: GET /api/users -> { profiles: [...] })
        const res = await fetch("/api/users", { cache: "no-store" });
        if (!res.ok) return;
        const json = await res.json();
        const profiles: Profile[] = json?.profiles ?? [];

        const me = profiles.find((p) => p.userID === userID);
        if (!me) {
          setIsEditMode(false);
          return;
        }

        setIsEditMode(true);

        // Prefer explicit first/last if stored; otherwise split fullName
        const splitName = (me.fullName || "").trim().split(" ");
        const guessedFirst = me.firstName || splitName[0] || "";
        const guessedLast = me.lastName || splitName.slice(1).join(" ") || "";

        setEmail((prev) => prev || me.email || "");
        setFormData((prev) => ({
          ...prev,
          firstName: guessedFirst || prev.firstName,
          lastName: guessedLast || prev.lastName,
          age: me.age ?? prev.age,
          location: me.location ?? me.region ?? prev.location,
          bio: me.bio ?? prev.bio,
          housingStatus: me.housingStatus ?? prev.housingStatus,
          propertyType: me.propertyType ?? prev.propertyType,
          availableRooms: me.availableRooms ?? prev.availableRooms,
          monthlyBudget: me.monthlyBudget ?? prev.monthlyBudget,
          moveInDate: me.moveInDate ?? prev.moveInDate,
          pets: me.pets ?? prev.pets,
          petOwner: typeof me.petOwner === "boolean" ? me.petOwner : prev.petOwner,
          smoking: me.smoking ?? prev.smoking,
          drinking: me.drinking ?? prev.drinking,
          socialLevel: me.socialLevel ?? prev.socialLevel,
          workStatus: me.workStatus ?? prev.workStatus,
          agePreference: me.agePreference ?? prev.agePreference,
          cleanlinessLevel: me.cleanlinessLevel ?? prev.cleanlinessLevel,
          guestPolicy: me.guestPolicy ?? prev.guestPolicy,
          quietHours: me.quietHours ?? prev.quietHours,
          morningPerson: me.morningPerson ?? prev.morningPerson,
          cookingStyle: me.cookingStyle ?? prev.cookingStyle,
          tvWatching: me.tvWatching ?? prev.tvWatching,
          exerciseHabits: me.exerciseHabits ?? prev.exerciseHabits,
          spirituality: me.spirituality ?? prev.spirituality,
        }));
      } catch {
        // ignore
      }
    })();
  }, [userID]);

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    const fullName = `${formData.firstName} ${formData.lastName}`.trim();

    if (!userID || !email || fullName.length < 2) {
      setMessage("❌ Please log in and enter your name.");
      setLoading(false);
      console.warn("Submission blocked — userID or email or name missing:", { userID, email, fullName });
      return;
    }

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // If needed for your API auth: Authorization: `Bearer ${localStorage.getItem("id_token") || ""}`,
        },
        body: JSON.stringify({
          userID,
          email,
          fullName,
          region: formData.location, // saved as 'region' in DB
          profileImage: "",
          ...formData,
        }),
      });

      const responseData = await res.json();
      console.log("✅ API Response:", responseData);

      if (res.ok) {
        setMessage(isEditMode ? "✅ Profile updated!" : "🎉 Profile created! You can now start browsing house shares.");
      } else {
        setMessage(`❌ Error: ${responseData.error || "Something went wrong"}`);
      }
    } catch (err) {
      console.error("❌ Network error:", err);
      setMessage("❌ Network error while saving.");
    }

    setLoading(false);
  };

  if (authLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{isEditMode ? "Edit Your Profile" : "Create Your Profile"}</CardTitle>
            <CardDescription>
              Step {step} of 4 - Let's help you find the perfect houseshare match
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Basic Information</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => updateFormData("firstName", e.target.value)}
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => updateFormData("lastName", e.target.value)}
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Select value={formData.age} onValueChange={(value) => updateFormData("age", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select age range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50-55">50-55</SelectItem>
                        <SelectItem value="56-60">56-60</SelectItem>
                        <SelectItem value="61-65">61-65</SelectItem>
                        <SelectItem value="66-70">66-70</SelectItem>
                        <SelectItem value="71+">71+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => updateFormData("location", e.target.value)}
                      placeholder="City, State"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">About You</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => updateFormData("bio", e.target.value)}
                    placeholder="Tell us about yourself, your interests, and what you're looking for in a houseshare..."
                    rows={4}
                  />
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Upload a profile photo</p>
                  <Button variant="outline" className="mt-2">
                    Choose File
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Housing Situation</h3>

                <div>
                  <Label>What's your housing status?</Label>
                  <RadioGroup
                    value={formData.housingStatus}
                    onValueChange={(value) => updateFormData("housingStatus", value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="has-space" id="has-space" />
                      <Label htmlFor="has-space">I have a home with space to share</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="looking-for-space" id="looking-for-space" />
                      <Label htmlFor="looking-for-space">I'm looking for a place to live</Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.housingStatus === "has-space" && (
                  <>
                    <div>
                      <Label>Property Type</Label>
                      <Select
                        value={formData.propertyType}
                        onValueChange={(value) => updateFormData("propertyType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="house">House</SelectItem>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="condo">Condo</SelectItem>
                          <SelectItem value="townhouse">Townhouse</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Available Rooms</Label>
                      <Select
                        value={formData.availableRooms}
                        onValueChange={(value) => updateFormData("availableRooms", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Number of rooms available" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 room</SelectItem>
                          <SelectItem value="2">2 rooms</SelectItem>
                          <SelectItem value="3">3+ rooms</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                <div>
                  <Label htmlFor="monthlyBudget">Monthly Budget/Rent</Label>
                  <Select
                    value={formData.monthlyBudget}
                    onValueChange={(value) => updateFormData("monthlyBudget", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-500">Under $500</SelectItem>
                      <SelectItem value="500-800">$500 - $800</SelectItem>
                      <SelectItem value="800-1200">$800 - $1,200</SelectItem>
                      <SelectItem value="1200-1600">$1,200 - $1,600</SelectItem>
                      <SelectItem value="1600-2000">$1,600 - $2,000</SelectItem>
                      <SelectItem value="over-2000">Over $2,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="moveInDate">Preferred Move-in Date</Label>
                  <Input
                    id="moveInDate"
                    type="date"
                    value={formData.moveInDate}
                    onChange={(e) => updateFormData("moveInDate", e.target.value)}
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Lifestyle & Preferences</h3>

                <div>
                  <Label>Pets</Label>
                  <RadioGroup
                    value={formData.pets}
                    onValueChange={(value) => updateFormData("pets", value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="love-pets" id="love-pets" />
                      <Label htmlFor="love-pets">Love pets - the more the merrier!</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ok-with-pets" id="ok-with-pets" />
                      <Label htmlFor="ok-with-pets">Okay with pets</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no-pets" id="no-pets" />
                      <Label htmlFor="no-pets">Prefer no pets</Label>
                    </div>
                  </RadioGroup>

                  <div className="flex items-center space-x-2 mt-3">
                    <Checkbox
                      id="petOwner"
                      checked={formData.petOwner}
                      onCheckedChange={(checked) => updateFormData("petOwner", checked)}
                    />
                    <Label htmlFor="petOwner">I have pets</Label>
                  </div>
                </div>

                <div>
                  <Label>Smoking</Label>
                  <RadioGroup
                    value={formData.smoking}
                    onValueChange={(value) => updateFormData("smoking", value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="non-smoker" id="non-smoker" />
                      <Label htmlFor="non-smoker">Non-smoker</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="occasional-smoker" id="occasional-smoker" />
                      <Label htmlFor="occasional-smoker">Occasional smoker (outside only)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="regular-smoker" id="regular-smoker" />
                      <Label htmlFor="regular-smoker">Regular smoker</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label>Drinking</Label>
                  <RadioGroup
                    value={formData.drinking}
                    onValueChange={(value) => updateFormData("drinking", value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="non-drinker" id="non-drinker" />
                      <Label htmlFor="non-drinker">Non-drinker</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="social-drinker" id="social-drinker" />
                      <Label htmlFor="social-drinker">Social drinker</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="regular-drinker" id="regular-drinker" />
                      <Label htmlFor="regular-drinker">Regular drinker</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label>Social Level</Label>
                  <RadioGroup
                    value={formData.socialLevel}
                    onValueChange={(value) => updateFormData("socialLevel", value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="very-social" id="very-social" />
                      <Label htmlFor="very-social">Love entertaining and having people over</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="moderately-social" id="moderately-social" />
                      <Label htmlFor="moderately-social">Enjoy occasional gatherings</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="quiet-homebody" id="quiet-homebody" />
                      <Label htmlFor="quiet-homebody">Prefer quiet, peaceful environment</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label>Work Status</Label>
                  <Select value={formData.workStatus} onValueChange={(value) => updateFormData("workStatus", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select work status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retired">Retired</SelectItem>
                      <SelectItem value="working-full-time">Working full-time</SelectItem>
                      <SelectItem value="working-part-time">Working part-time</SelectItem>
                      <SelectItem value="freelance">Freelance/Consultant</SelectItem>
                      <SelectItem value="volunteer">Volunteer work</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Compatibility Questions</h3>

                <div>
                  <Label>Are you a morning person or night owl?</Label>
                  <RadioGroup
                    value={formData.morningPerson}
                    onValueChange={(value) => updateFormData("morningPerson", value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="early-bird" id="early-bird" />
                      <Label htmlFor="early-bird">Early bird - up with the sun</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="moderate-schedule" id="moderate-schedule" />
                      <Label htmlFor="moderate-schedule">Moderate schedule</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="night-owl" id="night-owl" />
                      <Label htmlFor="night-owl">Night owl - stay up late</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label>Cooking style</Label>
                  <RadioGroup
                    value={formData.cookingStyle}
                    onValueChange={(value) => updateFormData("cookingStyle", value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="love-cooking" id="love-cooking" />
                      <Label htmlFor="love-cooking">Love cooking and sharing meals</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="basic-cooking" id="basic-cooking" />
                      <Label htmlFor="basic-cooking">Basic cooking for myself</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="minimal-cooking" id="minimal-cooking" />
                      <Label htmlFor="minimal-cooking">Minimal cooking - prefer takeout</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label>TV watching habits</Label>
                  <RadioGroup
                    value={formData.tvWatching}
                    onValueChange={(value) => updateFormData("tvWatching", value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="tv-lover" id="tv-lover" />
                      <Label htmlFor="tv-lover">Love watching TV and movies</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="occasional-viewer" id="occasional-viewer" />
                      <Label htmlFor="occasional-viewer">Occasional viewer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="rarely-watch" id="rarely-watch" />
                      <Label htmlFor="rarely-watch">Rarely watch TV</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label>Cleanliness level</Label>
                  <RadioGroup
                    value={formData.cleanlinessLevel}
                    onValueChange={(value) => updateFormData("cleanlinessLevel", value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="very-tidy" id="very-tidy" />
                      <Label htmlFor="very-tidy">Very tidy - everything in its place</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="moderately-clean" id="moderately-clean" />
                      <Label htmlFor="moderately-clean">Moderately clean and organized</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="relaxed-about-mess" id="relaxed-about-mess" />
                      <Label htmlFor="relaxed-about-mess">Relaxed about occasional mess</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label>Guest policy preference</Label>
                  <RadioGroup
                    value={formData.guestPolicy}
                    onValueChange={(value) => updateFormData("guestPolicy", value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="guests-welcome" id="guests-welcome" />
                      <Label htmlFor="guests-welcome">Guests welcome anytime</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="occasional-guests" id="occasional-guests" />
                      <Label htmlFor="occasional-guests">Occasional guests with notice</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="rare-guests" id="rare-guests" />
                      <Label htmlFor="rare-guests">Prefer minimal guests</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6">
              {step > 1 && <Button variant="outline" onClick={prevStep}>Previous</Button>}
              {step < 4 ? (
                <Button onClick={nextStep} className="ml-auto">Next</Button>
              ) : (
                <Button
                  className="ml-auto"
                  onClick={handleSubmit}
                  disabled={loading}
                  type="button"
                >
                  {loading ? "Saving..." : isEditMode ? "Save Profile" : "Create Profile"}
                </Button>
              )}
            </div>

            {message && (
              <p className="text-sm text-center pt-4 text-rose-600">{message}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
