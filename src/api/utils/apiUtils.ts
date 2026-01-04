import type { AxiosResponse } from "axios";

/**
 * Gestisce una chiamata API Axios, esegue il logging in caso di errore
 * e restituisce direttamente i dati (unwrapping).
 */
export async function handleApiCall<T>(
  call: Promise<AxiosResponse<T>>,
  context: string,
  fallback?: T
): Promise<T> {
  try {
    const response = await call;
    return response.data;
  } catch (error) {
    if (fallback !== undefined) {
      console.warn(`[API Service] Error in ${context}, using fallback:`, error);
      return fallback;
    }
    console.error(`[API Service] Error in ${context}:`, error);
    throw error;
  }
}

/**
 * Gestisce una chiamata Supabase, esegue il logging in caso di errore
 * e restituisce direttamente i dati.
 */
export async function handleAuthCall<T>(
  call: Promise<{ data: T | null; error: any } | { error: any }>,
  context: string,
  fallback?: T
): Promise<T | null> {
  const result = await call;
  const error = (result as any).error;
  const data = (result as any).data;

  if (error) {
    if (fallback !== undefined) {
      console.warn(`[Auth Service] Error in ${context}, using fallback:`, error);
      return fallback;
    }
    console.error(`[Auth Service] Error in ${context}:`, error);
    throw error;
  }
  return data ?? (fallback as T) ?? null;
}
