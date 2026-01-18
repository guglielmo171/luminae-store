import { mutationOptions, queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
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

export function useSignInWithPasswordOptions() {
  const queryClient = useQueryClient();
  return mutationOptions({
    mutationFn: authService.signInWithPassword,
    onSuccess(data) {
      
           queryClient.refetchQueries({ queryKey: authKeys.session() });
       queryClient.refetchQueries({ queryKey: authKeys.user() });
    },
    // onSuccess: () => {

  
    // },
  });
}

export function useSignUpOptions() {
  return mutationOptions({
    mutationFn: authService.signUp,
  });
}

export function useSignOutOptions() {
  const queryClient = useQueryClient();
  return mutationOptions({
    mutationFn: authService.signOut,
    onSuccess: () => {
      queryClient.setQueryData(authKeys.session(), null);
      queryClient.setQueryData(authKeys.user(), null);
    },
  });
}

export function useResetPasswordOptions() {
  return mutationOptions({
    mutationFn: authService.resetPasswordForEmail,
  });
}

export function useUpdateUserPasswordOptions() {
  return mutationOptions({
    mutationFn: authService.updateUserPassword,
  })
}
