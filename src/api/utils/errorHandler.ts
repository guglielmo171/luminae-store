import { isAxiosError } from "axios";
import { AuthError } from "@supabase/supabase-js";

export const handleGlobalError = (error: unknown) => {
  let message = "An unexpected error occurred";

  if (isAxiosError(error)) {
    message = error.response?.data?.message || error.message;
  } else if (error instanceof AuthError) {
    message = error.message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  console.error("Global Error:", {
    message,
    originalError: error,
  });

  alert(message);
};
