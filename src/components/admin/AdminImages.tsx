import { useState, useRef } from 'react';
import { Upload, Image, X, Folder } from 'lucide-react';

interface ImageFile {
  id: string;
  name: string;
  path: string;
  size: number;
  uploadedAt: string;
}

const mockImages: ImageFile[] = [
  { id: '1', name: 'promo-1.png', path: '/assets/images/promo-1.png', size: 6563079, uploadedAt: '2025-02-04' },
  { id: '2', name: 'promo-2.png', path: '/assets/images/promo-2.png', size: 7998327, uploadedAt: '2025-02-04' },
  { id: '3', name: 'the-audacity.png', path: '/assets/album-covers/the-audacity.png', size: 157262, uploadedAt: '2025-02-04' },
];

export default function AdminImages() {
  const [images, setImages] = useState<ImageFile[]>(mockImages);
  const [selectedFolder, setSelectedFolder] = useState('images');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const folders = [
    { id: 'images', name: 'Promo Images', path: '/assets/images/' },
    { id: 'album-covers', name: 'Album Covers', path: '/assets/album-covers/' },
  ];

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newImages: ImageFile[] = Array.from(files).map((file, index) => ({
      id: Date.now().toString() + index,
      name: file.name,
      path: `/assets/${selectedFolder}/${file.name}`,
      size: file.size,
      uploadedAt: new Date().toISOString().split('T')[0],
    }));

    setImages([...images, ...newImages]);
    setUploading(false);
    setMessage(`Uploaded ${files.length} image(s)`);
    setTimeout(() => setMessage(''), 3000);
  };

  const deleteImage = (id: string) => {
    setImages(images.filter(img => img.id !== id));
    setMessage('Image deleted');
    setTimeout(() => setMessage(''), 3000);
  };

  const filteredImages = images.filter(img => img.path.includes(`/${selectedFolder}/`));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-white">Manage Images</h2>
        {message && (
          <span className="px-4 py-2 rounded-lg bg-green-500/20 text-green-400 font-tech text-sm">
            {message}
          </span>
        )}
      </div>

      {/* Folder Selection */}
      <div className="flex gap-4 mb-6">
        {folders.map(folder => (
          <button
            key={folder.id}
            onClick={() => setSelectedFolder(folder.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-tech text-sm transition-all ${
              selectedFolder === folder.id
                ? 'bg-neon-pink text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            <Folder className="w-4 h-4" />
            {folder.name}
          </button>
        ))}
      </div>

      {/* Upload Area */}
      <div 
        className="border-2 border-dashed border-white/20 rounded-2xl p-8 mb-6 text-center hover:border-neon-pink/50 transition-colors cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        <Upload className="w-12 h-12 text-white/40 mx-auto mb-4" />
        <p className="font-body text-white/60 mb-2">Click to upload images</p>
        <p className="font-tech text-xs text-white/40">PNG, JPG, WebP up to 10MB</p>
        {uploading && (
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white/30 border-t-neon-pink rounded-full animate-spin" />
            <span className="font-tech text-sm text-white/60">Uploading...</span>
          </div>
        )}
      </div>

      {/* Image Grid */}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map(image => (
          <div key={image.id} className="glass-neon rounded-xl overflow-hidden group">
            <div className="aspect-square bg-void/50 relative">
              <img 
                src={image.path} 
                alt={image.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/images/promo-1.png';
                }}
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button 
                  onClick={() => deleteImage(image.id)}
                  className="p-2 rounded-lg bg-red-500/80 text-white hover:bg-red-500 transition-colors"
                  title="Delete"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-3">
              <p className="font-tech text-xs text-white truncate">{image.name}</p>
              <p className="font-tech text-xs text-white/40">{formatSize(image.size)}</p>
              <p className="font-tech text-xs text-white/40">{image.uploadedAt}</p>
            </div>
          </div>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <div className="text-center py-12">
          <Image className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <p className="font-body text-white/60">No images in this folder</p>
        </div>
      )}
    </div>
  );
}
