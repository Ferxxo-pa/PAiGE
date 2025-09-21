import { createClient } from '@supabase/supabase-js'

// Get environment variables (they'll be set automatically by Lovable's Supabase integration)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Book {
  id: string
  user_id: string
  title: string
  author?: string
  total_pages: number
  pages_read: number
  cover_url?: string
  status: 'reading' | 'completed' | 'to_read'
  started_at?: string
  completed_at?: string
  created_at: string
  updated_at: string
}

export interface ReadingSession {
  id: string
  user_id: string
  book_id: string
  pages_read: number
  session_date: string
  reading_time_minutes?: number
  created_at: string
}

export interface UserProfile {
  id: string
  user_id: string
  daily_goal: number
  weekly_goal: number
  streak_days: number
  total_books_read: number
  total_pages_read: number
  created_at: string
  updated_at: string
}