import { supabase } from "@/lib/supabase";
import type { EmailOtpType } from "@supabase/supabase-js";
import { DEFAULT_OTP_TYPE, DEFAULT_USER_ROLE, isValidOtpType, type UserWithRole } from "../types/Auth.interface";
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
      const otpType:EmailOtpType=isValidOtpType(type) 
      ? type
      : DEFAULT_OTP_TYPE;
      
      await authService.verifyOtp(token_hash,otpType);
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

  verifyOtp: (token_hash: string, type: EmailOtpType ) =>
    handleAuthCall(
      supabase.auth.verifyOtp({ token_hash, type }),
      "verifyOtp"
    ),

  getSession: async () => {
    const data = await handleAuthCall(
      supabase.auth.getSession(),
      "getSession"
      // { session: null } as any
    );
    return data?.session ?? null;
  },

  userDataDetail: () =>
    handleAuthCall(
      supabase.auth.getUser(),
      "getUser"
      // { user: null } as any
    ),
  userData: async () : Promise<UserWithRole | null> => {
    const data = await authService.userDataDetail();
    if(!data?.user) return null;
    const {data:profile,error:profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('user_id', data.user.id)
    .single();
    if(profileError){
      console.error('[Auth] Failed to fetch profile:', profileError);
       return {
        ...data.user,
        profile_role:DEFAULT_USER_ROLE  
      };
    }
    return {...data.user,profile_role:profile?.role ?? DEFAULT_USER_ROLE   };

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
