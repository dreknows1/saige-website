import { useState } from 'react';
import { ShoppingBag, Shirt, Disc, Lock, Star, Package, Truck, Shield } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'merch' | 'digital' | 'exclusive';
  sizes?: string[];
  inStock: boolean;
  badge?: string;
}

const products: Product[] = [
  {
    id: 'merch-1',
    name: 'The Audacity T-Shirt',
    description: 'Premium cotton tee with album artwork',
    price: 35,
    image: '/assets/album-covers/the-audacity.png',
    category: 'merch',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    inStock: true,
    badge: 'Best Seller'
  },
  {
    id: 'merch-2',
    name: 'Saige Logo Hoodie',
    description: 'Cozy pullover with embroidered logo',
    price: 65,
    image: '/assets/images/promo-1.png',
    category: 'merch',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    inStock: true
  },
  {
    id: 'merch-3',
    name: 'Limited Edition Vinyl',
    description: 'The Audacity on 180g colored vinyl',
    price: 45,
    image: '/assets/album-covers/the-audacity.png',
    category: 'merch',
    inStock: true,
    badge: 'Limited'
  },
  {
    id: 'merch-4',
    name: 'Signed Poster',
    description: '18x24 inch signed poster',
    price: 25,
    image: '/assets/images/promo-2.png',
    category: 'merch',
    inStock: true
  },
  {
    id: 'digital-1',
    name: 'Digital Album Bundle',
    description: 'All singles + exclusive tracks',
    price: 15,
    image: '/assets/album-covers/album-2.png',
    category: 'digital',
    inStock: true
  },
  {
    id: 'digital-2',
    name: 'Instrumentals Pack',
    description: 'High-quality instrumentals for all tracks',
    price: 20,
    image: '/assets/images/promo-3.png',
    category: 'digital',
    inStock: true
  },
  {
    id: 'exclusive-1',
    name: 'VIP Fan Membership',
    description: 'Exclusive content, early access, merch discounts',
    price: 99,
    image: '/assets/images/promo-4.png',
    category: 'exclusive',
    inStock: true,
    badge: 'VIP'
  },
  {
    id: 'exclusive-2',
    name: 'Virtual Meet & Greet',
    description: '30-min private video call with Saige',
    price: 150,
    image: '/assets/images/promo-5.png',
    category: 'exclusive',
    inStock: true,
    badge: 'Limited'
  },
];

const categories = [
  { id: 'all', name: 'All Items', icon: ShoppingBag },
  { id: 'merch', name: 'Merchandise', icon: Shirt },
  { id: 'digital', name: 'Digital Downloads', icon: Disc },
  { id: 'exclusive', name: 'Exclusive', icon: Lock },
];

const features = [
  { icon: Package, title: 'Secure Packaging', description: 'Carefully packed with love' },
  { icon: Truck, title: 'Fast Shipping', description: 'Worldwide delivery available' },
  { icon: Shield, title: 'Secure Checkout', description: 'Protected by Stripe' },
];

const MerchSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [cart, setCart] = useState<{product: Product, size?: string}[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const addToCart = (product: Product) => {
    const size = product.sizes ? selectedSizes[product.id] || product.sizes[0] : undefined;
    setCart([...cart, { product, size }]);
  };

  const initiateCheckout = async () => {
    setIsCheckingOut(true);
    
    // Simulate Stripe checkout
    setTimeout(() => {
      alert('Redirecting to Stripe Checkout...');
      setIsCheckingOut(false);
      setCart([]);
    }, 1500);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price, 0);

  return (
    <section id="merch" className="relative py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="reveal mb-16 text-center">
          <span className="font-tech text-neon-pink text-xs tracking-[0.3em] uppercase mb-4 block">
            Official Store
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Shop <span className="gradient-text">Merch</span>
          </h2>
          <p className="font-body text-lg text-white/60 max-w-2xl mx-auto">
            Official merchandise, digital downloads, and exclusive experiences. Support the music directly.
          </p>
        </div>

        {/* Features */}
        <div className="reveal grid md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="glass-neon rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-neon-pink/20 flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-neon-pink" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="font-body text-sm text-white/60">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Category filter */}
        <div className="reveal flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full font-tech text-xs tracking-widest uppercase transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-neon-pink text-white glow-pink'
                  : 'bg-white/5 text-white/60 border border-white/10 hover:border-neon-pink hover:text-neon-pink'
              }`}
            >
              <category.icon className="w-4 h-4" />
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Products Grid */}
          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-6">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="reveal-scale group relative glass-neon rounded-2xl overflow-hidden card-lift"
                  style={{ transitionDelay: `${index * 0.05}s` }}
                >
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className={`px-3 py-1 rounded-full font-tech text-xs tracking-wider uppercase ${
                        product.badge === 'VIP' 
                          ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
                          : product.badge === 'Limited'
                          ? 'bg-neon-pink text-white'
                          : 'bg-neon-cyan text-white'
                      }`}>
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Image */}
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="font-tech text-xs text-white/40 uppercase tracking-wider">
                          {product.category}
                        </span>
                        <h3 className="font-display text-lg font-bold text-white group-hover:text-neon-pink transition-colors">
                          {product.name}
                        </h3>
                      </div>
                      <span className="font-display text-xl font-bold text-neon-pink">
                        ${product.price}
                      </span>
                    </div>
                    
                    <p className="font-body text-sm text-white/60 mb-4">
                      {product.description}
                    </p>

                    {/* Size selector */}
                    {product.sizes && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSizes({...selectedSizes, [product.id]: size})}
                            className={`w-10 h-10 rounded-lg font-tech text-sm transition-all ${
                              selectedSizes[product.id] === size
                                ? 'bg-neon-pink text-white'
                                : 'bg-white/10 text-white/60 hover:bg-white/20'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    )}

                    <button
                      onClick={() => addToCart(product)}
                      className="w-full py-3 rounded-xl bg-neon-pink text-white font-tech text-sm tracking-widest uppercase hover:glow-pink transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 glass-neon rounded-2xl p-6">
              <h3 className="font-display text-xl font-bold text-white mb-6 flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-neon-pink" />
                Your Cart ({cart.length})
              </h3>

              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag className="w-12 h-12 text-white/20 mx-auto mb-4" />
                  <p className="font-body text-white/60">Your cart is empty</p>
                  <p className="font-tech text-xs text-white/40 mt-2">Add items to get started</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto">
                    {cart.map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                        <img 
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-body text-sm text-white truncate">{item.product.name}</h4>
                          {item.size && (
                            <span className="font-tech text-xs text-white/40">Size: {item.size}</span>
                          )}
                        </div>
                        <span className="font-tech text-sm text-neon-pink">${item.product.price}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-white/10 pt-4 mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-body text-white/60">Subtotal</span>
                      <span className="font-display text-lg text-white">${cartTotal}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-body text-white/60">Shipping</span>
                      <span className="font-tech text-sm text-white">Calculated at checkout</span>
                    </div>
                  </div>

                  <button
                    onClick={initiateCheckout}
                    disabled={isCheckingOut}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-neon-pink to-neon-violet text-white font-tech text-sm tracking-widest uppercase hover:shadow-[0_0_30px_rgba(255,0,110,0.4)] transition-all flex items-center justify-center gap-2"
                  >
                    {isCheckingOut ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        Checkout with Stripe
                      </>
                    )}
                  </button>

                  <p className="mt-4 text-center font-tech text-xs text-white/40 flex items-center justify-center gap-2">
                    <Shield className="w-3 h-3" />
                    Secure payment powered by Stripe
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="reveal mt-16 glass-neon rounded-2xl p-8 text-center">
          <Star className="w-8 h-8 text-neon-pink mx-auto mb-4" />
          <h3 className="font-display text-2xl font-bold text-white mb-2">Join the VIP List</h3>
          <p className="font-body text-white/60 mb-6 max-w-md mx-auto">
            Get exclusive access to limited drops, early bird discounts, and members-only merchandise.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 font-body focus:outline-none focus:border-neon-pink transition-colors"
            />
            <button className="px-6 py-3 rounded-xl bg-neon-pink text-white font-tech text-sm tracking-widest uppercase hover:glow-pink transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MerchSection;
