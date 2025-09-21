// Environment Configuration for PAiGE
// These environment variables need to be set in your Supabase project settings

export const env = {
  // Supabase Configuration
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  
  // API Keys (optional - for future features)
  GOOGLE_BOOKS_API_KEY: process.env.GOOGLE_BOOKS_API_KEY || '',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
} as const;

// Type-safe environment checker
export function checkEnvVars() {
  const missing = [];
  
  if (!env.SUPABASE_URL) missing.push('NEXT_PUBLIC_SUPABASE_URL');
  if (!env.SUPABASE_ANON_KEY) missing.push('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  
  if (missing.length > 0) {
    console.warn(`Missing environment variables: ${missing.join(', ')}`);
    console.warn('Please set these in your Supabase project settings under Settings > API');
  }
  
  return missing.length === 0;
}