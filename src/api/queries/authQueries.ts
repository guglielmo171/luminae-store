import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/authApi";

export const authKeys = {
  all: ["auth"] as const,
  session: () => [...authKeys.all, "session"] as const,
  user: () => [...authKeys.all, "user"] as const,
};

export const authQueryOptions = {
  session: () =>
    queryOptions({
      queryKey: authKeys.session(),
      queryFn: authService.getSession,
      staleTime: Infinity,
    }),
  user: () =>
    queryOptions({
      queryKey: authKeys.user(),
      queryFn: authService.userData,
    }),
};

// export function useSession() {
//   return useQuery(authQueryOptions.session());
// }

export function useVerifyOtp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ token_hash, type }: { token_hash: string; type: any }) =>
      authService.verifyOtp(token_hash, type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.session() });
    },
  });
}

export function useSignInWithPassword() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.signInWithPassword,
    onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: authKeys.session() });
       queryClient.invalidateQueries({ queryKey: authKeys.user() });
    },
  });
}

export function useSignUp() {
  return useMutation({
    mutationFn: authService.signUp,
  });
}

export function useSignOut() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.signOut,
    onSuccess: () => {
      queryClient.setQueryData(authKeys.session(), null);
      queryClient.setQueryData(authKeys.user(), null);
    },
  });
}
