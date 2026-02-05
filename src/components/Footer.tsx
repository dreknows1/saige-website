import { Disc3, Heart, Instagram, Youtube, Twitter, Music2, Facebook } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Youtube, href: 'https://youtube.com/@saigemusik', label: 'YouTube', color: 'hover:bg-red-500/20 hover:text-red-500' },
    { icon: Instagram, href: 'https://instagram.com/saigemusik', label: 'Instagram', color: 'hover:bg-pink-500/20 hover:text-pink-500' },
    { icon: ({className}: {className?: string}) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
      </svg>
    ), href: 'https://tiktok.com/@saigemusik', label: 'TikTok', color: 'hover:bg-white/10 hover:text-white' },
    { icon: Facebook, href: 'https://facebook.com/saigemusik', label: 'Facebook', color: 'hover:bg-blue-500/20 hover:text-blue-500' },
    { icon: Music2, href: 'https://open.spotify.com/artist/1mmsdJrB5LrN18iDTRQgDK', label: 'Spotify', color: 'hover:bg-green-500/20 hover:text-green-500' },
    { icon: Twitter, href: 'https://twitter.com/saigemusik', label: 'Twitter', color: 'hover:bg-blue-400/20 hover:text-blue-400' },
  ];

  const footerLinks = [
    {
      title: 'Music',
      links: [
        { name: 'Latest Release', href: '#latest' },
        { name: 'Discography', href: '#music' },
        { name: 'Music Videos', href: '#videos' },
        { name: 'Gallery', href: '#gallery' }
      ]
    },
    {
      title: 'Shop',
      links: [
        { name: 'Merchandise', href: '#merch' },
        { name: 'Digital Downloads', href: '#merch' },
        { name: 'Vinyl Records', href: '#merch' },
        { name: 'Exclusive', href: '#merch' }
      ]
    },
    {
      title: 'Connect',
      links: [
        { name: 'Newsletter', href: '#connect' },
        { name: 'Social Media', href: '#connect' },
        { name: 'Contact', href: '#connect' },
        { name: 'Press Kit', href: '#connect' }
      ]
    }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative py-16 px-6 lg:px-12 border-t border-white/5">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-pink/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-3 mb-6 group">
              <div className="relative">
                <Disc3 className="w-10 h-10 text-neon-pink group-hover:animate-spin-slow transition-all" />
                <div className="absolute inset-0 bg-neon-pink/30 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="font-display text-2xl font-bold tracking-wider">
                <span className="text-white">SAI</span>
                <span className="text-neon-pink">GE</span>
              </span>
            </a>
            <p className="font-body text-white/60 mb-6 max-w-sm leading-relaxed">
              Soulful vocals. Timeless R&B. Boston-born artist creating music that moves you. 
              Follow @saigemusik for the latest releases and exclusive content.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a 
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 transition-all duration-300 ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-display text-sm font-bold text-white mb-6 tracking-wider uppercase">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <button 
                      onClick={() => scrollToSection(link.href)}
                      className="font-body text-sm text-white/60 hover:text-neon-cyan transition-colors"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-tech text-xs text-white/40 tracking-wider">
            © {currentYear} Saige. All rights reserved.
          </p>
          
          <p className="flex items-center gap-2 font-tech text-xs text-white/40">
            Made with <Heart className="w-3 h-3 text-neon-pink fill-neon-pink" /> in Boston
          </p>

          <div className="flex items-center gap-6">
            <span className="font-tech text-xs text-white/40 tracking-wider uppercase">
              @saigemusik
            </span>
          </div>
        </div>

        {/* Large background text */}
        <div className="mt-12 overflow-hidden">
          <div className="marquee whitespace-nowrap">
            <span className="font-display text-[15vw] font-bold text-white/[0.02] tracking-tighter">
              SAIGE • @SAIGEMUSIK • BOSTON R&B • STREAM NOW • SAIGE • @SAIGEMUSIK •
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
