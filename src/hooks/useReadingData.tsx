import { useState, useEffect } from 'react'
import { supabase, Book, ReadingSession, UserProfile } from '@/lib/supabase'
import { useAuth } from './useAuth'
import { useToast } from './use-toast'

export function useReadingData() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [books, setBooks] = useState<Book[]>([])
  const [sessions, setSessions] = useState<ReadingSession[]>([])
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch user profile
  const fetchProfile = async () => {
    if (!user) return

    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching profile:', error)
      return
    }

    if (!data) {
      // Create default profile
      const newProfile = {
        user_id: user.id,
        daily_goal: 25,
        weekly_goal: 2,
        streak_days: 0,
        total_books_read: 0,
        total_pages_read: 0,
      }

      const { data: createdProfile, error: createError } = await supabase
        .from('user_profiles')
        .insert(newProfile)
        .select()
        .single()

      if (createError) {
        console.error('Error creating profile:', createError)
        return
      }

      setProfile(createdProfile)
    } else {
      setProfile(data)
    }
  }

  // Fetch books
  const fetchBooks = async () => {
    if (!user) return

    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })

    if (error) {
      console.error('Error fetching books:', error)
      return
    }

    setBooks(data || [])
  }

  // Fetch reading sessions
  const fetchSessions = async () => {
    if (!user) return

    const { data, error } = await supabase
      .from('reading_sessions')
      .select('*')
      .eq('user_id', user.id)
      .order('session_date', { ascending: false })

    if (error) {
      console.error('Error fetching sessions:', error)
      return
    }

    setSessions(data || [])
  }

  // Add or update book
  const upsertBook = async (bookData: Partial<Book>) => {
    if (!user) return

    const book = {
      ...bookData,
      user_id: user.id,
      updated_at: new Date().toISOString(),
    }

    const { data, error } = await supabase
      .from('books')
      .upsert(book)
      .select()
      .single()

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save book data",
        variant: "destructive",
      })
      return
    }

    await fetchBooks()
    return data
  }

  // Add reading session
  const addReadingSession = async (bookId: string, pagesRead: number, readingTime?: number) => {
    if (!user) return

    const session = {
      user_id: user.id,
      book_id: bookId,
      pages_read: pagesRead,
      session_date: new Date().toISOString().split('T')[0],
      reading_time_minutes: readingTime,
    }

    const { error } = await supabase
      .from('reading_sessions')
      .insert(session)

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save reading session",
        variant: "destructive",
      })
      return
    }

    // Update book pages read
    const book = books.find(b => b.id === bookId)
    if (book) {
      await upsertBook({
        ...book,
        pages_read: book.pages_read + pagesRead,
      })
    }

    // Update user profile
    if (profile) {
      const updatedProfile = {
        ...profile,
        total_pages_read: profile.total_pages_read + pagesRead,
      }

      await supabase
        .from('user_profiles')
        .update({
          total_pages_read: updatedProfile.total_pages_read,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)

      setProfile(updatedProfile)
    }

    await fetchSessions()
    toast({
      title: "Reading logged!",
      description: `Added ${pagesRead} pages to your progress`,
    })
  }

  // Calculate streak
  const calculateStreak = () => {
    if (sessions.length === 0) return 0

    const today = new Date()
    const sortedSessions = sessions.sort((a, b) => 
      new Date(b.session_date).getTime() - new Date(a.session_date).getTime()
    )

    let streak = 0
    let currentDate = new Date(today)

    for (let i = 0; i < sortedSessions.length; i++) {
      const sessionDate = new Date(sortedSessions[i].session_date)
      const daysDiff = Math.floor((currentDate.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24))

      if (daysDiff === streak) {
        streak++
      } else if (daysDiff > streak) {
        break
      }
    }

    return streak
  }

  useEffect(() => {
    if (user) {
      Promise.all([fetchProfile(), fetchBooks(), fetchSessions()])
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [user])

  return {
    books,
    sessions,
    profile,
    loading,
    upsertBook,
    addReadingSession,
    calculateStreak,
    refetch: () => Promise.all([fetchProfile(), fetchBooks(), fetchSessions()]),
  }
}