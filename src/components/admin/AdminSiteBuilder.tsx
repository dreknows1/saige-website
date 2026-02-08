import { useState, useEffect } from 'react';
import { Save, Type, Image, Music, Video, Layout, Eye, Trash2, GripVertical, Plus } from 'lucide-react';
import { getCMSData, updatePages } from '../../lib/cmsStore';
import type { Page } from '../../types/cms';

type SectionType = 'hero' | 'about' | 'text' | 'music' | 'video' | 'gallery';

const sectionTypes: SectionType[] = ['hero', 'about', 'text', 'music', 'video', 'gallery'];

const typeLabels = {
  hero: { label: 'Hero Section', icon: Layout, description: 'Main banner with title' },
  about: { label: 'About Section', icon: Type, description: 'Artist bio and info' },
  text: { label: 'Text Block', icon: Type, description: 'Simple text content' },
  music: { label: 'Music Section', icon: Music, description: 'Display tracks/albums' },
  video: { label: 'Video Section', icon: Video, description: 'YouTube video embed' },
  gallery: { label: 'Image Gallery', icon: Image, description: 'Photo gallery grid' },
};

interface SectionUI {
  id: string;
  type: SectionType;
  title: string;
  content: string;
  order: number;
  isActive: boolean;
}

export default function AdminSiteBuilder() {
  const [pages, setPages] = useState<Page[]>([]);
  const [currentPageId] = useState('home');
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [sections, setSections] = useState<SectionUI[]>([]);

  useEffect(() => {
    const data = getCMSData();
    setPages(data.pages);
    const currentPage = data.pages.find((p: Page) => p.id === currentPageId) || data.pages[0];
    setSections((currentPage?.sections || []) as SectionUI[]);
    setIsLoading(false);
  }, [currentPageId]);

  const addSection = (type: SectionType) => {
    const { label } = typeLabels[type];
    const newSection: SectionUI = {
      id: Date.now().toString(),
      type,
      title: label,
      content: '',
      order: sections.length,
      isActive: true,
    };
    
    const updatedSections = [...sections, newSection];
    setSections(updatedSections);
    
    const updatedPages = pages.map((p: Page) => 
      p.id === currentPageId 
        ? { ...p, sections: updatedSections }
        : p
    );
    setPages(updatedPages);
    updatePages(updatedPages);
    setEditingSectionId(newSection.id);
  };

  const removeSection = (id: string) => {
    const updatedSections = sections.filter(s => s.id !== id);
    setSections(updatedSections);
    
    const updatedPages = pages.map((p: Page) => 
      p.id === currentPageId 
        ? { ...p, sections: updatedSections }
        : p
    );
    setPages(updatedPages);
    updatePages(updatedPages);
  };

  const updateSection = (id: string, updates: Partial<SectionUI>) => {
    const updatedSections = sections.map(s => s.id === id ? { ...s, ...updates } : s);
    setSections(updatedSections);
    
    const updatedPages = pages.map((p: Page) => 
      p.id === currentPageId 
        ? { ...p, sections: updatedSections }
        : p
    );
    setPages(updatedPages);
  };

  const saveChanges = () => {
    updatePages(pages);
    setMessage('Changes saved!');
    setTimeout(() => setMessage(''), 2000);
  };

  if (isLoading) return <div className="text-white/60 font-body">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-white">Site Builder</h2>
          <p className="text-white/50 font-tech text-sm mt-1">Build your site by adding and editing sections</p>
        </div>
        <div className="flex items-center gap-3">
          {message && <span className="px-4 py-2 rounded-lg bg-green-500/20 text-green-400 font-tech text-sm">{message}</span>}
          <button onClick={saveChanges} className="flex items-center gap-2 px-4 py-2 bg-neon-pink text-white rounded-lg font-tech text-sm hover:glow-pink transition-all">
            <Save className="w-4 h-4" /> Save
          </button>
        </div>
      </div>

      <div className="mb-6 flex gap-2 flex-wrap">
        {sectionTypes.map(type => {
          const { label, icon: Icon } = typeLabels[type];
          return (
            <button
              key={type}
              onClick={() => addSection(type)}
              className="flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-neon-pink/20 text-white/70 hover:text-neon-pink rounded-lg font-tech text-xs transition-colors"
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        {sections.filter(s => s.isActive).sort((a, b) => a.order - b.order).map((section, index) => {
          const { label, icon: Icon } = typeLabels[section.type];
          const isEditing = editingSectionId === section.id;
          
          return (
            <div key={section.id} className="glass-neon rounded-xl overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3 bg-white/5 border-b border-white/10">
                <GripVertical className="w-4 h-4 text-white/30 cursor-grab" />
                <Icon className="w-4 h-4 text-neon-pink" />
                <span className="font-tech text-sm text-white/80">{label}</span>
                <span className="ml-auto text-white/40 font-tech text-xs">#{index + 1}</span>
                <button onClick={() => setEditingSectionId(isEditing ? null : section.id)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                  {isEditing ? <Eye className="w-4 h-4 text-white/60" /> : <Plus className="w-4 h-4 text-white/60" />}
                </button>
                <button onClick={() => removeSection(section.id)} className="p-1.5 hover:bg-red-500/20 rounded-lg transition-colors">
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
                    <textarea
                      value={section.content}
                      onChange={(e) => updateSection(section.id, { content: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-tech text-sm resize-none"
                      placeholder="Enter section content..."
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {sections.length === 0 && (
        <div className="text-center py-12 glass-neon rounded-xl">
          <Layout className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <p className="font-body text-white/60 mb-2">No sections yet</p>
          <p className="font-tech text-xs text-white/40">Add a section above to get started</p>
        </div>
      )}
    </div>
  );
}
