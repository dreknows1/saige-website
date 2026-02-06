-- Supabase Schema for Saige Website CMS
-- Run this in Supabase SQL Editor

-- Enable RLS
alter table if exists public.tracks enable row level security;
alter table if exists public.videos enable row level security;
alter table if exists public.merch enable row level security;
alter table if exists public.site_content enable row level security;

-- Tracks table
CREATE TABLE IF NOT EXISTS public.tracks (
    id SERIAL PRIMARY KEY,
    track_id VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    album VARCHAR(255) NOT NULL,
    duration VARCHAR(10) NOT NULL,
    plays VARCHAR(20) DEFAULT '0',
    spotify_url TEXT,
    apple_url TEXT,
    audio_url TEXT,
    price DECIMAL(10,2) DEFAULT 0.99,
    track_number INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Videos table
CREATE TABLE IF NOT EXISTS public.videos (
    id SERIAL PRIMARY KEY,
    video_id VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    youtube_url TEXT NOT NULL,
    thumbnail TEXT,
    duration VARCHAR(10),
    views VARCHAR(20) DEFAULT '0',
    category VARCHAR(50) DEFAULT 'Music Video',
    year VARCHAR(4) DEFAULT '2025',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Merch products table
CREATE TABLE IF NOT EXISTS public.merch (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image TEXT,
    category VARCHAR(50) DEFAULT 'merch',
    sizes JSONB DEFAULT '[]',
    in_stock BOOLEAN DEFAULT true,
    badge VARCHAR(50),
    stripe_price_id VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Site content (bio, stats, etc)
CREATE TABLE IF NOT EXISTS public.site_content (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) UNIQUE NOT NULL,
    value TEXT NOT NULL,
    section VARCHAR(50) NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Admin users
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    last_login TIMESTAMP
);

-- RLS Policies
CREATE POLICY "Allow public read" ON public.tracks FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read" ON public.videos FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read" ON public.merch FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read" ON public.site_content FOR SELECT USING (true);

-- Insert default site content
INSERT INTO public.site_content (key, value, section) VALUES
('artist_name', 'Saige', 'general'),
('artist_bio', 'A Boston-based R&B artist creating soulful music that bridges traditional R&B with modern innovation. With emotive vocals and storytelling at the core, Saige is pioneering a new wave of AI-assisted music creation.', 'about'),
('monthly_listeners', '3,541', 'stats'),
('total_streams', '13K+', 'stats'),
('location', 'Boston, MA', 'general'),
('spotify_url', 'https://open.spotify.com/artist/1mmsdJrB5LrN18iDTRQgDK', 'social'),
('youtube_url', 'https://youtube.com/@saigemusik', 'social'),
('instagram_url', 'https://instagram.com/saigemusik', 'social'),
('latest_album', 'Heartbreaks Algorithm', 'music'),
('album_price', '12.99', 'music'),
('track_price', '0.99', 'music')
ON CONFLICT (key) DO NOTHING;

-- Insert Heartbreaks Algorithm tracks
INSERT INTO public.tracks (track_id, title, album, duration, plays, spotify_url, apple_url, price, track_number) VALUES
('act-1-birth', 'Act 1: The Birth', 'Heartbreaks Algorithm', '3:07', '15.2K', 'https://open.spotify.com/track/26z5BWgEqG862xBBrbBSx3', '', 0.99, 1),
('so-dope', 'So Dope', 'Heartbreaks Algorithm', '4:06', '13.3K', 'https://open.spotify.com/track/3CBpbALjqNWZNVpjWlhX6G', '', 0.99, 2),
('me-gustas', 'Me Gustas', 'Heartbreaks Algorithm', '4:19', '10.3K', 'https://open.spotify.com/track/2Cca1zAJcoe5W6Wnra47Gx', '', 0.99, 3),
('right-there', 'Right There', 'Heartbreaks Algorithm', '3:57', '8.9K', 'https://open.spotify.com/track/5fGCWFhOR3knIiI6OnArrI', '', 0.99, 4),
('act-2-feeling', 'Act 2: The Feeling', 'Heartbreaks Algorithm', '3:02', '12.1K', 'https://open.spotify.com/track/0rDUtAOrgqa0szqFC2RS6f', '', 0.99, 5),
('show-me-love', 'Show Me How To Love You', 'Heartbreaks Algorithm', '4:44', '9.5K', 'https://open.spotify.com/track/67MPfPVpt51xLFkjpFL1mz', '', 0.99, 6),
('in-this-room', 'In This Room', 'Heartbreaks Algorithm', '4:33', '7.8K', 'https://open.spotify.com/track/6EKn4i288VIn1MLU3WfRIE', '', 0.99, 7),
('red-light', 'Red Light', 'Heartbreaks Algorithm', '3:01', '6.2K', 'https://open.spotify.com/track/3LVkwfHkyv3f3vsnvVcu8y', '', 0.99, 8),
('love-language', 'Love Language', 'Heartbreaks Algorithm', '3:52', '5.9K', 'https://open.spotify.com/track/29fPmBLPoYc0JEPDCjqW3K', '', 0.99, 9),
('claustrophobic', 'Claustrophobic', 'Heartbreaks Algorithm', '4:41', '4.8K', 'https://open.spotify.com/track/3aYQS8bRBl6LqTujdPnbKo', '', 0.99, 10),
('act-3-denial', 'Act 3: The Denial', 'Heartbreaks Algorithm', '2:00', '3.5K', 'https://open.spotify.com/track/1hwYECU5mXLJUhey5Z8FWZ', '', 0.99, 11),
('shit-said', 'Sh*t I Should''ve Said', 'Heartbreaks Algorithm', '3:44', '5.1K', 'https://open.spotify.com/track/6CjFC8ZqTDnIYb8i33Rlg9', '', 0.99, 12),
('you-lie-good', 'You Lie So Good (Who Taught You That)', 'Heartbreaks Algorithm', '4:16', '4.3K', 'https://open.spotify.com/track/0kSAfLQe2hvtuxQxll6u6l', '', 0.99, 13),
('cant-take-soul', 'You Can''t Take The Soul', 'Heartbreaks Algorithm', '4:42', '3.8K', 'https://open.spotify.com/track/02FTTLRX11ZelQbLRerjY6', '', 0.99, 14),
('act-3-spiral', 'Act 3: The Spiral', 'Heartbreaks Algorithm', '1:48', '2.9K', 'https://open.spotify.com/track/5tBn5eeb8wrANfZNmiqXu9', '', 0.99, 15),
('text-last-night', 'I Text You Last Night', 'Heartbreaks Algorithm', '4:41', '3.2K', 'https://open.spotify.com/track/0XaOcA04BhpVe3t3qYTzQ7', '', 0.99, 16)
ON CONFLICT (track_id) DO NOTHING;

-- Insert videos
INSERT INTO public.videos (video_id, title, description, youtube_url, thumbnail, duration, views, category) VALUES
('so-dope-mv', 'So Dope (Official Music Video)', 'Official music video for So Dope featuring Noir', 'https://www.youtube.com/watch?v=Q-t7yioHDCY', '/assets/images/promo-1.png', '4:35', '397', 'Music Video'),
('so-dope-lv', 'So Dope (Lyric Video)', 'Lyric video for So Dope from Heartbreaks Algorithm', 'https://www.youtube.com/watch?v=O6IEI94SA-I', '/assets/images/promo-2.png', '4:11', '740', 'Lyric Video'),
('me-gustas-lv', 'Me Gustas (Lyric Video)', 'Lyric video for Me Gustas from Heartbreaks Algorithm', 'https://www.youtube.com/watch?v=02Kq4iVrtQ0', '/assets/images/promo-3.png', '4:20', '412', 'Lyric Video'),
('me-gustas-audio', 'Me Gustas (Official Audio)', 'Official audio for Me Gustas', 'https://www.youtube.com/watch?v=uLzElU2UrcQ', '/assets/images/promo-4.png', '4:21', '102', 'Audio'),
('shit-said-lv', 'Sh*t I Should''ve Said (Lyric Video)', 'Lyric video from Heartbreaks Algorithm', 'https://www.youtube.com/watch?v=vz6N1NsZl5E', '/assets/images/promo-5.png', '3:46', '191', 'Lyric Video'),
('you-lie-good-lv', 'You Lie So Good (Lyric Video)', 'Lyric video from Heartbreaks Algorithm', 'https://www.youtube.com/watch?v=Vnk2pK83qGg', '/assets/images/promo-6.png', '4:18', '112', 'Lyric Video')
ON CONFLICT (video_id) DO NOTHING;

-- Create function to update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers
DROP TRIGGER IF EXISTS update_tracks_updated_at ON public.tracks;
CREATE TRIGGER update_tracks_updated_at BEFORE UPDATE ON public.tracks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_videos_updated_at ON public.videos;
CREATE TRIGGER update_videos_updated_at BEFORE UPDATE ON public.videos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_merch_updated_at ON public.merch;
CREATE TRIGGER update_merch_updated_at BEFORE UPDATE ON public.merch FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
