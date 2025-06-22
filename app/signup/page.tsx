"use client";

import { useState } from "react";
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  ConfirmSignUpCommand,
  ResendConfirmationCodeCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const cognitoClient = new CognitoIdentityProviderClient({
  region: "ap-southeast-2",
});

const USER_POOL_ID = "ap-southeast-2_3SGRnUpf5";
const CLIENT_ID = "6bpvj6dq1kalujdu7mdieujtfl";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [showConfirmForm, setShowConfirmForm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const command = new SignUpCommand({
        ClientId: CLIENT_ID,
        Username: email,
        Password: password,
        UserAttributes: [
          {
            Name: "email",
            Value: email,
          },
        ],
      });

      const response = await cognitoClient.send(command);

      console.log("Sign up success:", response);

      setShowConfirmForm(true);
    } catch (err: any) {
      console.error("Sign up error:", err);
      setError(err.message || "Failed to sign up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmSignUp = async () => {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const command = new ConfirmSignUpCommand({
        ClientId: CLIENT_ID,
        Username: email,
        ConfirmationCode: confirmationCode,
      });

      const response = await cognitoClient.send(command);

      console.log("Confirm sign up success:", response);

      setSuccess(true);
    } catch (err: any) {
      console.error("Confirm sign up error:", err);
      setError(err.message || "Failed to confirm account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setLoading(true);
    setError("");

    try {
      const command = new ResendConfirmationCodeCommand({
        ClientId: CLIENT_ID,
        Username: email,
      });

      const response = await cognitoClient.send(command);

      console.log("Resend confirmation code success:", response);

      alert("Confirmation code resent. Please check your email.");
    } catch (err: any) {
      console.error("Resend code error:", err);
      setError(err.message || "Failed to resend confirmation code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded shadow max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>

        {success ? (
          <div className="text-green-600 text-lg mb-6">
            Your account has been confirmed! You can now sign in.
          </div>
        ) : showConfirmForm ? (
          <div className="space-y-4 mb-6 text-left">
            <p className="text-gray-700 mb-2">
              Please check your email for the confirmation code.
            </p>

            <div>
              <label className="block text-gray-700 mb-2">Confirmation Code</label>
              <Input
                type="text"
                placeholder="Enter confirmation code"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
                disabled={loading}
              />
            </div>

            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

            <Button onClick={handleConfirmSignUp} disabled={loading || !confirmationCode} className="w-full">
              {loading ? "Confirming..." : "Confirm Account"}
            </Button>

            <Button variant="outline" onClick={handleResendCode} disabled={loading} className="w-full mt-2">
              Resend Confirmation Code
            </Button>
          </div>
        ) : (
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
              <p className="text-gray-500 text-xs mt-1">
                Password must be at least 8 characters and include uppercase, lowercase, and a number.
              </p>

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

            <Button onClick={handleSignUp} disabled={loading} className="w-full">
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
          </div>
        )}

        {success && (
          <Button variant="outline" asChild className="w-full mt-4">
            <Link href="/signin">Go to Sign In</Link>
          </Button>
        )}

        {!success && (
          <>
            <p className="text-gray-600 text-sm mt-4">
              Already have an account?{" "}
              <Link href="/signin" className="text-rose-600 hover:underline">
                Sign in here
              </Link>
            </p>

            <Button variant="outline" asChild className="w-full mt-4">
              <Link href="/">Back to Home</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
