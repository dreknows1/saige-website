import { useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { Music, Video, ShoppingBag, Settings, LogOut, Image, Layout, Eye, ChevronRight } from 'lucide-react';
import AdminTracks from './AdminTracks';
import AdminVideos from './AdminVideos';
import AdminMerch from './AdminMerch';
import AdminImages from './AdminImages';
import AdminSiteBuilder from './AdminSiteBuilder';

type Tab = 'builder' | 'tracks' | 'videos' | 'merch' | 'images' | 'settings';

export default function AdminDashboard() {
 const [activeTab, setActiveTab] = useState<Tab>('builder');
 const { admin, logout } = useAdmin();

 const tabs = [
 { id: 'builder' as Tab, label: 'Site Builder', icon: Layout, description: 'Edit all sections' },
 { id: 'tracks' as Tab, label: 'Tracks', icon: Music, description: 'Music catalog' },
 { id: 'videos' as Tab, label: 'Videos', icon: Video, description: 'YouTube videos' },
 { id: 'images' as Tab, label: 'Images', icon: Image, description: 'Media library' },
 { id: 'merch' as Tab, label: 'Merch', icon: ShoppingBag, description: 'Products' },
 { id: 'settings' as Tab, label: 'Settings', icon: Settings, description: 'Site config' },
 ];

 return (
 <div className="min-h-screen bg-void">
 {/* Header */}
 <header className="border-b border-white/10 bg-void/80 backdrop-blur-xl sticky top-0 z-50">
 <div className="max-w-full mx-auto px-6 py-4 flex items-center justify-between">
 <div className="flex items-center gap-4">
 <h1 className="font-display text-2xl font-bold text-white">
 SAIGE <span className="text-neon-pink">ADMIN</span>
 </h1>
 <span className="px-3 py-1 rounded-full bg-neon-pink/20 text-neon-pink font-tech text-xs">
 {admin?.email}
 </span>
 </div>
 <div className="flex items-center gap-4">
 <a
 href="/#"
 target="_blank"
 rel="noopener noreferrer"
 className="flex items-center gap-2 px-4 py-2 bg-neon-pink/20 text-neon-pink rounded-lg hover:bg-neon-pink/30 transition-colors font-tech text-sm"
 >
 <Eye className="w-4 h-4" />
 View Site
 </a>
 <button
 onClick={logout}
 className="flex items-center gap-2 px-4 py-2 text-white/60 hover:text-white transition-colors font-tech text-sm"
 >
 <LogOut className="w-4 h-4" />
 Logout
 </button>
 </div>
 </div>
 </header>

 <div className="flex h-[calc(100vh-73px)]">
 {/* Sidebar */}
 <aside className="w-72 border-r border-white/10 bg-void/50 overflow-y-auto">
 <nav className="p-4 space-y-1">
 {tabs.map((tab) => (
 <button
 key={tab.id}
 onClick={() => setActiveTab(tab.id)}
 className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
 activeTab === tab.id
 ? 'bg-neon-pink text-white'
 : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
 }`}
 >
 <tab.icon className="w-5 h-5 shrink-0" />
 <div>
 <div className="font-tech text-sm">{tab.label}</div>
 <div className={`text-xs ${activeTab === tab.id ? 'text-white/70' : 'text-white/40'}`}>
 {tab.description}
 </div>
 </div>
 <ChevronRight className={`w-4 h-4 ml-auto ${activeTab === tab.id ? 'opacity-100' : 'opacity-0'}`} />
 </button>
 ))}
 </nav>

 <div className="p-4 mt-8">
 <div className="p-4 glass-neon rounded-xl">
 <h3 className="font-display text-sm font-bold text-white mb-3">Quick Stats</h3>
 <div className="space-y-2 font-tech text-xs">
 <div className="flex justify-between text-white/60">
 <span>Monthly Listeners</span>
 <span className="text-neon-pink">3,541</span>
 </div>
 <div className="flex justify-between text-white/60">
 <span>Total Streams</span>
 <span className="text-neon-pink">13K+</span>
 </div>
 <div className="flex justify-between text-white/60">
 <span>Tracks</span>
 <span className="text-neon-pink">16</span>
 </div>
 <div className="flex justify-between text-white/60">
 <span>Videos</span>
 <span className="text-neon-pink">6</span>
 </div>
 </div>
 </div>
 </div>
 </aside>

 {/* Main Content */}
 <main className="flex-1 overflow-y-auto p-6">
 {activeTab === 'builder' && <AdminSiteBuilder />}
 {activeTab === 'tracks' && <AdminTracks />}
 {activeTab === 'videos' && <AdminVideos />}
 {activeTab === 'images' && <AdminImages />}
 {activeTab === 'merch' && <AdminMerch />}
 {activeTab === 'settings' && <div className="text-white/60 font-body">Settings coming soon</div>}
 </main>
 </div>
 </div>
 );
}
