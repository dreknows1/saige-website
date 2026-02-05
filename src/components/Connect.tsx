import { useState } from 'react';
import { Send, Instagram, Twitter, Youtube, Music2, Mail, MapPin, ArrowRight, Check } from 'lucide-react';

const socialLinks = [
  { name: 'Spotify', icon: Music2, href: '#', color: 'hover:text-[#1DB954]' },
  { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-[#E4405F]' },
  { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-[#1DA1F2]' },
  { name: 'YouTube', icon: Youtube, href: '#', color: 'hover:text-[#FF0000]' },
];

const Connect = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setEmail('');
    
    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="connect" className="relative py-32 px-6 lg:px-12">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-violet/5 to-void pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <div className="reveal text-center mb-16">
          <span className="font-tech text-neon-yellow text-xs tracking-[0.3em] uppercase mb-4 block">
            Stay Connected
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Join the <span className="gradient-text">Frequency</span>
          </h2>
          <p className="font-body text-lg text-white/60 max-w-2xl mx-auto">
            Be the first to hear new releases, exclusive content, and behind-the-scenes 
            glimpses into the digital creative process.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Newsletter signup */}
          <div className="reveal-left">
            <div className="glass-neon rounded-2xl p-8 lg:p-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-neon-pink/20 flex items-center justify-center">
                  <Mail className="w-7 h-7 text-neon-pink" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-white">Newsletter</h3>
                  <p className="font-body text-sm text-white/60">Direct to your inbox</p>
                </div>
              </div>

              <p className="font-body text-white/70 mb-8">
                Subscribe for exclusive early access to new tracks, behind-the-scenes content, 
                and AI music creation insights. No spam, just pure synthetic soul.
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
                Join 50,000+ listeners in the frequency
              </p>
            </div>
          </div>

          {/* Connect options */}
          <div className="reveal-right space-y-6">
            {/* Social links */}
            <div className="glass-neon rounded-2xl p-8">
              <h3 className="font-display text-lg font-bold text-white mb-6">Follow sAIge</h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-all duration-300 ${social.color}`}
                  >
                    <social.icon className="w-6 h-6 text-white/60 group-hover:text-current transition-colors" />
                    <span className="font-body text-sm text-white/80 group-hover:text-white">
                      {social.name}
                    </span>
                    <ArrowRight className="w-4 h-4 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact info */}
            <div className="glass-neon rounded-2xl p-8">
              <h3 className="font-display text-lg font-bold text-white mb-6">Contact</h3>
              <div className="space-y-4">
                <a 
                  href="mailto:hello@saige.ai" 
                  className="flex items-center gap-4 text-white/60 hover:text-neon-cyan transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-neon-cyan/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-neon-cyan" />
                  </div>
                  <span className="font-body">hello@saige.ai</span>
                  <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                
                <div className="flex items-center gap-4 text-white/60">
                  <div className="w-10 h-10 rounded-lg bg-neon-violet/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-neon-violet" />
                  </div>
                  <span className="font-body">The Digital Realm</span>
                </div>
              </div>
            </div>

            {/* Quick links */}
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
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon-pink/20 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="relative z-10">
              <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Ready to experience
                <span className="gradient-text block mt-2">the future of music?</span>
              </h3>
              <p className="font-body text-lg text-white/60 max-w-xl mx-auto mb-8">
                Start your journey into synthetic soundscapes today.
              </p>
              <button 
                onClick={() => document.querySelector('#library')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 bg-neon-pink text-white font-tech text-sm tracking-widest uppercase glow-pink btn-neon"
              >
                Start Listening
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Connect;
