import Navbar from "@/shared/UI/Navbar";
import Footer from "@/shared/UI/Footer";
import { useEffect } from "react";
import { Outlet, useNavigation, redirect, type LoaderFunctionArgs, useSearchParams } from "react-router";
import { Spinner } from "@/components/ui/spinner";
import { authKeys, authQueryOptions } from "@/api/queries/authQueries";
import { supabase } from "@/lib/supabase";
import { useQueryClient, QueryClient } from "@tanstack/react-query";
import { authService } from "@/api/services/authApi";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export const rootLoader = (queryClient: QueryClient) => async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    try {
      const wasAuthHandled  = await authService.handleProtocolParams(url);
    if (wasAuthHandled) return redirect(url.pathname);

    await queryClient.ensureQueryData(authQueryOptions.user());

    } catch (error) {
      console.error("Auth initialization failed", error);
        return redirect("/login");
    }
    return null;
}

const RootLayout = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            queryClient.setQueryData(authKeys.session(), session);
            queryClient.setQueryData(authKeys.user(), session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, [queryClient]);

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const errorMsg = hashParams.get("error_description");

    if (errorMsg) {
      toast.error(decodeURIComponent(errorMsg.replace(/\+/g, " ")));

      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Toaster richColors closeButton={true} />
      <main className="flex-grow">
        {navigation.state === "loading" && (
          <div className="flex items-center justify-center gap-4 py-8">
            <Spinner variant="primary" size="lg" />
          </div>
        )}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout