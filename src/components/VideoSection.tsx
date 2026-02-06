import { useState } from 'react';
import { Play, Eye, Film, Youtube, X } from 'lucide-react';

interface Video {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: string;
  category: string;
  year: string;
  youtubeUrl: string;
  videoId: string;
}

// REAL Saige videos from @saigemusik YouTube channel
const videos: Video[] = [
  {
    id: 1,
    title: "So Dope (Official Music Video)",
    description: "Official music video for So Dope featuring Noir",
    thumbnail: "/assets/images/promo-1.png",
    duration: "4:35",
    views: "397",
    category: "Music Video",
    year: "2025",
    youtubeUrl: "https://www.youtube.com/watch?v=Q-t7yioHDCY",
    videoId: "Q-t7yioHDCY"
  },
  {
    id: 2,
    title: "So Dope (Lyric Video)",
    description: "Lyric video for So Dope from Heartbreaks Algorithm",
    thumbnail: "/assets/images/promo-2.png",
    duration: "4:11",
    views: "740",
    category: "Lyric Video",
    year: "2025",
    youtubeUrl: "https://www.youtube.com/watch?v=O6IEI94SA-I",
    videoId: "O6IEI94SA-I"
  },
  {
    id: 3,
    title: "Me Gustas (Lyric Video)",
    description: "Lyric video for Me Gustas from Heartbreaks Algorithm",
    thumbnail: "/assets/images/promo-3.png",
    duration: "4:20",
    views: "412",
    category: "Lyric Video",
    year: "2025",
    youtubeUrl: "https://www.youtube.com/watch?v=02Kq4iVrtQ0",
    videoId: "02Kq4iVrtQ0"
  },
  {
    id: 4,
    title: "Me Gustas (Official Audio)",
    description: "Official audio for Me Gustas",
    thumbnail: "/assets/images/promo-4.png",
    duration: "4:21",
    views: "102",
    category: "Audio",
    year: "2025",
    youtubeUrl: "https://www.youtube.com/watch?v=uLzElU2UrcQ",
    videoId: "uLzElU2UrcQ"
  },
  {
    id: 5,
    title: "Sh*t I Should've Said (Lyric Video)",
    description: "Lyric video from Heartbreaks Algorithm",
    thumbnail: "/assets/images/promo-5.png",
    duration: "3:46",
    views: "191",
    category: "Lyric Video",
    year: "2025",
    youtubeUrl: "https://www.youtube.com/watch?v=vz6N1NsZl5E",
    videoId: "vz6N1NsZl5E"
  },
  {
    id: 6,
    title: "You Lie So Good (Lyric Video)",
    description: "Lyric video from Heartbreaks Algorithm",
    thumbnail: "/assets/images/promo-6.png",
    duration: "4:18",
    views: "112",
    category: "Lyric Video",
    year: "2025",
    youtubeUrl: "https://www.youtube.com/watch?v=Vnk2pK83qGg",
    videoId: "Vnk2pK83qGg"
  },
];

const categories = ["All", "Music Video", "Lyric Video", "Audio"];

const VideoSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const filteredVideos = activeCategory === "All" 
    ? videos 
    : videos.filter(video => video.category === activeCategory);

  const openVideo = (videoId: string) => {
    setPlayingVideo(videoId);
  };

  const closeVideo = () => {
    setPlayingVideo(null);
  };

  return (
    <section id="videos" className="relative py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="reveal mb-12">
          <span className="font-tech text-neon-cyan text-xs tracking-[0.3em] uppercase mb-4 block">
            Visual Content
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Music <span className="gradient-text">Videos</span>
          </h2>
          <p className="font-body text-lg text-white/60 max-w-2xl">
            Watch the official music videos, lyric videos, and visualizers from Saige.
          </p>
        </div>

        {/* YouTube Channel CTA */}
        <div className="reveal mb-12">
          <a 
            href="https://youtube.com/@saigemusik" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-4 p-6 glass-neon rounded-2xl hover:border-red-500/50 transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-xl bg-red-500/20 flex items-center justify-center">
              <Youtube className="w-8 h-8 text-red-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                Subscribe on YouTube
              </h3>
              <p className="font-body text-white/60">@saigemusik - 108 videos, 239 subscribers</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
              <Play className="w-5 h-5 text-white group-hover:text-red-400 transition-colors" />
            </div>
          </a>
        </div>

        {/* Category filter */}
        <div className="reveal flex flex-wrap gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full font-tech text-xs tracking-widest uppercase transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-neon-cyan text-white glow-cyan'
                  : 'bg-white/5 text-white/60 border border-white/10 hover:border-neon-cyan hover:text-neon-cyan'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Videos Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video, index) => (
            <div
              key={video.id}
              className="reveal-scale group relative rounded-2xl overflow-hidden cursor-pointer card-lift"
              style={{ transitionDelay: `${index * 0.05}s` }}
              onMouseEnter={() => setHoveredVideo(video.id)}
              onMouseLeave={() => setHoveredVideo(null)}
              onClick={() => openVideo(video.videoId)}
            >
              {/* Thumbnail */}
              <div className="aspect-video relative">
                <img 
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Duration badge */}
                <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/80 text-white font-tech text-xs">
                  {video.duration}
                </div>

                {/* Play overlay */}
                <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
                  hoveredVideo === video.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
                    <Play className="w-6 h-6 text-white ml-1" />
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-4 bg-void/50">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-pink to-neon-violet flex items-center justify-center flex-shrink-0">
                    <Film className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-body font-semibold text-white text-sm line-clamp-2 mb-1 group-hover:text-neon-pink transition-colors">
                      {video.title}
                    </h3>
                    <p className="font-tech text-xs text-white/50 mb-2">{video.description}</p>
                    <div className="flex items-center gap-4 font-tech text-xs text-white/40">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {video.views}
                      </span>
                      <span>{video.year}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Border glow on hover */}
              <div className={`absolute inset-0 rounded-2xl border-2 transition-all duration-300 pointer-events-none ${
                hoveredVideo === video.id ? 'border-neon-pink shadow-[0_0_30px_rgba(255,0,110,0.3)]' : 'border-transparent'
              }`} />
            </div>
          ))}
        </div>

        {/* View all button */}
        <div className="reveal text-center mt-12">
          <a 
            href="https://youtube.com/@saigemusik"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-tech text-sm tracking-widest uppercase hover:border-red-500 hover:text-red-400 transition-all duration-300 rounded-full"
          >
            View All 108 Videos on YouTube
            <Youtube className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Video Modal with Embedded Player */}
      {playingVideo && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={closeVideo}
        >
          <button 
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-neon-pink transition-colors z-10"
            onClick={closeVideo}
          >
            <X className="w-6 h-6" />
          </button>

          <div 
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* YouTube Embed */}
            <div className="aspect-video bg-black rounded-2xl overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${playingVideo}?autoplay=1&rel=0`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoSection;
