import { useState } from 'react';
import { ShoppingCart, Download, Music, Disc, Check, CreditCard, Lock, Package } from 'lucide-react';
import { useAudioPlayer } from '../contexts/AudioPlayerContext';

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
  duration: string;
  price: number;
  spotifyUrl: string;
  appleUrl: string;
  previewUrl?: string;
}

interface Album {
  id: string;
  title: string;
  artist: string;
  cover: string;
  year: string;
  tracks: number;
  price: number;
  description: string;
  trackList: Track[];
}

const albums: Album[] = [
  {
    id: 'heartbreaks-algorithm',
    title: 'Heartbreaks Algorithm',
    artist: 'Saige',
    cover: '/assets/album-covers/the-audacity.png',
    year: '2024',
    tracks: 10,
    price: 9.99,
    description: 'The debut album from Saige - a collection of soulful R&B tracks exploring love, loss, and digital connection.',
    trackList: [
      { id: 'ha-1', title: 'The Algorithm', artist: 'Saige', album: 'Heartbreaks Algorithm', cover: '/assets/album-covers/the-audacity.png', duration: '3:24', price: 1.29, spotifyUrl: '#', appleUrl: '#' },
      { id: 'ha-2', title: 'Digital Love', artist: 'Saige', album: 'Heartbreaks Algorithm', cover: '/assets/album-covers/the-audacity.png', duration: '3:48', price: 1.29, spotifyUrl: '#', appleUrl: '#' },
      { id: 'ha-3', title: 'Heartbreaks', artist: 'Saige', album: 'Heartbreaks Algorithm', cover: '/assets/album-covers/the-audacity.png', duration: '4:12', price: 1.29, spotifyUrl: '#', appleUrl: '#' },
      { id: 'ha-4', title: 'Late Night Texts', artist: 'Saige', album: 'Heartbreaks Algorithm', cover: '/assets/album-covers/the-audacity.png', duration: '3:15', price: 1.29, spotifyUrl: '#', appleUrl: '#' },
      { id: 'ha-5', title: 'Ghosted', artist: 'Saige', album: 'Heartbreaks Algorithm', cover: '/assets/album-covers/the-audacity.png', duration: '3:33', price: 1.29, spotifyUrl: '#', appleUrl: '#' },
    ]
  },
  {
    id: 'the-audacity-ep',
    title: 'The Audacity',
    artist: 'Saige',
    cover: '/assets/album-covers/the-audacity.png',
    year: '2025',
    tracks: 4,
    price: 4.99,
    description: 'A bold EP showcasing Saige\'s powerful vocals and fearless songwriting.',
    trackList: [
      { id: 'ta-1', title: 'The Audacity', artist: 'Saige', album: 'The Audacity', cover: '/assets/album-covers/the-audacity.png', duration: '3:45', price: 1.29, spotifyUrl: '#', appleUrl: '#' },
      { id: 'ta-2', title: 'Handle With Care', artist: 'Saige', album: 'The Audacity', cover: '/assets/album-covers/the-audacity.png', duration: '3:32', price: 1.29, spotifyUrl: '#', appleUrl: '#' },
      { id: 'ta-3', title: 'No More Fantasies', artist: 'Saige', album: 'The Audacity', cover: '/assets/album-covers/the-audacity.png', duration: '4:05', price: 1.29, spotifyUrl: '#', appleUrl: '#' },
      { id: 'ta-4', title: 'You Lie So Good', artist: 'Saige', album: 'The Audacity', cover: '/assets/album-covers/the-audacity.png', duration: '3:48', price: 1.29, spotifyUrl: '#', appleUrl: '#' },
    ]
  },
  {
    id: 'you-never-loved-me-ep',
    title: 'You Never Loved Me',
    artist: 'Saige',
    cover: '/assets/album-covers/album-2.png',
    year: '2025',
    tracks: 3,
    price: 3.99,
    description: 'An emotional journey through heartbreak and healing.',
    trackList: [
      { id: 'ynlm-1', title: 'You Never Loved Me', artist: 'Saige', album: 'You Never Loved Me', cover: '/assets/album-covers/album-2.png', duration: '3:48', price: 1.29, spotifyUrl: '#', appleUrl: '#' },
      { id: 'ynlm-2', title: 'Red Flags', artist: 'Saige', album: 'You Never Loved Me', cover: '/assets/album-covers/album-2.png', duration: '3:15', price: 1.29, spotifyUrl: '#', appleUrl: '#' },
      { id: 'ynlm-3', title: 'In This Room', artist: 'Saige', album: 'You Never Loved Me', cover: '/assets/album-covers/album-2.png', duration: '4:33', price: 1.29, spotifyUrl: '#', appleUrl: '#' },
    ]
  }
];

const individualTracks: Track[] = [
  { id: 'track-1', title: 'So Dope', artist: 'Saige', album: 'Singles', cover: '/assets/images/promo-1.png', duration: '4:06', price: 1.29, spotifyUrl: '#', appleUrl: '#' },
  { id: 'track-2', title: 'Me Gustas', artist: 'Saige', album: 'Singles', cover: '/assets/images/promo-2.png', duration: '4:19', price: 1.29, spotifyUrl: '#', appleUrl: '#' },
  { id: 'track-3', title: 'Right There', artist: 'Saige', album: 'Singles', cover: '/assets/images/promo-3.png', duration: '3:57', price: 1.29, spotifyUrl: '#', appleUrl: '#' },
  { id: 'track-4', title: 'Show Me How To Love You', artist: 'Saige', album: 'Singles', cover: '/assets/images/promo-4.png', duration: '4:44', price: 1.29, spotifyUrl: '#', appleUrl: '#' },
  { id: 'track-5', title: 'In This Room', artist: 'Saige', album: 'Singles', cover: '/assets/images/promo-5.png', duration: '4:33', price: 1.29, spotifyUrl: '#', appleUrl: '#' },
  { id: 'track-6', title: 'Love Language', artist: 'Saige', album: 'Singles', cover: '/assets/images/promo-6.png', duration: '3:52', price: 1.29, spotifyUrl: '#', appleUrl: '#' },
];

const MusicStore = () => {
  const [activeTab, setActiveTab] = useState<'albums' | 'tracks'>('albums');
  const [cart, setCart] = useState<(Track | Album)[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const { playTrack } = useAudioPlayer();

  const addToCart = (item: Track | Album) => {
    setCart(prev => {
      if (prev.find(i => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = async () => {
    setIsProcessing(true);
    // Simulate Stripe checkout
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setPurchaseComplete(true);
    setCart([]);
    setTimeout(() => {
      setPurchaseComplete(false);
      setShowCheckout(false);
    }, 3000);
  };

  return (
    <section id="music-store" className="relative py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="reveal mb-16 text-center">
          <span className="font-tech text-neon-cyan text-xs tracking-[0.3em] uppercase mb-4 block">
            Digital Store
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Buy <span className="gradient-text">Music</span>
          </h2>
          <p className="font-body text-lg text-white/60 max-w-2xl mx-auto">
            Purchase high-quality digital downloads. Support Saige directly and get instant access to your music.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="reveal flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('albums')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-tech text-sm tracking-widest uppercase transition-all ${
              activeTab === 'albums'
                ? 'bg-neon-cyan text-white glow-cyan'
                : 'bg-white/5 text-white/60 border border-white/10 hover:border-neon-cyan'
            }`}
          >
            <Disc className="w-4 h-4" />
            Albums
          </button>
          <button
            onClick={() => setActiveTab('tracks')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-tech text-sm tracking-widest uppercase transition-all ${
              activeTab === 'tracks'
                ? 'bg-neon-cyan text-white glow-cyan'
                : 'bg-white/5 text-white/60 border border-white/10 hover:border-neon-cyan'
            }`}
          >
            <Music className="w-4 h-4" />
            Individual Tracks
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Products Grid */}
          <div className="lg:col-span-2">
            {activeTab === 'albums' ? (
              <div className="space-y-6">
                {albums.map((album, index) => (
                  <div 
                    key={album.id}
                    className="reveal glass-neon rounded-2xl overflow-hidden card-lift"
                    style={{ transitionDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-48 h-48 flex-shrink-0 relative group">
                        <img 
                          src={album.cover} 
                          alt={album.title}
                          className="w-full h-full object-cover"
                        />
                        <button 
                          onClick={() => playTrack({
                            id: album.id,
                            title: album.title,
                            artist: album.artist,
                            album: album.title,
                            cover: album.cover,
                            audioUrl: '',
                            duration: album.trackList[0]?.duration || '3:45',
                            price: album.price,
                            spotifyUrl: '#',
                            appleUrl: '#'
                          })}
                          className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <div className="w-12 h-12 rounded-full bg-neon-pink flex items-center justify-center">
                            <Music className="w-5 h-5 text-white" />
                          </div>
                        </button>
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-display text-xl font-bold text-white">{album.title}</h3>
                            <p className="font-body text-white/60">{album.artist} • {album.year}</p>
                            <p className="font-tech text-xs text-white/40 mt-1">{album.tracks} tracks</p>
                          </div>
                          <span className="font-display text-2xl font-bold text-neon-cyan">${album.price}</span>
                        </div>
                        <p className="font-body text-sm text-white/60 mb-4">{album.description}</p>
                        
                        {/* Track List Preview */}
                        <div className="space-y-2 mb-4">
                          {album.trackList.slice(0, 3).map((track, i) => (
                            <div key={track.id} className="flex items-center gap-3 text-sm">
                              <span className="font-tech text-white/30 w-4">{i + 1}</span>
                              <span className="font-body text-white/70 flex-1">{track.title}</span>
                              <span className="font-tech text-white/40">{track.duration}</span>
                            </div>
                          ))}
                          {album.trackList.length > 3 && (
                            <p className="font-tech text-xs text-white/30 pl-7">+ {album.trackList.length - 3} more tracks</p>
                          )}
                        </div>

                        <div className="flex gap-3">
                          <button 
                            onClick={() => addToCart(album)}
                            disabled={cart.find(i => i.id === album.id) !== undefined}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-neon-cyan text-white font-tech text-xs tracking-wider rounded-xl hover:glow-cyan transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {cart.find(i => i.id === album.id) ? (
                              <>
                                <Check className="w-4 h-4" />
                                Added
                              </>
                            ) : (
                              <>
                                <ShoppingCart className="w-4 h-4" />
                                Add to Cart
                              </>
                            )}
                          </button>
                          <button className="px-4 py-3 border border-white/20 text-white/60 font-tech text-xs tracking-wider rounded-xl hover:border-neon-cyan hover:text-neon-cyan transition-all">
                            Preview
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {individualTracks.map((track, index) => (
                  <div 
                    key={track.id}
                    className="reveal glass-neon rounded-xl p-4 card-lift"
                    style={{ transitionDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden relative group flex-shrink-0">
                        <img 
                          src={track.cover} 
                          alt={track.title}
                          className="w-full h-full object-cover"
                        />
                        <button 
                          onClick={() => playTrack(track)}
                          className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Music className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-body font-semibold text-white truncate">{track.title}</h4>
                        <p className="font-tech text-xs text-white/50">{track.artist}</p>
                        <p className="font-tech text-xs text-white/40">{track.duration}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-display text-lg font-bold text-neon-cyan block">${track.price}</span>
                        <button 
                          onClick={() => addToCart(track)}
                          disabled={cart.find(i => i.id === track.id) !== undefined}
                          className="mt-2 p-2 rounded-lg bg-white/5 text-white/60 hover:bg-neon-cyan hover:text-white transition-all disabled:opacity-50"
                        >
                          {cart.find(i => i.id === track.id) ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <ShoppingCart className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 glass-neon rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-neon-cyan" />
                  Your Cart
                </h3>
                <span className="font-tech text-sm text-white/60">{cart.length} items</span>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="w-12 h-12 text-white/20 mx-auto mb-4" />
                  <p className="font-body text-white/60">Your cart is empty</p>
                  <p className="font-tech text-xs text-white/40 mt-2">Add music to get started</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                        <img 
                          src={item.cover}
                          alt={item.title}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-body text-sm text-white truncate">{item.title}</h4>
                          <p className="font-tech text-xs text-white/40">
                            {'tracks' in item ? 'Album' : 'Single'}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="font-tech text-sm text-neon-cyan">${item.price}</span>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="block text-white/20 hover:text-white/60 text-xs mt-1"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-white/10 pt-4 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="font-body text-white/60">Total</span>
                      <span className="font-display text-2xl font-bold text-white">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowCheckout(true)}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-neon-cyan to-neon-violet text-white font-tech text-sm tracking-widest uppercase rounded-xl hover:shadow-[0_0_30px_rgba(0,245,255,0.4)] transition-all"
                  >
                    <CreditCard className="w-4 h-4" />
                    Checkout
                  </button>

                  <div className="mt-4 flex items-center justify-center gap-4 text-white/30">
                    <Lock className="w-3 h-3" />
                    <span className="font-tech text-xs">Secure checkout</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="reveal mt-16 grid md:grid-cols-3 gap-6">
          <div className="glass-neon rounded-xl p-6 text-center">
            <Download className="w-8 h-8 text-neon-cyan mx-auto mb-4" />
            <h4 className="font-display text-lg font-bold text-white mb-2">Instant Download</h4>
            <p className="font-body text-sm text-white/60">Get your music immediately after purchase</p>
          </div>
          <div className="glass-neon rounded-xl p-6 text-center">
            <Package className="w-8 h-8 text-neon-pink mx-auto mb-4" />
            <h4 className="font-display text-lg font-bold text-white mb-2">High Quality</h4>
            <p className="font-body text-sm text-white/60">MP3 320kbps and WAV formats included</p>
          </div>
          <div className="glass-neon rounded-xl p-6 text-center">
            <Music className="w-8 h-8 text-neon-violet mx-auto mb-4" />
            <h4 className="font-display text-lg font-bold text-white mb-2">Support Directly</h4>
            <p className="font-body text-sm text-white/60">100% of proceeds go to the artist</p>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 bg-void/95 backdrop-blur-xl flex items-center justify-center p-6">
          <div className="max-w-md w-full glass-neon rounded-2xl p-8">
            {purchaseComplete ? (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-2">Purchase Complete!</h3>
                <p className="font-body text-white/60 mb-4">Thank you for supporting Saige</p>
                <p className="font-tech text-xs text-white/40">Your download links have been sent to your email</p>
              </div>
            ) : (
              <>
                <h3 className="font-display text-xl font-bold text-white mb-6">Checkout</h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="font-tech text-xs text-white/60 uppercase tracking-wider block mb-2">Email</label>
                    <input 
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 font-body focus:outline-none focus:border-neon-cyan transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-tech text-xs text-white/60 uppercase tracking-wider block mb-2">Card Information</label>
                    <div className="relative">
                      <input 
                        type="text"
                        placeholder="0000 0000 0000 0000"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 font-body focus:outline-none focus:border-neon-cyan transition-colors"
                      />
                      <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input 
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 font-body focus:outline-none focus:border-neon-cyan transition-colors"
                      />
                    </div>
                    <div>
                      <input 
                        type="text"
                        placeholder="CVC"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 font-body focus:outline-none focus:border-neon-cyan transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowCheckout(false)}
                    className="flex-1 px-4 py-3 border border-white/20 text-white font-tech text-sm tracking-wider rounded-xl hover:border-white/40 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCheckout}
                    disabled={isProcessing}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-neon-cyan text-white font-tech text-sm tracking-wider rounded-xl hover:glow-cyan transition-all disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        Pay ${cartTotal.toFixed(2)}
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default MusicStore;
