import { useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { Music, Video, ShoppingBag, Settings, LogOut } from 'lucide-react';
import AdminTracks from './AdminTracks';
import AdminVideos from './AdminVideos';
import AdminMerch from './AdminMerch';
import AdminContent from './AdminContent';

type Tab = 'tracks' | 'videos' | 'merch' | 'content';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('tracks');
  const { admin, logout } = useAdmin();

  const tabs = [
    { id: 'tracks' as Tab, label: 'Tracks', icon: Music },
    { id: 'videos' as Tab, label: 'Videos', icon: Video },
    { id: 'merch' as Tab, label: 'Merch', icon: ShoppingBag },
    { id: 'content' as Tab, label: 'Content', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-void">
      {/* Header */}
      <header className="border-b border-white/10 bg-void/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-display text-2xl font-bold text-white">
              SAIGE <span className="text-neon-pink">ADMIN</span>
            </h1>
            <span className="px-3 py-1 rounded-full bg-neon-pink/20 text-neon-pink font-tech text-xs">
              {admin?.email}
            </span>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 text-white/60 hover:text-white transition-colors font-tech text-sm"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-tech text-sm tracking-wider uppercase transition-all ${
                    activeTab === tab.id
                      ? 'bg-neon-pink text-white'
                      : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>

            <div className="mt-8 p-4 glass-neon rounded-xl">
              <h3 className="font-display text-sm font-bold text-white mb-2">Quick Stats</h3>
              <div className="space-y-2 font-tech text-xs text-white/60">
                <div className="flex justify-between">
                  <span>Tracks</span>
                  <span className="text-neon-pink">16</span>
                </div>
                <div className="flex justify-between">
                  <span>Videos</span>
                  <span className="text-neon-pink">6</span>
                </div>
                <div className="flex justify-between">
                  <span>Merch</span>
                  <span className="text-neon-pink">8</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'tracks' && <AdminTracks />}
            {activeTab === 'videos' && <AdminVideos />}
            {activeTab === 'merch' && <AdminMerch />}
            {activeTab === 'content' && <AdminContent />}
          </div>
        </div>
      </div>
    </div>
  );
}
