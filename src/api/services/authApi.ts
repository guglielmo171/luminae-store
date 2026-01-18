import { supabase } from "@/lib/supabase";
import { handleAuthCall } from "../utils/apiUtils";

export const authService = {
  signInWithMagicLink: (email: string) =>
    handleAuthCall(
      supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: window.location.origin },
      }),
      "signInWithMagicLink"
    ),

  handleProtocolParams: async (url: URL) => {
    const token_hash = url.searchParams.get("token_hash");
    const type = url.searchParams.get("type");
    const code = url.searchParams.get("code");

    if (token_hash) {
      await authService.verifyOtp(token_hash, (type as any) || "email");
      return true;
    }

    if (code) {
      await handleAuthCall(
        supabase.auth.exchangeCodeForSession(code),
        "exchangeCodeForSession"
      );
      return true;
    }

    return false;
  },

  signInWithPassword: ({ email, password }: { email: string; password: string }) =>
    handleAuthCall(
      supabase.auth.signInWithPassword({ email, password }),
      "signInWithPassword"
    ),

  signUp: ({ email, password }: { email: string; password: string }) =>
    handleAuthCall(
      supabase.auth.signUp({ email, password }),
      "signUp"
    ),

  verifyOtp: (token_hash: string, type: any) =>
    handleAuthCall(
      supabase.auth.verifyOtp({ token_hash, type }),
      "verifyOtp"
    ),

  getSession: async () => {
    const data = await handleAuthCall(
      supabase.auth.getSession(),
      "getSession",
      { session: null } as any
    );
    return data?.session;
  },

  userDataDetail: () =>
    handleAuthCall(
      supabase.auth.getUser(),
      "getUser",
      { user: null } as any
    ),
  userData: async () => {
    // const [data,profile] = await Promise.all([
    //     authService.userDataDetail(),
    //     supabase.from('profiles').select(),
    //   ]);

    const data = await authService.userDataDetail();
    const profile = !data.user ? null : await supabase.from('profiles').select();
    // let role 
    // console.log('profile ',profile);

    return {...data?.user,profile_role:profile?.data?.[0]?.role};

  },

  signOut: () =>
    handleAuthCall(
      supabase.auth.signOut(),
      "signOut"
    ),

  resetPasswordForEmail: (email: string) =>
    handleAuthCall(
      supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      }),
      "resetPasswordForEmail"
    ),

  updateUserPassword: (password: string) =>
    handleAuthCall(
      supabase.auth.updateUser({ password }),
      "updateUserPassword"
    ),
};
