import { useState, useEffect } from 'react';
import { Music, Video, Image, ShoppingBag, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'MUSIC', href: '#music', icon: Music },
    { name: 'VIDEOS', href: '#videos', icon: Video },
    { name: 'GALLERY', href: '#gallery', icon: Image },
    { name: 'MERCH', href: '#merch', icon: ShoppingBag },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-dark/90 backdrop-blur-md py-3 shadow-lg shadow-primary/10'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center">
            <span className="text-2xl font-serif italic gradient-text">sAIge</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300 tracking-wider"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="#music"
              className="bg-gradient-to-r from-accent to-primary text-dark font-semibold px-6 py-2 rounded-full text-sm hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
            >
              STREAM NOW
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10">
            <div className="flex flex-col space-y-4 pt-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <link.icon size={18} />
                  {link.name}
                </a>
              ))}
              <a
                href="#music"
                className="bg-gradient-to-r from-accent to-primary text-dark font-semibold px-6 py-3 rounded-full text-center mt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                STREAM NOW
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
