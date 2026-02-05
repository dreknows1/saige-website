import { useState, useEffect } from 'react';
import { Menu, X, Disc3, ShoppingBag } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Release', href: '#latest' },
    { name: 'Music', href: '#music' },
    { name: 'Videos', href: '#videos' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Merch', href: '#merch' },
    { name: 'Story', href: '#about' },
    { name: 'Connect', href: '#connect' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-void/80 backdrop-blur-xl border-b border-white/5' 
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a 
              href="#" 
              className="flex items-center gap-3 group"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="relative">
                <Disc3 className="w-8 h-8 text-neon-pink group-hover:animate-spin-slow transition-all" />
                <div className="absolute inset-0 bg-neon-pink/30 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="font-display text-xl font-bold tracking-wider">
                <span className="text-white">SAI</span>
                <span className="text-neon-pink">GE</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="relative font-body text-sm tracking-widest uppercase text-white/70 hover:text-white transition-colors group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-neon-pink group-hover:w-full transition-all duration-300" />
                </button>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <button 
                onClick={() => scrollToSection('#merch')}
                className="p-2 text-white/70 hover:text-neon-pink transition-colors"
                title="Shop Merch"
              >
                <ShoppingBag className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scrollToSection('#connect')}
                className="px-6 py-2.5 bg-transparent border border-neon-pink text-neon-pink font-tech text-xs tracking-widest uppercase hover:bg-neon-pink hover:text-white transition-all duration-300 hover:glow-pink"
              >
                Join Community
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-void/95 backdrop-blur-xl transition-all duration-500 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 pt-20">
          {navLinks.map((link, index) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="font-display text-xl tracking-widest uppercase text-white/80 hover:text-neon-pink transition-colors"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animation: isMobileMenuOpen ? 'slideUp 0.5s ease forwards' : 'none'
              }}
            >
              {link.name}
            </button>
          ))}
          <div className="flex flex-col gap-4 mt-8">
            <button 
              onClick={() => scrollToSection('#merch')}
              className="flex items-center gap-2 px-8 py-3 border border-white/20 text-white font-tech text-sm tracking-widest uppercase hover:border-neon-pink hover:text-neon-pink transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              Shop Merch
            </button>
            <button 
              onClick={() => scrollToSection('#connect')}
              className="px-8 py-3 bg-neon-pink text-white font-tech text-sm tracking-widest uppercase glow-pink"
            >
              Join Community
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
