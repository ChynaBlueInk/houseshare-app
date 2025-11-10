// components/match-details-modal.tsx
"use client";

import Link from "next/link";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  AlertTriangle,
  Heart,
  Users,
  Home,
  DollarSign,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { type MatchScore, getMatchColor, getMatchLabel } from "@/lib/matching";

interface MatchDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  matchScore: MatchScore;
  profileName: string;
  bio?: string;

  // 🔹 New fields to show key info + enable messaging
  region?: string;
  monthlyBudget?: string;
  housingStatus?: "has-space" | "looking-for-space";
  userID?: string; // to link to /messages?to=...
}

export function MatchDetailsModal({
  isOpen,
  onClose,
  matchScore,
  profileName,
  bio,
  region,
  monthlyBudget,
  housingStatus,
  userID,
}: MatchDetailsModalProps) {
  const { overallScore, breakdown, dealBreakers, strengths } = matchScore;

  const categories = [
    {
      name: "Location",
      score: breakdown.location,
      icon: MapPin,
      description: "Geographic compatibility and proximity",
    },
    {
      name: "Budget",
      score: breakdown.budget,
      icon: DollarSign,
      description: "Financial compatibility and budget alignment",
    },
    {
      name: "Housing",
      score: breakdown.housing,
      icon: Home,
      description: "Housing arrangement compatibility",
    },
    {
      name: "Lifestyle",
      score: breakdown.lifestyle,
      icon: Users,
      description: "Daily living habits and preferences",
    },
    {
      name: "Compatibility",
      score: breakdown.compatibility,
      icon: Heart,
      description: "Personal compatibility factors",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex flex-col gap-3">
            {/* Title + Score */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-base sm:text-lg">Match Details with {profileName}</span>
              <Badge variant="outline" className={`${getMatchColor(overallScore)} border-current`}>
                {overallScore}% {getMatchLabel(overallScore)}
              </Badge>
            </div>

            {/* 🔹 Profile highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <MapPin className="h-4 w-4 text-gray-600" />
                <span>{region || "Region not set"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <DollarSign className="h-4 w-4 text-gray-600" />
                <span>{monthlyBudget || "Budget not set"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Home className="h-4 w-4 text-gray-600" />
                <span>
                  {housingStatus === "has-space"
                    ? "Has space"
                    : housingStatus === "looking-for-space"
                    ? "Looking for space"
                    : "Housing not set"}
                </span>
              </div>
            </div>

            {/* Optional bio */}
            {bio && <p className="text-sm text-gray-600 leading-relaxed">{bio}</p>}
          </DialogTitle>

          <DialogDescription>
            Detailed compatibility breakdown based on your profile preferences
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Big Score */}
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className={`text-4xl font-bold ${getMatchColor(overallScore)} mb-2`}>{overallScore}%</div>
            <div className="text-lg font-semibold text-gray-700 mb-2">{getMatchLabel(overallScore)}</div>
            <Progress value={overallScore} className="w-full max-w-xs mx-auto" />
          </div>

          {/* Breakdown */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Compatibility Breakdown</h3>
            <div className="space-y-4">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <div key={category.name} className="flex items-center gap-4 p-4 border rounded-lg">
                    <Icon className="h-5 w-5 text-gray-600" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{category.name}</span>
                        <span className={`font-semibold ${getMatchColor(category.score)}`}>{category.score}%</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                      <Progress value={category.score} className="h-2" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Strengths */}
          {strengths.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Compatibility Strengths
              </h3>
              <div className="space-y-2">
                {strengths.map((strength, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-green-800">{strength}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dealbreakers */}
          {dealBreakers.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                Important Considerations
              </h3>
            <div className="space-y-2">
                {dealBreakers.map((dealBreaker, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0" />
                    <span className="text-sm text-amber-800">{dealBreaker}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 🔹 Actions */}
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
            {userID && (
              <Link href={`/messages?to=${encodeURIComponent(userID)}`} className="sm:w-auto w-full">
                <Button className="w-full">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Message
                </Button>
              </Link>
            )}
            {userID && (
              <Link href={`/profile/${encodeURIComponent(userID)}`} className="sm:w-auto w-full">
                <Button variant="outline" className="w-full">View full profile</Button>
              </Link>
            )}
          </div>

          {/* Guidance */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Recommendations</h4>
            <div className="text-sm text-blue-800 space-y-1">
              {overallScore >= 80 && <p>• This is an excellent match! Consider reaching out to start a conversation.</p>}
              {overallScore >= 60 && overallScore < 80 && <p>• This is a good potential match. Focus on discussing areas where you align.</p>}
              {overallScore >= 40 && overallScore < 60 && <p>• This match has potential but may require more discussion.</p>}
              {overallScore < 40 && <p>• This match may be challenging. Consider if the differences are manageable for you.</p>}
              {dealBreakers.length > 0 && <p>• Discuss the considerations listed above before committing.</p>}
              <p>• Compatibility scores are a starting point — personal connection matters too.</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
