import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Only create client if credentials exist
export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null as any;

export type Track = {
  id: number;
  track_id: string;
  title: string;
  album: string;
  duration: string;
  plays: string;
  spotify_url: string;
  apple_url: string;
  audio_url: string;
  price: number;
  track_number: number;
  is_active: boolean;
};

export type Video = {
  id: number;
  video_id: string;
  title: string;
  description: string;
  youtube_url: string;
  thumbnail: string;
  duration: string;
  views: string;
  category: string;
  year: string;
  is_active: boolean;
};

export type MerchProduct = {
  id: number;
  product_id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  sizes: string[];
  in_stock: boolean;
  badge: string;
  stripe_price_id: string;
  is_active: boolean;
};

export type SiteContent = {
  id: number;
  key: string;
  value: string;
  section: string;
};

// Mock data for when Supabase isn't configured
const mockTracks: Track[] = [
  { id: 1, track_id: 'me-gustas', title: 'Me Gustas', album: 'Heartbreaks Algorithm', duration: '2:44', plays: '100K+', spotify_url: '#', apple_url: '#', audio_url: '', price: 0.99, track_number: 1, is_active: true },
  { id: 2, track_id: 'so-dope', title: 'So Dope', album: 'Heartbreaks Algorithm', duration: '2:50', plays: '75K+', spotify_url: '#', apple_url: '#', audio_url: '', price: 0.99, track_number: 2, is_active: true },
];

const mockVideos: Video[] = [
  { id: 1, video_id: 'so-dope-video', title: 'So Dope (Official Music Video)', description: '', youtube_url: 'https://youtube.com/watch?v=O6IEI94SA-I', thumbnail: '', duration: '2:50', views: '740', category: 'Music Video', year: '2025', is_active: true },
];

// Fetch all active tracks
export async function getTracks(): Promise<Track[]> {
  if (!supabase) return mockTracks;
  const { data, error } = await supabase
    .from('tracks')
    .select('*')
    .eq('is_active', true)
    .order('track_number');
  
  if (error) throw error;
  return data || mockTracks;
}

// Fetch all active videos
export async function getVideos(): Promise<Video[]> {
  if (!supabase) return mockVideos;
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('is_active', true)
    .order('id');
  
  if (error) throw error;
  return data || mockVideos;
}

// Fetch all active merch
export async function getMerch(): Promise<MerchProduct[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('merch')
    .select('*')
    .eq('is_active', true)
    .eq('in_stock', true);
  
  if (error) throw error;
  return data || [];
}

// Fetch site content
export async function getSiteContent(): Promise<Record<string, string>> {
  if (!supabase) return {};
  const { data, error } = await supabase
    .from('site_content')
    .select('*');
  
  if (error) throw error;
  
  const content: Record<string, string> = {};
  data?.forEach((item: SiteContent) => {
    content[item.key] = item.value;
  });
  
  return content;
}

// Admin auth - mock for now
export async function adminLogin(email: string, password: string) {
  if (!supabase) {
    // Mock login
    if (email === 'admin@saigemusik.com' && password === 'admin123') {
      return { id: '1', email, name: 'Admin' };
    }
    throw new Error('Invalid credentials');
  }
  
  const { data, error } = await supabase
    .from('admin_users')
    .select('*')
    .eq('email', email)
    .eq('password_hash', password)
    .single();
  
  if (error || !data) throw new Error('Invalid credentials');
  
  await supabase
    .from('admin_users')
    .update({ last_login: new Date().toISOString() })
    .eq('id', data.id);
  
  return data;
}

// Update track (admin)
export async function updateTrack(trackId: string, updates: Partial<Track>) {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase
    .from('tracks')
    .update(updates)
    .eq('track_id', trackId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

// Update video (admin)
export async function updateVideo(videoId: string, updates: Partial<Video>) {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase
    .from('videos')
    .update(updates)
    .eq('video_id', videoId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

// Update merch (admin)
export async function updateMerch(productId: string, updates: Partial<MerchProduct>) {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase
    .from('merch')
    .update(updates)
    .eq('product_id', productId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

// Update site content (admin)
export async function updateSiteContent(key: string, value: string) {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase
    .from('site_content')
    .update({ value, updated_at: new Date().toISOString() })
    .eq('key', key)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}
