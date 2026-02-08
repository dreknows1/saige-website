import { CMSData } from '../types/cms';

const STORAGE_KEY = 'saige_cms_data';

const defaultData: CMSData = {
  config: {
    siteTitle: 'sAIge | Synthetic Soul',
    siteDescription: 'sAIge - The world\'s first AI music artist. Synthetic soul, digital dreams, human emotion.',
    artistName: 'Saige',
    artistBio: 'A Boston-based R&B artist creating soulful music that bridges traditional R&B with modern innovation. With emotive vocals and storytelling at the core, Saige is pioneering a new wave of AI-assisted music creation.',
    location: 'Boston, MA',
    monthlyListeners: '3,541',
    totalStreams: '13K+',
    social: {
      instagram: '@saigemusik',
      youtube: 'https://youtube.com/@saigemusik',
      spotify: 'https://open.spotify.com/artist/1mmsdJrB5LrN18iDTRQgDK',
      twitter: '@saigemusik',
      tiktok: '@saigemusik',
      facebook: '@saigemusik',
    },
  },
  tracks: [
    {
      id: '1',
      title: 'Me Gustas',
      album: 'Heartbreaks Algorithm',
      duration: '2:44',
      plays: '100K+',
      spotifyUrl: 'https://open.spotify.com/track/2Cca1zAJcoe5W6Wnra47Gx',
      appleUrl: '',
      price: 0.99,
      trackNumber: 1,
      isActive: true,
    },
    {
      id: '2',
      title: 'So Dope',
      album: 'Heartbreaks Algorithm',
      duration: '2:50',
      plays: '75K+',
      spotifyUrl: 'https://open.spotify.com/track/3CBpbALjqNWZNVpjWlhX6G',
      appleUrl: '',
      price: 0.99,
      trackNumber: 2,
      isActive: true,
    },
  ],
  videos: [
    {
      id: '1',
      title: 'So Dope (Official Music Video)',
      description: 'Official music video for So Dope featuring Noir',
      youtubeUrl: 'https://youtube.com/watch?v=O6IEI94SA-I',
      thumbnail: '',
      duration: '2:50',
      views: '740',
      category: 'Music Video',
      year: '2025',
      isActive: true,
    },
  ],
  images: [],
  merch: [],
  pages: [
    {
      id: 'home',
      slug: '/',
      title: 'Home',
      metaDescription: 'Saige Musik - Professional artist and producer',
      isActive: true,
      sections: [
        {
          id: 'hero',
          type: 'hero',
          title: 'Heartbreaks Algorithm',
          content: 'The debut album from Saige - 16 tracks of soulful R&B exploring love, loss, and healing.',
          order: 0,
          isActive: true,
        },
      ],
    },
  ],
};

export const getCMSData = (): CMSData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaultData, ...JSON.parse(stored) };
    }
  } catch (error) {
    console.error('Error loading CMS data:', error);
  }
  return defaultData;
};

export const setCMSData = (data: CMSData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving CMS data:', error);
  }
};

export const updateConfig = (config: Partial<CMSData['config']>): void => {
  const data = getCMSData();
  data.config = { ...data.config, ...config };
  setCMSData(data);
};

export const updateTracks = (tracks: CMSData['tracks']): void => {
  const data = getCMSData();
  data.tracks = tracks;
  setCMSData(data);
};

export const updateVideos = (videos: CMSData['videos']): void => {
  const data = getCMSData();
  data.videos = videos;
  setCMSData(data);
};

export const updateImages = (images: CMSData['images']): void => {
  const data = getCMSData();
  data.images = images;
  setCMSData(data);
};

export const updateMerch = (merch: CMSData['merch']): void => {
  const data = getCMSData();
  data.merch = merch;
  setCMSData(data);
};

export const updatePages = (pages: CMSData['pages']): void => {
  const data = getCMSData();
  data.pages = pages;
  setCMSData(data);
};

export const addImage = (image: CMSData['images'][0]): void => {
  const data = getCMSData();
  data.images.unshift(image);
  setCMSData(data);
};

export const deleteImage = (id: string): void => {
  const data = getCMSData();
  data.images = data.images.filter(img => img.id !== id);
  setCMSData(data);
};

export const exportData = (): string => {
  return JSON.stringify(getCMSData(), null, 2);
};

export const importData = (json: string): boolean => {
  try {
    const data = JSON.parse(json);
    setCMSData(data);
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
};

export const resetData = (): void => {
  setCMSData(defaultData);
};
