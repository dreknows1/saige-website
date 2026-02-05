import { useState } from 'react';
import { Play, Image as ImageIcon, Film, ExternalLink, X } from 'lucide-react';

interface GalleryItem {
  id: number;
  type: 'image' | 'video';
  title: string;
  category: string;
  src: string;
  thumbnail?: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    type: 'image',
    title: "Neural Dreams Cover",
    category: "Album Art",
    src: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&h=800&fit=crop"
  },
  {
    id: 2,
    type: 'video',
    title: "Digital Heartbeat - Official Video",
    category: "Music Video",
    src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=450&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=450&fit=crop"
  },
  {
    id: 3,
    type: 'image',
    title: "Synthetic Soul Visual",
    category: "Artwork",
    src: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&h=800&fit=crop"
  },
  {
    id: 4,
    type: 'image',
    title: "Binary Emotions Art",
    category: "Single Art",
    src: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=800&h=800&fit=crop"
  },
  {
    id: 5,
    type: 'video',
    title: "Live Performance - Virtual Stage",
    category: "Performance",
    src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=450&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=450&fit=crop"
  },
  {
    id: 6,
    type: 'image',
    title: "Genesis Album Concept",
    category: "Album Art",
    src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=800&fit=crop"
  },
];

const categories = ["All", "Album Art", "Music Video", "Artwork", "Performance"];

const VisualGallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const filteredItems = activeCategory === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <section id="gallery" className="relative py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="reveal mb-12">
          <span className="font-tech text-neon-cyan text-xs tracking-[0.3em] uppercase mb-4 block">
            Visual Experience
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Visual <span className="gradient-text">Gallery</span>
          </h2>
          <p className="font-body text-lg text-white/60 max-w-2xl">
            A curated collection of album artwork, music videos, and visual experiments 
            from the digital realm.
          </p>
        </div>

        {/* Category filter */}
        <div className="reveal flex flex-wrap gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full font-tech text-xs tracking-widest uppercase transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-neon-pink text-white glow-pink'
                  : 'bg-white/5 text-white/60 border border-white/10 hover:border-neon-pink hover:text-neon-pink'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="reveal-scale group relative aspect-square rounded-2xl overflow-hidden cursor-pointer card-lift"
              style={{ transitionDelay: `${index * 0.05}s` }}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => setSelectedItem(item)}
            >
              {/* Image */}
              <img 
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent transition-opacity duration-300 ${
                hoveredItem === item.id ? 'opacity-90' : 'opacity-0'
              }`} />

              {/* Type icon */}
              <div className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
                hoveredItem === item.id ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}>
                {item.type === 'video' ? (
                  <Play className="w-5 h-5 text-white" />
                ) : (
                  <ImageIcon className="w-5 h-5 text-white" />
                )}
              </div>

              {/* Content */}
              <div className={`absolute bottom-0 left-0 right-0 p-6 transition-all duration-300 ${
                hoveredItem === item.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}>
                <span className="inline-block px-3 py-1 rounded-full bg-neon-pink/20 text-neon-pink font-tech text-xs tracking-wider uppercase mb-2">
                  {item.category}
                </span>
                <h3 className="font-display text-lg font-bold text-white mb-1">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 text-white/60 font-tech text-xs">
                  {item.type === 'video' ? <Film className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                  <span className="uppercase tracking-wider">{item.type}</span>
                </div>
              </div>

              {/* Border glow on hover */}
              <div className={`absolute inset-0 rounded-2xl border-2 transition-all duration-300 pointer-events-none ${
                hoveredItem === item.id ? 'border-neon-pink shadow-[0_0_30px_rgba(255,0,110,0.3)]' : 'border-transparent'
              }`} />
            </div>
          ))}
        </div>

        {/* View more */}
        <div className="reveal text-center mt-12">
          <button className="group inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-tech text-sm tracking-widest uppercase hover:border-neon-cyan hover:text-neon-cyan transition-all duration-300">
            Explore All Visuals
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Lightbox modal */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 bg-void/95 backdrop-blur-xl flex items-center justify-center p-6"
          onClick={() => setSelectedItem(null)}
        >
          <button 
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-neon-pink transition-colors"
            onClick={() => setSelectedItem(null)}
          >
            <X className="w-6 h-6" />
          </button>

          <div 
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-2xl overflow-hidden glass-neon">
              {selectedItem.type === 'video' ? (
                <div className="aspect-video bg-black flex items-center justify-center">
                  <div className="text-center">
                    <Play className="w-16 h-16 text-neon-pink mx-auto mb-4" />
                    <p className="font-tech text-sm tracking-widest uppercase text-white/60">Video Player</p>
                  </div>
                </div>
              ) : (
                <img 
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
              )}
            </div>

            <div className="mt-6 text-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-neon-pink/20 text-neon-pink font-tech text-xs tracking-wider uppercase mb-3">
                {selectedItem.category}
              </span>
              <h3 className="font-display text-2xl font-bold text-white">
                {selectedItem.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default VisualGallery;
