"use client"

import { useState } from "react"
import Link from "next/link"
import { CognitoIdentityProviderClient, ConfirmForgotPasswordCommand } from "@aws-sdk/client-cognito-identity-provider"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

const cognitoClient = new CognitoIdentityProviderClient({ region: "ap-southeast-2" })
const CLIENT_ID = "6bpvj6dq1kalujdu7mdieujtfl"

export default function ResetPassword() {
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleReset = async () => {
    setError("")
    setMessage("")
    try {
      const command = new ConfirmForgotPasswordCommand({
        ClientId: CLIENT_ID,
        Username: email,
        ConfirmationCode: code,
        Password: newPassword
      })
      await cognitoClient.send(command)
      setMessage("Password reset successful. You can now sign in.")
    } catch (err) {
      console.error(err)
      setError("Reset failed. Double check your code and try again.")
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 px-4">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>

      <Input placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input placeholder="Verification code" value={code} onChange={(e) => setCode(e.target.value)} className="mt-2" />

      <Input
        type={showPassword ? "text" : "password"}
        placeholder="New password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="mt-2"
      />

      <div className="flex items-center space-x-2 mt-2">
        <Checkbox id="show-password" checked={showPassword} onCheckedChange={() => setShowPassword(!showPassword)} />
        <label htmlFor="show-password" className="text-sm">Show password</label>
      </div>

      <Button className="mt-4 w-full" onClick={handleReset}>Reset Password</Button>

      {message && <p className="text-green-600 mt-2">{message}</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}

      <p className="mt-6 text-sm text-center">
        <Link href="/signin" className="text-blue-600 hover:underline">← Back to Sign In</Link>
      </p>
    </div>
  )
}
