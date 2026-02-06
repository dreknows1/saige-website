import { ShoppingBag, DollarSign, Package } from 'lucide-react';

export default function AdminMerch() {

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-white">Manage Merch</h2>
      </div>

      <div className="glass-neon rounded-xl p-8 text-center">
        <ShoppingBag className="w-16 h-16 text-white/20 mx-auto mb-4" />
        <h3 className="font-display text-xl font-bold text-white mb-2">Coming Soon</h3>
        <p className="font-body text-white/60 mb-6 max-w-md mx-auto">
          Connect Stripe to enable merch management. Once connected, you can add products, 
          manage inventory, and track sales.
        </p>
        <button className="px-6 py-3 bg-neon-pink text-white font-tech text-sm tracking-wider uppercase rounded-xl hover:glow-pink transition-all">
          Connect Stripe
        </button>
      </div>

      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <div className="glass-neon rounded-xl p-4">
          <Package className="w-8 h-8 text-neon-cyan mb-2" />
          <h4 className="font-display text-lg font-bold text-white">Products</h4>
          <p className="font-tech text-xs text-white/60">Manage inventory and pricing</p>
        </div>
        <div className="glass-neon rounded-xl p-4">
          <DollarSign className="w-8 h-8 text-neon-pink mb-2" />
          <h4 className="font-display text-lg font-bold text-white">Orders</h4>
          <p className="font-tech text-xs text-white/60">Track sales and fulfillment</p>
        </div>
        <div className="glass-neon rounded-xl p-4">
          <ShoppingBag className="w-8 h-8 text-neon-violet mb-2" />
          <h4 className="font-display text-lg font-bold text-white">Store</h4>
          <p className="font-tech text-xs text-white/60">Customize store settings</p>
        </div>
      </div>
    </div>
  );
}
