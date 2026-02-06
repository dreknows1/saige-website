import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

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

// Fetch all active tracks
export async function getTracks(): Promise<Track[]> {
  const { data, error } = await supabase
    .from('tracks')
    .select('*')
    .eq('is_active', true)
    .order('track_number');
  
  if (error) throw error;
  return data || [];
}

// Fetch all active videos
export async function getVideos(): Promise<Video[]> {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('is_active', true)
    .order('id');
  
  if (error) throw error;
  return data || [];
}

// Fetch all active merch
export async function getMerch(): Promise<MerchProduct[]> {
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
  const { data, error } = await supabase
    .from('site_content')
    .select('*');
  
  if (error) throw error;
  
  const content: Record<string, string> = {};
  data?.forEach(item => {
    content[item.key] = item.value;
  });
  
  return content;
}

// Admin auth
export async function adminLogin(email: string, password: string) {
  const { data, error } = await supabase
    .from('admin_users')
    .select('*')
    .eq('email', email)
    .eq('password_hash', password) // In production, use proper hashing
    .single();
  
  if (error || !data) throw new Error('Invalid credentials');
  
  // Update last login
  await supabase
    .from('admin_users')
    .update({ last_login: new Date().toISOString() })
    .eq('id', data.id);
  
  return data;
}

// Update track (admin)
export async function updateTrack(trackId: string, updates: Partial<Track>) {
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
  const { data, error } = await supabase
    .from('site_content')
    .update({ value, updated_at: new Date().toISOString() })
    .eq('key', key)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}
