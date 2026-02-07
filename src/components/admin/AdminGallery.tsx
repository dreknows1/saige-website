import { useState } from 'react';
import { Upload, Image as ImageIcon, Trash2, MoveUp, MoveDown, Save } from 'lucide-react';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  order: number;
}

const defaultImages: GalleryImage[] = [
  { id: '1', src: '/assets/images/promo-1.png', alt: 'Saige Promo 1', order: 1 },
  { id: '2', src: '/assets/images/promo-2.png', alt: 'Saige Promo 2', order: 2 },
  { id: '3', src: '/assets/images/promo-3.png', alt: 'Saige Promo 3', order: 3 },
  { id: '4', src: '/assets/images/promo-4.png', alt: 'Saige Promo 4', order: 4 },
  { id: '5', src: '/assets/images/promo-5.png', alt: 'Saige Promo 5', order: 5 },
  { id: '6', src: '/assets/images/promo-6.png', alt: 'Saige Promo 6', order: 6 },
];

export default function AdminGallery() {
  const [images, setImages] = useState<GalleryImage[]>(defaultImages);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    
    // Simulate upload - in production this would go to Supabase storage
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newImage: GalleryImage = {
      id: Date.now().toString(),
      src: URL.createObjectURL(file),
      alt: file.name,
      order: images.length + 1
    };

    setImages([...images, newImage]);
    setUploading(false);
    setMessage('Image uploaded');
    setTimeout(() => setMessage(''), 2000);
  };

  const deleteImage = (id: string) => {
    setImages(images.filter(img => img.id !== id));
    setMessage('Image deleted');
    setTimeout(() => setMessage(''), 2000);
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === images.length - 1) return;

    const newImages = [...images];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
    setImages(newImages.map((img, i) => ({ ...img, order: i + 1 })));
  };

  const updateAlt = (id: string, alt: string) => {
    setImages(images.map(img => img.id === id ? { ...img, alt } : img));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-white">Gallery Section</h2>
        {message && (
          <span className="px-4 py-2 rounded-lg bg-green-500/20 text-green-400 font-tech text-sm">
            {message}
          </span>
        )}
      </div>

      {/* Upload */}
      <div className="mb-8">
        <label className="flex items-center gap-3 px-6 py-3 bg-neon-pink/20 text-neon-pink border border-neon-pink/50 rounded-xl cursor-pointer hover:bg-neon-pink/30 transition-colors w-fit">
          <Upload className="w-5 h-5" />
          <span className="font-tech text-sm">Add New Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
        {uploading && (
          <span className="ml-4 font-tech text-sm text-white/60">Uploading...</span>
        )}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={image.id} className="glass-neon rounded-xl overflow-hidden group">
            <div className="aspect-square relative">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/images/promo-1.png';
                }}
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => moveImage(index, 'up')}
                  disabled={index === 0}
                  className="p-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors disabled:opacity-30"
                >
                  <MoveUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveImage(index, 'down')}
                  disabled={index === images.length - 1}
                  className="p-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors disabled:opacity-30"
                >
                  <MoveDown className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteImage(image.id)}
                  className="p-2 rounded-lg bg-red-500/80 text-white hover:bg-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-3">
              <input
                type="text"
                value={image.alt}
                onChange={(e) => updateAlt(image.id, e.target.value)}
                className="w-full bg-transparent border-b border-white/20 text-white font-tech text-xs focus:border-neon-pink outline-none pb-1"
                placeholder="Image description"
              />
            </div>
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center py-12 glass-neon rounded-xl">
          <ImageIcon className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <p className="font-body text-white/60">No images in gallery</p>
          <p className="font-tech text-sm text-white/40 mt-2">Upload images above</p>
        </div>
      )}

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={() => {
            localStorage.setItem('saige_gallery', JSON.stringify(images));
            setMessage('Gallery saved');
            setTimeout(() => setMessage(''), 2000);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-neon-pink text-white rounded-xl font-tech hover:bg-neon-pink/80 transition-colors"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  );
}
