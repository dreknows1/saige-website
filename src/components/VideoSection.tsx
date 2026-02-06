import { useState } from 'react';
import { Play, X, Clock, Eye, Heart, Share2, Film, Youtube } from 'lucide-react';

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
}

// Real Saige videos from YouTube channel
const videos: Video[] = [
  {
    id: 1,
    title: "Me Gustas - Official Visualizer",
    description: "Official visualizer for the hit single Me Gustas from Heartbreaks Algorithm",
    thumbnail: "/assets/images/promo-1.png",
    duration: "4:19",
    views: "15.2K",
    category: "Visualizer",
    year: "2025",
    youtubeUrl: "https://youtube.com/@saigemusik"
  },
  {
    id: 2,
    title: "So Dope - Official Video",
    description: "Official music video for So Dope - part of Heartbreaks Algorithm",
    thumbnail: "/assets/images/promo-2.png",
    duration: "4:06",
    views: "13.3K",
    category: "Music Video",
    year: "2025",
    youtubeUrl: "https://youtube.com/@saigemusik"
  },
  {
    id: 3,
    title: "Right There - Live Session",
    description: "Live studio performance of Right There",
    thumbnail: "/assets/images/promo-3.png",
    duration: "3:57",
    views: "8.9K",
    category: "Live",
    year: "2025",
    youtubeUrl: "https://youtube.com/@saigemusik"
  },
  {
    id: 4,
    title: "Act 1: The Birth - Album Teaser",
    description: "Official teaser for Heartbreaks Algorithm",
    thumbnail: "/assets/images/promo-4.png",
    duration: "2:30",
    views: "25K",
    category: "Teaser",
    year: "2025",
    youtubeUrl: "https://youtube.com/@saigemusik"
  },
];

const categories = ["All", "Music Video", "Visualizer", "Live", "Teaser"];

const VideoSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);

  const filteredVideos = activeCategory === "All" 
    ? videos 
    : videos.filter(video => video.category === activeCategory);

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
            Watch the official visualizers, music videos, and live performances from Saige. 
            Subscribe on YouTube for the latest releases.
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
              <p className="font-body text-white/60">@saigemusik - Official channel with all music videos and exclusive content</p>
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
              onClick={() => setSelectedVideo(video)}
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
            View All Videos on YouTube
            <Youtube className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-50 bg-void/95 backdrop-blur-xl flex items-center justify-center p-6"
          onClick={() => setSelectedVideo(null)}
        >
          <button 
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-neon-pink transition-colors z-10"
            onClick={() => setSelectedVideo(null)}
          >
            <X className="w-6 h-6" />
          </button>

          <div 
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Video Player Placeholder */}
            <div className="aspect-video bg-black rounded-2xl overflow-hidden relative">
              <img 
                src={selectedVideo.thumbnail}
                alt={selectedVideo.title}
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <a 
                  href={selectedVideo.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center hover:scale-110 transition-transform mb-4"
                >
                  <Play className="w-8 h-8 text-white ml-1" />
                </a>
                <p className="font-tech text-sm text-white/60">Watch on YouTube</p>
              </div>
            </div>

            {/* Video Info */}
            <div className="mt-6 flex items-start justify-between">
              <div>
                <h3 className="font-display text-2xl font-bold text-white mb-2">
                  {selectedVideo.title}
                </h3>
                <p className="font-body text-white/60 mb-4">{selectedVideo.description}</p>
                <div className="flex items-center gap-6 font-tech text-sm text-white/40">
                  <span className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    {selectedVideo.views} views
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {selectedVideo.duration}
                  </span>
                  <span>{selectedVideo.year}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-3 rounded-full bg-white/10 hover:bg-neon-pink/20 transition-colors">
                  <Heart className="w-5 h-5 text-white" />
                </button>
                <button className="p-3 rounded-full bg-white/10 hover:bg-neon-pink/20 transition-colors">
                  <Share2 className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoSection;
