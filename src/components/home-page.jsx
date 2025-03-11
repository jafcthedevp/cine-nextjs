"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AuthForm({ mode }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add authentication logic here
    console.log({ email, password, name })
  }

  return (
    <div className="space-y-6 p-4">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">{mode === "login" ? "Welcome Back" : "Create Account"}</h2>
        <p className="text-sm text-muted-foreground">
          {mode === "login"
            ? "Enter your credentials to access your account"
            : "Enter your information to create an account"}
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "register" && (
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full bg-red-500 text-white hover:bg-red-600">
          {mode === "login" ? "Sign In" : "Sign Up"}
        </Button>
      </form>
    </div>
  )
}

