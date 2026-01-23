// export type OtpType = 
//   | 'signup'
//   | 'magiclink' 
//   | 'recovery'
//   | 'email_change'
//   | 'sms'
//   | 'phone_change';

// export const DEFAULT_OTP_TYPE: OtpType = 'magiclink';

// export function isValidOtpType(value: string | null): value is OtpType {
//   if (!value) return false;
  
//   const validTypes: OtpType[] = [
//     'signup',
//     'magiclink',
//     'recovery', 
//     'email_change',
//     'sms',
//     'phone_change'
//   ];
  
//   return validTypes.includes(value as OtpType);
// }

import type { Database, Tables } from '@/lib/database.types';
import { Constants } from '@/lib/database.types';
import type { AuthError, EmailOtpType, Session, User } from '@supabase/supabase-js';

export type UserRole = Database["public"]["Enums"]["Role"];  // "User" | "Admin"


export function isValidRole(role: string | null | undefined): role is UserRole {
  if (!role) return false;
  return Constants.public.Enums.Role.includes(role as UserRole);
}

export type ProfileRow = Tables<"profiles">;
export const DEFAULT_USER_ROLE: UserRole = 'User';


export type UserWithRole= User & {
  profile_role: Database["public"]["Enums"]["Role"];
};

export const DEFAULT_OTP_TYPE: EmailOtpType = 'email';

export function isValidOtpType(value:string | null): value is EmailOtpType{
  if(!value) return false;
// EmailOtpType validi da Supabase: 'signup' | 'invite' | 'magiclink' | 'recovery' | 'email_change' | 'email'
  const validTypes:EmailOtpType[]=['email',"email_change","invite","magiclink","recovery","signup"];
  return validTypes.includes(value as EmailOtpType)
}

export type AuthSession = {
  data: {
      session: Session;
  };
  error: null;
} | {
  data: {
      session: null;
  };
  error: AuthError;
} | {
  data: {
      session: null;
  };
  error: null;
}