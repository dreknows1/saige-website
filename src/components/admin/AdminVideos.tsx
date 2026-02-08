import { useState, useEffect } from 'react';
import { Edit, Save, X, ExternalLink, Plus, Trash2 } from 'lucide-react';
import { getCMSData, updateVideos } from '../../lib/cmsStore';
import type { Video } from '../../types/cms';

export default function AdminVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Video>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const data = getCMSData();
    setVideos(data.videos);
    setIsLoading(false);
  }, []);

  const startEdit = (video: Video) => {
    setEditingId(video.id);
    setEditForm({ ...video });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = () => {
    if (!editingId || !editForm) return;
    const updated = videos.map(v => v.id === editingId ? { ...v, ...editForm } as Video : v);
    setVideos(updated);
    updateVideos(updated);
    setEditingId(null);
    setEditForm({});
    setMessage('Video saved');
    setTimeout(() => setMessage(''), 3000);
  };

  const addVideo = () => {
    const newVideo: Video = {
      id: Date.now().toString(),
      title: 'New Video',
      description: '',
      youtubeUrl: '',
      thumbnail: '',
      duration: '3:00',
      views: '0',
      category: 'Music Video',
      year: '2025',
      isActive: true,
    };
    const updated = [...videos, newVideo];
    setVideos(updated);
    updateVideos(updated);
    startEdit(newVideo);
  };

  const deleteVideo = (id: string) => {
    const updated = videos.filter(v => v.id !== id);
    setVideos(updated);
    updateVideos(updated);
    setMessage('Video deleted');
    setTimeout(() => setMessage(''), 3000);
  };

  if (isLoading) return <div className="text-white/60 font-body">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-white">Manage Videos</h2>
        <div className="flex items-center gap-3">
          {message && <span className="px-4 py-2 rounded-lg bg-green-500/20 text-green-400 font-tech text-sm">{message}</span>}
          <button onClick={addVideo} className="flex items-center gap-2 px-4 py-2 bg-neon-pink text-white rounded-lg font-tech text-sm hover:glow-pink transition-all">
            <Plus className="w-4 h-4" /> Add Video
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {videos.map((video) => (
          <div key={video.id} className="glass-neon rounded-xl p-4">
            {editingId === video.id ? (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-tech text-xs text-white/60 mb-1">Title</label>
                    <input type="text" value={editForm.title || ''} onChange={e => setEditForm({ ...editForm, title: e.target.value })} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-body text-sm" />
                  </div>
                  <div>
                    <label className="block font-tech text-xs text-white/60 mb-1">Category</label>
                    <select value={editForm.category || ''} onChange={e => setEditForm({ ...editForm, category: e.target.value })} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-body text-sm">
                      <option value="Music Video">Music Video</option>
                      <option value="Lyric Video">Lyric Video</option>
                      <option value="Audio">Audio</option>
                      <option value="Live">Live</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block font-tech text-xs text-white/60 mb-1">YouTube URL</label>
                  <input type="text" value={editForm.youtubeUrl || ''} onChange={e => setEditForm({ ...editForm, youtubeUrl: e.target.value })} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-body text-sm" />
                </div>
                <div>
                  <label className="block font-tech text-xs text-white/60 mb-1">Description</label>
                  <textarea value={editForm.description || ''} onChange={e => setEditForm({ ...editForm, description: e.target.value })} rows={2} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-body text-sm resize-none" />
                </div>
                <div className="flex gap-2">
                  <button onClick={saveEdit} className="flex items-center gap-2 px-4 py-2 bg-neon-pink text-white rounded-lg font-tech text-sm hover:glow-pink transition-all">
                    <Save className="w-4 h-4" /> Save
                  </button>
                  <button onClick={cancelEdit} className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg font-tech text-sm hover:bg-white/20 transition-all">
                    <X className="w-4 h-4" /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-12 rounded-lg bg-gradient-to-br from-neon-pink to-neon-violet flex items-center justify-center">
                    <span className="font-tech text-xs text-white">{(video.category || '').charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-body font-semibold text-white">{video.title}</h3>
                    <p className="font-tech text-xs text-white/60">{video.category} • {video.duration} • {video.views} views</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {video.youtubeUrl && <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-white/40 hover:text-white transition-colors"><ExternalLink className="w-4 h-4" /></a>}
                  <button onClick={() => startEdit(video)} className="flex items-center gap-2 px-3 py-2 bg-white/10 text-white rounded-lg font-tech text-sm hover:bg-white/20 transition-all">
                    <Edit className="w-4 h-4" /> Edit
                  </button>
                  <button onClick={() => deleteVideo(video.id)} className="p-2 hover:bg-red-500/20 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
