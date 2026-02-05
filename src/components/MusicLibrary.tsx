import { Play, Clock, Disc, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface Track {
  id: number;
  title: string;
  album: string;
  duration: string;
  plays: string;
  cover: string;
  year: string;
}

const tracks: Track[] = [
  {
    id: 1,
    title: "Neural Dreams",
    album: "Singles",
    duration: "3:24",
    plays: "12.5M",
    cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop",
    year: "2024"
  },
  {
    id: 2,
    title: "Digital Heartbeat",
    album: "Synthetic Soul",
    duration: "4:12",
    plays: "8.3M",
    cover: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=300&h=300&fit=crop",
    year: "2024"
  },
  {
    id: 3,
    title: "Binary Emotions",
    album: "Synthetic Soul",
    duration: "3:48",
    plays: "6.7M",
    cover: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=300&h=300&fit=crop",
    year: "2024"
  },
  {
    id: 4,
    title: "Electric Memories",
    album: "Singles",
    duration: "3:56",
    plays: "5.2M",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    year: "2023"
  },
  {
    id: 5,
    title: "Synthetic Love",
    album: "Genesis",
    duration: "4:05",
    plays: "4.8M",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    year: "2023"
  },
  {
    id: 6,
    title: "Algorithm Dreams",
    album: "Genesis",
    duration: "3:32",
    plays: "3.9M",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
    year: "2023"
  },
];

const albums = [
  {
    title: "Synthetic Soul",
    year: "2024",
    tracks: 8,
    cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&h=400&fit=crop",
    color: "from-neon-pink to-neon-violet"
  },
  {
    title: "Genesis",
    year: "2023",
    tracks: 6,
    cover: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=400&fit=crop",
    color: "from-neon-cyan to-neon-violet"
  },
];

const MusicLibrary = () => {
  const [hoveredTrack, setHoveredTrack] = useState<number | null>(null);
  const [playingTrack, setPlayingTrack] = useState<number | null>(null);

  return (
    <section id="library" className="relative py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="reveal mb-16">
          <span className="font-tech text-neon-violet text-xs tracking-[0.3em] uppercase mb-4 block">
            Discography
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Music <span className="gradient-text">Library</span>
          </h2>
          <p className="font-body text-lg text-white/60 max-w-2xl">
            Every track is a journey through synthetic soundscapes and digital emotions.
          </p>
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
                {/* Album cover */}
                <div className="relative w-32 h-32 flex-shrink-0">
                  <div className={`absolute inset-0 bg-gradient-to-br ${album.color} rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`} />
                  <img 
                    src={album.cover}
                    alt={album.title}
                    className="relative w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Play className="w-5 h-5 text-white ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Album info */}
                <div className="flex-1">
                  <h3 className="font-display text-xl font-bold text-white mb-1 group-hover:text-neon-pink transition-colors">
                    {album.title}
                  </h3>
                  <p className="font-body text-sm text-white/60 mb-3">
                    {album.year} • {album.tracks} tracks
                  </p>
                  <button className="font-tech text-xs tracking-widest uppercase text-neon-cyan hover:text-white transition-colors flex items-center gap-2">
                    <Disc className="w-4 h-4" />
                    Play Album
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tracks Table */}
        <div className="reveal-right glass-neon rounded-2xl overflow-hidden">
          {/* Table header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/10 font-tech text-xs tracking-widest uppercase text-white/40">
            <div className="col-span-1">#</div>
            <div className="col-span-5">Title</div>
            <div className="col-span-2">Album</div>
            <div className="col-span-2 text-right">
              <TrendingUp className="w-4 h-4 inline" />
            </div>
            <div className="col-span-2 text-right">
              <Clock className="w-4 h-4 inline" />
            </div>
          </div>

          {/* Tracks */}
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
                {/* Number / Play button */}
                <div className="col-span-1 font-tech text-white/40 group-hover:text-neon-pink">
                  {hoveredTrack === track.id || playingTrack === track.id ? (
                    <Play className="w-4 h-4" />
                  ) : (
                    <span className="text-sm">{String(index + 1).padStart(2, '0')}</span>
                  )}
                </div>

                {/* Title with cover */}
                <div className="col-span-5 flex items-center gap-4">
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

                {/* Album */}
                <div className="col-span-2 font-body text-sm text-white/60 hidden md:block">
                  {track.album}
                </div>

                {/* Plays */}
                <div className="col-span-2 text-right font-tech text-sm text-white/40 hidden md:block">
                  {track.plays}
                </div>

                {/* Duration */}
                <div className="col-span-2 text-right font-tech text-sm text-white/40">
                  {track.duration}
                </div>

                {/* Visualizer bars for playing track */}
                {playingTrack === track.id && (
                  <div className="absolute right-6 flex items-center gap-0.5">
                    {[...Array(4)].map((_, i) => (
                      <div 
                        key={i}
                        className="w-1 bg-neon-pink visualizer-bar rounded-full"
                        style={{ 
                          height: '16px',
                          animationDelay: `${i * 0.1}s`
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* View all button */}
        <div className="reveal text-center mt-12">
          <button className="px-8 py-4 border border-white/20 text-white font-tech text-sm tracking-widest uppercase hover:border-neon-violet hover:text-neon-violet transition-all duration-300">
            View Complete Discography
          </button>
        </div>
      </div>
    </section>
  );
};

export default MusicLibrary;
