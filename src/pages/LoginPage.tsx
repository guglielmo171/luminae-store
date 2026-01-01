import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router"

import { authService } from "@/api/services/authApi"
import { useMutation } from "@tanstack/react-query"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isPasswordFocus, setIsPasswordFocus] = useState(false)
  const [isMagicLink, setIsMagicLink] = useState(false)
  const [email, setEmail] = useState("")
  const signInWithMagicLink = useMutation({
    mutationFn: authService.signInWithMagicLink,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isMagicLink) {
      try {
        await signInWithMagicLink.mutateAsync(email)
        alert("Check your email for the login link!")
      } catch (error: any) {
        alert(error.error_description || error.message)
      }
    } else {
      // Handle standard password login here later
      console.log("Password login not implemented yet")
    }
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                {isMagicLink ? "Magic Link" : "Login"}
              </CardTitle>
              <CardDescription>
                {isMagicLink
                  ? "Enter your email to receive a login link"
                  : "Enter your email below to login to your account"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
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
                  {!isMagicLink && (
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <a
                          href="#"
                          className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </a>
                      </div>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          required
                          onFocus={() => setIsPasswordFocus(true)}
                          onBlur={() => setIsPasswordFocus(false)}
                        />
                        {isPasswordFocus && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" aria-hidden="true" />
                            ) : (
                              <Eye className="h-4 w-4" aria-hidden="true" />
                            )}
                            <span className="sr-only">
                              {showPassword ? "Hide password" : "Show password"}
                            </span>
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                  <Button type="submit" className="w-full" disabled={signInWithMagicLink.isPending}>
                    {signInWithMagicLink.isPending ? "Loading..." : (isMagicLink ? "Send Magic Link" : "Login")}
                  </Button>
                  <div className="text-center text-sm">
                    <button
                      type="button"
                      onClick={() => setIsMagicLink(!isMagicLink)}
                      className="underline underline-offset-4"
                    >
                      {isMagicLink
                        ? "Login with Password"
                        : "Login with Magic Link"}
                    </button>
                  </div>
                  <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                  <div className="flex flex-col gap-4">
                  <Button variant="outline" className="w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .533 5.333.533 12S5.867 24 12.48 24c3.44 0 6.013-1.133 8.053-3.24 2.107-2.187 2.76-5.413 2.76-7.84 0-.667-.093-1.16-.253-1.84h-10.553z"
                        fill="currentColor"
                      />
                    </svg>
                    Login with Google
                  </Button>
                  <Button variant="outline" className="w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-4 w-4" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.24-.93 4.1-.73 1.09.13 2.08.62 2.77 1.47-2.58 1.6-2.12 6.54 1.05 7.82-1.35 3.32-3.1 3.56-2.99 3.67zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.16 2.22-1.61 4.2-3.74 4.25z"/>
                    </svg>
                   Login with Apple
                  </Button>
                  </div>
                </div>
                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link to="/signup" className="underline underline-offset-4">
                    Sign up
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
