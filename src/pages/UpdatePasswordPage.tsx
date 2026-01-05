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
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import { useActionState, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function UpdatePasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const updatePassword = useMutation({
    ...useUpdateUserPasswordOptions(),
    onSuccess:()=>{
      // alert("Password updated successfully!");
      toast.success("Password updated successfully!");
      navigate("/");
    }
  });
type FormState=
|{
  error:string,
  data:{
    password:string,
    confirmPassword:string
  }
}|{
  error:null
}|null
  const handleSubmit = (prevData:FormState,fd:FormData) => {
    console.log('prevData',prevData);
    
    const password=fd.get("password") as string;
    const confirmPassword=fd.get("confirmPassword") as string;
    
    if (password !== confirmPassword) {
      // alert("Passwords do not match!");
      // toast.error("Le password non coincidono!");
      return {
        error:"Le password non coincidono!",
        data:{
          password,
          confirmPassword
        }
      };
    }
    updatePassword.mutate(password as string);    
    return {error:null}
  };

  const [formState,formAction]=useActionState(handleSubmit,null)

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
            <form action={formAction} className="grid gap-6" noValidate>
              <div className="grid gap-2">
                <Label htmlFor="password">New Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    defaultValue={formState?.data?.password}
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
                  defaultValue={formState?.data?.confirmPassword}
                  required
                />
              </div>
              {formState?.error && <small className="text-destructive">{formState.error}</small>}
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
