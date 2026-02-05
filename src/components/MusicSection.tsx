import { Play, Pause, Heart, Share2, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface Track {
  id: number;
  title: string;
  album: string;
  duration: string;
  plays: string;
  cover: string;
  year: string;
  spotifyUrl?: string;
  appleUrl?: string;
}

const tracks: Track[] = [
  {
    id: 1,
    title: "The Audacity",
    album: "Singles",
    duration: "3:24",
    plays: "125K",
    cover: "/assets/album-covers/the-audacity.png",
    year: "2024",
    spotifyUrl: "https://open.spotify.com/track/sample",
    appleUrl: "https://music.apple.com/track/sample"
  },
  {
    id: 2,
    title: "You Never Loved Me",
    album: "Singles",
    duration: "3:48",
    plays: "89K",
    cover: "/assets/album-covers/album-2.png",
    year: "2024",
    spotifyUrl: "https://open.spotify.com/track/sample",
    appleUrl: "https://music.apple.com/track/sample"
  },
  {
    id: 3,
    title: "Handle With Care",
    album: "Singles",
    duration: "3:32",
    plays: "67K",
    cover: "/assets/album-covers/album-3.jpg",
    year: "2024",
    spotifyUrl: "https://open.spotify.com/track/sample",
    appleUrl: "https://music.apple.com/track/sample"
  },
  {
    id: 4,
    title: "Red Flags",
    album: "Singles",
    duration: "3:15",
    plays: "52K",
    cover: "/assets/album-covers/album-4.png",
    year: "2024",
    spotifyUrl: "https://open.spotify.com/track/sample",
    appleUrl: "https://music.apple.com/track/sample"
  },
  {
    id: 5,
    title: "No More Fantasies",
    album: "Singles",
    duration: "4:05",
    plays: "48K",
    cover: "/assets/images/promo-1.png",
    year: "2023",
    spotifyUrl: "https://open.spotify.com/track/sample",
    appleUrl: "https://music.apple.com/track/sample"
  },
  {
    id: 6,
    title: "You Lie So Good",
    album: "Singles",
    duration: "3:45",
    plays: "39K",
    cover: "/assets/images/promo-2.png",
    year: "2023",
    spotifyUrl: "https://open.spotify.com/track/sample",
    appleUrl: "https://music.apple.com/track/sample"
  },
];

const albums = [
  {
    title: "The Audacity",
    year: "2024",
    tracks: 4,
    cover: "/assets/album-covers/the-audacity.png",
    color: "from-neon-pink to-neon-violet"
  },
  {
    title: "You Never Loved Me",
    year: "2024",
    tracks: 3,
    cover: "/assets/album-covers/album-2.png",
    color: "from-neon-cyan to-neon-violet"
  },
];

const streamingPlatforms = [
  { name: 'Spotify', color: '#1DB954', url: 'https://open.spotify.com/artist/1mmsdJrB5LrN18iDTRQgDK' },
  { name: 'Apple Music', color: '#FA2D48', url: 'https://music.apple.com/artist/saige/123456789' },
  { name: 'SoundCloud', color: '#FF5500', url: 'https://soundcloud.com/saigemusik' },
  { name: 'Amazon Music', color: '#00A8E1', url: 'https://music.amazon.com/artists/saige' },
];

const MusicSection = () => {
  const [hoveredTrack, setHoveredTrack] = useState<number | null>(null);
  const [playingTrack, setPlayingTrack] = useState<number | null>(null);
  const [likedTracks, setLikedTracks] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    setLikedTracks(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  return (
    <section id="music" className="relative py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="reveal mb-16">
          <span className="font-tech text-neon-pink text-xs tracking-[0.3em] uppercase mb-4 block">
            Discography
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Stream <span className="gradient-text">Saige</span>
          </h2>
          <p className="font-body text-lg text-white/60 max-w-2xl">
            Experience the soulful sound of Saige. Available on all major streaming platforms.
          </p>
        </div>

        {/* Streaming Platforms */}
        <div className="reveal mb-16">
          <div className="glass-neon rounded-2xl p-6">
            <h3 className="font-display text-lg font-bold text-white mb-6 text-center">Listen On</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {streamingPlatforms.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300"
                  style={{ '--hover-color': platform.color } as React.CSSProperties}
                >
                  <span className="font-body text-sm text-white/80 group-hover:text-white transition-colors">
                    {platform.name}
                  </span>
                  <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Albums Grid */}
        <div className="reveal grid md:grid-cols-2 gap-8 mb-16">
          {albums.map((album, index) => (
            <div 
              key={album.title}
              className="group relative rounded-2xl overflow-hidden glass-neon card-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-6 p-6">
                <div className="relative w-32 h-32 flex-shrink-0">
                  <div className={`absolute inset-0 bg-gradient-to-br ${album.color} rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`} />
                  <img 
                    src={album.cover}
                    alt={album.title}
                    className="relative w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer">
                      <Play className="w-5 h-5 text-white ml-0.5" />
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="font-display text-xl font-bold text-white mb-1 group-hover:text-neon-pink transition-colors">
                    {album.title}
                  </h3>
                  <p className="font-body text-sm text-white/60 mb-3">
                    {album.year} • {album.tracks} tracks
                  </p>
                  <button className="font-tech text-xs tracking-widest uppercase text-neon-cyan hover:text-white transition-colors flex items-center gap-2">
                    Play Album
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tracks Table */}
        <div className="reveal-right glass-neon rounded-2xl overflow-hidden mb-16">
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/10 font-tech text-xs tracking-widest uppercase text-white/40">
            <div className="col-span-1">#</div>
            <div className="col-span-4">Title</div>
            <div className="col-span-2">Album</div>
            <div className="col-span-2">Plays</div>
            <div className="col-span-1 text-right">Time</div>
            <div className="col-span-2 text-center">Actions</div>
          </div>

          <div className="divide-y divide-white/5">
            {tracks.map((track, index) => (
              <div
                key={track.id}
                className={`group grid md:grid-cols-12 gap-4 px-6 py-4 items-center transition-all duration-300 cursor-pointer ${
                  hoveredTrack === track.id ? 'bg-white/5' : ''
                } ${playingTrack === track.id ? 'bg-neon-pink/10' : ''}`}
                onMouseEnter={() => setHoveredTrack(track.id)}
                onMouseLeave={() => setHoveredTrack(null)}
                onClick={() => setPlayingTrack(playingTrack === track.id ? null : track.id)}
              >
                <div className="col-span-1 font-tech text-white/40 group-hover:text-neon-pink">
                  {hoveredTrack === track.id || playingTrack === track.id ? (
                    playingTrack === track.id ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )
                  ) : (
                    <span className="text-sm">{String(index + 1).padStart(2, '0')}</span>
                  )}
                </div>

                <div className="col-span-4 flex items-center gap-4">
                  <img 
                    src={track.cover}
                    alt={track.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className={`font-body font-medium transition-colors ${
                      playingTrack === track.id ? 'text-neon-pink' : 'text-white group-hover:text-neon-pink'
                    }`}>
                      {track.title}
                    </h4>
                    <span className="font-tech text-xs text-white/40">{track.year}</span>
                  </div>
                </div>

                <div className="col-span-2 font-body text-sm text-white/60 hidden md:block">
                  {track.album}
                </div>

                <div className="col-span-2 font-tech text-sm text-white/40 hidden md:block">
                  {track.plays}
                </div>

                <div className="col-span-1 text-right font-tech text-sm text-white/40">
                  {track.duration}
                </div>

                <div className="col-span-2 flex items-center justify-center gap-3">
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleLike(track.id); }}
                    className={`p-2 rounded-full transition-all ${likedTracks.includes(track.id) ? 'text-neon-pink' : 'text-white/40 hover:text-white'}`}
                  >
                    <Heart className={`w-4 h-4 ${likedTracks.includes(track.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-2 rounded-full text-white/40 hover:text-white transition-all">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Embedded Players */}
        <div className="reveal grid md:grid-cols-2 gap-8">
          <div className="glass-neon rounded-2xl p-6">
            <h3 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1DB954">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              Spotify
            </h3>
            <iframe
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/artist/1mmsdJrB5LrN18iDTRQgDK?utm_source=generator&theme=0"
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="bg-transparent"
            />
          </div>

          <div className="glass-neon rounded-2xl p-6">
            <h3 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#FA2D48">
                <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.196.364-1.29.443-2.188 1.246-2.779 2.534-.246.526-.407 1.074-.496 1.638-.085.545-.12 1.096-.13 1.647-.002.12-.004.242.004.362.02.387.04.774.078 1.16.058.627.168 1.24.334 1.838.327 1.13.9 2.096 1.78 2.838.596.502 1.27.88 2.018 1.133.888.306 1.81.455 2.745.512.668.04 1.335.036 2.003.006.178-.008.357-.024.536-.035.052-.003.104-.003.156-.01.148-.018.295-.04.443-.055.47-.05.936-.12 1.395-.224.864-.197 1.667-.52 2.38-1.02.072-.052.143-.106.24-.178l-.013-.022c-.178-.1-.35-.207-.538-.29-.77-.35-1.565-.61-2.398-.766a9.03 9.03 0 00-1.836-.167c-.643.007-1.277.084-1.897.255-1.042.287-1.935.796-2.655 1.59-.14.158-.268.327-.424.519-.188-.166-.353-.317-.51-.466a5.07 5.07 0 01-.69-.835c-.356-.547-.57-1.14-.65-1.774-.062-.48-.058-.963-.016-1.446.05-.574.178-1.13.403-1.66.3-.7.735-1.304 1.33-1.79.84-.69 1.797-1.066 2.86-1.208.74-.098 1.48-.09 2.214.038.89.16 1.73.437 2.53.826.3.146.588.312.882.47l.027-.03c-.294-.37-.59-.738-.88-1.112-.523-.678-1.02-1.373-1.46-2.108-.33-.55-.614-1.12-.816-1.73-.103-.305-.18-.617-.243-.934-.033-.17-.06-.343-.09-.515l-.003.003c-.003-.018-.01-.036-.01-.053-.002-.087-.013-.173-.012-.26.003-.19.02-.378.056-.564.108-.576.374-1.062.826-1.445.356-.303.767-.49 1.216-.575.448-.084.895-.073 1.334.048.544.156 1.003.446 1.375.867.373.42.623.907.756 1.44.124.494.166 1 .137 1.51-.04.66-.17 1.303-.385 1.925-.363 1.03-.91 1.973-1.58 2.863-.347.465-.724.906-1.118 1.336-.156.17-.316.335-.487.517.19.088.362.16.528.24.657.32 1.274.7 1.84 1.144.842.664 1.527 1.447 2.06 2.358.44.757.75 1.56.927 2.41.152.73.2 1.47.148 2.215-.04.58-.12 1.153-.284 1.71-.316 1.063-.86 1.96-1.647 2.686-.657.607-1.413 1.057-2.26 1.36-.733.263-1.49.427-2.27.495-.587.05-1.176.07-1.765.05-.517-.02-1.032-.06-1.54-.13-.957-.135-1.885-.36-2.776-.73-1.073-.456-2.02-1.07-2.823-1.89-.906-.926-1.553-2.01-1.93-3.227-.316-1.02-.433-2.07-.362-3.13.043-.66.136-1.312.31-1.95.27-.99.7-1.9 1.306-2.73.772-1.07 1.74-1.918 2.92-2.53.86-.44 1.77-.733 2.726-.874.48-.07.964-.104 1.45-.1.58.003 1.153.058 1.72.155.76.135 1.496.34 2.21.614.33.123.654.263.996.404z"/>
              </svg>
              Apple Music
            </h3>
            <iframe
              allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
              frameBorder="0"
              height="450"
              style={{ width: '100%', maxWidth: '100%', overflow: 'hidden', borderRadius: '10px', background: 'transparent' }}
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
              src="https://embed.music.apple.com/us/artist/saige/123456789"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicSection;
