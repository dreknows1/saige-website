import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
  audioUrl: string;
  duration: string;
  price?: number;
}

interface AudioPlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playlist: Track[];
  currentIndex: number;
  playTrack: (track: Track) => void;
  playTrackAtIndex: (index: number) => void;
  togglePlay: () => void;
  pause: () => void;
  play: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  seekTo: (time: number) => void;
  setVolume: (volume: number) => void;
  addToPlaylist: (track: Track) => void;
  removeFromPlaylist: (index: number) => void;
  clearPlaylist: () => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error('useAudioPlayer must be used within AudioPlayerProvider');
  }
  return context;
};

interface AudioPlayerProviderProps {
  children: React.ReactNode;
}

export const AudioPlayerProvider: React.FC<AudioPlayerProviderProps> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.8);
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playTrack = useCallback((track: Track) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    setCurrentTrack(track);
    setIsPlaying(true);
    
    // Check if track is already in playlist
    const existingIndex = playlist.findIndex(t => t.id === track.id);
    if (existingIndex === -1) {
      setPlaylist(prev => [...prev, track]);
      setCurrentIndex(playlist.length);
    } else {
      setCurrentIndex(existingIndex);
    }
  }, [playlist]);

  const playTrackAtIndex = useCallback((index: number) => {
    if (index >= 0 && index < playlist.length) {
      setCurrentIndex(index);
      setCurrentTrack(playlist[index]);
      setIsPlaying(true);
    }
  }, [playlist]);

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const play = useCallback(() => {
    if (currentTrack) {
      setIsPlaying(true);
    }
  }, [currentTrack]);

  const nextTrack = useCallback(() => {
    if (playlist.length > 0) {
      const nextIndex = (currentIndex + 1) % playlist.length;
      setCurrentIndex(nextIndex);
      setCurrentTrack(playlist[nextIndex]);
      setIsPlaying(true);
    }
  }, [currentIndex, playlist]);

  const previousTrack = useCallback(() => {
    if (playlist.length > 0) {
      const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
      setCurrentIndex(prevIndex);
      setCurrentTrack(playlist[prevIndex]);
      setIsPlaying(true);
    }
  }, [currentIndex, playlist]);

  const seekTo = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const setVolume = useCallback((newVolume: number) => {
    setVolumeState(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  }, []);

  const addToPlaylist = useCallback((track: Track) => {
    setPlaylist(prev => {
      if (prev.find(t => t.id === track.id)) return prev;
      return [...prev, track];
    });
  }, []);

  const removeFromPlaylist = useCallback((index: number) => {
    setPlaylist(prev => {
      const newPlaylist = prev.filter((_, i) => i !== index);
      if (index === currentIndex && newPlaylist.length > 0) {
        setCurrentTrack(newPlaylist[0]);
        setCurrentIndex(0);
      } else if (newPlaylist.length === 0) {
        setCurrentTrack(null);
        setCurrentIndex(0);
        setIsPlaying(false);
      }
      return newPlaylist;
    });
  }, [currentIndex]);

  const clearPlaylist = useCallback(() => {
    setPlaylist([]);
    setCurrentTrack(null);
    setCurrentIndex(0);
    setIsPlaying(false);
  }, []);

  // Set initial volume on audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, []);

  return (
    <AudioPlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        volume,
        playlist,
        currentIndex,
        playTrack,
        playTrackAtIndex,
        togglePlay,
        pause,
        play,
        nextTrack,
        previousTrack,
        seekTo,
        setVolume,
        addToPlaylist,
        removeFromPlaylist,
        clearPlaylist,
      }}
    >
      {children}
      {currentTrack && (
        <audio
          ref={audioRef}
          src={currentTrack.audioUrl}
          autoPlay={isPlaying}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onEnded={nextTrack}
        />
      )}
    </AudioPlayerContext.Provider>
  );
};

export default AudioPlayerContext;
