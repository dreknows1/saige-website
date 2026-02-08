import { useState, useEffect } from 'react';
import { Save, Globe, Users, Music, Quote } from 'lucide-react';
import { getCMSData, updateConfig } from '../../lib/cmsStore';
import type { SiteConfig } from '../../types/cms';

export default function AdminContent() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const data = getCMSData();
    setConfig(data.config);
    setIsLoading(false);
  }, []);

  const handleChange = (field: keyof SiteConfig, value: string) => {
    if (config) {
      setConfig({ ...config, [field]: value });
    }
  };

  const handleSocialChange = (platform: keyof SiteConfig['social'], value: string) => {
    if (config) {
      setConfig({
        ...config,
        social: { ...config.social, [platform]: value }
      });
    }
  };

  const saveChanges = () => {
    if (!config) return;
    setIsSaving(true);
    setTimeout(() => {
      updateConfig(config);
      setIsSaving(false);
      setMessage('Changes saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    }, 500);
  };

  if (isLoading || !config) {
    return <div className="text-white/60 font-body">Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-white">Site Content</h2>
        <div className="flex items-center gap-3">
          {message && (
            <span className="px-4 py-2 rounded-lg bg-green-500/20 text-green-400 font-tech text-sm">
              {message}
            </span>
          )}
          <button
            onClick={saveChanges}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 bg-neon-pink text-white rounded-lg font-tech text-sm hover:glow-pink transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Site Info */}
        <div className="glass-neon rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-5 h-5 text-neon-pink" />
            <h3 className="font-display text-lg font-bold text-white">Site Information</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block font-tech text-xs text-white/60 mb-1">Site Title</label>
              <input
                type="text"
                value={config.siteTitle}
                onChange={(e) => handleChange('siteTitle', e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-body text-sm"
              />
            </div>
            <div>
              <label className="block font-tech text-xs text-white/60 mb-1">Site Description</label>
              <textarea
                value={config.siteDescription}
                onChange={(e) => handleChange('siteDescription', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-body text-sm resize-none"
              />
            </div>
          </div>
        </div>

        {/* Artist Info */}
        <div className="glass-neon rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-5 h-5 text-neon-cyan" />
            <h3 className="font-display text-lg font-bold text-white">Artist Information</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block font-tech text-xs text-white/60 mb-1">Artist Name</label>
              <input
                type="text"
                value={config.artistName}
                onChange={(e) => handleChange('artistName', e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-body text-sm"
              />
            </div>
            <div>
              <label className="block font-tech text-xs text-white/60 mb-1">Artist Bio</label>
              <textarea
                value={config.artistBio}
                onChange={(e) => handleChange('artistBio', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-body text-sm resize-none"
              />
              <p className="mt-1 text-xs text-white/40">This appears in the About section</p>
            </div>
            <div>
              <label className="block font-tech text-xs text-white/60 mb-1">Location</label>
              <input
                type="text"
                value={config.location}
                onChange={(e) => handleChange('location', e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-body text-sm"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="glass-neon rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Music className="w-5 h-5 text-neon-violet" />
            <h3 className="font-display text-lg font-bold text-white">Statistics</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-tech text-xs text-white/60 mb-1">Monthly Listeners</label>
              <input
                type="text"
                value={config.monthlyListeners}
                onChange={(e) => handleChange('monthlyListeners', e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-body text-sm"
              />
            </div>
            <div>
              <label className="block font-tech text-xs text-white/60 mb-1">Total Streams</label>
              <input
                type="text"
                value={config.totalStreams}
                onChange={(e) => handleChange('totalStreams', e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-body text-sm"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="glass-neon rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Quote className="w-5 h-5 text-orange-400" />
            <h3 className="font-display text-lg font-bold text-white">Social Media Links</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {(Object.keys(config.social) as Array<keyof typeof config.social>).map((platform) => (
              <div key={platform}>
                <label className="block font-tech text-xs text-white/60 mb-1 capitalize">{platform}</label>
                <input
                  type="text"
                  value={config.social[platform]}
                  onChange={(e) => handleSocialChange(platform, e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-body text-sm"
                  placeholder={`Enter ${platform} URL`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
