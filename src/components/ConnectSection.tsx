import { useState } from 'react';
import { Send, Instagram, Youtube, Music2, Mail, MapPin, ArrowRight, Check, Facebook, Twitter } from 'lucide-react';

const socialLinks = [
  { 
    name: 'YouTube', 
    icon: Youtube, 
    href: 'https://youtube.com/@saigemusik', 
    color: 'hover:text-red-500 hover:border-red-500',
    bgColor: 'group-hover:bg-red-500/20',
    followers: '239 Subscribers • 108 Videos'
  },
  { 
    name: 'Instagram', 
    icon: Instagram, 
    href: 'https://instagram.com/saigemusik', 
    color: 'hover:text-pink-500 hover:border-pink-500',
    bgColor: 'group-hover:bg-pink-500/20',
    followers: '@saigemusik'
  },
  { 
    name: 'TikTok', 
    icon: ({className}: {className?: string}) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
      </svg>
    ),
    href: 'https://tiktok.com/@saigemusik', 
    color: 'hover:text-white hover:border-white',
    bgColor: 'group-hover:bg-white/10',
    followers: '@saigemusik'
  },
  { 
    name: 'Facebook', 
    icon: Facebook, 
    href: 'https://facebook.com/saigemusik', 
    color: 'hover:text-blue-500 hover:border-blue-500',
    bgColor: 'group-hover:bg-blue-500/20',
    followers: '@saigemusik'
  },
  { 
    name: 'Spotify', 
    icon: Music2, 
    href: 'https://open.spotify.com/artist/1mmsdJrB5LrN18iDTRQgDK', 
    color: 'hover:text-green-500 hover:border-green-500',
    bgColor: 'group-hover:bg-green-500/20',
    followers: '3,541 Monthly Listeners'
  },
  { 
    name: 'Twitter', 
    icon: Twitter, 
    href: 'https://twitter.com/saigemusik', 
    color: 'hover:text-blue-400 hover:border-blue-400',
    bgColor: 'group-hover:bg-blue-400/20',
    followers: '@saigemusik'
  },
];

const streamingLinks = [
  { name: 'Spotify', url: 'https://open.spotify.com/artist/1mmsdJrB5LrN18iDTRQgDK', color: '#1DB954' },
  { name: 'Apple Music', url: 'https://music.apple.com/artist/saige/123456789', color: '#FA2D48' },
  { name: 'SoundCloud', url: 'https://soundcloud.com/saigemusik', color: '#FF5500' },
  { name: 'Amazon Music', url: 'https://music.amazon.com/artists/saige', color: '#00A8E1' },
];

const ConnectSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setEmail('');
    
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="connect" className="relative py-32 px-6 lg:px-12">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-violet/5 to-void pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <div className="reveal text-center mb-16">
          <span className="font-tech text-neon-yellow text-xs tracking-[0.3em] uppercase mb-4 block">
            Stay Connected
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Join the <span className="gradient-text">Movement</span>
          </h2>
          <p className="font-body text-lg text-white/60 max-w-2xl mx-auto">
            Follow @saigemusik across all platforms for exclusive content, updates, and behind-the-scenes access.
          </p>
        </div>

        {/* Social Links Grid */}
        <div className="reveal grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 ${social.color} transition-all duration-300 hover:scale-[1.02]`}
            >
              <div className={`w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center transition-colors ${social.bgColor}`}>
                <social.icon className="w-7 h-7 text-white/60 group-hover:text-current transition-colors" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-lg font-bold text-white group-hover:text-current transition-colors">
                  {social.name}
                </h3>
                <p className="font-tech text-xs text-white/40">{social.followers}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-current opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Newsletter signup */}
          <div className="reveal-left">
            <div className="glass-neon rounded-2xl p-8 lg:p-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-neon-pink/20 flex items-center justify-center">
                  <Mail className="w-7 h-7 text-neon-pink" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-white">Newsletter</h3>
                  <p className="font-body text-sm text-white/60">Get updates first</p>
                </div>
              </div>

              <p className="font-body text-white/70 mb-8">
                Subscribe for exclusive early access to new tracks, behind-the-scenes content, 
                tour announcements, and merchandise drops. No spam, just pure vibes.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 font-body focus:outline-none focus:border-neon-pink transition-colors"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={`w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-tech text-sm tracking-widest uppercase transition-all duration-300 ${
                    isSubmitted
                      ? 'bg-green-500 text-white'
                      : 'bg-neon-pink text-white hover:glow-pink btn-neon'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : isSubmitted ? (
                    <>
                      <Check className="w-5 h-5" />
                      Subscribed!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Subscribe
                    </>
                  )}
                </button>
              </form>

              <p className="mt-4 font-tech text-xs text-white/40 text-center">
                Join the Saige community - 10,000+ subscribers
              </p>
            </div>
          </div>

          {/* Contact & Streaming */}
          <div className="reveal-right space-y-6">
            {/* Streaming Links */}
            <div className="glass-neon rounded-2xl p-8">
              <h3 className="font-display text-lg font-bold text-white mb-6">Stream Everywhere</h3>
              <div className="grid grid-cols-2 gap-4">
                {streamingLinks.map((platform) => (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300"
                  >
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${platform.color}20` }}
                    >
                      <Music2 className="w-5 h-5" style={{ color: platform.color }} />
                    </div>
                    <span className="font-body text-sm text-white/80 group-hover:text-white transition-colors">
                      {platform.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="glass-neon rounded-2xl p-8">
              <h3 className="font-display text-lg font-bold text-white mb-6">Contact</h3>
              <div className="space-y-4">
                <a 
                  href="mailto:bookings@saigemusik.com" 
                  className="flex items-center gap-4 text-white/60 hover:text-neon-cyan transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-neon-cyan/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-neon-cyan" />
                  </div>
                  <div>
                    <span className="font-body block">bookings@saigemusik.com</span>
                    <span className="font-tech text-xs text-white/40">Bookings & Inquiries</span>
                  </div>
                </a>
                
                <div className="flex items-center gap-4 text-white/60">
                  <div className="w-10 h-10 rounded-lg bg-neon-violet/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-neon-violet" />
                  </div>
                  <div>
                    <span className="font-body block">Boston, MA</span>
                    <span className="font-tech text-xs text-white/40">Based in</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="glass-neon rounded-2xl p-8">
              <h3 className="font-display text-lg font-bold text-white mb-6">Quick Links</h3>
              <div className="flex flex-wrap gap-3">
                {['Press Kit', 'Licensing', 'Collaborate', 'Booking'].map((link) => (
                  <button
                    key={link}
                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/70 hover:border-neon-yellow hover:text-neon-yellow transition-all duration-300"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Large CTA */}
        <div className="reveal mt-20 text-center">
          <div className="glass-neon rounded-3xl p-12 lg:p-16 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon-pink/20 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="relative z-10">
              <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Ready to experience
                <span className="gradient-text block mt-2">the music?</span>
              </h3>
              <p className="font-body text-lg text-white/60 max-w-xl mx-auto mb-8">
                Stream on your favorite platform and join thousands of listeners worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://open.spotify.com/artist/1mmsdJrB5LrN18iDTRQgDK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-5 bg-[#1DB954] text-white font-tech text-sm tracking-widest uppercase rounded-full hover:shadow-[0_0_30px_rgba(29,185,84,0.4)] transition-all flex items-center justify-center gap-2"
                >
                  <Music2 className="w-5 h-5" />
                  Listen on Spotify
                </a>
                <a 
                  href="#music"
                  className="px-10 py-5 border border-white/20 text-white font-tech text-sm tracking-widest uppercase rounded-full hover:border-neon-pink hover:text-neon-pink transition-all"
                >
                  Explore Music
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;
