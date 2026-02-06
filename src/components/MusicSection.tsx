import { Play, Pause, ExternalLink, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

interface Track {
  id: number;
  title: string;
  album: string;
  duration: string;
  plays: string;
  cover: string;
  year: string;
  price: number;
  spotifyUrl: string;
  appleUrl: string;
}

interface Album {
  title: string;
  year: string;
  tracks: number;
  cover: string;
  color: string;
  price: number;
  description: string;
}

// Heartbreaks Algorithm - Full Album (16 tracks)
const heartbreaksAlgorithmTracks: Track[] = [
  { id: 1, title: "Act 1: The Birth", album: "Heartbreaks Algorithm", duration: "3:07", plays: "15.2K", cover: "/assets/album-covers/the-audacity.png", year: "2025", price: 0.99, spotifyUrl: "https://open.spotify.com/track/26z5BWgEqG862xBBrbBSx3", appleUrl: "https://music.apple.com/track/act-1-the-birth" },
  { id: 2, title: "So Dope", album: "Heartbreaks Algorithm", duration: "4:06", plays: "13.3K", cover: "/assets/album-covers/the-audacity.png", year: "2025", price: 0.99, spotifyUrl: "https://open.spotify.com/track/3CBpbALjqNWZNVpjWlhX6G", appleUrl: "https://music.apple.com/track/so-dope" },
  { id: 3, title: "Me Gustas", album: "Heartbreaks Algorithm", duration: "4:19", plays: "10.3K", cover: "/assets/album-covers/the-audacity.png", year: "2025", price: 0.99, spotifyUrl: "https://open.spotify.com/track/2Cca1zAJcoe5W6Wnra47Gx", appleUrl: "https://music.apple.com/track/me-gustas" },
  { id: 4, title: "Right There", album: "Heartbreaks Algorithm", duration: "3:57", plays: "8.9K", cover: "/assets/album-covers/the-audacity.png", year: "2025", price: 0.99, spotifyUrl: "https://open.spotify.com/track/5fGCWFhOR3knIiI6OnArrI", appleUrl: "https://music.apple.com/track/right-there" },
  { id: 5, title: "Act 2: The Feeling", album: "Heartbreaks Algorithm", duration: "3:02", plays: "12.1K", cover: "/assets/album-covers/the-audacity.png", year: "2025", price: 0.99, spotifyUrl: "https://open.spotify.com/track/0rDUtAOrgqa0szqFC2RS6f", appleUrl: "https://music.apple.com/track/act-2-the-feeling" },
  { id: 6, title: "Show Me How To Love You", album: "Heartbreaks Algorithm", duration: "4:44", plays: "9.5K", cover: "/assets/album-covers/the-audacity.png", year: "2025", price: 0.99, spotifyUrl: "https://open.spotify.com/track/67MPfPVpt51xLFkjpFL1mz", appleUrl: "https://music.apple.com/track/show-me-how-to-love-you" },
  { id: 7, title: "In This Room", album: "Heartbreaks Algorithm", duration: "4:33", plays: "7.8K", cover: "/assets/album-covers/the-audacity.png", year: "2025", price: 0.99, spotifyUrl: "https://open.spotify.com/track/6EKn4i288VIn1MLU3WfRIE", appleUrl: "https://music.apple.com/track/in-this-room" },
  { id: 8, title: "Red Light", album: "Heartbreaks Algorithm", duration: "3:01", plays: "6.2K", cover: "/assets/album-covers/the-audacity.png", year: "2025", price: 0.99, spotifyUrl: "https://open.spotify.com/track/3LVkwfHkyv3f3vsnvVcu8y", appleUrl: "https://music.apple.com/track/red-light" },
  { id: 9, title: "Love Language", album: "Heartbreaks Algorithm", duration: "3:52", plays: "5.9K", cover: "/assets/album-covers/the-audacity.png", year: "2025", price: 0.99, spotifyUrl: "https://open.spotify.com/track/29fPmBLPoYc0JEPDCjqW3K", appleUrl: "https://music.apple.com/track/love-language" },
  { id: 10, title: "Claustrophobic", album: "Heartbreaks Algorithm", duration: "4:41", plays: "4.8K", cover: "/assets/album-covers/the-audacity.png", year: "2025", price: 0.99, spotifyUrl: "https://open.spotify.com/track/3aYQS8bRBl6LqTujdPnbKo", appleUrl: "https://music.apple.com/track/claustrophobic" },
  { id: 11, title: "Act 3: The Denial", album: "Heartbreaks Algorithm", duration: "2:00", plays: "3.5K", cover: "/assets/album-covers/the-audacity.png", year: "2025", price: 0.99, spotifyUrl: "https://open.spotify.com/track/1hwYECU5mXLJUhey5Z8FWZ", appleUrl: "https://music.apple.com/track/act-3-the-denial" },
  { id: 12, title: "Sh*t I Should've Said", album: "Heartbreaks Algorithm", duration: "3:44", plays: "5.1K", cover: "/assets/album-covers/the-audacity.png", year: "2025", price: 0.99, spotifyUrl: "https://open.spotify.com/track/6CjFC8ZqTDnIYb8i33Rlg9", appleUrl: "https://music.apple.com/track/shit-i-shouldve-said" },
  { id: 13, title: "You Lie So Good (Who Taught You That)", album: "Heartbreaks Algorithm", duration: "4:16", plays: "4.3K", cover: "/assets/album-covers/the-audacity.png", year: "2025", price: 0.99, spotifyUrl: "https://open.spotify.com/track/0kSAfLQe2hvtuxQxll6u6l", appleUrl: "https://music.apple.com/track/you-lie-so-good" },
  { id: 14, title: "You Can't Take The Soul", album: "Heartbreaks Algorithm", duration: "4:42", plays: "3.8K", cover: "/assets/album-covers/the-audacity.png", year: "2025", price: 0.99, spotifyUrl: "https://open.spotify.com/track/02FTTLRX11ZelQbLRerjY6", appleUrl: "https://music.apple.com/track/you-cant-take-the-soul" },
  { id: 15, title: "Act 3: The Spiral", album: "Heartbreaks Algorithm", duration: "1:48", plays: "2.9K", cover: "/assets/album-covers/the-audacity.png", year: "2025", price: 0.99, spotifyUrl: "https://open.spotify.com/track/5tBn5eeb8wrANfZNmiqXu9", appleUrl: "https://music.apple.com/track/act-3-the-spiral" },
  { id: 16, title: "I Text You Last Night", album: "Heartbreaks Algorithm", duration: "4:41", plays: "3.2K", cover: "/assets/album-covers/the-audacity.png", year: "2025", price: 0.99, spotifyUrl: "https://open.spotify.com/track/0XaOcA04BhpVe3t3qYTzQ7", appleUrl: "https://music.apple.com/track/i-text-you-last-night" },
];

const albums: Album[] = [
  {
    title: "Heartbreaks Algorithm",
    year: "2025",
    tracks: 16,
    cover: "/assets/album-covers/the-audacity.png",
    color: "from-neon-pink to-neon-violet",
    price: 12.99,
    description: "The debut album from Saige - a 16-track journey through digital heartbreak, featuring Acts 1-3 with skits and soulful R&B tracks."
  },
  {
    title: "The Audacity",
    year: "2025",
    tracks: 4,
    cover: "/assets/album-covers/album-2.png",
    color: "from-neon-cyan to-neon-violet",
    price: 3.49,
    description: "EP featuring bold tracks that define the Saige sound."
  },
  {
    title: "Red Flags",
    year: "2025",
    tracks: 4,
    cover: "/assets/album-covers/album-3.jpg",
    color: "from-neon-yellow to-neon-pink",
    price: 3.49,
    description: "Warning signs and relationship reflections."
  },
  {
    title: "You Never Loved Me",
    year: "2025",
    tracks: 4,
    cover: "/assets/album-covers/album-4.png",
    color: "from-neon-violet to-neon-cyan",
    price: 3.49,
    description: "Emotional tracks about unrequited love."
  },
];

const MusicSection = () => {
  const [playingTrack, setPlayingTrack] = useState<number | null>(null);
  const [cart, setCart] = useState<Track[]>([]);

  const togglePlay = (trackId: number) => {
    if (playingTrack === trackId) {
      setPlayingTrack(null);
    } else {
      setPlayingTrack(trackId);
    }
  };

  const addToCart = (track: Track) => {
    setCart(prev => {
      if (prev.find(t => t.id === track.id)) return prev;
      return [...prev, track];
    });
  };

  const cartTotal = cart.reduce((sum, track) => sum + track.price, 0);
  const cartCount = cart.length;

  return (
    <section id="music" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-neon-cyan text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Stream & Download
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-6">
            Stream <span className="text-neon-pink">Saige</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Individual songs $0.99 | Full albums at discounted prices
          </p>
        </div>

        {/* Cart Summary */}
        {cartCount > 0 && (
          <div className="mb-8 glass-neon rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <ShoppingCart className="w-5 h-5 text-neon-pink" />
              <span className="text-white font-body">{cartCount} item{cartCount !== 1 ? 's' : ''} in cart</span>
              <span className="text-neon-cyan font-tech">${cartTotal.toFixed(2)}</span>
            </div>
            <button className="px-6 py-2 bg-neon-pink text-white font-tech text-sm rounded-full hover:glow-pink transition-all">
              Checkout
            </button>
          </div>
        )}

        {/* Featured Album - Heartbreaks Algorithm */}
        <div className="mb-16">
          <div className="glass-neon rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
              <div className="relative group">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img 
                    src={albums[0].cover}
                    alt={albums[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl" />
                <button className="absolute bottom-4 right-4 w-14 h-14 rounded-full bg-neon-pink flex items-center justify-center text-white hover:glow-pink transition-all hover:scale-110">
                  <Play className="w-6 h-6 ml-1" />
                </button>
              </div>
              <div>
                <p className="text-neon-cyan text-sm font-medium tracking-widest uppercase mb-2">Latest Album</p>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                  {albums[0].title}
                </h3>
                <p className="text-white/60 mb-4">{albums[0].description}</p>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-white/40 font-tech">{albums[0].year}</span>
                  <span className="text-white/40">•</span>
                  <span className="text-white/40 font-tech">{albums[0].tracks} tracks</span>
                  <span className="text-white/40">•</span>
                  <span className="text-neon-pink font-tech">1 hr</span>
                </div>
                <div className="flex flex-wrap gap-4">
                  <button className="px-8 py-3 bg-neon-pink text-white font-tech text-sm tracking-widest uppercase rounded-full hover:glow-pink transition-all">
                    Buy Album ${albums[0].price}
                  </button>
                  <span className="text-white/40 text-sm flex items-center">
                    or ${(albums[0].tracks * 0.99).toFixed(2)} individually
                  </span>
                </div>
              </div>
            </div>

            {/* Track List */}
            <div className="space-y-2">
              {heartbreaksAlgorithmTracks.map((track, index) => (
                <div 
                  key={track.id}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group"
                >
                  <span className="text-white/30 font-tech w-8">{index + 1}</span>
                  
                  <button 
                    onClick={() => togglePlay(track.id)}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-neon-pink transition-colors"
                  >
                    {playingTrack === track.id ? (
                      <Pause className="w-4 h-4 text-white" />
                    ) : (
                      <Play className="w-4 h-4 text-white ml-0.5" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-body truncate group-hover:text-neon-pink transition-colors">
                      {track.title}
                    </h4>
                    {playingTrack === track.id && (
                      <div className="flex items-center gap-1 mt-1">
                        <div className="w-1 h-3 bg-neon-pink animate-pulse" />
                        <div className="w-1 h-4 bg-neon-pink animate-pulse delay-75" />
                        <div className="w-1 h-2 bg-neon-pink animate-pulse delay-150" />
                        <span className="text-xs text-neon-pink ml-2">Now Playing</span>
                      </div>
                    )}
                  </div>

                  <span className="text-white/40 font-tech text-sm hidden sm:block">{track.plays}</span>
                  <span className="text-white/40 font-tech text-sm">{track.duration}</span>

                  <button 
                    onClick={() => addToCart(track)}
                    disabled={cart.find(t => t.id === track.id) !== undefined}
                    className={`px-4 py-2 rounded-full font-tech text-sm transition-all ${
                      cart.find(t => t.id === track.id)
                        ? 'bg-white/10 text-white/40 cursor-not-allowed'
                        : 'bg-white/10 text-white hover:bg-neon-pink hover:text-white'
                    }`}
                  >
                    {cart.find(t => t.id === track.id) ? 'Added' : `$${track.price}`}
                  </button>

                  <a 
                    href={track.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-white/40 hover:text-neon-cyan transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Other EPs */}
        <div className="grid md:grid-cols-3 gap-6">
          {albums.slice(1).map((album) => (
            <div key={album.title} className="glass-neon rounded-2xl p-6 group hover:scale-[1.02] transition-transform">
              <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
                <img 
                  src={album.cover}
                  alt={album.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <button className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-neon-pink flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:glow-pink">
                  <Play className="w-5 h-5 ml-0.5" />
                </button>
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-2">{album.title}</h3>
              <p className="text-white/40 text-sm mb-4">{album.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-white/40 font-tech text-sm">{album.tracks} tracks</span>
                <button className="px-4 py-2 bg-white/10 text-white font-tech text-sm rounded-full hover:bg-neon-pink transition-colors">
                  ${album.price}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MusicSection;
