import { Play, Pause, Heart, Share2, ExternalLink } from 'lucide-react';
import { useState } from 'react';

const LatestRelease = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <section id="latest" className="relative py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="reveal-left mb-16">
          <span className="font-tech text-neon-cyan text-xs tracking-[0.3em] uppercase mb-4 block">
            New Drop
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Latest <span className="gradient-text">Release</span>
          </h2>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Album Art */}
          <div className="reveal-scale relative group">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-neon-pink via-neon-violet to-neon-cyan rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
              
              {/* Artwork container */}
              <div className="relative rounded-2xl overflow-hidden glass-neon">
                <img 
                  src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&h=800&fit=crop"
                  alt="Neural Dreams Album Art"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Play overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-20 h-20 rounded-full bg-neon-pink flex items-center justify-center glow-pink transform scale-90 group-hover:scale-100 transition-transform"
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8 text-white" />
                    ) : (
                      <Play className="w-8 h-8 text-white ml-1" />
                    )}
                  </button>
                </div>

                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-neon-cyan" />
                <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-neon-cyan" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-neon-cyan" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-neon-cyan" />
              </div>
            </div>
          </div>

          {/* Track Info */}
          <div className="reveal-right">
            <div className="glass-neon rounded-2xl p-8 lg:p-12">
              {/* Track details */}
              <div className="mb-8">
                <span className="inline-block px-3 py-1 rounded-full bg-neon-pink/20 text-neon-pink font-tech text-xs tracking-wider uppercase mb-4">
                  Single
                </span>
                <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                  Neural Dreams
                </h3>
                <p className="font-body text-lg text-white/60">
                  sAIge • 2024
                </p>
              </div>

              {/* Audio visualizer */}
              <div className="flex items-center gap-1 h-16 mb-8">
                {[...Array(20)].map((_, i) => (
                  <div 
                    key={i}
                    className={`flex-1 rounded-full transition-all duration-300 ${
                      isPlaying ? 'visualizer-bar' : 'h-[20%]'
                    }`}
                    style={{ 
                      background: `linear-gradient(to top, #ff006e, #8338ec)`,
                      height: isPlaying ? undefined : '20%',
                      animationDelay: `${i * 0.05}s`
                    }}
                  />
                ))}
              </div>

              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between font-tech text-xs text-white/40 mb-2">
                  <span>0:42</span>
                  <span>3:24</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-1/5 bg-gradient-to-r from-neon-pink to-neon-violet rounded-full" />
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-4 mb-8">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-neon-pink text-white font-tech text-sm tracking-widest uppercase btn-neon glow-pink"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  {isPlaying ? 'Pause' : 'Play Now'}
                </button>
                
                <button 
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-4 border transition-all duration-300 ${
                    isLiked 
                      ? 'border-neon-pink bg-neon-pink/20 text-neon-pink' 
                      : 'border-white/20 text-white/60 hover:border-neon-pink hover:text-neon-pink'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                </button>
                
                <button className="p-4 border border-white/20 text-white/60 hover:border-neon-cyan hover:text-neon-cyan transition-all duration-300">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Streaming links */}
              <div className="pt-8 border-t border-white/10">
                <p className="font-tech text-xs tracking-widest uppercase text-white/40 mb-4">
                  Listen on
                </p>
                <div className="flex flex-wrap gap-3">
                  {['Spotify', 'Apple Music', 'YouTube', 'SoundCloud'].map((platform) => (
                    <button 
                      key={platform}
                      className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white/70 hover:border-neon-cyan hover:text-neon-cyan transition-all duration-300"
                    >
                      {platform}
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestRelease;
