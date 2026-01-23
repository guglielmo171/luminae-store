/**
 * Safely format a date string with error handling
 * 
 * @param dateString - ISO date string from database
 * @param options - Intl.DateTimeFormatOptions for formatting
 * @param fallback - String to return if date is invalid
 * @returns Formatted date string or fallback
 * 
 * @example
 * safeFormatDate('2024-01-15T10:30:00Z', { month: 'long', year: 'numeric' }, 'Unknown')
 * // Returns: "January 2024"
 * 
 * safeFormatDate('invalid-date', {}, 'Unknown')
 * // Returns: "Unknown"
 */
export function safeFormatDate(
    dateString: string | null | undefined,
    options: Intl.DateTimeFormatOptions = {},
    fallback: string = 'Unknown'
  ): string {
    // Check if dateString exists
    if (!dateString) {
      return fallback;
    }
  
    try {
      // Parse date
      const date = new Date(dateString);
  
      // Check if date is valid
      if (isNaN(date.getTime())) {
        console.warn(`[DateUtils] Invalid date string: "${dateString}"`);
        return fallback;
      }
  
      // Format date
      return date.toLocaleDateString('en-US', options);
    } catch (error) {
      console.error(`[DateUtils] Error formatting date: "${dateString}"`, error);
      return fallback;
    }
  }
  