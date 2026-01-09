import {
  authQueryOptions,
  useSignOutOptions
} from "@/api/queries/authQueries";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import {
  Activity,
  LogOut,
  Mail,
  MapPin,
  Phone,
  Settings,
  Shield,
  User
} from "lucide-react";
import { Suspense } from "react";
import { Link, useNavigate } from "react-router";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { data: user } = useSuspenseQuery(authQueryOptions.user());
  const {mutate:handleSignOut,isPending} = useMutation({
    ...useSignOutOptions(),
    onSuccess:()=>{
      navigate("/");
    }
  });

  // Format dates
  const lastSignIn = user.last_sign_in_at
    ? new Date(user.last_sign_in_at).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Never";

  const joinedAt = user.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Unknown";

  return (
    <div className="container max-w-5xl py-10 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate("/")}>
            Back to Home
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={()=>handleSignOut()}
            disabled={isPending}
          >
            {isPending ? (
              "Sign out..."
            ) : (
              <>
                <LogOut className="mr-2 h-4 w-4" /> Sign Out
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-[300px_1fr]">
        <Suspense fallback={(
      <div className="flex h-[50vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-muted-foreground animate-pulse">
            Loading profile...
          </p>
        </div>
      </div>
    )}>
      {!user &&  <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 text-center">
        <div className="rounded-full bg-muted p-6">
          <User className="h-10 w-10 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Access Restricted</h2>
          <p className="text-muted-foreground">
            Please log in to view your profile information.
          </p>
        </div>
        <Button onClick={() => navigate("/login")} size="lg">
          Go to Login
        </Button>
      </div>}
      {!!user && <>
        <div className="space-y-6">
          <Card className="overflow-hidden border-none shadow-lg">
            <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
            <CardContent className="-mt-12 flex flex-col items-center space-y-4 pt-0">
              <Avatar className="h-24 w-24 border-4 border-background shadow-sm">
                <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || "Profile"} />
                <AvatarFallback className="bg-secondary text-4xl font-bold text-secondary-foreground uppercase">
                  {user.email?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl font-bold truncate max-w-[250px]">{user.email}</h2>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <Badge variant="secondary" className="font-normal text-xs">
                    {user?.profile_role}
                  </Badge>
                  {user.app_metadata?.provider && (
                    <Badge variant="outline" className="font-normal text-xs">
                      {user.app_metadata.provider}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="w-full space-y-2 pt-4">
                 <div className="flex justify-between text-sm py-2 border-b">
                    <span className="text-muted-foreground">Status</span>
                    <span className="font-medium flex items-center gap-1 text-green-600">
                      <span className="flex h-2 w-2 rounded-full bg-green-600" /> Active
                    </span>
                 </div>
                 <div className="flex justify-between text-sm py-2 border-b">
                    <span className="text-muted-foreground">Joined</span>
                    <span className="font-medium">{joinedAt}</span>
                 </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* General Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                <CardTitle>General Information</CardTitle>
              </div>
              <CardDescription>
                Basic details about your account identity.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none text-muted-foreground">
                    Email Address
                  </label>
                  <div className="flex items-center rounded-md border bg-muted/50 px-3 py-2 text-sm">
                    <Mail className="mr-2 h-4 w-4 opacity-50" />
                    {user.email}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none text-muted-foreground">
                    User ID
                  </label>
                   <div className="flex items-center rounded-md border bg-muted/50 px-3 py-2 text-sm font-mono text-muted-foreground">
                    <Shield className="mr-2 h-4 w-4 opacity-50" />
                    {user.id}
                  </div>
                </div>
                 <div className="space-y-2">
                  <label className="text-sm font-medium leading-none text-muted-foreground">
                    Phone
                  </label>
                   <div className="flex items-center rounded-md border bg-muted/50 px-3 py-2 text-sm">
                    <Phone className="mr-2 h-4 w-4 opacity-50" />
                    {user.phone || "Not provided"}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none text-muted-foreground">
                    Location
                  </label>
                   <div className="flex items-center rounded-md border bg-muted/50 px-3 py-2 text-sm">
                    <MapPin className="mr-2 h-4 w-4 opacity-50" />
                    Not set
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security & Activity */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                <CardTitle>Security & Activity</CardTitle>
              </div>
              <CardDescription>
                Recent session activity and security details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="space-y-4">
                  <div className="flex items-start justify-between rounded-lg border p-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Last Sign In</p>
                      <p className="text-sm text-muted-foreground">
                        Your account was last accessed on {lastSignIn}
                      </p>
                    </div>
                     <Badge variant="outline" className="ml-auto">Success</Badge>
                  </div>
                   <div className="flex items-start justify-between rounded-lg border p-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Password</p>
                      <p className="text-sm text-muted-foreground">
                        Auth method: Magic Link / OTP. No password set.
                      </p>
                    </div>
                    <Link to="/update-password">
                    <Button variant="ghost" size="sm" className="ml-auto h-8" >Change password</Button>
                    </Link>
                  </div>
               </div>
            </CardContent>
          </Card>
        </div>
      </>}

    </Suspense>
     
      </div>
    </div>
  );
}
