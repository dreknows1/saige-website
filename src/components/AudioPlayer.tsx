import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

interface Track {
  id: string;
  title: string;
  artist: string;
  src: string;
  cover: string;
  duration: string;
}

interface AudioPlayerProps {
  tracks: Track[];
  currentTrackIndex?: number;
  onTrackChange?: (index: number) => void;
}

export default function AudioPlayer({ tracks, currentTrackIndex = 0, onTrackChange }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [currentIndex, setCurrentIndex] = useState(currentTrackIndex);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const currentTrack = tracks[currentIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    setCurrentIndex(currentTrackIndex);
  }, [currentTrackIndex]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current && audioRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const newTime = percent * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleTrackEnd = () => {
    if (currentIndex < tracks.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      onTrackChange?.(nextIndex);
    } else {
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  const skipTrack = (direction: 'prev' | 'next') => {
    let newIndex = currentIndex;
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : tracks.length - 1;
    } else {
      newIndex = currentIndex < tracks.length - 1 ? currentIndex + 1 : 0;
    }
    setCurrentIndex(newIndex);
    onTrackChange?.(newIndex);
    setIsPlaying(true);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="glass-neon rounded-2xl p-4 w-full">
      <audio
        ref={audioRef}
        src={currentTrack?.src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTrackEnd}
        onLoadedMetadata={handleTimeUpdate}
      />
      
      <div className="flex items-center gap-4">
        {/* Cover */}
        <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
          <img src={currentTrack?.cover} alt={currentTrack?.title} className="w-full h-full object-cover" />
        </div>
        
        {/* Track Info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-display text-sm font-semibold text-white truncate">{currentTrack?.title}</h4>
          <p className="font-tech text-xs text-white/60 truncate">{currentTrack?.artist}</p>
        </div>
        
        {/* Controls */}
        <div className="flex items-center gap-2">
          <button onClick={() => skipTrack('prev')} className="p-2 text-white/60 hover:text-white transition-colors">
            <SkipBack className="w-4 h-4" />
          </button>
          <button onClick={togglePlay} className="w-10 h-10 rounded-full bg-neon-pink flex items-center justify-center text-white hover:scale-105 transition-transform">
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>
          <button onClick={() => skipTrack('next')} className="p-2 text-white/60 hover:text-white transition-colors">
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
        
        {/* Progress */}
        <div className="flex-1 max-w-xs">
          <div ref={progressRef} onClick={handleSeek} className="h-1 bg-white/10 rounded-full cursor-pointer overflow-hidden">
            <div 
              className="h-full bg-neon-pink rounded-full transition-all duration-100"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="font-tech text-xs text-white/40">{formatTime(currentTime)}</span>
            <span className="font-tech text-xs text-white/40">{formatTime(duration || 0)}</span>
          </div>
        </div>
        
        {/* Volume */}
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-white/60" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-20 accent-neon-pink"
          />
        </div>
      </div>
    </div>
  );
}
