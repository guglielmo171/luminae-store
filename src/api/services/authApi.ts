import { supabase } from "@/lib/supabase";

export const authService = {
  signInWithMagicLink: async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });
    if (error) throw error;
  },

  verifyOtp: async (token_hash: string, type: any) => {
    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type,
    });
    if (error) throw error;
  },

  getSession: async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  },

  userData : async () => {
       const { data: { user } } = await supabase.auth.getUser()
       return user;
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },
};
