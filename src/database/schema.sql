-- PAiGE Reading Tracker Database Schema
-- Run these commands in your Supabase SQL editor

-- Enable RLS
ALTER DATABASE postgres SET row_security = on;

-- User Profiles Table
CREATE TABLE user_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    daily_goal INTEGER DEFAULT 25,
    weekly_goal INTEGER DEFAULT 2,
    streak_days INTEGER DEFAULT 0,
    total_books_read INTEGER DEFAULT 0,
    total_pages_read INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Books Table
CREATE TABLE books (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    author TEXT,
    total_pages INTEGER NOT NULL,
    pages_read INTEGER DEFAULT 0,
    cover_url TEXT,
    status TEXT DEFAULT 'reading' CHECK (status IN ('reading', 'completed', 'to_read')),
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reading Sessions Table
CREATE TABLE reading_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    book_id UUID REFERENCES books(id) ON DELETE CASCADE NOT NULL,
    pages_read INTEGER NOT NULL,
    session_date DATE NOT NULL,
    reading_time_minutes INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE reading_sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can view their own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for books
CREATE POLICY "Users can view their own books" ON books
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own books" ON books
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own books" ON books
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own books" ON books
    FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for reading_sessions
CREATE POLICY "Users can view their own sessions" ON reading_sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own sessions" ON reading_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sessions" ON reading_sessions
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own sessions" ON reading_sessions
    FOR DELETE USING (auth.uid() = user_id);

-- Functions to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_books_updated_at BEFORE UPDATE ON books
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data (optional - remove if you don't want sample data)
-- This will only work after a user signs up
INSERT INTO books (user_id, title, author, total_pages, pages_read, status, started_at)
SELECT 
    auth.uid(),
    'The Midnight Library',
    'Matt Haig',
    432,
    187,
    'reading',
    NOW() - INTERVAL '5 days'
WHERE auth.uid() IS NOT NULL;