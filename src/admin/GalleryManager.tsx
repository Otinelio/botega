import { useState, useEffect, useRef } from 'react';
import { getGallery, setGallery, uid, type GalleryItem } from '../data/store';
import { supabase } from '../lib/supabase';
import { Plus, Trash2, X, Upload } from 'lucide-react';

export default function GalleryManager() {
  const [items, setItems] = useState<GalleryItem[]>(getGallery());
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ caption: '' });
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setGallery(items); }, [items]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    try {
      // 1. Upload l'image vers le bucket 'gallery'
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('gallery')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // 2. Récupérer l'URL publique
      const { data: { publicUrl } } = supabase.storage
        .from('gallery')
        .getPublicUrl(filePath);

      // 3. Ajouter à la galerie locale (et/ou Supabase si branché)
      const newItem: GalleryItem = { id: uid(), url: publicUrl, caption: form.caption };
      setItems(prev => [...prev, newItem]);
      
      // Essayer de sauvegarder directement dans Supabase aussi
      await supabase.from('gallery').insert([newItem]);

      setShowModal(false);
      setForm({ caption: '' });
      setFile(null);
    } catch (error) {
      console.error('Erreur lors de l\'upload:', error);
      alert('Erreur lors du téléchargement de l\'image. Avez-vous créé le bucket "gallery" en mode public ?');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, url: string) => {
    if (confirm('Supprimer cette image ?')) {
      setItems(prev => prev.filter(i => i.id !== id));
      
      // Supprimer de la base de données
      await supabase.from('gallery').delete().eq('id', id);

      // Supprimer du bucket de stockage (optionnel, on extrait le nom du fichier depuis l'URL)
      try {
        const urlParts = url.split('/');
        const fileName = urlParts[urlParts.length - 1];
        if (fileName) {
          await supabase.storage.from('gallery').remove([fileName]);
        }
      } catch (e) {
        console.warn('Impossible de supprimer le fichier du storage:', e);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-dark/50">{items.length} image(s)</p>
        <button onClick={() => setShowModal(true)} className="btn-shimmer inline-flex items-center gap-2 !py-2.5 !px-5 !text-xs">
          <Plus size={16} /> Ajouter une image
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.filter(img => img.url?.trim()).map(img => (
          <div key={img.id} className="group relative bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <img src={img.url} alt={img.caption} className="w-full h-40 object-cover" />
            <div className="p-3">
              <p className="text-xs text-text-dark/60 line-clamp-1">{img.caption || 'Sans légende'}</p>
            </div>
            <button
              onClick={() => handleDelete(img.id, img.url)}
              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-xl font-bold text-earth-dark">Ajouter une image</h3>
              <button onClick={() => { setShowModal(false); setFile(null); }} className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block font-poppins text-xs text-text-dark/60 uppercase mb-1">Image (PC / Mobile) *</label>
                <div 
                  className={`w-full px-3 py-6 rounded-lg border-2 border-dashed transition-colors text-center cursor-pointer ${file ? 'border-olive bg-olive/5' : 'border-gray-200 hover:border-terracotta'}`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    required
                  />
                  {file ? (
                    <div className="text-olive font-medium font-poppins text-sm flex flex-col items-center gap-2">
                      <img src={URL.createObjectURL(file)} alt="Aperçu" className="w-16 h-16 object-cover rounded-lg shadow-sm" />
                      {file.name}
                    </div>
                  ) : (
                    <div className="text-text-dark/40 font-poppins text-sm flex flex-col items-center gap-2">
                      <Upload size={24} />
                      Cliquez pour sélectionner une photo
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block font-poppins text-xs text-text-dark/60 uppercase mb-1">Légende</label>
                <input
                  type="text" value={form.caption} onChange={e => setForm({ ...form, caption: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-terracotta transition-colors"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" disabled={uploading} onClick={() => { setShowModal(false); setFile(null); }} className="flex-1 py-2.5 rounded-lg border border-gray-200 text-text-dark/60 font-poppins text-sm hover:bg-gray-50 cursor-pointer disabled:opacity-50">
                  Annuler
                </button>
                <button type="submit" disabled={uploading || !file} className="flex-1 btn-shimmer !py-2.5 !text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                  {uploading ? 'Upload en cours...' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
