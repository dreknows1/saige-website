import { useState } from 'react';
import { Save, Type, Image, Music, Video, Layout, Eye, Trash2, GripVertical } from 'lucide-react';
interface Section {
 id: string;
 type: 'hero' | 'text' | 'image' | 'music' | 'video' | 'gallery';
 title: string;
 content: string;
 imageUrl?: string;
 order: number;
}
const sectionTypes: Section['type'][] = ['hero', 'text', 'image', 'music', 'video', 'gallery'];
const typeLabels: Record<Section['type'], { label: string; icon: typeof Type }> = {
 hero: { label: 'Hero Section', icon: Layout },
 text: { label: 'Text Block', icon: Type },
 image: { label: 'Image Block', icon: Image },
 music: { label: 'Music Section', icon: Music },
 video: { label: 'Video Section', icon: Video },
 gallery: { label: 'Image Gallery', icon: Image },
};
export default function AdminSiteBuilder() {
 const [sections, setSections] = useState<Section[]>([
 { id: '1', type: 'hero', title: 'Hero Section', content: 'Saige Musik', order: 0 },
 { id: '2', type: 'music', title: 'Latest Release', content: 'All tracks from Heartbreaks Algorithm', order: 1 },
 { id: '3', type: 'video', title: 'Videos', content: 'Official music videos and lyric videos', order: 2 },
 ]);
 const [editingId, setEditingId] = useState<string | null>(null);
 const [message, setMessage] = useState('');
 const addSection = (type: Section['type']) => {
 const newSection: Section = {
 id: Date.now().toString(),
 type,
 title: typeLabels[type].label,
 content: '',
 order: sections.length,
 };
 setSections([...sections, newSection]);
 setEditingId(newSection.id);
 };
 const removeSection = (id: string) => {
 setSections(sections.filter(s => s.id !== id));
 };
 const updateSection = (id: string, updates: Partial<Section>) => {
 setSections(sections.map(s => s.id === id ? { ...s, ...updates } : s));
 };
 const saveChanges = () => {
 setMessage('Changes saved!');
 setTimeout(() => setMessage(''), 2000);
 };
 return (
 <div>
 <div className="flex items-center justify-between mb-6">
 <div>
 <h2 className="font-display text-2xl font-bold text-white">Site Builder</h2>
 <p className="text-white/50 font-tech text-sm mt-1">Drag sections to reorder. Click to edit content.</p>
 </div>
 <div className="flex items-center gap-3">
 <div className="flex items-center gap-2">
 {sectionTypes.map(type => {
 const { label, icon: Icon } = typeLabels[type];
 return (
 <button
 key={type}
 onClick={() => addSection(type)}
 className="flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-neon-pink/20 text-white/70 hover:text-neon-pink rounded-lg font-tech text-xs transition-colors"
 title={label}
 >
 <Icon className="w-3.5 h-3.5" />
 <span>{label}</span>
 </button>
 );
 })}
 </div>
 <button
 onClick={saveChanges}
 className="flex items-center gap-2 px-4 py-2 bg-neon-pink text-white rounded-lg font-tech text-sm hover:glow-pink transition-all"
 >
 <Save className="w-4 h-4" />
 Save
 </button>
 </div>
 </div>
 {message && (
 <div className="mb-4 px-4 py-2 rounded-lg bg-green-500/20 text-green-400 font-tech text-sm">
 {message}
 </div>
 )}
 <div className="space-y-4">
 {sections.map((section, index) => {
 const { label, icon: Icon } = typeLabels[section.type];
 const isEditing = editingId === section.id;
 return (
 <div
 key={section.id}
 className="glass-neon rounded-xl overflow-hidden"
 >
 <div className="flex items-center gap-3 px-4 py-3 bg-white/5 border-b border-white/10">
 <GripVertical className="w-4 h-4 text-white/30 cursor-grab" />
 <Icon className="w-4 h-4 text-neon-pink" />
 <span className="font-tech text-sm text-white/80">{label}</span>
 <span className="ml-auto text-white/40 font-tech text-xs">#{index + 1}</span>
 <button
 onClick={() => setEditingId(isEditing ? null : section.id)}
 className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
 >
 {isEditing ? <Eye className="w-4 h-4 text-white/60" /> : <Type className="w-4 h-4 text-white/60" />}
 </button>
 <button
 onClick={() => removeSection(section.id)}
 className="p-1.5 hover:bg-red-500/20 rounded-lg transition-colors"
 >
 <Trash2 className="w-4 h-4 text-red-400" />
 </button>
 </div>
 {isEditing && (
 <div className="p-4 space-y-4">
 <div>
 <label className="block font-tech text-xs text-white/50 mb-1">Section Title</label>
 <input
 type="text"
 value={section.title}
 onChange={(e) => updateSection(section.id, { title: e.target.value })}
 className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-tech text-sm"
 />
 </div>
 <div>
 <label className="block font-tech text-xs text-white/50 mb-1">Content</label>
 {section.type === 'text' || section.type === 'hero' ? (
 <textarea
 value={section.content}
 onChange={(e) => updateSection(section.id, { content: e.target.value })}
 rows={4}
 className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-tech text-sm resize-none"
 />
 ) : section.type === 'image' ? (
 <div className="space-y-2">
 <input
 type="text"
 value={section.imageUrl || ''}
 onChange={(e) => updateSection(section.id, { imageUrl: e.target.value })}
 placeholder="Image URL"
 className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-tech text-sm"
 />
 <p className="text-white/40 font-tech text-xs">Enter image URL or upload via Images tab</p>
 </div>
 ) : (
 <div className="p-3 bg-white/5 rounded-lg">
 <p className="text-white/50 font-tech text-xs">
 {section.type === 'music' && 'Music section - configure in Tracks tab'}
 {section.type === 'video' && 'Video section - configure in Videos tab'}
 {section.type === 'gallery' && 'Gallery section - configure in Images tab'}
 </p>
 </div>
 )}
 </div>
 </div>
 )}
 </div>
 );
 })}
 </div>
 </div>
 );
}
