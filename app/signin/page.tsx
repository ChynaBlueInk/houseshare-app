"use client";

import { useState } from "react";
import { CognitoIdentityProviderClient, InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const cognitoClient = new CognitoIdentityProviderClient({
  region: "ap-southeast-2",
});

const USER_POOL_ID = "ap-southeast-2_3SGRnUpf5";
const CLIENT_ID = "6bpvj6dq1kalujdu7mdieujtfl";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

 const handleSignIn = async () => {
  setLoading(true);
  setError("");

  try {
    const command = new InitiateAuthCommand({
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: CLIENT_ID,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    });

    const response = await cognitoClient.send(command);

    console.log("Sign in success:", response);

    // Store tokens in localStorage
    localStorage.setItem("id_token", response.AuthenticationResult?.IdToken || "");
    localStorage.setItem("access_token", response.AuthenticationResult?.AccessToken || "");
    localStorage.setItem("refresh_token", response.AuthenticationResult?.RefreshToken || "");

    // Redirect to Home after login
    window.location.href = "/";
  } catch (err: any) {
    console.error("Sign in error:", err);

    if (err.name === "UserNotConfirmedException") {
      setError("Your account is not confirmed. Please check your email for the confirmation code.");
    } else {
      setError(err.message || "Failed to sign in. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded shadow max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>

        <div className="space-y-4 mb-6 text-left">
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />

            <div className="flex items-center gap-2 mt-2">
              <Checkbox
                id="showPassword"
                checked={showPassword}
                onCheckedChange={(checked) => setShowPassword(Boolean(checked))}
              />
              <label htmlFor="showPassword" className="text-sm text-gray-600">
                Show password
              </label>
            </div>
          </div>

          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </div>

        <Button onClick={handleSignIn} disabled={loading} className="w-full">
          {loading ? "Signing in..." : "Sign In"}
        </Button>

        <p className="text-gray-600 text-sm mt-4">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-rose-600 hover:underline">
            Sign up here
          </Link>
        </p>

        <Button variant="outline" asChild className="w-full mt-4">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
