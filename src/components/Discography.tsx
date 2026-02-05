import { ShoppingCart } from 'lucide-react';

interface Release {
  id: number;
  title: string;
  type: string;
  year: string;
  image: string;
  price: string;
  stripeUrl: string;
}

const releases: Release[] = [
  {
    id: 1,
    title: "Heartbreaks Algorithm",
    type: "Album",
    year: "2025",
    image: "https://storage.googleapis.com/msgsndr/hDLuRWXPQXgugxJ1FLvL/media/691649de6f74164eb82f9fef.png",
    price: "$14.99",
    stripeUrl: "https://buy.stripe.com/heartbreaks-album"
  },
  {
    id: 2,
    title: "The Audacity",
    type: "EP",
    year: "2025",
    image: "https://storage.googleapis.com/msgsndr/hDLuRWXPQXgugxJ1FLvL/media/6916556b890fad33c0d7d4e8.png",
    price: "$9.99",
    stripeUrl: "https://buy.stripe.com/audacity-ep"
  },
  {
    id: 3,
    title: "You Never Loved Me",
    type: "Single",
    year: "2025",
    image: "https://storage.googleapis.com/msgsndr/hDLuRWXPQXgugxJ1FLvL/media/691655b401e5bc2f73f73d45.png",
    price: "$2.99",
    stripeUrl: "https://buy.stripe.com/you-never-loved-me"
  },
  {
    id: 4,
    title: "Red Flags",
    type: "Single",
    year: "2025",
    image: "https://storage.googleapis.com/msgsndr/hDLuRWXPQXgugxJ1FLvL/media/6916558bb8272525636c18f8.png",
    price: "$2.99",
    stripeUrl: "https://buy.stripe.com/red-flags-single"
  },
];

const Discography = () => {
  const handleBuy = (stripeUrl: string) => {
    window.open(stripeUrl, '_blank');
  };

  return (
    <section id="discography" className="py-24 bg-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-secondary text-sm font-medium tracking-[0.3em] uppercase mb-4">
            All Releases
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif italic text-white">
            Discography
          </h2>
        </div>

        {/* Releases Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {releases.map((release) => (
            <div
              key={release.id}
              className="group glass rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
            >
              {/* Album Art */}
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={release.image}
                  alt={release.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-60" />
                
                {/* Type Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-primary/80 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {release.type}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="text-white font-semibold text-lg mb-1 truncate">
                  {release.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{release.year}</p>

                {/* Buy Button */}
                <button
                  onClick={() => handleBuy(release.stripeUrl)}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-accent to-primary text-dark font-semibold py-3 rounded-full hover:shadow-lg hover:shadow-primary/30 transition-all"
                >
                  <ShoppingCart size={16} />
                  Buy {release.price}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="mt-16 text-center">
          <div className="glass rounded-2xl p-8 inline-block">
            <p className="text-secondary text-sm font-medium tracking-wider uppercase mb-2">Coming Soon</p>
            <h3 className="text-2xl font-serif italic text-white">UPGRADE</h3>
            <p className="text-gray-400 mt-2">The next evolution of sAIge</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Discography;
