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
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from 'react-hook-form'



import { useResetPasswordOptions, useSignInWithPasswordOptions, useSignUpOptions } from "@/api/queries/authQueries"
import { authService } from "@/api/services/authApi"
import { authSchema, type AuthFormData } from "@/api/types/Product.interface"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { toast } from "sonner"

const socialProviders = [
  {
    id: "google",
    name: "Google",
    icon:  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .533 5.333.533 12S5.867 24 12.48 24c3.44 0 6.013-1.133 8.053-3.24 2.107-2.187 2.76-5.413 2.76-7.84 0-.667-.093-1.16-.253-1.84h-10.553z"
                        fill="currentColor"
                      />
                    </svg>,
    color: "text-primary",
  },
  {id:"apple", name:"Apple", icon:  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-4 w-4" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.24-.93 4.1-.73 1.09.13 2.08.62 2.77 1.47-2.58 1.6-2.12 6.54 1.05 7.82-1.35 3.32-3.1 3.56-2.99 3.67zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.16 2.22-1.61 4.2-3.74 4.25z"/>
                    </svg>,
    color: "text-primary",
     
  }
]

// interface FormState{ errors: string[] | null, formData?:Partial<FormDataState> }
// interface FormDataState{
//   email:string,
//   password:string
// }

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [mode, setMode] = useState<"login" | "signup" | "magic_link" | "forgot_password">("login")
  const navigate = useNavigate()
  const form = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: { 
      email: '', 
      password: '', 
      mode: "login" 
    },
    mode: 'onBlur',       // Valida prima volta solo al click
    reValidateMode: 'onChange', // Rimuove l'errore mentre correggi
  });

  // [DEBUG] useForm:
useEffect(() => {
  const subscription = form.watch((_, __) => {
    // console.log('FIELD CHANGE:', name, value);
  });
  return () => subscription.unsubscribe();
}, [form.watch]);

useEffect(() => {
  console.log('ERRORS UPDATE:', form.formState.errors);
}, [form.formState.errors]);




const handleModeChange = (newMode:"login" | "signup" | "magic_link" | "forgot_password") => {
  setMode(newMode); 
  form.setValue('mode', newMode);
  form.clearErrors(); 
}

  const {mutate:signInWithMagicLink,isPending:isSignInWithMagicLinkPending} = useMutation({
    mutationFn: authService.signInWithMagicLink,
    onSuccess:()=>{
      toast.success("Check your email for the login link!")
    }
  });
  const {mutate:signInWithPassword,isPending:isSignInWithPasswordPending} = useMutation({
    ...useSignInWithPasswordOptions(),
    onSuccess:()=>{
      form.reset(); 
      toast.success('Logged in successfully!');
      navigate("/")
    }
  })
  const {mutate:signUp,isPending:isSignUpPending} = useMutation({
    ...useSignUpOptions(),
    onSuccess:()=>{
      toast.success("Account created! Please check your email to verify your account.")
      handleModeChange("login")

    }
  })
  const {mutate:resetPassword,isPending:isResetPasswordPending} = useMutation({
    ...useResetPasswordOptions(),
    onSuccess:()=>{
      toast.success("Password reset link sent to your email!")
      handleModeChange("login")
    }
  })

  console.log('FORM ERRORS', form.formState.errors);


  const onSubmit= (data:AuthFormData)=>{
    const { email, password } = data;

    switch (mode) {
    case 'login':
      signInWithPassword({ email, password:password! });
      break;
    case 'magic_link':
      signInWithMagicLink(email);
      break;
    case 'signup':
      signUp({ email, password:password! });
      break;
    case 'forgot_password':
      resetPassword(email);
      break;
  } 
  }

  const dynamicText={
    title:mode === "magic_link"
                  ? "Login with Magic Link"
                  : mode === "signup"
                  ? "Create an account"
                  : mode === "forgot_password"
                  ? "Reset Password"
                  : "Login",
    description:mode === "magic_link"
                  ? "Enter your email to receive a login link"
                  : mode === "signup"
                  ? "Enter your email below to create your account"
                  : mode === "forgot_password"
                  ? "Enter your email to receive a reset link"
                  : "Enter your email below to login to your account",
    loading:mode === "magic_link"
                  ? "Send magic link"
                  : mode === "signup"
                  ? "Create account"
                  : mode === "forgot_password"
                  ? "Send reset link"
                  : "Log in",
    switchMode:mode === "magic_link"
                  ? "Login with Password"
                  : mode === "forgot_password"
                  ? "Back to Login"
                  : "Login with Magic Link",
    
  }

  const isAuthPending = isSignInWithMagicLinkPending || isSignInWithPasswordPending || isSignUpPending || isResetPasswordPending

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                {dynamicText.title}
              </CardTitle>
              <CardDescription>
                {dynamicText.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form  onSubmit={form.handleSubmit(onSubmit)} noValidate>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      {...form.register('email')}
                      aria-invalid={!!form.formState.errors.email}
                    />
                     {form.formState.errors.email && (
                          <p className="text-destructive text-sm mt-1">
                            {form.formState.errors.email.message}
                          </p>
                        )}
                  </div>
                  {mode !== "magic_link" && mode !== "forgot_password" && (
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        {mode === "login" && (
                            <button
                              type="button"
                              onClick={() => handleModeChange("forgot_password")}
                              className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                            >
                              Forgot your password?
                            </button>
                        )}
                      </div>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          {...form.register('password')}
                          aria-invalid={!!form.formState.errors.password}
                        />
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
                      </div>
                        {form.formState.errors.password && (
  <p className="text-destructive text-sm mt-1"> {form.formState.errors.password.message}</p>
)}
                    </div>
                  )}
                  <Button type="submit" className="w-full" disabled={isAuthPending}>
                    {(isAuthPending)
                        ? "Loading..."
                        : dynamicText.loading
                    }
                  </Button>
                  <div className="text-center text-sm">
                    <button
                      type="button"
                      onClick={() => handleModeChange(mode === "login" ? "magic_link" : "login")}
                      className="underline underline-offset-4"
                    >
                      {dynamicText.switchMode}
                    </button>
                  </div>
                  <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                  <div className="flex flex-col gap-4">
                    {socialProviders.map(s => (<Button key={s.id} type="button" variant="outline" className="w-full">
                      {s.icon}
                      {s.name}
                    </Button>))}
                  </div>
                </div>
                <div className="mt-4 text-center text-sm">
                  {mode === "signup" ? "Already have an account? " : "Don't have an account? "}
                  <button
                    type="button"
                    onClick={() => handleModeChange(mode === "signup" ? "login" : "signup")}
                    className="underline underline-offset-4"
                  >
                    {mode === "signup" ? "Login" : "Sign up"}
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
