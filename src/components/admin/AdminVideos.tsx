import { useState, useEffect } from 'react';
import { getVideos, updateVideo, Video } from '../../lib/supabase';
import { Edit, Save, X, ExternalLink } from 'lucide-react';

export default function AdminVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Video>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadVideos();
  }, []);

  async function loadVideos() {
    try {
      const data = await getVideos();
      setVideos(data);
    } catch (error) {
      console.error('Error loading videos:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const startEdit = (video: Video) => {
    setEditingId(video.video_id);
    setEditForm({
      title: video.title,
      description: video.description,
      youtube_url: video.youtube_url,
      duration: video.duration,
      views: video.views,
      category: video.category,
      is_active: video.is_active
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = async (videoId: string) => {
    try {
      await updateVideo(videoId, editForm);
      setMessage('Video updated successfully');
      setTimeout(() => setMessage(''), 3000);
      loadVideos();
      setEditingId(null);
    } catch (error) {
      setMessage('Error updating video');
    }
  };

  if (isLoading) {
    return <div className="text-white/60 font-body">Loading videos...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-white">Manage Videos</h2>
        {message && (
          <span className="px-4 py-2 rounded-lg bg-green-500/20 text-green-400 font-tech text-sm">
            {message}
          </span>
        )}
      </div>

      <div className="space-y-4">
        {videos.map((video) => (
          <div key={video.video_id} className="glass-neon rounded-xl p-4">
            {editingId === video.video_id ? (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-tech text-xs text-white/60 mb-1">Title</label>
                    <input
                      type="text"
                      value={editForm.title || ''}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-body text-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-tech text-xs text-white/60 mb-1">Category</label>
                    <select
                      value={editForm.category || ''}
                      onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-body text-sm"
                    >
                      <option value="Music Video">Music Video</option>
                      <option value="Lyric Video">Lyric Video</option>
                      <option value="Audio">Audio</option>
                      <option value="Live">Live</option>
                      <option value="Behind The Scenes">Behind The Scenes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-tech text-xs text-white/60 mb-1">Duration</label>
                    <input
                      type="text"
                      value={editForm.duration || ''}
                      onChange={(e) => setEditForm({ ...editForm, duration: e.target.value })}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-body text-sm"
                      placeholder="4:20"
                    />
                  </div>
                  <div>
                    <label className="block font-tech text-xs text-white/60 mb-1">Views</label>
                    <input
                      type="text"
                      value={editForm.views || ''}
                      onChange={(e) => setEditForm({ ...editForm, views: e.target.value })}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-body text-sm"
                      placeholder="1.2K"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-tech text-xs text-white/60 mb-1">YouTube URL</label>
                  <input
                    type="text"
                    value={editForm.youtube_url || ''}
                    onChange={(e) => setEditForm({ ...editForm, youtube_url: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-body text-sm"
                  />
                </div>
                <div>
                  <label className="block font-tech text-xs text-white/60 mb-1">Description</label>
                  <textarea
                    value={editForm.description || ''}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-body text-sm"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => saveEdit(video.video_id)}
                    className="flex items-center gap-2 px-4 py-2 bg-neon-pink text-white rounded-lg font-tech text-sm hover:glow-pink transition-all"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg font-tech text-sm hover:bg-white/20 transition-all"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-12 rounded-lg bg-gradient-to-br from-neon-pink to-neon-violet flex items-center justify-center">
                    <span className="font-tech text-xs text-white">{video.category?.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-body font-semibold text-white">{video.title}</h3>
                    <p className="font-tech text-xs text-white/60">
                      {video.category} • {video.duration} • {video.views} views
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={video.youtube_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-white/40 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => startEdit(video)}
                    className="flex items-center gap-2 px-3 py-2 bg-white/10 text-white rounded-lg font-tech text-sm hover:bg-white/20 transition-all"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
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
