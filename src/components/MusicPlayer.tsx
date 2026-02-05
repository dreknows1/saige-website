import { Play, Pause, ShoppingCart, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface Track {
  id: number;
  title: string;
  duration: string;
  act: string;
}

const tracks: Track[] = [
  { id: 1, title: "So Dope", duration: "2:45", act: "Act 1: The Birth" },
  { id: 2, title: "Me Gustas", duration: "3:12", act: "Act 1: The Birth" },
  { id: 3, title: "Right There", duration: "2:58", act: "Act 1: The Birth" },
  { id: 4, title: "Show Me How To Love You", duration: "3:24", act: "Act 2: The Feeling" },
  { id: 5, title: "In This Room", duration: "2:55", act: "Act 2: The Feeling" },
  { id: 6, title: "Red Light", duration: "3:08", act: "Act 2: The Feeling" },
  { id: 7, title: "Love Language", duration: "2:47", act: "Act 2: The Feeling" },
  { id: 8, title: "Claustrophobic", duration: "3:15", act: "Act 2: The Feeling" },
  { id: 9, title: "Sh*t I Should've Said", duration: "3:33", act: "Act 3: The Denial" },
];

const stripePaymentLinks: { [key: string]: string } = {
  'So Dope': 'https://buy.stripe.com/so-dope',
  'Me Gustas': 'https://buy.stripe.com/me-gustas',
  'Right There': 'https://buy.stripe.com/right-there',
  'Show Me How To Love You': 'https://buy.stripe.com/show-me',
  'In This Room': 'https://buy.stripe.com/in-this-room',
  'Red Light': 'https://buy.stripe.com/red-light',
  'Love Language': 'https://buy.stripe.com/love-language',
  'Claustrophobic': 'https://buy.stripe.com/claustrophobic',
  "Sh*t I Should've Said": 'https://buy.stripe.com/shouldve-said',
};

const MusicPlayer = () => {
  const [playingTrack, setPlayingTrack] = useState<number | null>(null);
  const [currentAct, setCurrentAct] = useState<string | null>(null);

  const togglePlay = (trackId: number) => {
    if (playingTrack === trackId) {
      setPlayingTrack(null);
    } else {
      setPlayingTrack(trackId);
    }
  };

  const handleBuy = (trackTitle: string) => {
    const paymentUrl = stripePaymentLinks[trackTitle] || '#';
    window.open(paymentUrl, '_blank');
  };

  return (
    <section id="music" className="py-24 bg-dark-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-secondary text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Listen & Download
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif italic text-white mb-6">
            Heartbreaks Algorithm
          </h2>
          <div className="flex items-center justify-center gap-4 text-gray-400">
            <span className="text-accent">11,632+ streams on Spotify</span>
            <span>•</span>
            <span>2025</span>
          </div>
        </div>

        {/* Featured Track Embed */}
        <div className="mb-12 glass rounded-2xl p-6">
          <p className="text-sm text-gray-400 uppercase tracking-wider mb-4">Now Playing</p>
          <div className="aspect-video max-w-2xl mx-auto rounded-xl overflow-hidden bg-dark-200">
            <iframe
              src="https://open.spotify.com/embed/track/0nJWwK7P5f6P5z5z5z5z5z5?utm_source=generator"
              width="100%"
              height="100%"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-xl"
              title="Spotify Player"
            />
          </div>
        </div>

        {/* Track List */}
        <div className="glass rounded-2xl overflow-hidden">
          {tracks.map((track, index) => (
            <div key={track.id}>
              {/* Act Header */}
              {track.act !== currentAct && (
                <div 
                  className="bg-dark-200 px-6 py-3 text-sm font-medium text-secondary tracking-wider"
                  onLoad={() => setCurrentAct(track.act)}
                >
                  {track.act}
                </div>
              )}
              
              <div className="flex items-center gap-4 px-6 py-4 hover:bg-white/5 transition-colors border-b border-white/5 last:border-b-0">
                {/* Track Number */}
                <span className="text-gray-500 w-6 text-sm">{index + 1}</span>

                {/* Play Button */}
                <button
                  onClick={() => togglePlay(track.id)}
                  className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/40 transition-colors"
                >
                  {playingTrack === track.id ? (
                    <Pause size={16} className="text-primary" />
                  ) : (
                    <Play size={16} className="text-primary ml-0.5" />
                  )}
                </button>

                {/* Track Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium truncate">{track.title}</h3>
                  {playingTrack === track.id && (
                    <div className="flex items-center gap-1 mt-1">
                      <div className="w-1 h-3 bg-primary animate-pulse" />
                      <div className="w-1 h-4 bg-primary animate-pulse delay-75" />
                      <div className="w-1 h-2 bg-primary animate-pulse delay-150" />
                      <span className="text-xs text-primary ml-2">Playing</span>
                    </div>
                  )}
                </div>

                {/* Duration */}
                <span className="text-gray-500 text-sm hidden sm:block">{track.duration}</span>

                {/* Buy Button */}
                <button
                  onClick={() => handleBuy(track.title)}
                  className="flex items-center gap-2 bg-gradient-to-r from-accent to-primary text-dark font-semibold px-4 py-2 rounded-full text-sm hover:shadow-lg hover:shadow-primary/30 transition-all"
                >
                  <ShoppingCart size={14} />
                  <span className="hidden sm:inline">$2.99</span>
                </button>

                {/* Spotify Link */}
                <a
                  href={`https://open.spotify.com/search/${encodeURIComponent(track.title + ' sAIge')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-secondary transition-colors"
                >
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Buy Full Album */}
        <div className="mt-8 text-center">
          <button
            onClick={() => handleBuy('Full Album')}
            className="inline-flex items-center gap-2 bg-white text-dark font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-all shadow-lg shadow-white/20"
          >
            <ShoppingCart size={20} />
            Buy Full Album — $14.99
          </button>
        </div>

        {/* Streaming Links */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
          <span className="text-gray-400 text-sm">Also available on:</span>
          <a href="https://open.spotify.com/artist/1mmsdJrB5LrN18iDTRQgDK" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-secondary transition-colors flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
            Spotify
          </a>
          <a href="https://music.apple.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-secondary transition-colors flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.19.364-1.29.437-2.283 1.168-2.956 2.338a5.11 5.11 0 00-.724 1.994 10.16 10.16 0 00-.14 1.6v10.72c.01.22.02.44.04.66.06.632.17 1.253.35 1.853.4 1.316 1.14 2.31 2.32 3.032.73.45 1.52.71 2.36.83.37.05.74.08 1.12.08h11.97c.14 0 .28-.01.42-.02.65-.04 1.295-.13 1.92-.33 1.28-.41 2.26-1.13 2.95-2.27.4-.66.66-1.37.78-2.11.08-.52.12-1.05.12-1.58V6.724c0-.2-.01-.4-.02-.6zM13.96 17.08c-.08.77-.47 1.33-1.15 1.69-.57.29-1.19.38-1.82.27-.91-.16-1.56-.72-1.79-1.57-.12-.47-.1-.94.07-1.39.36-.93 1.06-1.46 1.97-1.63.91-.17 1.73.05 2.36.64.41.38.63.88.64 1.44.01.18-.01.35-.04.53l-.14.02zm5.04-7.45c-.07.45-.33.8-.72 1.02-.36.2-.76.27-1.17.21-.81-.12-1.39-.7-1.55-1.5-.11-.55.04-1.05.41-1.46.37-.41.85-.62 1.4-.63.56-.01 1.07.19 1.44.57.35.36.52.82.48 1.32-.01.16-.04.31-.09.47h.8z"/></svg>
            Apple Music
          </a>
          <a href="https://music.youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-secondary transition-colors flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z"/></svg>
            YouTube Music
          </a>
        </div>
      </div>
    </section>
  );
};

export default MusicPlayer;
