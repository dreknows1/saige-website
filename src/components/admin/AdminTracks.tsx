import { useState, useEffect } from 'react';
import { getTracks, updateTrack, Track } from '../../lib/supabase';
import { Edit, Save, X, ExternalLink } from 'lucide-react';

export default function AdminTracks() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Track>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadTracks();
  }, []);

  async function loadTracks() {
    try {
      const data = await getTracks();
      setTracks(data);
    } catch (error) {
      console.error('Error loading tracks:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const startEdit = (track: Track) => {
    setEditingId(track.track_id);
    setEditForm({
      title: track.title,
      album: track.album,
      duration: track.duration,
      plays: track.plays,
      price: track.price,
      spotify_url: track.spotify_url,
      is_active: track.is_active
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = async (trackId: string) => {
    try {
      await updateTrack(trackId, editForm);
      setMessage('Track updated successfully');
      setTimeout(() => setMessage(''), 3000);
      loadTracks();
      setEditingId(null);
    } catch (error) {
      setMessage('Error updating track');
    }
  };

  if (isLoading) {
    return <div className="text-white/60 font-body">Loading tracks...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-white">Manage Tracks</h2>
        {message && (
          <span className="px-4 py-2 rounded-lg bg-green-500/20 text-green-400 font-tech text-sm">
            {message}
          </span>
        )}
      </div>

      <div className="space-y-4">
        {tracks.map((track) => (
          <div key={track.track_id} className="glass-neon rounded-xl p-4">
            {editingId === track.track_id ? (
              // Edit Mode
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
                    <label className="block font-tech text-xs text-white/60 mb-1">Album</label>
                    <input
                      type="text"
                      value={editForm.album || ''}
                      onChange={(e) => setEditForm({ ...editForm, album: e.target.value })}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-body text-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-tech text-xs text-white/60 mb-1">Duration</label>
                    <input
                      type="text"
                      value={editForm.duration || ''}
                      onChange={(e) => setEditForm({ ...editForm, duration: e.target.value })}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-body text-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-tech text-xs text-white/60 mb-1">Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={editForm.price || 0}
                      onChange={(e) => setEditForm({ ...editForm, price: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-body text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-tech text-xs text-white/60 mb-1">Spotify URL</label>
                  <input
                    type="text"
                    value={editForm.spotify_url || ''}
                    onChange={(e) => setEditForm({ ...editForm, spotify_url: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-body text-sm"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => saveEdit(track.track_id)}
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
              // View Mode
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-neon-pink/20 text-neon-pink font-tech text-sm">
                    {track.track_number}
                  </span>
                  <div>
                    <h3 className="font-body font-semibold text-white">{track.title}</h3>
                    <p className="font-tech text-xs text-white/60">
                      {track.album} • {track.duration} • ${track.price}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={track.spotify_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-white/40 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => startEdit(track)}
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
