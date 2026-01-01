import Navbar from "@/shared/UI/Navbar";
import Footer from "@/shared/UI/Footer";
import { useEffect } from "react";
import { Outlet, useNavigation, redirect, type LoaderFunctionArgs } from "react-router";
import { Spinner } from "@/components/ui/spinner";
import { authKeys, authQueryOptions } from "@/api/queries/authQueries";
import { supabase } from "@/lib/supabase";
import { useQueryClient, QueryClient } from "@tanstack/react-query";
import { authService } from "@/api/services/authApi";

export const rootLoader = (queryClient: QueryClient) => async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const token_hash = url.searchParams.get("token_hash");
    const type = url.searchParams.get("type");

    if (token_hash) {
        try {
           await authService.verifyOtp(token_hash, type as any || "email");
           // After successful verification, redirect to remove hash, but keep path if we can (though verification usually lands on root or specific place)
           // Let's redirect to root or the same path without search params
           return redirect(url.pathname);
        } catch (error) {
            console.error("Auth verification failed", error);
            // We could return error to show in an error boundary, or just redirect to login
            return redirect("/login");
        }
    }

    // Prefetch user session
    await queryClient.ensureQueryData(authQueryOptions.user());

    return null;
}

const RootLayout = () => {
    const navigation = useNavigation();
    const queryClient = useQueryClient();

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            queryClient.setQueryData(authKeys.session(), session);
            queryClient.setQueryData(authKeys.user(), session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, [queryClient]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {navigation.state === "loading" && <div className="flex items-center justify-center gap-4 py-8">
            <Spinner variant="primary" size="lg" />
          </div>}
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default RootLayout