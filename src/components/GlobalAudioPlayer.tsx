import { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Repeat,
  Shuffle,
  ListMusic,
  X,
  Heart,
  ShoppingCart
} from 'lucide-react';
import { useAudioPlayer } from '../contexts/AudioPlayerContext';

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const GlobalAudioPlayer = () => {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    playlist,
    currentIndex,
    togglePlay,
    nextTrack,
    previousTrack,
    seekTo,
    setVolume,
    removeFromPlaylist,
    playTrackAtIndex,
  } = useAudioPlayer();

  const [showPlaylist, setShowPlaylist] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const [prevVolume, setPrevVolume] = useState(volume);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentTrack) {
      document.title = `${isPlaying ? '▶ ' : ''}${currentTrack.title} - Saige`;
    }
  }, [currentTrack, isPlaying]);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      seekTo(percent * duration);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(prevVolume);
      setIsMuted(false);
    } else {
      setPrevVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <>
      {/* Main Player Bar - Only show when track is playing */}
      {currentTrack && (
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-void/95 backdrop-blur-xl border-t border-white/10">
        {/* Progress Bar */}
        <div 
          ref={progressRef}
          className="h-1 bg-white/10 cursor-pointer group"
          onClick={handleProgressClick}
        >
          <div 
            className="h-full bg-gradient-to-r from-neon-pink to-neon-violet relative"
            style={{ width: `${progressPercent}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg" />
          </div>
        </div>

        <div className="px-4 lg:px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Track Info */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={currentTrack.cover} 
                  alt={currentTrack.title}
                  className={`w-full h-full object-cover ${isPlaying ? 'animate-pulse-slow' : ''}`}
                />
                {isPlaying && (
                  <div className="absolute inset-0 flex items-end justify-center gap-0.5 pb-1 bg-gradient-to-t from-black/60 to-transparent">
                    {[...Array(4)].map((_, i) => (
                      <div 
                        key={i}
                        className="w-1 bg-neon-pink rounded-full animate-equalizer"
                        style={{ 
                          height: '12px',
                          animationDelay: `${i * 0.1}s`,
                          animationDuration: '0.5s'
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <h4 className="font-body font-semibold text-white truncate text-sm">
                  {currentTrack.title}
                </h4>
                <p className="font-tech text-xs text-white/50 truncate">
                  {currentTrack.artist} • {currentTrack.album}
                </p>
              </div>
              <button className="p-2 text-white/40 hover:text-neon-pink transition-colors">
                <Heart className="w-4 h-4" />
              </button>
              {currentTrack.price && (
                <button className="p-2 text-white/40 hover:text-neon-cyan transition-colors" title="Add to cart">
                  <ShoppingCart className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 lg:gap-4">
              <button 
                onClick={() => setIsShuffled(!isShuffled)}
                className={`p-2 transition-colors ${isShuffled ? 'text-neon-pink' : 'text-white/40 hover:text-white'}`}
              >
                <Shuffle className="w-4 h-4" />
              </button>
              
              <button 
                onClick={previousTrack}
                className="p-2 text-white/60 hover:text-white transition-colors"
              >
                <SkipBack className="w-5 h-5" />
              </button>

              <button 
                onClick={togglePlay}
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-neon-pink flex items-center justify-center text-white hover:glow-pink transition-all hover:scale-105"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 lg:w-6 lg:h-6" />
                ) : (
                  <Play className="w-5 h-5 lg:w-6 lg:h-6 ml-0.5" />
                )}
              </button>

              <button 
                onClick={nextTrack}
                className="p-2 text-white/60 hover:text-white transition-colors"
              >
                <SkipForward className="w-5 h-5" />
              </button>

              <button 
                onClick={() => setIsRepeating(!isRepeating)}
                className={`p-2 transition-colors ${isRepeating ? 'text-neon-pink' : 'text-white/40 hover:text-white'}`}
              >
                <Repeat className="w-4 h-4" />
              </button>
            </div>

            {/* Volume & Time */}
            <div className="hidden md:flex items-center gap-4 flex-1 justify-end">
              <span className="font-tech text-xs text-white/50">
                {formatTime(currentTime)} / {formatTime(duration || 0)}
              </span>

              <div className="flex items-center gap-2">
                <button 
                  onClick={toggleMute}
                  className="p-2 text-white/60 hover:text-white transition-colors"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-neon-pink"
                />
              </div>

              <button 
                onClick={() => setShowPlaylist(!showPlaylist)}
                className={`p-2 transition-colors ${showPlaylist ? 'text-neon-pink' : 'text-white/60 hover:text-white'}`}
              >
                <ListMusic className="w-5 h-5" />
                {playlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-neon-pink text-white text-xs rounded-full flex items-center justify-center font-tech">
                    {playlist.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Playlist Panel - Only show when player is active */}
      {currentTrack && showPlaylist && (
        <div className="fixed bottom-24 right-4 lg:right-6 z-50 w-80 glass-neon rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <h3 className="font-display text-sm font-bold text-white">Queue ({playlist.length})</h3>
            <button 
              onClick={() => setShowPlaylist(false)}
              className="p-1 text-white/40 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {playlist.length === 0 ? (
              <p className="p-4 text-center font-body text-sm text-white/40">Queue is empty</p>
            ) : (
              playlist.map((track, index) => (
                <div 
                  key={`${track.id}-${index}`}
                  onClick={() => playTrackAtIndex(index)}
                  className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-white/5 transition-colors ${
                    index === currentIndex ? 'bg-neon-pink/10 border-l-2 border-neon-pink' : ''
                  }`}
                >
                  <img 
                    src={track.cover} 
                    alt={track.title}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`font-body text-sm truncate ${index === currentIndex ? 'text-neon-pink' : 'text-white'}`}>
                      {track.title}
                    </p>
                    <p className="font-tech text-xs text-white/40 truncate">{track.artist}</p>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); removeFromPlaylist(index); }}
                    className="p-1 text-white/20 hover:text-white/60 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Spacer for fixed player - always reserve space */}
      <div className="h-20" />
    </>
  );
};

export default GlobalAudioPlayer;
