import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Download, Instagram, Share2 } from 'lucide-react';

interface GalleryImage {
  id: number;
  title: string;
  category: string;
  src: string;
  photographer?: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    title: "The Audacity Promo",
    category: "Promotional",
    src: "/assets/images/promo-1.png",
    photographer: "Saige Creative"
  },
  {
    id: 2,
    title: "You Never Loved Me",
    category: "Promotional",
    src: "/assets/images/promo-2.png",
    photographer: "Saige Creative"
  },
  {
    id: 3,
    title: "Studio Session",
    category: "Behind The Scenes",
    src: "/assets/images/promo-3.png",
    photographer: "Saige Creative"
  },
  {
    id: 4,
    title: "Live Performance",
    category: "Live",
    src: "/assets/images/promo-4.png",
    photographer: "Saige Creative"
  },
  {
    id: 5,
    title: "Portrait Session",
    category: "Portrait",
    src: "/assets/images/promo-5.png",
    photographer: "Saige Creative"
  },
  {
    id: 6,
    title: "Album Art Concept",
    category: "Artwork",
    src: "/assets/images/promo-6.png",
    photographer: "Saige Creative"
  },
  {
    id: 7,
    title: "Black & White Series",
    category: "Portrait",
    src: "/assets/images/promo-7.png",
    photographer: "Saige Creative"
  },
  {
    id: 8,
    title: "Fashion Editorial",
    category: "Editorial",
    src: "/assets/images/promo-8.png",
    photographer: "Saige Creative"
  },
];

const categories = ["All", "Promotional", "Portrait", "Behind The Scenes", "Live", "Artwork", "Editorial"];

const GallerySection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

  const filteredImages = activeCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(image => image.category === activeCategory);

  const currentIndex = selectedImage ? filteredImages.findIndex(img => img.id === selectedImage.id) : -1;

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % filteredImages.length
      : (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[newIndex]);
  };

  return (
    <section id="gallery" className="relative py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="reveal mb-12">
          <span className="font-tech text-neon-violet text-xs tracking-[0.3em] uppercase mb-4 block">
            Visual Collection
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Photo <span className="gradient-text">Gallery</span>
          </h2>
          <p className="font-body text-lg text-white/60 max-w-2xl">
            A curated collection of promotional photos, portraits, and behind-the-scenes moments.
          </p>
        </div>

        {/* Instagram CTA */}
        <div className="reveal mb-12">
          <a 
            href="https://instagram.com/saigemusik" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-4 p-6 glass-neon rounded-2xl hover:border-pink-500/50 transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center">
              <Instagram className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-xl font-bold text-white group-hover:text-pink-400 transition-colors">
                Follow on Instagram
              </h3>
              <p className="font-body text-white/60">@saigemusik - Exclusive photos and daily updates</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-pink-500/20 transition-colors">
              <Share2 className="w-5 h-5 text-white group-hover:text-pink-400 transition-colors" />
            </div>
          </a>
        </div>

        {/* Category filter */}
        <div className="reveal flex flex-wrap gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full font-tech text-xs tracking-widest uppercase transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-neon-violet text-white glow-violet'
                  : 'bg-white/5 text-white/60 border border-white/10 hover:border-neon-violet hover:text-neon-violet'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid - Masonry Style */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className={`reveal-scale group relative overflow-hidden rounded-xl cursor-pointer card-lift ${
                index % 5 === 0 ? 'col-span-2 row-span-2' : ''
              }`}
              style={{ transitionDelay: `${index * 0.05}s` }}
              onMouseEnter={() => setHoveredImage(image.id)}
              onMouseLeave={() => setHoveredImage(null)}
              onClick={() => setSelectedImage(image)}
            >
              <div className={`relative ${index % 5 === 0 ? 'aspect-square' : 'aspect-[3/4]'}`}>
                <img 
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent transition-opacity duration-300 ${
                  hoveredImage === image.id ? 'opacity-80' : 'opacity-0'
                }`} />

                {/* Content */}
                <div className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-300 ${
                  hoveredImage === image.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}>
                  <span className="inline-block px-2 py-1 rounded-full bg-neon-violet/30 text-neon-violet font-tech text-xs tracking-wider uppercase mb-2">
                    {image.category}
                  </span>
                  <h3 className="font-display text-sm font-bold text-white">
                    {image.title}
                  </h3>
                  {image.photographer && (
                    <p className="font-tech text-xs text-white/60 mt-1">
                      by {image.photographer}
                    </p>
                  )}
                </div>

                {/* Border glow on hover */}
                <div className={`absolute inset-0 rounded-xl border-2 transition-all duration-300 pointer-events-none ${
                  hoveredImage === image.id ? 'border-neon-violet shadow-[0_0_30px_rgba(131,56,236,0.3)]' : 'border-transparent'
                }`} />
              </div>
            </div>
          ))}
        </div>

        {/* View more on Instagram */}
        <div className="reveal text-center mt-12">
          <a 
            href="https://instagram.com/saigemusik"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-tech text-sm tracking-widest uppercase hover:border-pink-500 hover:text-pink-400 transition-all duration-300 rounded-full"
          >
            View More on Instagram
            <Instagram className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-void/98 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          {/* Navigation */}
          <button 
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-neon-violet transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-neon-violet transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Close button */}
          <button 
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-neon-pink transition-colors z-10"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image */}
          <div 
            className="relative max-w-6xl w-full max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img 
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            {/* Info bar */}
            <div className="mt-6 flex items-center justify-between w-full max-w-2xl">
              <div className="text-center flex-1">
                <span className="inline-block px-3 py-1 rounded-full bg-neon-violet/20 text-neon-violet font-tech text-xs tracking-wider uppercase mb-2">
                  {selectedImage.category}
                </span>
                <h3 className="font-display text-xl font-bold text-white">
                  {selectedImage.title}
                </h3>
                {selectedImage.photographer && (
                  <p className="font-tech text-sm text-white/60 mt-1">
                    Photo by {selectedImage.photographer}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <button className="p-3 rounded-full bg-white/10 hover:bg-neon-violet/20 transition-colors">
                  <Download className="w-5 h-5 text-white" />
                </button>
                <button className="p-3 rounded-full bg-white/10 hover:bg-neon-violet/20 transition-colors">
                  <Share2 className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Image counter */}
            <div className="mt-4 font-tech text-sm text-white/40">
              {currentIndex + 1} / {filteredImages.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
