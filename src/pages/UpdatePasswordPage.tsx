import { useState } from "react";
import { useNavigate } from "react-router";
import { useUpdateUserPasswordOptions } from "@/api/queries/authQueries";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

export default function UpdatePasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const updatePassword = useMutation({
    ...useUpdateUserPasswordOptions(),
    onSuccess:()=>{
      alert("Password updated successfully!");
      navigate("/");
    }
  });

  const handleSubmit = (fd:FormData) => {
    const password=fd.get("password");
    const confirmPassword=fd.get("confirmPassword");
    
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    updatePassword.mutate(password as string);    
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Update Password</CardTitle>
            <CardDescription>
              Enter your new password below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={handleSubmit} className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="password">New Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={updatePassword.isPending}>
                {updatePassword.isPending ? "Updating..." : "Update Password"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
