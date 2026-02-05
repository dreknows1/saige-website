import { useState, useEffect } from 'react';
import { Play, Pause, Music, Disc3, ShoppingCart, Heart, Share2, Volume2 } from 'lucide-react';
import { useAudioPlayer } from '../contexts/AudioPlayerContext';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { playTrack, currentTrack, isPlaying, togglePlay } = useAudioPlayer();

  // Current single data - "Heartbreaks Algorithm" is the latest release
  const currentSingle = {
    id: 'heartbreaks-algorithm',
    title: 'Heartbreaks Algorithm',
    artist: 'Saige',
    album: 'Heartbreaks Algorithm',
    cover: '/assets/album-covers/the-audacity.png',
    audioUrl: '/assets/audio/heartbreaks-algorithm.mp3',
    duration: '3:45',
    description: 'The latest single from Saige - a soulful journey through digital heartbreak',
    price: 1.29,
    spotifyUrl: 'https://open.spotify.com/album/75ONs0kRj8oOTTmSKm9At8',
    appleUrl: 'https://music.apple.com/album/heartbreaks-algorithm',
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const isCurrentTrack = currentTrack?.id === currentSingle.id;
  const isCurrentlyPlaying = isCurrentTrack && isPlaying;

  const handlePlay = () => {
    if (isCurrentTrack) {
      togglePlay();
    } else {
      playTrack(currentSingle);
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="/assets/images/promo-1.png"
          alt="Saige"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void/60 via-void/40 to-void" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/80 via-transparent to-void/80" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-pink/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-violet/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-12 py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-pink/20 border border-neon-pink/30 mb-6">
                <Disc3 className="w-4 h-4 text-neon-pink animate-spin-slow" />
                <span className="font-tech text-xs tracking-widest uppercase text-neon-pink">
                  Latest Release
                </span>
              </div>

              {/* Title */}
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                <span className="block">Heartbreaks</span>
                <span className="block gradient-text">Algorithm</span>
              </h1>

              {/* Description */}
              <p className="font-body text-lg md:text-xl text-white/70 mb-8 max-w-lg leading-relaxed">
                {currentSingle.description}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Music className="w-4 h-4 text-neon-cyan" />
                  <span className="font-tech text-sm text-white/60">3,541 Monthly Listeners</span>
                </div>
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-neon-violet" />
                  <span className="font-tech text-sm text-white/60">13K+ Streams</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={handlePlay}
                  className="group flex items-center gap-3 px-8 py-4 bg-neon-pink text-white font-tech text-sm tracking-widest uppercase rounded-full hover:glow-pink transition-all duration-300 hover:scale-105"
                >
                  {isCurrentlyPlaying ? (
                    <>
                      <Pause className="w-5 h-5" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 ml-0.5" />
                      Play Now
                    </>
                  )}
                </button>
                
                <a 
                  href={currentSingle.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-tech text-sm tracking-widest uppercase rounded-full hover:border-neon-cyan hover:text-neon-cyan transition-all duration-300"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                  Spotify
                </a>

                <button className="flex items-center gap-3 px-6 py-4 border border-white/20 text-white font-tech text-sm tracking-widest uppercase rounded-full hover:border-neon-pink hover:text-neon-pink transition-all duration-300">
                  <ShoppingCart className="w-4 h-4" />
                  ${currentSingle.price}
                </button>
              </div>

              {/* Social Proof */}
              <div className="mt-8 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i} 
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-pink to-neon-violet border-2 border-void"
                    />
                  ))}
                </div>
                <p className="font-body text-sm text-white/60">
                  <span className="text-white font-semibold">3,541</span> monthly listeners on Spotify
                </p>
              </div>
            </div>

            {/* Right: Featured Media Player */}
            <div 
              className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-neon-pink/20 via-neon-violet/20 to-neon-cyan/20 rounded-3xl blur-2xl opacity-50" />
                
                {/* Album Art Card */}
                <div className="relative glass-neon rounded-3xl overflow-hidden">
                  <div className="aspect-square relative">
                    <img 
                      src={currentSingle.cover}
                      alt={currentSingle.title}
                      className={`w-full h-full object-cover transition-transform duration-700 ${isHovering ? 'scale-110' : 'scale-100'}`}
                    />
                    
                    {/* Play Overlay */}
                    <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isHovering || isCurrentlyPlaying ? 'opacity-100' : 'opacity-0'}`}>
                      <button 
                        onClick={handlePlay}
                        className="w-20 h-20 rounded-full bg-neon-pink flex items-center justify-center text-white hover:scale-110 transition-transform shadow-[0_0_40px_rgba(255,0,110,0.5)]"
                      >
                        {isCurrentlyPlaying ? (
                          <Pause className="w-8 h-8" />
                        ) : (
                          <Play className="w-8 h-8 ml-1" />
                        )}
                      </button>
                    </div>

                    {/* Now Playing Indicator */}
                    {isCurrentlyPlaying && (
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-neon-pink/80 text-white font-tech text-xs tracking-wider flex items-center gap-2">
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        NOW PLAYING
                      </div>
                    )}
                  </div>

                  {/* Track Info Bar */}
                  <div className="p-6 bg-void/50">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-display text-xl font-bold text-white">{currentSingle.title}</h3>
                        <p className="font-body text-white/60">{currentSingle.artist}</p>
                      </div>
                      <span className="font-tech text-sm text-white/40">{currentSingle.duration}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={handlePlay}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-neon-pink text-white font-tech text-sm tracking-wider rounded-xl hover:glow-pink transition-all"
                      >
                        {isCurrentlyPlaying ? (
                          <>
                            <Pause className="w-4 h-4" />
                            PAUSE
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4" />
                            PLAY
                          </>
                        )}
                      </button>
                      
                      <button className="p-3 rounded-xl bg-white/5 text-white/60 hover:text-neon-pink hover:bg-white/10 transition-all">
                        <Heart className="w-5 h-5" />
                      </button>
                      
                      <button className="p-3 rounded-xl bg-white/5 text-white/60 hover:text-neon-cyan hover:bg-white/10 transition-all">
                        <Share2 className="w-5 h-5" />
                      </button>

                      <button className="p-3 rounded-xl bg-white/5 text-white/60 hover:text-neon-yellow hover:bg-white/10 transition-all">
                        <ShoppingCart className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Streaming Links */}
                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-center gap-4">
                      <span className="font-tech text-xs text-white/40 uppercase tracking-wider">Listen on</span>
                      <a 
                        href={currentSingle.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/40 hover:text-[#1DB954] transition-colors"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                        </svg>
                      </a>
                      <a 
                        href={currentSingle.appleUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/40 hover:text-[#FA2D48] transition-colors"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.196.364-1.29.443-2.188 1.246-2.779 2.534-.246.526-.407 1.074-.496 1.638-.085.545-.12 1.096-.13 1.647-.002.12-.004.242.004.362.02.387.04.774.078 1.16.058.627.168 1.24.334 1.838.327 1.13.9 2.096 1.78 2.838.596.502 1.27.88 2.018 1.133.888.306 1.81.455 2.745.512.668.04 1.335.036 2.003.006.178-.008.357-.024.536-.035.052-.003.104-.003.156-.01.148-.018.295-.04.443-.055.47-.05.936-.12 1.395-.224.864-.197 1.667-.52 2.38-1.02.072-.052.143-.106.24-.178l-.013-.022c-.178-.1-.35-.207-.538-.29-.77-.35-1.565-.61-2.398-.766a9.03 9.03 0 00-1.836-.167c-.643.007-1.277.084-1.897.255-1.042.287-1.935.796-2.655 1.59-.14.158-.268.327-.424.519-.188-.166-.353-.317-.51-.466a5.07 5.07 0 01-.69-.835c-.356-.547-.57-1.14-.65-1.774-.062-.48-.058-.963-.016-1.446.05-.574.178-1.13.403-1.66.3-.7.735-1.304 1.33-1.79.84-.69 1.797-1.066 2.86-1.208.74-.098 1.48-.09 2.214.038.89.16 1.73.437 2.53.826.3.146.588.312.882.47l.027-.03c-.294-.37-.59-.738-.88-1.112-.523-.678-1.02-1.373-1.46-2.108-.33-.55-.614-1.12-.816-1.73-.103-.305-.18-.617-.243-.934-.033-.17-.06-.343-.09-.515l-.003.003c-.003-.018-.01-.036-.01-.053-.002-.087-.013-.173-.012-.26.003-.19.02-.378.056-.564.108-.576.374-1.062.826-1.445.356-.303.767-.49 1.216-.575.448-.084.895-.073 1.334.048.544.156 1.003.446 1.375.867.373.42.623.907.756 1.44.124.494.166 1 .137 1.51-.04.66-.17 1.303-.385 1.925-.363 1.03-.91 1.973-1.58 2.863-.347.465-.724.906-1.118 1.336-.156.17-.316.335-.487.517.19.088.362.16.528.24.657.32 1.274.7 1.84 1.144.842.664 1.527 1.447 2.06 2.358.44.757.75 1.56.927 2.41.152.73.2 1.47.148 2.215-.04.58-.12 1.153-.284 1.71-.316 1.063-.86 1.96-1.647 2.686-.657.607-1.413 1.057-2.26 1.36-.733.263-1.49.427-2.27.495-.587.05-1.176.07-1.765.05-.517-.02-1.032-.06-1.54-.13-.957-.135-1.885-.36-2.776-.73-1.073-.456-2.02-1.07-2.823-1.89-.906-.926-1.553-2.01-1.93-3.227-.316-1.02-.433-2.07-.362-3.13.043-.66.136-1.312.31-1.95.27-.99.7-1.9 1.306-2.73.772-1.07 1.74-1.918 2.92-2.53.86-.44 1.77-.733 2.726-.874.48-.07.964-.104 1.45-.1.58.003 1.153.058 1.72.155.76.135 1.496.34 2.21.614.33.123.654.263.996.404z"/>
                        </svg>
                      </a>
                      <a 
                        href="https://soundcloud.com/saigemusik"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/40 hover:text-[#FF5500] transition-colors"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.255-2.154c-.009-.06-.052-.1-.099-.1zm-.899.828c-.06 0-.091.037-.104.094L0 14.479l.165 1.308c.014.057.045.094.09.094s.089-.037.099-.094l.21-1.319-.21-1.334c-.01-.057-.05-.091-.099-.091zm1.83-1.229c-.061 0-.12.045-.12.104l-.21 2.563.225 2.458c0 .06.045.104.106.104.061 0 .12-.045.12-.104l.24-2.474-.24-2.547c0-.06-.061-.104-.12-.104zm.945-.089c-.075 0-.135.06-.15.135l-.193 2.64.21 2.544c.016.077.075.138.149.138.075 0 .135-.061.15-.138l.24-2.544-.24-2.64c-.015-.075-.06-.135-.15-.135zm.93-.069c-.09 0-.149.075-.165.165l-.18 2.7.195 2.52c.016.09.075.165.165.165.089 0 .165-.075.165-.165l.225-2.52-.225-2.7c0-.09-.076-.165-.165-.165zm.915-.06c-.105 0-.18.09-.195.18l-.18 2.76.21 2.489c.016.105.09.18.18.18.104 0 .179-.075.195-.18l.225-2.49-.24-2.759c-.016-.09-.09-.18-.195-.18zm.956-.025c-.119 0-.209.09-.224.194l-.165 2.79.195 2.459c.016.119.105.209.225.209.119 0 .209-.09.225-.209l.225-2.459-.225-2.79c-.015-.104-.106-.194-.24-.194zm.99-.015c-.134 0-.24.105-.255.225l-.165 2.805.21 2.43c.016.135.12.24.255.24.134 0 .24-.105.255-.24l.24-2.43-.24-2.805c-.015-.12-.12-.225-.255-.225zm1.05-.015c-.15 0-.27.12-.285.255l-.15 2.82.21 2.4c.016.15.135.27.285.27.149 0 .27-.12.285-.27l.24-2.4-.24-2.82c-.015-.135-.135-.255-.285-.255zm1.005-.045c-.164 0-.285.12-.3.27l-.15 2.865.21 2.37c.016.164.135.285.3.285.164 0 .284-.12.3-.285l.239-2.37-.24-2.865c-.015-.15-.135-.27-.299-.27l.001.001zm1.02-.045c-.18 0-.315.135-.33.3l-.135 2.91.195 2.34c.015.18.15.315.33.315s.315-.135.33-.315l.225-2.34-.225-2.91c-.015-.165-.15-.3-.33-.3zm1.065-.045c-.194 0-.345.15-.36.33l-.135 2.955.195 2.31c.015.195.165.345.36.345.194 0 .345-.15.36-.345l.24-2.31-.24-2.955c-.015-.18-.165-.33-.36-.33zm1.005-.045c-.21 0-.375.165-.39.36l-.12 3 .195 2.28c.015.21.18.375.39.375.21 0 .375-.165.39-.375l.24-2.28-.24-3c-.015-.195-.18-.36-.39-.36zm1.065-.045c-.225 0-.405.18-.42.39l-.12 3.045.195 2.25c.015.225.195.405.42.405.226 0 .405-.18.42-.405l.24-2.25-.24-3.045c-.015-.21-.194-.39-.42-.39zm1.02-.045c-.24 0-.435.195-.45.42l-.12 3.09.195 2.22c.015.24.21.435.45.435.239 0 .434-.195.449-.435l.24-2.22-.24-3.09c-.015-.225-.21-.42-.449-.42zm1.065-.045c-.255 0-.465.21-.48.45l-.105 3.135.195 2.19c.015.255.225.465.48.465.255 0 .465-.21.48-.465l.24-2.19-.24-3.135c-.015-.24-.225-.45-.48-.45zm1.02-.045c-.27 0-.495.225-.51.48l-.105 3.18.195 2.16c.015.27.24.495.51.495.27 0 .495-.225.51-.495l.24-2.16-.24-3.18c-.015-.255-.24-.48-.51-.48zm1.035-.045c-.285 0-.525.24-.54.51l-.09 3.225.195 2.13c.015.285.255.525.54.525.286 0 .525-.24.54-.525l.24-2.13-.24-3.225c-.015-.27-.255-.51-.54-.51zm1.02-.045c-.3 0-.555.255-.57.54l-.09 3.27.195 2.1c.015.3.27.555.57.555.3 0 .555-.255.57-.555l.24-2.1-.24-3.27c-.015-.285-.27-.54-.57-.54zm1.035-.045c-.315 0-.585.27-.6.57l-.075 3.315.195 2.07c.015.315.285.585.6.585.315 0 .585-.27.6-.585l.24-2.07-.24-3.315c-.015-.3-.285-.57-.6-.57zm1.005-.045c-.33 0-.615.285-.63.6l-.075 3.36.195 2.04c.015.33.3.615.63.615.33 0 .615-.285.63-.615l.24-2.04-.24-3.36c-.015-.315-.3-.6-.63-.6zm1.035-.045c-.345 0-.645.3-.66.63l-.06 3.405.195 2.01c.015.345.315.645.66.645.345 0 .645-.3.66-.645l.24-2.01-.24-3.405c-.015-.33-.315-.63-.66-.63zm1.005-.045c-.36 0-.675.315-.69.66l-.06 3.45.195 1.98c.015.36.33.675.69.675.36 0 .675-.315.69-.675l.24-1.98-.24-3.45c-.015-.345-.33-.66-.69-.66zm1.035-.045c-.375 0-.705.33-.72.69l-.045 3.495.195 1.95c.015.375.345.705.72.705.375 0 .705-.33.72-.705l.24-1.95-.24-3.495c-.015-.36-.345-.69-.72-.69zm1.005-.045c-.39 0-.735.345-.75.72l-.045 3.54.195 1.92c.015.39.36.735.75.735.39 0 .735-.345.75-.735l.24-1.92-.24-3.54c-.015-.375-.36-.72-.75-.72zm1.02-.045c-.405 0-.765.36-.78.75l-.03 3.585.195 1.89c.015.405.375.765.78.765.405 0 .765-.36.78-.765l.24-1.89-.24-3.585c-.015-.39-.375-.75-.78-.75zm1.005-.045c-.42 0-.795.375-.81.78l-.03 3.63.195 1.86c.015.42.39.795.81.795.42 0 .795-.375.81-.795l.24-1.86-.24-3.63c-.015-.405-.39-.78-.81-.78zm1.02-.045c-.435 0-.825.39-.84.81l-.015 3.675.195 1.83c.015.435.405.825.84.825.435 0 .825-.39.84-.825l.24-1.83-.24-3.675c-.015-.42-.405-.81-.84-.81z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="font-tech text-xs tracking-widest uppercase text-white/40">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
