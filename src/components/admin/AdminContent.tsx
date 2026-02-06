import { useState, useEffect } from 'react';
import { getSiteContent, updateSiteContent } from '../../lib/supabase';
import { Save, Globe, Users, Music } from 'lucide-react';

export default function AdminContent() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadContent();
  }, []);

  async function loadContent() {
    try {
      const data = await getSiteContent();
      setContent(data);
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const updateValue = async (key: string, value: string) => {
    try {
      await updateSiteContent(key, value);
      setMessage(`${key} updated successfully`);
      setTimeout(() => setMessage(''), 3000);
      loadContent();
    } catch (error) {
      setMessage(`Error updating ${key}`);
    }
  };

  if (isLoading) {
    return <div className="text-white/60 font-body">Loading content...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-white">Site Content</h2>
        {message && (
          <span className="px-4 py-2 rounded-lg bg-green-500/20 text-green-400 font-tech text-sm">
            {message}
          </span>
        )}
      </div>

      <div className="space-y-6">
        {/* Artist Info */}
        <div className="glass-neon rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-5 h-5 text-neon-pink" />
            <h3 className="font-display text-lg font-bold text-white">Artist Information</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block font-tech text-xs text-white/60 mb-1">Artist Bio</label>
              <textarea
                value={content['artist_bio'] || ''}
                onChange={(e) => setContent({ ...content, artist_bio: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-body text-sm"
              />
              <button
                onClick={() => updateValue('artist_bio', content['artist_bio'])}
                className="mt-2 flex items-center gap-2 px-4 py-2 bg-neon-pink text-white rounded-lg font-tech text-sm hover:glow-pink transition-all"
              >
                <Save className="w-4 h-4" />
                Save Bio
              </button>
            </div>
            <div>
              <label className="block font-tech text-xs text-white/60 mb-1">Location</label>
              <input
                type="text"
                value={content['location'] || ''}
                onChange={(e) => setContent({ ...content, location: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-body text-sm"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="glass-neon rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-5 h-5 text-neon-cyan" />
            <h3 className="font-display text-lg font-bold text-white">Statistics</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-tech text-xs text-white/60 mb-1">Monthly Listeners</label>
              <input
                type="text"
                value={content['monthly_listeners'] || ''}
                onChange={(e) => setContent({ ...content, monthly_listeners: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-body text-sm"
              />
            </div>
            <div>
              <label className="block font-tech text-xs text-white/60 mb-1">Total Streams</label>
              <input
                type="text"
                value={content['total_streams'] || ''}
                onChange={(e) => setContent({ ...content, total_streams: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-body text-sm"
              />
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="glass-neon rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Music className="w-5 h-5 text-neon-violet" />
            <h3 className="font-display text-lg font-bold text-white">Pricing</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-tech text-xs text-white/60 mb-1">Track Price ($)</label>
              <input
                type="text"
                value={content['track_price'] || ''}
                onChange={(e) => setContent({ ...content, track_price: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-body text-sm"
              />
            </div>
            <div>
              <label className="block font-tech text-xs text-white/60 mb-1">Album Price ($)</label>
              <input
                type="text"
                value={content['album_price'] || ''}
                onChange={(e) => setContent({ ...content, album_price: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-body text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
