import { useNavigate } from "react-router";
import { Lock, ShieldAlert, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-lg border-red-100">
        <CardHeader className="text-center space-y-4 pb-2">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Lock className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Access Restricted</CardTitle>
            <CardDescription className="text-gray-500 text-base">
              This area is restricted to authorized administrators only.
            </CardDescription>
        </CardHeader>
        <CardContent className="text-center pb-6">
           <div className="bg-red-50 text-red-700 px-4 py-3 rounded-md text-sm flex items-start gap-3 text-left">
             <ShieldAlert className="h-5 w-5 shrink-0 mt-0.5" />
             <p>Please log in with an administrator account to verify your identity and access the dashboard.</p>
           </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button 
            className="w-full h-11 text-base group" 
            onClick={() => navigate("/login?redirect=/admin")}
          >
            Log In as Admin
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            variant="ghost" 
            className="w-full"
            onClick={() => navigate("/")}
          >
            Return to Store
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UnauthorizedPage;
