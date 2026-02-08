export interface Track { 
  id: string; 
  title: string; 
  album: string; 
  duration: string; 
  plays: string; 
  spotifyUrl: string; 
  appleUrl: string; 
  price: number; 
  trackNumber: number; 
  isActive: boolean; 
  audioUrl?: string; 
} 

export interface Video { 
  id: string; 
  title: string; 
  description: string; 
  youtubeUrl: string; 
  thumbnail: string; 
  duration: string; 
  views: string; 
  category: string; 
  year: string; 
  isActive: boolean; 
} 

export interface ImageAsset { 
  id: string; 
  name: string; 
  url: string; 
  size: number; 
  uploadedAt: string; 
  folder: string; 
} 

export interface MerchItem { 
  id: string; 
  name: string; 
  description: string; 
  price: number; 
  image: string; 
  category: string; 
  sizes: string[]; 
  inStock: boolean; 
  badge?: string; 
} 

export interface Section { 
  id: string; 
  type: 'hero' | 'about' | 'text' | 'music' | 'video' | 'gallery' | 'services' | 'testimonials' | 'cta' | 'footer' | 'custom'; 
  title: string; 
  content: string; 
  imageUrl?: string; 
  order: number; 
  isActive: boolean; 
} 

export interface Page { 
  id: string; 
  slug: string; 
  title: string; 
  metaDescription: string; 
  isActive: boolean; 
  sections: Section[]; 
} 

export interface SiteConfig { 
  siteTitle: string; 
  siteDescription: string; 
  artistName: string; 
  artistBio: string; 
  location: string; 
  monthlyListeners: string; 
  totalStreams: string; 
  social: { 
    instagram: string; 
    youtube: string; 
    spotify: string; 
    twitter: string; 
    tiktok: string; 
    facebook: string; 
  }; 
} 

export interface CMSData { 
  config: SiteConfig; 
  tracks: Track[]; 
  videos: Video[]; 
  images: ImageAsset[]; 
  merch: MerchItem[]; 
  pages: Page[]; 
}
